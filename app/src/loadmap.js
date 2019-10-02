var save_filename;
var save_dataid;
var save_type;
var save_year;
var save_fontsize;
var save_strokewidth;

var enablePopularVote = false;
var enableCongress = false;

function loadPresetMap(preset, options) {
	// Remove all candidates, and load the ones for the map
	initCandidates();

	var enableHouse = false;

	if(options) {
		enableHouse = options.enableCongress;
	}

	$.ajax({
		url: "./res/presets/" + preset,
		type: "GET",
		processData: false,
		contentType: false,
		success: function(a, b, c) {
			console.log("Found preset map...");
			loadSavedMap_old(a, {enableCongress: enableHouse});
		},
		error: function(a, b, c) {
			console.log("Did not find preset map...");
			loadMap("../res/usa_presidential.svg", 16, 1, "usa_ec", "presidential", "open", {updateText: true});
		}
	});
}

// Load map based off of php t parameter
function loadMapFromId(id) {
	switch(id) {
		case "USA_current_house":
			loadPresetMap(id, {enableCongress: true});
			break;
		case "USA_current_senate":
		case "USA_2024_projection":
		case "USA_2020_cook":
		case "USA_2020_inside":
		case "USA_2020_sabatos":
		case "USA_2016_presidential":
		case "USA_2012_presidential":
		case "USA_2008_presidential":
		case "USA_2004_presidential":
		case "USA_2000_presidential":
		case "USA_1996_presidential":
		case "USA_1992_presidential":
		case "USA_1988_presidential":
		case "USA_1984_presidential":
		case "USA_1980_presidential":
		case "USA_1976_presidential":
		case "USA_1972_presidential":
		case "USA_1968_presidential":
		case "USA_1964_presidential":
		case "USA_1960_presidential":
		case "USA_1956_presidential":
		case "USA_1952_presidential":
		case "USA_1948_presidential":
		case "USA_1944_presidential":
		case "USA_1940_presidential":
		case "USA_1936_presidential":
		case "USA_1932_presidential":
		case "USA_1928_presidential":
		case "USA_1924_presidential":
		case "USA_1920_presidential":
		case "USA_1916_presidential":
		case "USA_1912_presidential":
		case "USA_1908_presidential":
		case "USA_1904_presidential":
		case "USA_1900_presidential":
		case "USA_1896_presidential":
		case "USA_1892_presidential":
		case "USA_1888_presidential":
		case "USA_1884_presidential":
		case "USA_1880_presidential":
		case "USA_1876_presidential":
		case "USA_1876_presidential":
		case "USA_1872_presidential":
		case "USA_1868_presidential":
		case "USA_1864_presidential":
		case "USA_2016_presidential_county":
			loadPresetMap(id);
			break;
		case "USA_Canada":
			loadMap("./res/usa_canada.svg", 16, 0.01, "congressional", "presidential", "open", {updateText: false});
			break;
		case "USA_2020_presidential":
			loadMap("./res/usa_presidential.svg", 16, 1, "usa_ec", "presidential", "open", {updateText: true, voters: 'usa_voting_pop', enablePopularVote: true});
			break;
		case "USA_split_maine":
			loadMap("./res/usa_1972_presidential.svg", 16, 1, "usa_1972_ec", "presidential", "open", {updateText: true});
			break;
		case "USA_2020_senatorial":
		case "USA_2020_senate":
			loadMap("./res/usa_senate.svg", 16, 1, "usa_senate", "senatorial", "2020", {updateText: false});
			break;
		case "USA_2020_gubernatorial":
		case "USA_2020_governors":
			loadMap("./res/usa_gubernatorial.svg", 16, 1, "usa_gubernatorial", "gubernatorial", "2020", {updateText: false});
			break;
		case "USA_2020_democratic_primary":
			loadMap("./res/usa_dem_primary.svg", 16, 1, "dem_primary", "primary", "open", {updateText: false});
			loadPreset('democratic primary');
			break;
		case "USA_2020_republican_primary":
			loadMap("./res/usa_rep_primary.svg", 16, 1, "rep_primary", "primary", "open",{updateText: false});
			loadPreset('republican primary');
			break;
		case "USA_county":
			loadMap("./res/usa_county.svg", 16, 0.075, "congressional", "congressional", "open", {updateText: false});
			break;
		case "USA_congressional":
		case "USA_2020_house":
			loadMap("./res/usa_congressional_2018.svg", 16, 0.075, "congressional", "congressional", "open", {updateText: false, enableCongress: true});
			break;
		case "USA_congressional_2008":
		case "USA_2008_house":
			loadMap("./res/usa_congressional_2008.svg", 16, 0.005, "congressional", "congressional", "open", {updateText: false});
			break;
		case "USA_gubernatorial":
		case "USA_governors":
			loadMap("./res/usa_gubernatorial.svg", 16, 1.5, "usa_gubernatorial", "gubernatorial", "open", {updateText: false});
			break;
		case "USA_senatorial":
		case "USA_senate":
			loadMap("./res/usa_senate.svg", 16, 1.5, "usa_senate", "senatorial", "open", {updateText: false});
			break;
		case "USA_takeall":
			loadMap("./res/usa_no_districts.svg", 16, 1, "usa_no_districts_ec", "presidential", "open", {updateText: true});
			break;
		case "USA_proportional":
			loadMap("./res/usa_no_districts.svg", 16, 1, "usa_no_districts_ec", "proportional", "open", {updateText: true});
			break;
		case "USA_pre_civilwar":
			loadMap("./res/usa_pre_civilwar.svg", 16, 1, "usa_pre_civilwar_ec", "presidential", "open", {updateText: true});
			break;
		case "Germany_states":
			loadMap("./res/germany.svg", 16, 1, "congressional", "presidential", "open", {updateText: false});
			loadPreset('germany')
			break;
		case "Germany_constituencies":
		case "Germany_bundestag":
			loadMap("./res/germany_constituencies.svg", 16, 0.25, "congressional", "congressional", "open", {updateText: false});
			loadPreset('germany')
			break;
		case "France_constituencies":
		case "France_national_assembly":
			loadMap("./res/france_constituencies.svg", 16, 0.25, "congressional", "congressional", "open", {updateText: false});
			loadPreset('france')
			break;
		case "Netherlands_provinces":
			loadMap("./res/netherlands_provinces.svg", 16, 0.15, "netherlands_provinces", "proportional", "open", {updateText: false});
			loadPreset('netherlands');
			break;
		case "Netherlands_gemeenten":
			loadMap("./res/netherlands_gemeenten.svg", 16, 0.15, "congressional", "congressional", "open", {updateText: false});
			loadPreset('netherlands');
			break;
		case "Italy_states":
			loadMap("./res/italy.svg", 16, 1, "congressional", "presidential", "open", {updateText: false});
			loadPreset('italy')
			break;
		case "Portugal_assembly_of_the_republic":
			loadMap("./res/portugal_constituencies.svg", 16, 0.25, "portugal_constituencies", "proportional", "open", {updateText: false});
			loadPreset('portugal');
			break;
		case "Spain_constituencies":
		case "Spain_congress_of_deputies":
			loadMap("./res/spain_constituencies.svg", 16, 0.25, "spain_constituencies", "proportional", "open", {updateText: false});
			loadPreset('spain');
			break;
		case "Turkey_national_assembly":
			loadMap("./res/turkey_provinces.svg", 16, 0.5, "turkey_national_assembly", "proportional", "open", {updateText: false});
			loadPreset('turkey');
			break;
		case "India_lok_sabha":
			loadMap("./res/india_constituencies.svg", 16, 0.1, "congressional", "presidential", "open", {updateText: false});
			loadPreset('india');
			break;
		case "UnitedKingdom_constituencies":
		case "UnitedKingdom_house_of_commons":
			loadMap("./res/unitedkingdom.svg", 16, 0.075, "congressional", "congressional", "open", {updateText: false});
			loadPreset('uk')
			break;
		case "Ireland_constituencies":
		case "Ireland_dail_eireann":
			loadMap("./res/ireland_constituencies.svg", 16, 0.075, "ireland_constituencies", "proportional", "open", {updateText: false});
			loadPreset('ireland')
			break;
		case "Canada_provinces":
			loadMap("./res/canada_states.svg", 38, 2, "congressional", "presidential", "open", {updateText: false});
			loadPreset('canada')
			break;
		case "Canada_constituencies":
		case "Canada_house_of_commons":
			loadMap("./res/canada_constituencies.svg", 16, 0.1, "congressional", "congressional", "open", {updateText: true});
			loadPreset('canada')
			break;
		case "Australia_constituencies":
		case 'Australia_house_of_representatives':
			loadMap("./res/australia_constituencies.svg", 16, 0.5, "congressional", "congressional", "open", {updateText: false});
			loadPreset('australia')
			break;
		case "Australia_states":
			loadMap("./res/australia.svg", 16, 0.075, "congressional", "presidential", "open", {updateText: false});
			loadPreset('australia')
			break;
		case "Brazil_deputies":
		case 'Brazil_chamber_of_deputies':
			loadMap("./res/brazil_states.svg", 16, 50, "brazil_deputies", "proportional", "open", {updateText: false});
			loadPreset('brazil');
			break;
		case 'Russia_federal_council':
			loadMap('./res/russia_federal_subjects.svg', 16, 0.25, 'russia_federal_council', 'proportional', 'open', {updateText: false});
			loadPreset('russia');
			break;
		case 'Russia_duma':
			loadMap('./res/russia_constituencies.svg', 16, 0.15, 'duma', 'congressional', 'open', {updateText: false});
			loadPreset('russia');
			break;
		case "EuropeanUnion":
			loadMap("./res/eu.svg", 16, 0.25, "eu_parliament", "primary", "open", {updateText: false});
			break;
		case "World":
			loadMap("./res/world.svg", 38, 0.25, "congressional", "congressional", "open", {updateText: false});
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
			loadMap("./res/usa_presidential.svg", 16, 1, "usa_ec", "presidential", "open", {updateText: true, voters: 'usa_voting_pop', enablePopularVote: true});
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

	if(options) {
		enablePopularVote = options.enablePopularVote;
		verifyPopularVote();
		enableCongress = options.enableCongress;
		verifyCongress();
	}

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

	mapOptions.updateText = options.updateText;

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
		setCongressOnHover();
		
		setPalette(cookies['theme']);
		
		if(loadConfig.filename === './res/lte_house.svg') {
			updateLTEHouse();
		}
		
		blockPresets = false;

		if(mode !== 'paint' && mode !== 'move' && mode !== 'paintmove') {
			setMode('paint');
		}

		var finishOptions = function() {
			if(options.onLoad) {
				options.onLoad();
			}

			if(options.voters) {
				for(var stateIndex = 0, length = states.length; stateIndex < length; ++stateIndex) {
					var state = states[stateIndex];
					state.voters = data[options.voters][state.name];
					state.popularVote = {};
					state.popularVote['Tossup'] = state.voters;
				}

				countPopularVote();
			}

			// disable the load screen when the map is finished loading
			var loadScreen = document.getElementById('application-loading');
			setTimeout(function() {
				loadScreen.style.display = 'none';
			}, 350);
		}

		if(type === 'senatorial' && year !== 'open') {
			blockPresets = true;
			loadSenateFile(dataname, finishOptions);
		} else if(type === 'gubernatorial' && year !== 'open') {
			blockPresets = true;
			loadGubernatorialFile(dataname, finishOptions);
		} else {
			mapHTML.style.visibility = 'visible';
			finishOptions();
		}
	});
}

function loadGubernatorialFile(gubernatorialfile, onLoad) {

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

		onLoad();
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

		onLoad();
	});
}

function loadSavedMap_new(data) {
	var obj = JSON.parse(data);	
	loadMap(obj['filename'], obj['fontsize'], obj['strokewidth'], obj['dataid'],
			obj['type'], obj['year'],
	{	updateText: obj['updatetext'],
		onLoad: function() {
		mapOptions.updateText = obj['updatetext'];
		for(var candidateName in obj.candidates) {
			if(candidateName === 'Tossup') {
				continue;
			}
			var candidate = obj.candidates[candidateName];
			addCandidate(candidateName, candidate['solid'], candidate['likely'], candidate['lean'], candidate['tilt']);
		}

		for(var stateName in obj.states) {
			var stateData = obj.states[stateName];
			var state = states.filter(state => state.name === stateName)[0];
			state.setVoteCount(stateData['votecount'], obj['updatetext']);
			state.setColor(stateData['candidate'], stateData['colorvalue']);
			state.delegates = stateData['delegates'];
			//if(obj['type'] !== 'gubernatorial' &&
			//	obj['type'] !== 'senatorial') {
				if(stateData['disabled']) {
					state.toggleDisable();
				}
			//}
		}

		console.log(obj);
		for(var stateName in obj.proportional) {
			var stateData = obj.proportional[stateName];
			var state = proportionalStates.filter(state => state.name === stateName)[0];
			state.setVoteCount(stateData['votecount'], obj['updatetext']);
			state.setColor(stateData['candidate'], stateData['colorvalue']);
			state.delegates = stateData['delegates'];
			if(stateData['disabled']) { 
				state.toggleDisable();
			}
		}

		countVotes();
		updateLegend();
		updateChart();
		updateLegend();

		var mapHTML = document.getElementById('map-div');
		mapHTML.style.visibility = 'visible';
		
		gtag('event', 'load', {
			'event_category': 'load_map',
			'event_label': 'loaded saved map new version ' + currentCache,
			'non_interaction': true
		});
	}});
}

function loadSavedMap_old(data, options) {
	var lines = data.split('\n');
	var meta = lines[0].split(' ');
	if(options) {
		enableCongress = options.enableCongress;
	} else {
		enableCongress = false;
	}
	
	loadMap(meta[0], meta[1], meta[2], meta[3], meta[4], meta[5], {enableCongress: enableCongress,
		onLoad: function() {
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
			mapOptions.updateText = updateText;

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
		
		gtag('event', 'load', {
			'event_category': 'load_map',
			'event_label': 'loaded saved map old version ' + currentCache,
			'non_interaction': true
		});
	}
		,
		updateText: meta[7]
	});
}

function loadFileMap() {
	var file = document.getElementById('loadfile').files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(loadEvent) {
		var a = loadEvent.target.result;
		try {
			loadSavedMap_new(a);
		} catch(e) {
			console.log('New file load failed, attempting old');
			loadSavedMap_old(a);
		}
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
