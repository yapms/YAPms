var totalVotes = 0;
var stateCount = 0;

class State {
	constructor(name, htmlElement, dataid) {
		/* Real ID of the SVG element */
		this.name = name;
		/* Fake name for display when it has an ugly real name */
		this.fakename = "District " + (++stateCount);
		this.colorValue = 2;
		this.htmlElement = htmlElement;
		this.candidate = 'Tossup';
		this.dataid = dataid;
		this.voteCount = 0;
		this.voteCount_beforeDisable = 0;
		this.resetVoteCount();
		this.disabled = false;
		this.locked = false;
		this.voters = 0;
		this.popularVote = {};
		this.turnout = 100;

		/* Call This When The State Changes Color */
		this.onChange = function() {}
	}

	resetVoteCount() {
		if(parseInt(this.dataid)) {
			var count = parseInt(this.dataid);
			this.setVoteCount(count);
			this.voteCount_beforeDisable = count;		
		} else if(this.dataid === 'duma') {
			if(this.name === 'Russia') {
				this.setVoteCount(225);
				this.voteCount_beforeDisable = 225;
			} else {
				this.setVoteCount(1);
				this.voteCount_beforeDisable = 1;
			}
		} 
		/* PHASE THIS OUT PLEASE */
		else if(this.dataid === 'congressional' ||
			this.dataid === 'usa_gubernatorial' ||
			this.dataid === 'gubernatorial') {
			this.setVoteCount(1);
			this.voteCount_beforeDisable = 1;

		/* ALSO PHASE THIS OUT PLEASE */
		} else if(this.dataid === 'senate') {
			this.setVoteCount(2);
			this.voteCount_beforeDisable = 2;

		} else {
			this.setVoteCount(data[this.dataid][this.name]);
			this.voteCount_beforeDisable = data[this.dataid][this.name];
		}
	}
	
	resetDelegates() {
		if(this.disabled === true) {
			return;
		}
		this.delegates = {};
		this.delegates['Tossup'] = this.voteCount;
		this.setColor("Tossup", 2, {setDelegates: false});
	}

	setDelegates(candidate, amount) {
		this.delegates[candidate] = amount;
		var majorityCandidate = "Tossup";
		var majorityCount = 0;
		var majorityColor = 2;
		for(var candidate in this.delegates) {
			var count = this.delegates[candidate];
			if(count > majorityCount) {
				if(candidate !== "Tossup") {
					majorityCandidate = candidate;
					majorityCount = count;
					majorityColor = 0;
				}
			} else if(count === majorityCount) {
				majorityCandidate = "Tossup";
				majorityColor = 2;
			}
		}
		this.setColor(majorityCandidate, majorityColor, {setDelegates: false});

		
	}

	setVoteCount(value) {
		var diff = value - this.voteCount;
		this.voteCount = value;
		this.delegates = {};
		this.setDelegates("Tossup", value);
		if(MapLoader.save_type === 'proportional') {
			this.candidate = 'Tossup';
			this.setColor('Tossup', 2);
		}
		totalVotes += diff;

		// update the html text display
		var stateText = document.getElementById(this.name + '-text');
		if(stateText !== null && 
			(MapLoader.save_dataid === 'usa_ec' ||
			MapLoader.save_dataid === 'usa_1972_ec' ||
			MapLoader.save_dataid === 'usa_no_districts_ec' ||
			MapLoader.save_dataid === 'usa_pre_civilwar_ec' ||
			MapLoader.save_dataid === 'usa_territories_ec')) {
			var text = this.name + ' ' + value;
			// the text elements in an svg are inside spans
			if(typeof stateText.childNodes[1] !== 'undefined') {
				stateText.childNodes[1].innerHTML = ' ' + value;
			} else {
				stateText.childNodes[0].innerHTML = this.name + ' ' + value;
			}
		}
	}

	getHtml() { 
		return this.htmlElement; 
	}

	getDisplayColor() {
		return this.htmlElement.style.fill;
	}

	setDisplayColor(color) {
		this.htmlElement.style.fill = color;

		var button = document.getElementById(this.name + '-button');
		if(button !== null) {
			button.style.fill = color;
		}

		var land = document.getElementById(this.name + '-land');
		if(land !== null) {
			land.style.fill = color;
		}
	}

	verifyTossupColor() {
		if(this.candidate === 'Tossup') {
			this.setDisplayColor(CandidateManager.TOSSUP.colors[2]);
		}
	}

	toggleLock() {
		if(this.locked == false) {
			this.disabled = true;

			this.locked = !this.locked;
			if(this.name.includes('-S')) {
				this.htmlElement.style.visibility = 'hidden';
			}
			this.setDisplayColor(CandidateManager.TOSSUP.colors[2]);
			this.htmlElement.setAttribute('fill-opacity', '0.2');
			this.htmlElement.setAttribute('stroke-opacity', '0.2');
			var stateText = document.getElementById(this.name + '-text');
			if(stateText !== null) {
				stateText.setAttribute('fill-opacity', '0.2');
			}

			var land = document.getElementById(this.name + '-land');
			if(land !== null) {
				land.setAttribute('fill-opacity', '0.2');
				land.setAttribute('stroke-opacity', '0.2');
			}

			var button = document.getElementById(this.name + '-button');
			if(button !== null) {
				button.setAttribute('fill-opacity', '0.2');
				button.setAttribute('stroke-opacity', '0.2');
			}

			var stateLandText = document.getElementById(this.name.split("-")[0] + '-text');
			if(stateLandText !== null) {
//				stateLandText.setAttribute('fill-opacity', '0.25');
			}

		} else if(this.locked == true) {
			this.disabled = false;
			this.locked = !this.locked;
			this.setColor(this.candidate, this.colorValue);
			this.htmlElement.setAttribute('fill-opacity', '1.0');
			this.htmlElement.setAttribute('stroke-opacity', '1.0');
			if(this.name.includes('-S')) {
				this.htmlElement.style.visibility = 'visible';
			}
			var stateText = document.getElementById(this.name + '-text');
			if(stateText !== null) {
				stateText.setAttribute('fill-opacity', '1.0');
			}
			var land = document.getElementById(this.name + '-land');
			if(land != null) {
				land.setAttribute('fill-opacity', '1.0');
				land.setAttribute('stroke-opacity', '1.0');
			}
			
			var button = document.getElementById(this.name + '-button');
			if(button !== null) {
				button.setAttribute('fill-opacity', '1.0');
				button.setAttribute('stroke-opacity', '1.0');
			}
			
			var stateLandText = document.getElementById(this.name.split("-")[0] + '-text');
			if(stateLandText !== null) {
//				stateLandText.setAttribute('fill-opacity', '1.0');
			}
		}
	}

	toggleDisable() {
		if(this.locked == true) {
			return;
		}

		if(this.disabled == false) {
			this.setVoteCount(0);
			//alert(MapLoader.save_type === "takeall");
			this.setColor('Tossup', 2);

			//this.setDisplayColor(candidates['Tossup'].colors[1]);
			this.disabled = !this.disabled;
			this.htmlElement.setAttribute('fill-opacity', '0.25');
			this.htmlElement.setAttribute('stroke-opacity', '0.25');
			if(this.name.includes('-S')) {
	//			this.htmlElement.style.visibility = 'hidden';
			}
		
			if(MapLoader.save_type !== 'senatorial') {
				var stateText = document.getElementById(this.name + '-text');
				if(stateText !== null) {
					stateText.setAttribute('fill-opacity', '0.25');
				}
			}

			var land = document.getElementById(this.name + '-land');
			if(land !== null) {
				land.setAttribute('fill-opacity', '0.25');
				land.setAttribute('stroke-opacity', '0.25');
			}

			var button = document.getElementById(this.name + '-button');
			if(button !== null) {
				button.setAttribute('fill-opacity', '0.25');
				button.setAttribute('stroke-opacity', '0.25');
			}

			if(MapLoader.save_type !== 'senatorial') {
				var stateLandText = document.getElementById(this.name.split("-")[0] + '-text');
				if(stateLandText !== null) {
					stateLandText.setAttribute('fill-opacity', '0.25');
				}
			}

		} else if(this.disabled == true) {
			this.resetVoteCount();
			this.setVoteCount(this.voteCount);
			this.disabled = !this.disabled;
			this.setColor(this.candidate, this.colorValue);
			this.htmlElement.setAttribute('fill-opacity', '1.0');
			this.htmlElement.setAttribute('stroke-opacity', '1.0');
			if(this.name.includes('-S')) {
				this.htmlElement.style.visibility = 'visible';
			}
			var stateText = document.getElementById(this.name + '-text');
			if(stateText !== null) {
				stateText.setAttribute('fill-opacity', '1.0');
			}
			var land = document.getElementById(this.name + '-land');
			if(land != null) {
				land.setAttribute('fill-opacity', '1.0');
				land.setAttribute('stroke-opacity', '1.0');
			}
			
			var button = document.getElementById(this.name + '-button');
			if(button !== null) {
				button.setAttribute('fill-opacity', '1.0');
				button.setAttribute('stroke-opacity', '1.0');
			}
			
			var stateLandText = document.getElementById(this.name.split("-")[0] + '-text');
			if(stateLandText !== null) {
				stateLandText.setAttribute('fill-opacity', '1.0');
			}
		}
	}

	// only incrememnt though the colors of the specified candidate
	// if the state isn't this candidates color, start at solid
	incrementCandidateColor(candidate, options = {setDelegates: true}) {
		if(this.disabled) {
			return;
		}

		// if changing color set to solor
		if(this.candidate !== candidate) {
			this.colorValue = 0;
		}
		// otherwise increment
		else {
			this.colorValue += 1;
		}
	
		if(options.setDelegates) {
			this.delegates = {};
			this.delegates['Tossup'] = 0;
			this.delegates[candidate] = this.voteCount;
		}

		// keep the color value within bounds
		if(this.candidate === 'Tossup') {
			// if the candidate is tossup go to max
			if(this.colorValue >= 3) {
				this.colorValue = 0;
			}

		} else {
			// if the candidate is anything else...
			//if(this.colorValue >= maxColorValue + 1) {
			if(this.colorValue >= maxColorValues) {
				this.colorValue = 0;
			}

			if(CandidateManager.candidates[candidate].singleColor) {
				this.colorValue = 0;
			}
		}

		// make sure the candidate value is correct
		this.candidate = candidate;

		// skip black color for tossup candidate
		if(this.candidate === 'Tossup') {
			this.colorValue = CandidateManager.tossupColor;
		}

		var color = CandidateManager.TOSSUP.colors[CandidateManager.tossupColor];
		
		if(this.candidate in CandidateManager.candidates &&
			CandidateManager.candidates[this.candidate].colors !== undefined && 
			CandidateManager.candidates[this.candidate].colors !== null) {
			// get color
			color = CandidateManager.candidates[this.candidate].colors[this.colorValue];
			// set color
			this.htmlElement.style.fill = color;
		}

		var land = document.getElementById(this.name + '-land');
		if(land != null) {
			land.style.fill = color;
		}

		var button = document.getElementById(this.name + '-button');
		if(button != null) {
			button.style.fill = color;
		}

		if(this.onChange)
		this.onChange();
	}
	
	highlight() {
		if(this.disabled) {
			return;
		}

		this.highlight = !this.highlight;

		this.htmlElement.style.stroke = "#ffff00";

		if(this.htmlElement.style.strokeWidth === "") {
			this.htmlElement.style.strokeWidth = "1px";
		}

		this.htmlElement.style.strokeWidth = new String(parseInt(this.htmlElement.style.strokeWidth.slice(0,-2)) * 3) + "px";
	}
	

	// directly change the color of a state (add error checking pls)
	setColor(candidate, colorValue, options = {setDelegates: true}) {
		//this.test_setColor();

		if(this.disabled) {
			return;
		}

		this.candidate = candidate;

		// prevent black color
		if(candidate === 'Tossup' && colorValue == 0) {
			colorValue = 2;
		}

		if(options.setDelegates) {
			this.delegates = {};
			this.delegates['Tossup'] = 0;
			this.delegates[candidate] = this.voteCount;
		}

		this.colorValue = colorValue;
		
		var color = null;

		if(CandidateManager.candidates[candidate]) {
			color = CandidateManager.candidates[candidate].colors[colorValue];
		}

		if(color) {
			this.htmlElement.style.fill = color;
			this.htmlElement.setAttribute("fill", "url(#" + this.name + "_pattern)");

			var land = document.getElementById(this.name + '-land');
			if(land != null) {
				land.style.fill = color;
				land.setAttribute("fill", "url(#" + this.name + "_pattern)");
			}

			var button = document.getElementById(this.name + '-button');
			if(button != null) {
				button.style.fill = color;
				button.setAttribute("fill", "url(#" + this.name + "_pattern)");
			}
		}

		if(this.onChange) {
			this.onChange();
		}
	}
	
	test_setColor(options) {
		console.log("TEST SET COLOR");
		var svg = document.getElementById("svgdata").firstChild;

		var defs = svg.querySelector("#defs");
		if(defs === null) {
			defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
			defs.setAttribute("id", "defs");
			svg.insertBefore(defs, svg.firstChild);
		}
	
		var pattern = svg.querySelector("#" + this.name + "_pattern");
		if(pattern === null) {
			pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
			pattern.setAttribute("id", this.name + "_pattern");
			pattern.setAttribute("width", "30");
			pattern.setAttribute("height", "30");
			pattern.setAttribute("patternUnits", "userSpaceOnUse");
			pattern.setAttribute("patternTransform", "rotate(-35)");
			defs.appendChild(pattern);
		}

		while(pattern.firstChild) {
			pattern.removeChild(pattern.lastChild);
		}
		
		var candidates = Object.keys(this.delegates);	
		var candidateCount = candidates.length;	
		var realCandidateCount = 0;
		for(var index = 0; index < candidateCount; ++index) {
			var candidateName = CandidateManager.candidates[candidates[index]].name;
			if(this.delegates[candidates[index]] && candidateName !== "Tossup") { 
				realCandidateCount += 1;
			}
		}
		var xPos = 0;
		for(var index = 0; index < candidateCount; ++index) {
			var colorName = CandidateManager.candidates[candidates[index]].colors[0];
			var candidateName = CandidateManager.candidates[candidates[index]].name;
			var candidateDelegates = this.delegates[candidates[index]];
			if(this.delegates[candidates[index]] && candidateName !== "Tossup") { 
			} else {
				continue;
			}
			var color = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			console.log(colorName);
			color.setAttribute("class", candidateName);
			color.setAttribute("fill", colorName);
			color.setAttribute("width", (30* (candidateDelegates / this.voteCount)).toString());
			color.setAttribute("height", "100%");
			color.setAttribute("x", xPos.toString());
			xPos += (30 / realCandidateCount);
			color.setAttribute("y", "0");
			pattern.appendChild(color);
		}
/*
		color = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		color.setAttribute("fill", "#0000ff");
		color.setAttribute("width", "10");
		color.setAttribute("height", "20");
		color.setAttribute("x", "0");
		color.setAttribute("y", "0");
		pattern.appendChild(color);
		*/

		this.htmlElement.removeAttribute("style");
	}

	static setEC() {
		// hide the popup window
		closeAllPopups();

		// get the stateId and input value
		var stateId = document.getElementById('state-id').value;
		var input = document.getElementById('state-ec').value;

		// get the state and set its new vote count
		for(var index = 0, length = states.length; index < length; ++index) {
			var state = states[index];
			if(state.name === stateId) {
				state.setVoteCount(parseInt(input));
				break;
			}
		}

		// recount the votes
		countVotes();
		ChartManager.updateChart();
		LegendManager.updateLegend();
	}

}
