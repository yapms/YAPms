var save_filename;
var save_dataid;
var save_type;
var save_year;
var save_fontsize;
var save_strokewidth;

function loadCurrentCongress() {
	$.ajax({
		url: "./res/presets/current_congress",
		type: "POST",
		processData: false,
		contentType: false,
		success: function(a, b, c) {
			console.log("Found preset map...");
			loadSavedMap(a);
		},
		error: function(a, b, c) {
			console.log("Did not find preset map...");
			loadMap("../res/usa_congressional_2018.svg", 16, 0.075, "congressional", "congressional", "open", null, {updateText: false});
		}
	});
}

function loadPresetMap(preset) {
	// Remove all candidates, and load the ones for the map
	initCandidates();

	$.ajax({
		url: "./res/presets/" + preset,
		type: "POST",
		processData: false,
		contentType: false,
		success: function(a, b, c) {
			console.log("Found preset map...");
			loadSavedMap(a);
		},
		error: function(a, b, c) {
			console.log("Did not find preset map...");
			loadMap("../res/usa_presidential.svg", 16, 1, "usa_ec", "presidential", "open", null, {updateText: true});
		}
	});
}

// Load map based off of php t parameter
function loadMapFromId(id) {
	switch(id) {
		case "2018_congress":
			loadCurrentCongress();
			break;
		case "2020_cook":
		case "2020_inside":
		case "2020_sabatos":
		case "2016_presidential":
		case "2012_presidential":
		case "2008_presidential":
		case "2004_presidential":
		case "2000_presidential":
		case "1996_presidential":
		case "1992_presidential":
		case "1988_presidential":
		case "1984_presidential":
		case "1980_presidential":
		case "1976_presidential":
		case "1972_presidential":
		case "1968_presidential":
		case "1964_presidential":
		case "1960_presidential":
		case "1956_presidential":
		case "1952_presidential":
		case "1948_presidential":
		case "1944_presidential":
		case "1940_presidential":
		case "1936_presidential":
		case "1932_presidential":
		case "1928_presidential":
		case "1924_presidential":
		case "1920_presidential":
		case "1916_presidential":
		case "1912_presidential":
		case "1908_presidential":
		case "1904_presidential":
		case "1900_presidential":
		case "1896_presidential":
		case "1892_presidential":
		case "1888_presidential":
		case "1884_presidential":
		case "1880_presidential":
		case "1876_presidential":
		case "1876_presidential":
		case "1872_presidential":
		case "1868_presidential":
		case "1864_presidential":
		case "2016_presidential_county":
                case "2012_presidential_county":
			loadPresetMap(id);
			break;
		case "2020_presidential_popular":
			loadMap("./res/usa_presidential.svg", 16, 1, "usa_voting_pop", "usapopular", "open", {updateText: false});
			break;
		case "2020_presidential":
			loadMap("./res/usa_presidential.svg", 16, 1, "usa_ec", "presidential", "open", {updateText: true});
			break;
		case "1972_presidential":
			loadMap("./res/usa_1972_presidential.svg", 16, 1, "usa_1972_ec", "presidential", "open", {updateText: true});
			break;
		case "2020_senatorial":
			loadMap("./res/usa_senate.svg", 16, 1, "usa_senate", "senatorial", "2020", {updateText: false});
			break;
		case "2020_gubernatorial":
			loadMap("./res/usa_gubernatorial.svg", 16, 1, "usa_gubernatorial", "gubernatorial", "2020", {updateText: false});
			break;
		case "2020_democratic_primary":
			loadMap("./res/usa_dem_primary.svg", 16, 1, "dem_primary", "primary", "open", {updateText: false});
			break;
		case "2020_republican_primary":
			loadMap("./res/usa_rep_primary.svg", 16, 1, "rep_primary", "primary", "open",{updateText: false});
			break;
		case "USA_county":
			loadMap("./res/usa_county.svg", 16, 0.075, "congressional", "congressional", "open", {updateText: false});
			break;
		case "USA_congressional":
			loadMap("./res/usa_congressional_2018.svg", 16, 0.075, "congressional", "congressional", "open", {updateText: false});
			break;
		case "USA_congressional_2008":
			loadMap("./res/usa_congressional_2008.svg", 16, 0.005, "congressional", "congressional", "open", {updateText: false});
			break;
		case "USA_gubernatorial":
			loadMap("./res/usa_gubernatorial.svg", 16, 1.5, "usa_gubernatorial", "gubernatorial", "open", {updateText: false});
			break;
		case "USA_senatorial":
			loadMap("./res/usa_senate.svg", 16, 1.5, "usa_senate", "senatorial", "open", {updateText: false});
			break;
		case "USA_takeall":
			loadMap("./res/usa_no_districts.svg", 16, 1, "usa_no_districts_ec", "presidential", "open", {updateText: true});
			break;
		case "USA_proportional":
			loadMap("./res/usa_no_districts.svg", 16, 1, "usa_no_districts_ec", "proportional", "open", {updateText: true});
			break;
		case "Germany_states":
			loadMap("./res/germany.svg", 16, 1, "congressional", "congressional", "open", {updateText: false});
			loadPreset('germany')
			break;
		case "Germany_constituencies":
			loadMap("./res/germany_constituencies.svg", 16, 1, "congressional", "congressional", "open", {updateText: false});
			loadPreset('germany')
			break;
		case "France_constituencies":
			loadMap("./res/france_constituencies.svg", 16, 0.25, "congressional", "congressional", "open", {updateText: false});
			loadPreset('france')
			break;
		case "Italy_states":
			loadMap("./res/italy.svg", 16, 1, "congressional", "congressional", "open", {updateText: false});
			loadPreset('italy')
			break;
		case "Spain_constituencies":
			loadmap("./res/spain_constituencies.svg", 16, 1, "spain_constituencies", "proportional", "open", {updateText: true});
			break;
		case "UnitedKingdom_constituencies":
			loadMap("./res/unitedkingdom.svg", 16, 0.075, "congressional", "congressional", "open", {updateText: false});
			loadPreset('uk')
			break;
		case "Canada_provinces":
			loadMap("./res/canada_states.svg", 38, 2, "congressional", "congressional", "open", {updateText: false});
			loadPreset('canada')
			break;
		case "Canada_constituencies":
			loadMap("./res/canada_constituencies.svg", 16, 0.075, "congressional", "congressional", "open", {updateText: true});
			loadPreset('canada')
			break;
		case "Australia_constituencies":
			loadMap("./res/australia_constituencies.svg", 16, 0.075, "congressional", "congressional", "open", {updateText: false});
			loadPreset('australia')
			break;
		case "Australia_states":
			loadMap("./res/australia.svg", 16, 0.075, "congressional", "congressional", "open", {updateText: false});
			loadPreset('australia')
			break;
		case "EuropeanUnion":
			loadMap("./res/eu.svg", 16, 0.25, "eu_parliament", "primary", "open", {updateText: false});
			break;
		case "World":
			loadMap("./res/world.svg", 38, 0.5, "congressional", "congressional", "open", {updateText: false});
			break;
		case "LTE_presidential":
			loadMap("./res/lte_president.svg", 30, 1, "lte_ec", "presidential", "open", {updateText: true});
			break;
		case "LTE_senatorial":
			loadMap("./res/lte_senate.svg", 35, 1, "ltesenate", "senatorial", "open", {updateText: false});
			break;
		case "LTE_congressional":
			loadMap("./res/lte_house.svg", 35, 1, "congressional", "congressional", "open", {updateText: false});
			break;
		default:
			loadMap("./res/usa_presidential.svg", 16, 1, "usa_ec", "presidential", "open", {updateText: true});
			break;
	}
}

// loads the svg element into the HTML
function loadMap(filename, fontsize, strokewidth, dataid, type, year, options) {
	save_filename = filename;
	save_dataid = dataid;
	save_type = type;
	save_year = year;
	save_fontsize = fontsize;
	save_strokewidth = strokewidth;

//	var mapmenu = document.getElementById('mapmenu');
//	mapmenu.style.display = 'none';

	var mapHTML = document.getElementById('map-div');
	mapHTML.style.visibility = 'hidden';

	totalVotes = 0;

	/* TURNING OFF LABELS BREAKS THE LEANS ON THE GRAPH */

	mapType = type;
	mapYear = year;
	strokeMultiplier = strokewidth;
	var dataname = './data/' + type + '_' + year;

	loadConfig = {
		filename: filename,
		fontsize: fontsize,
		strokewidth: strokewidth,
		dataid: dataid,
		type: type,
		year: year,
	}

	mapOptions = options;

	console.log('Loading ' + filename);
	$('#map-div').load(filename, function(a) {
		console.log('Done loading ' + filename);
	
		if(mobile === true) {
			enableInputMobile();
		} else if(mobile === false) {
			enableInputDesktop();
		}

		centerMap();
		onResize();

		var textHTML = document.getElementById('text');
		if(textHTML !== null) {
			// convert font size to string with px
			textHTML.style.fontSize = '' + fontsize + 'px';
		}

		initData(dataid);

		// count the votes and update the displayed
		// numbers on the chart and legend

		countVotes();
		updateChart();
		updateLegend();
		
		setPalette(cookies['theme']);
		//previousPalette();
		
		if(loadConfig.filename === './res/lte_house.svg') {
			updateLTEHouse();
		}
		
		blockPresets = false;

		if(mode !== 'paint' && mode !== 'move' && mode !== 'paintmove') {
			if(mobile) {
				setMode('paint');
			} else {
				setMode('paintmove');
			}
		}

		if(type === 'senatorial' && year !== 'open') {
			blockPresets = true;
			loadSenateFile(dataname);
		} else if(type === 'gubernatorial' && year !== 'open') {
			blockPresets = true;
			loadGubernatorialFile(dataname);
		} else {
			mapHTML.style.visibility = 'visible';
		}

		if(options.onLoad) {
			options.onLoad();
		}

		if(options.states) {
			for(var stateIndex = 0, length = options.states.length; stateIndex < length; ++stateIndex) {
				var state = states[stateIndex];
				var optionState = options.states[stateIndex];
				state.setVoteCount(optionState.voteCount, true);
				state.setColor(optionState.candidate, optionState.colorValue);
			}
			countVotes();
			updateChart();
			updateLegend();
		}

		// display the take all button for usa proportional maps
		var takeAllButton = document.getElementById('takeallbutton');
		if(filename === './res/usa_no_districts.svg' && type === 'proportional') {
			takeAllButton.style.display = 'block';
		} else {
			takeAllButton.style.display = 'none';
		}
	});
}

function loadGubernatorialFile(gubernatorialfile) {

	if(gubernatorialfile.includes('open') == false) {
	}

	initCandidates();
	
	var candidateNames = {};

	$.get(gubernatorialfile, function(data) {
		console.log('Done loading ' + gubernatorialfile);

		var loadMode = 'candidate';
		var lines = data.split('\n');
		// if the last element is empty remove it
		if(lines[lines.length - 1] === '') {
			lines.pop();
		}
		for(var index = 0; index < lines.length; ++index) {
			var line = lines[index].trim();
			if(loadMode === 'candidate') {
				if(line === '!') {
					loadMode = 'disable';
				} else {
					var split = line.split(' ');
					candidateNames[split[0]] = split[1];
					var candidate = new Candidate(split[1], [split[2], split[3], split[4], split[5]]);
					candidates[split[1]] = candidate;
				}

			} else if(loadMode === 'disable') {
				var split = line.split(' ');
				var state = states.find(state => state.name === split[0]);
				var candidate = candidateNames[split[1]];

				if(split[1] === 'o') {
					state.setColor('Tossup', 2);
				} else {
					state.setColor(candidate, 0);
					//state.toggleDisable();
					state.toggleLock();
				}
			}
		}

		countVotes();
		updateLegend();
		updateChart();
		updateLegend();

		var mapHTML = document.getElementById('map-div');
		mapHTML.style.visibility = 'visible';
	});
}

function loadSenateFile(senatefile, onLoad) {

	if(senatefile.includes('open') == false) {
		//blockPresets = true;
	}

	initCandidates();

	var candidateNames = {};

	console.log(senatefile);
	$.get(senatefile, function(data) {
		console.log('Done loading ' + senatefile);
	
		var loadMode = 'candidate';
		var lines = data.split('\n');
		if(lines[lines.length - 1] === '') {
			lines.pop();
		}
		for(var index = 0; index < lines.length; ++index) {
			var line = lines[index].trim();
			if(loadMode === 'candidate') {
				if(line === '!') {
					loadMode = 'disable';
				} else {
					var split = line.split(' ');
					candidateNames[split[0]] = split[1];
					var candidate = new Candidate(split[1], [split[2], split[3], split[4], split[5]]);
					candidates[split[1]] = candidate;
				}

			} else if(loadMode === 'disable') {
				var split = line.split(' ');
				var state = states.find(state => state.name === split[0]);
				var special = states.find(state => state.name === split[0] + '-S');

				if(split[1] === 'o') {
					state.setColor('Tossup', 2);
				} else {
					state.setColor(
						candidateNames[split[1]], 0);
					//state.toggleDisable();
					state.toggleLock();
					
				}

				if(split[2] === 'o') {
					special.setColor('Tossup', 2);
				} else {
					special.setColor(
						candidateNames[split[2]], 0);
					//special.toggleDisable();
					special.toggleLock();
				}
			}
		}

		countVotes();
		updateLegend();
		updateChart();
		updateLegend();

		var mapHTML = document.getElementById('map-div');
		mapHTML.style.visibility = 'visible';
	});
}

function loadSavedMap(data) {
	var lines = data.split('\n');
	var meta = lines[0].split(' ');
	loadMap(meta[0], meta[1], meta[2], meta[3], meta[4], meta[5], {onLoad: function() {
		console.log("Loading saved map...");

		// --- RUN THIS AFTER THE MAP HAS BEEN LOADED ---
	
		// parse each candidate in the file
		// add them to the map
		var candidateEndLine = meta[6];
		for(var candidateIndex = 1; candidateIndex < candidateEndLine; ++candidateIndex) {
			var candidate = lines[candidateIndex].split(' ');
			addCandidate(candidate[0].replace(/\%/g, " "), candidate[1], candidate[2], candidate[3], candidate[4]);
		}

		// parse each state in the file
		// change them to their candidate
		for(var stateDataIndex = candidateEndLine; stateDataIndex < lines.length - 1; ++stateDataIndex) {
			var stateIndex = stateDataIndex - candidateEndLine;
			var stateData = lines[stateDataIndex].split(' ');
			var stateName = stateData[0];
			var state = states[stateIndex];
			var updateText = (meta[7] === 'true');

			var voteCount = parseInt(stateData[stateData.length - 2]);
			state.setVoteCount(voteCount, updateText);	
			
			// if its a primary map
			if(save_type === 'primary' || save_type === 'proportional') {
				var majorityCandidate = "Tossup";
				var majorityVoteCount = 0;
				var state = states.find(state => state.name === stateData[0]);

				for(var candidateIndex = 0; candidateIndex < candidateEndLine - 1; ++candidateIndex) {
					// get the candidate name
					var candidateName = lines[candidateIndex + 1].split(' ')[0];
					candidateName = candidateName.replace(/\%/g, " ");

					// read in the delegate count
					var delegates = stateData[4 + candidateIndex];

					// set the delegate  count
					state.delegates[candidateName] = parseInt(delegates);
					if(parseInt(delegates) > majorityVoteCount) {
						majorityVoteCount = parseInt(delegates);
						majorityCandidate = candidateName;
					} else if(parseInt(delegates) === majorityVoteCount) {
						majorityCandidate = 'Tossup';
					}
				}

				state.delegates['Tossup'] = parseInt(stateData[3]);

				// set the color to the candidate with the most delegates
				if(majorityCandidate === 'Tossup') {
					state.setColor('Tossup', 2);
				}
				else {
					state.setColor(majorityCandidate, 0);
				}
				
			}
			// otherwise
			else {
				// get the candidate
				var candidateName = stateData[1].replace(/\%/g, " ");
				// set the proper color
				state.setColor(candidateName, parseInt(stateData[2]));
			}
			
			var disable = (stateData[stateData.length - 1] === 't');
			if(disable === true) {
				state.toggleDisable();
			}
		}
		
		countVotes();
		updateChart();
		updateLegend();
		updateLTEHouse();
	}
		,
		updateText: meta[7]
	});
}

function loadFileMap() {
	var file = document.getElementById('loadfile').files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(loadEvent) {
		var txt = loadEvent.target.result;
		loadSavedMap(txt);
	}
	fileReader.readAsText(file, 'UTF-8');
}

function enableInputDesktop() {
	var enablePan = false;
	var enableZoom = false;
	if(panObject != null) {
		enablePan = panObject.isPanEnabled();
		enableZoom = panObject.isZoomEnabled();
	}

	panObject = svgPanZoom('#svgdata', {
		fit: true,
		center: true,
		contain: false,
		panEnabled: true,
		zoomEnabled: true,
		//panEnabled: enablePan,
		//zoomEnabled: enableZoom,
		dblClickZoomEnabled: false,
		maxZoom: 100,
		zoomScaleSensitivity: 0.06
	});
}

function enableInputMobile() {
	var eventHandler = {
		haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
		init: function(options) {
			var instance = options.instance;
			var initialScale = 1;
			var pannedX = 0;
			var pannedY = 0;

			this.hammer = Hammer(options.svgElement, {
				inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
			});
		
			this.hammer.get('pinch').set({enable: true});

			this.hammer.on('panstart panmove', function(ev) {
				if(ev.type === 'panstart') {
					pannedX = 0;
					pannedY = 0;
				}
				instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY});
				pannedX = ev.deltaX;
				pannedY = ev.deltaY;			
			});

			this.hammer.on('pinchstart pinchmove', function(ev) {
				if(ev.type === 'pinchstart') {
					initialScale = instance.getZoom();
					instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y});
				}
				
				instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y});
			});
		}
	
	}

	panObject = svgPanZoom('#svgdata', {
		fit: true,
		center: true,
		contain: false,
		maxZoom: 70,
		dblClickZoomEnabled: false,
		customEventsHandler: eventHandler
	});
}
