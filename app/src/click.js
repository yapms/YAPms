function buttonClick(clickElement) {
	if(php_candidate_edit === false)
		return;

	var id = clickElement.getAttribute('id').split('-')[0];
	var state = states.find(state => state.name === id);

	if(mode === 'paint' || mode === 'fill') {
		stateClickPaint(state);
	} else if(mode === 'ec') {
		stateClickEC(state);
	} else if(mode === 'delete') {
		stateClickDelete(state);
	} else if(mode === 'highlight') {
		stateClickHighlight(state);
	}
	
	countVotes();
	ChartManager.updateChart();
	LegendManager.updateLegend(); 
}

function landClick(clickElement) {
	if(php_candidate_edit === false)
		return;

	if(mode === 'move') {
		return;
	}

	var setSolid = KeyboardManager.quickFill();

	var id = clickElement.getAttribute('id');
	var split = id.split('-');
	var stateName = split[0];
	var districtName = split[1];

	var AL;
	var districts = [];

	// get each district
	states.forEach(function(state, index) {
		if(state.name.includes(stateName)) {
			districts.push(state);
			if(state.name.includes('AL')) {
				AL = state;
			}
		}
	});

	if(mode === 'paint' || mode === 'fill') {
		Simulator.view(AL);
		// check if each district has the same candidate and color value
		if(setSolid) {
			AL.setColor(paintIndex, 0);
		} else {
			AL.incrementCandidateColor(paintIndex);
		}
		districts.forEach(function(district) {
			district.setColor(AL.candidate, AL.colorValue);
		});
	} else if(mode === 'delete') {
		districts.forEach(function(district) {
			district.toggleDisable();
		});
	}

	countVotes();
	ChartManager.updateChart();
	LegendManager.updateLegend();
}

function stateClick(clickElement) {
	if(php_candidate_edit === false)
		return;

	var id = clickElement.getAttribute('id');
	var state = states.find(state => state.name === id);

	switch(mode) {
		case 'paint':
		case 'fill':
			Simulator.view(state);
			if(Simulator.ignoreClick === false) {
				stateClickPaint(state);
			}
			break;
		case 'ec':
			stateClickEC(state);
			break;
		case 'delete':
			stateClickDelete(state);
			break;
		case 'highlight':
			stateClickHighlight(state);
			break;
	}

	countVotes();
	ChartManager.updateChart();
	LegendManager.updateLegend();
}

var tooltipTimeout = null;

function stateClickPaint(state, options = {forceProportional: false}) {
	if(state.disabled) {
		return;
	}

	if(options.forceProportional) {
		displayProportionalEdit(state);
		return;
	} else if(MapLoader.save_type !== "proportional") {
		if(KeyboardManager.quickFill()) {
			state.setColor(paintIndex, 0);
		} else if(KeyboardManager.areaSelect()) {
			paintEntireState(state);
		} else {
			state.incrementCandidateColor(paintIndex);
		}
		return;
	} else if(MapLoader.save_type === "proportional") {
		if(KeyboardManager.quickFill()) {
			state.setColor(paintIndex, 0);
			return;
		}
		if(mode === "fill") {
			state.incrementCandidateColor(paintIndex);
			return;
		}
	}

	displayProportionalEdit(state);
}

function stateClickHighlight(state) {
	if(state.disabled) {
		return;
	}

	state.highlight();
}

function paintEntireState(state) {
	if(MapLoader.save_filename === './res/usa/house/12-2-2019-house.svg' ||
		MapLoader.save_filename === './res/usa/county/usa_county.svg') {
		var setDisable = !state.disabled;
		var stateName = state.name.substr(0,2);
		for(var index = 0, length = states.length; index < length; ++index) {
			var state_a = states[index];
			var stateName_a = '';
			if(MapLoader.save_filename === './res/usa/house/12-2-2019-house.svg') {
				stateName = state.name.substr(0, 2);
				stateName_a = state_a.name.substr(0, 2);
			} else if(MapLoader.save_filename === './res/usa/county/usa_county.svg') {
				stateName = state.name.substr(-2);
				stateName_a = state_a.name.substr(-2);
			}
			if(stateName_a === stateName) {
					state_a.setColor(paintIndex, 0);
			}
		}
	}
}

function stateClickDelete(state) {
	if(KeyboardManager.areaSelect()) {
		deleteEntireState(state);
	} else {
		state.toggleDisable();
	}
}

function deleteEntireState(state) {
	if(MapLoader.save_filename === './res/usa/house/12-2-2019-house.svg' ||
		MapLoader.save_filename === './res/usa/county/usa_county.svg') {
		var setDisable = !state.disabled;
		var stateName = state.name.substr(0,2);
		for(var index = 0, length = states.length; index < length; ++index) {
			var state_a = states[index];
			var stateName_a = '';
			if(MapLoader.save_filename === './res/usa/house/12-2-2019-house.svg') {
				stateName = state.name.substr(0, 2);
				stateName_a = state_a.name.substr(0, 2);
			} else if(MapLoader.save_filename === './res/usa/county/usa_county.svg') {

				stateName = state.name.substr(-2);
				stateName_a = state_a.name.substr(-2);
			}
			if(stateName_a === stateName) {
				if(setDisable && state_a.disabled === false) {
					state_a.toggleDisable();
				} else if(!setDisable && state_a.disabled === true) {
					state_a.toggleDisable();
				}
			}
		}
	}
}

function stateClickEC(state) {
	if(state.disabled === false) {
		var ecedit = document.getElementById('ecedit');
		var eceditText = document.getElementById('ecedit-message');
		var input = document.getElementById('state-ec');
		var stateId = document.getElementById('state-id');
		eceditText.innerHTML = 'Set ' + state.name + ' delegates';
		input.value = state.voteCount;
		stateId.value = state.name;
		ecedit.style.display = 'inline';
	}
}

function specialClick(clickElement, e) {
	var id = clickElement.getAttribute('id');
	var state = states.find(state => state.name === id);

	if(mode === 'paint' || mode === 'fill') {
		state.incrementCandidateColor(paintIndex);
		countVotes();
		ChartManager.updateChart();
		LegendManager.updateLegend();
	}
}

function legendClick(candidate, button) {
	paintIndex = candidate;
	LegendManager.selectCandidateDisplay(button);
}

function displayProportionalEdit(state) {
	LogoManager.loadButtons();
	closeAllPopups();
	var demdel = document.getElementById('demdel');
	demdel.style.display = 'flex';
	var message = document.getElementById('demdel-message');
	if(state.name !== 'SU') {
		message.innerHTML = state.name + '<br><small>' + state.voteCount + ' delegates</small>';
	} else {
		message.innerHTML = 'Super<br><small>' + state.voteCount + ' delegates</small>';
	}
	var hidden = document.getElementById('demdel-state-name');
	hidden.value = state.name;
	var ranges = document.getElementById('demdel-ranges');

	// remove old sliders
	while(ranges.firstChild) {
		ranges.removeChild(ranges.firstChild);
	}

	var max  = state.voteCount;
	var total = 0;

	var displayTossup = document.createElement('DIV');
	displayTossup.setAttribute('id', 'display-Tossup');

	for(var key in CandidateManager.candidates) {
		if(key === 'Tossup')
			continue;
		// create slider, set their max to the states delegate count
		var range = document.createElement('INPUT');
		range.setAttribute('id', 'range-' + key);
		range.setAttribute('type', 'range');
		range.setAttribute('max', max);
		if(state.delegates[key] === undefined) {
			state.delegates[key] = 0;
		}
		range.value = state.delegates[key];
		total += state.delegates[key];
		// create display for slider
		var display = document.createElement('DIV');
		display.setAttribute('id', 'display-' + key);
		display.innerHTML = key + ' - ' + range.value + ' - ' +
			((state.delegates[key] / max) * 100).toFixed(2) + '%';

		// this is how you reference the display DOM
		// im not sure exactly what this is but its weird
		range.oninput = (function() {
			var refstate = state;
			var refkey = key;
			var refdisplay = display;
			var refdisplayTossup = displayTossup;
			var prevvalue = parseInt(range.value);
			return function(b) {
				total -= prevvalue;
				total += parseInt(this.value);

				if(total > max) {
					var diff = total - max;
					total -= diff;
					this.value -= diff;
				}
				
				prevvalue = parseInt(this.value);

				displayTossup.innerHTML = 'Tossup - ' + (max - total) + ' - ' +
					(( (max - total) / max) * 100).toFixed(2) + '%';
				
				// update the display	
				refdisplay.innerHTML = refkey + ' - ' + this.value + ' - ' + 
					((this.value / max) * 100).toFixed(2) + '%';
		
				refstate.setDelegates("Tossup", (max - total));	
				refstate.setDelegates(refkey, parseInt(this.value));	
				countVotes();
				ChartManager.updateChart();
				LegendManager.updateLegend();
			}
		})();

		ranges.appendChild(display);
		ranges.appendChild(range);
	}

	displayTossup.innerHTML = 'Tossup - ' + (max - total) + ' - ' + (( (max - total) / max) * 100).toFixed(2) + '%';
	ranges.appendChild(displayTossup);
}
