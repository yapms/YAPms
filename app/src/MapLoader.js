var enableCongress = false;
var enableCongressContested = false;

class MapLoader {
	static loadPresetMap(preset, options) {
		CandidateManager.initCandidates();

		var enableHouse = false;

		if(options) {
			enableHouse = options.enableCongress;
		}

		if(preset === 'usa/USA_2020_house_cook') {
			enableCongressContested = true;
			enableHouse = true;
		}

		$.ajax({
			url: "./res/presets/" + preset,
			type: "GET",
			processData: false,
			contentType: false,
			success: function(a, b, c) {
				console.log("Found preset map...");
				MapLoader.loadSavedMap(a, {enableCongress: enableHouse});
			},
			error: function(a, b, c) {
				console.log("Did not find preset map...");
				MapLoader.loadMap("../res/usa_presidential.svg", 16, 1, "usa_ec", "presidential", "open");
			}
		});
	}

	static loadMapFromURL(URL) {
		console.log('Map Loader: ' + URL);
		$.ajax({
			url: URL,
			type: "POST",
			success: function(data) {
				PresetLoader.loadPreset('none');
				console.log("Map Load: Found saved map");
				console.log('Map Loader: Attemping new file load');
				MapLoader.loadSavedMap(data);
			},
			error: function() {
				console.log("Map Loader: Did not find saved map");
				MapLoader.loadMap('./res/usa_presidential.svg', 16, 1, 'usa_ec',"presidential", "open");

				var notification = document.getElementById('notification');
				var message = notification.querySelector('#notification-message');
				var title = notification.querySelector('#notification-title');
				title.innerHTML = 'Sorry';
				message.innerHTML = 'The map you are looking for does not exist.<br><br>This feature is still in development and it may have been deleted.';
				notification.style.display = 'inline';
			}
		});
	}

	// Load map based off of php t parameter
	static loadMapFromId(id) {
		switch(id) {
			case "USA_current_house":
				PresetLoader.loadPreset('none');
				MapLoader.loadPresetMap('usa/' + id, {enableCongress: true});
				break;
			case "UnitedKingdom_current_parliament":
				PresetLoader.loadPreset('none');
				MapLoader.loadPresetMap('ukd/' + id);
				break;
			case "USA_current_senate":
			case "USA_2024_projection":
			case "USA_2020_cook":
			case "USA_2020_inside":
			case "USA_2020_sabatos":
			case "USA_2020_house_cook":
			case "USA_2016_presidential":
			case "USA_2016_presidential_county":
			case "USA_2016_democratic_primary":
			case "USA_2016_republican_primary":
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
			case "USA_1789_presidential":
			case "USA_1792_presidential":
			case "USA_1796_presidential":
			case "USA_1800_presidential":
			case "USA_1804_presidential":
			case "USA_1808_presidential":
			case "USA_1812_presidential":
			case "USA_1816_presidential":
			case "USA_1820_presidential":
			case "USA_1824_presidential":
			case "USA_1828_presidential":
			case "USA_1832_presidential":
			case "USA_1836_presidential":
			case "USA_1840_presidential":
			case "USA_1844_presidential":
			case "USA_1848_presidential":
			case "USA_1852_presidential":
			case "USA_1856_presidential":
			case "USA_1860_presidential":
				PresetLoader.loadPreset('none');
				MapLoader.loadPresetMap('usa/' + id);
				break;
			case "USA_trump_impeachment_support":
				PresetLoader.loadPreset('none');
				MapLoader.loadPresetMap('usa/' + id, {enableCongress: true});
				break;
			case "Canada_2019_house_of_commons":
				PresetLoader.loadPreset('none');
				MapLoader.loadPresetMap('can/' + id);
				break;
			case "Alabama_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/alabama/2020_house.svg", 16, 0.15, "1", "takeall_noedit", "open");
				break;
			case "Alaska_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/alaska/2020_house.svg", 16, 0.02, "1", "takeall_noedit", "open");
				break;
			case "Arkansas_2020_state_upper":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/arkansas/2020_upper.svg", 16, 4.5, "1", "takeall_noedit", "open");
				break;
			case "Arkansas_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/arkansas/2020_house.svg", 16, 150, "1", "takeall_noedit", "open");
				break;
			case "California_2020_state_upper":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/california/2020_upper.svg", 16, 0.25, "1", "takeall_noedit", "open");
				break;
			case "California_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/california/2020_house.svg", 16, 0.1, "1", "takeall_noedit", "open");
				break;
			case "Colorado_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/colorado/2020_house.svg", 16, 0.15, "1", "takeall_noedit", "open");
				break;
			case "Connecticut_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/connecticut/2020_house.svg", 16, 0.5, "1", "takeall_noedit", "open");
				break;
			case "Florida_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/florida/2020_house.svg", 16, 0.25, "1", "takeall_noedit", "open");
				break;
			case "Hawaii_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/hawaii/2020_house.svg", 16, 0.2, "1", "takeall_noedit", "open");
				break;
			case "Idaho_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/idaho/2020_house.svg", 16, 0.2, "2", "proportional", "open");
				break;
			case "Iowa_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/iowa/2020_house.svg", 16, 0.2, "1", "takeall_noedit", "open");
				break;
			case "Michigan_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/michigan/2020_house.svg", 16, 0.2, "1", "takeall_noedit", "open");
				break;
			case "Minnesota_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/minnesota/2020_house.svg", 16, 0.5, "1", "takeall_noedit", "open");
				break;
			case "NewJersey_2020_state_upper":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/newjersey/2020_house.svg", 16, 0.1, "1", "takeall_noedit", "open");
				break;
			case "NewJersey_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/newjersey/2020_house.svg", 16, 0.1, "2", "proportional", "open");
				break;
			case "NewMexico_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/newmexico/2020_house.svg", 16, 0.1, "1", "takeall_noedit", "open");
				break;
			case "NorthDakota_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/northdakota/2020_house.svg", 16, 0.1, "2", "proportional", "open");
				break;
			case "Oregon_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/oregon/2020_house.svg", 16, 0.1, "1", "takeall_noedit", "open");
				break;
			case "Pennsylvania_2020_state_upper":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/pennsylvania/2020_upper.svg", 16, 0.5, "1", "takeall_noedit", "open");
				break;
			case "Pennsylvania_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/pennsylvania/2020_house.svg", 16, 0.25, "1", "takeall_noedit", "open");
				break;
			case "SouthDakota_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/southdakota/2020_house.svg", 16, 1, "1", "takeall_noedit", "open");
				break;
			case "Texas_2020_state_upper":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/texas/2020_upper.svg", 16, 0.75, "1", "takeall_noedit", "open");
				break;
			case "Texas_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/texas/2020_house.svg", 16, 0.5, "1", "takeall_noedit", "open");
				break;
			case "Washington_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/washington/2020_house.svg", 16, 0.15, "2", "proportional", "open");
				break;
			case "Wisconsin_2020_state_lower":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/wisconsin/2020_house.svg", 16, 0.5, "1", "takeall_noedit", "open");
				break;
			case "USA_presidential_territories":
				PresetLoader.loadPreset("classic");
				MapLoader.loadMap("./res/usa/usa_presidential_territories.svg", 16, 0.75, "usa_territories_ec", "takeall", "open");
				break;
			case "USA_2020_presidential":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa_presidential.svg", 16, 0.75, "usa_ec", "takeall", "open", {voters: 'usa_voting_pop', enablePopularVote: true});
				break;
			case "USA_split_maine":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa_1972_presidential.svg", 16, 0.75, "usa_1972_ec", "takeall", "open");
				break;
			case "USA_2020_senate":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa_senate.svg", 16, 1, "1", "senatorial", "2020");
				break;
			case "USA_2020_governors":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa_gubernatorial.svg", 16, 0.75, "1", "gubernatorial", "2020");
				break;
			case "USA_2020_democratic_primary":
				PresetLoader.loadPreset('democratic primary');
				MapLoader.loadMap("./res/usa_dem_primary.svg", 16, 0.75, "dem_primary", "proportional", "open");
				break;
			case "USA_2020_republican_primary":
				PresetLoader.loadPreset('republican primary');
				MapLoader.loadMap("./res/usa_rep_primary.svg", 16, 0.75, "rep_primary", "proportional", "open");
				break;
			case "USA_county":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa_county.svg", 16, 0.075, "1", "takeall_noedit", "open");
				break;
			case "USA_2020_house":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa/house/12-2-2019-house.svg", 16, 0.075, "1", "takeall_noedit", "open", {enableCongress: true, enableEraser: true});
				break;
			case "USA_2008_house":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa_congressional_2008.svg", 16, 0.005, "1", "takeall_noedit", "open");
				break;
			case "USA_governors":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa_gubernatorial.svg", 16, 0.75, "1", "gubernatorial", "open");
				break;
			case "USA_senate":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa_senate.svg", 16, 0.75, "1", "senatorial", "open");
				break;
			case "USA_takeall":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa_no_districts.svg", 16, 0.75, "usa_no_districts_ec", "takeall", "open");
				break;
			case "USA_proportional":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa_no_districts.svg", 16, 0.75, "usa_no_districts_ec", "proportional", "open");
				break;
			case "USA_pre_civilwar":
				MapLoader.loadMap("./res/usa_pre_civilwar.svg", 16, 0.75, "usa_pre_civilwar_ec", "presidential", "open");
				break;
			case "Pakistan_national_assembly":
				PresetLoader.loadPreset('pakistan');
				MapLoader.loadMap("./res/pak/pakistan_constituencies.svg", 16, 0.02, "1", "takeall_noedit", "open");
				break;
			case "Argentina_chamber_of_deputies":
				PresetLoader.loadPreset('argentina');
				MapLoader.loadMap("./res/arg/argentina_provinces_buenos.svg", 16, 0.75, "argentina_chamber_of_deputies", "proportional", "open");
				break;
			case "India_2019_lok_sabha":
				PresetLoader.loadPreset('none');
				MapLoader.loadPresetMap('ind/' + id);
				break;
			case "USA_Canada":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa_canada.svg", 16, 0.01, "1", "takeall", "open");
				break;
			case "Germany_states":
				PresetLoader.loadPreset('germany')
				MapLoader.loadMap("./res/germany.svg", 16, 1, "1", "takeall", "open");
				break;
			case "Germany_bundestag":
				PresetLoader.loadPreset('germany')
				MapLoader.loadMap("./res/germany_constituencies.svg", 16, 0.25, "1", "takeall_noedit", "open");
				break;
			case "France_national_assembly":
				PresetLoader.loadPreset('france')
				MapLoader.loadMap("./res/france_constituencies.svg", 16, 0.25, "1", "takeall_noedit", "open");
				break;
			case "Netherlands_provinces":
				PresetLoader.loadPreset('netherlands');
				MapLoader.loadMap("./res/netherlands_provinces.svg", 16, 0.15, "netherlands_provinces", "proportional", "open");
				break;
			case "Netherlands_gemeenten":
				PresetLoader.loadPreset('netherlands');
				MapLoader.loadMap("./res/netherlands_gemeenten.svg", 16, 0.15, "1", "takeall_noedit", "open");
				break;
			case "Italy_states":
				PresetLoader.loadPreset('italy')
				MapLoader.loadMap("./res/italy.svg", 16, 1, "1", "takeall_noedit", "open");
				break;
			case "Portugal_assembly_of_the_republic":
				PresetLoader.loadPreset('portugal');
				MapLoader.loadMap("./res/portugal_constituencies.svg", 16, 0.25, "portugal_constituencies", "proportional", "open");
				break;
			case "Poland":
				PresetLoader.loadPreset('portugal');
				MapLoader.loadMap("./res/pol/poland_senate.svg", 16, 0.25, "1", "takeall_noedit", "open");
				break;
			case "Spain_congress_of_deputies":
				PresetLoader.loadPreset('spain');
				MapLoader.loadMap("./res/spain_constituencies.svg", 16, 0.25, "spain_constituencies", "proportional", "open");
				break;
			case "Sweden_riksdag":
				PresetLoader.loadPreset('sweden');
				MapLoader.loadMap("./res/swe/sweden_districts.svg", 25, 0.25, "sweden_riksdag", "proportional", "open");
				break;
			case "Turkey_national_assembly":
				PresetLoader.loadPreset('turkey');
				MapLoader.loadMap("./res/turkey_provinces.svg", 16, 0.5, "turkey_national_assembly", "proportional", "open");
				break;
			case "India_lok_sabha":
				PresetLoader.loadPreset('india');
				MapLoader.loadMap("./res/india_constituencies.svg", 16, 0.1, "1", "takeall_noedit", "open");
				break;
			case "SouthAfrica_national_assembly":
				PresetLoader.loadPreset('southafrica');
				MapLoader.loadMap("./res/zaf/south_africa_provinces.svg", 25, 0.25, "south_africa_national_assembly", "proportional", "open");
				break;
			case "UnitedKingdom_house_of_commons":
				PresetLoader.loadPreset('uk')
				MapLoader.loadMap("./res/unitedkingdom.svg", 16, 0.075, "1", "takeall_noedit", "open");
				break;
			case "UnitedKingdom_historic_counties":
				PresetLoader.loadPreset('uk')
				MapLoader.loadMap("./res/ukd/unitedkingdom_historic_counties.svg", 16, 0.4, "1", "takeall", "open");
				break;
			case "Ukraine":
				PresetLoader.loadPreset('uk')
				MapLoader.loadMap("./res/ukr/ukraine.svg", 16, 0.1, "1", "takeall_noedit", "open");
				break;
			case "Ireland_dail_eireann":
				PresetLoader.loadPreset('ireland')
				MapLoader.loadMap("./res/ireland_constituencies.svg", 16, 0.075, "ireland_constituencies", "proportional", "open");
				break;
			case "Canada_provinces":
				PresetLoader.loadPreset('canada')
				MapLoader.loadMap("./res/canada_states.svg", 38, 2, "1", "takeall", "open");
				break;
			case "Canada_house_of_commons":
				PresetLoader.loadPreset('canada')
				MapLoader.loadMap("./res/canada_constituencies.svg", 16, 0.1, "1", "takeall_noedit", "open");
				break;
			case 'Australia_house_of_representatives':
				PresetLoader.loadPreset('australia')
				MapLoader.loadMap("./res/australia_constituencies.svg", 16, 0.5, "1", "takeall_noedit", "open");
				break;
			case "Australia_states":
				PresetLoader.loadPreset('australia')
				MapLoader.loadMap("./res/australia.svg", 16, 0.075, "1", "takeall", "open");
				break;
			case 'Brazil_chamber_of_deputies':
				PresetLoader.loadPreset('brazil');
				MapLoader.loadMap("./res/brazil_states.svg", 16, 50, "brazil_deputies", "proportional", "open");
				break;
			case 'Brazil_federal_senate':
				PresetLoader.loadPreset('brazil');
				MapLoader.loadMap('./res/brazil_states.svg', 16, 50, "3", "proportional", "open");
				break;
			case 'Russia_federal_council':
				PresetLoader.loadPreset('russia');
				MapLoader.loadMap('./res/russia_federal_subjects.svg', 16, 0.25, '2', 'proportional', 'open');
				break;
			case 'Russia_duma':
				PresetLoader.loadPreset('russia');
				MapLoader.loadMap('./res/russia_constituencies.svg', 16, 0.15, 'duma', 'takeall_noedit', 'open');
				break;
			case "Trinidad_Tobago_house_of_representatives":
				PresetLoader.loadPreset('trinidad_tobago');
				MapLoader.loadMap("./res/trinidad_tobago_house_of_representatives.svg", 16, 0.25, "1", "takeall_noedit", "open");
				break;
			case "Switzerland_national_council":
				PresetLoader.loadPreset('switzerland');
				MapLoader.loadMap("./res/che/switzerland_cantons.svg", 16, 0.25, "switzerland_national_council", "proportional", "open");
				break;
			case "Switzerland_council_of_states":
				PresetLoader.loadPreset('switzerland');
				MapLoader.loadMap("./res/che/switzerland_cantons.svg", 16, 0.25, "switzerland_council_of_states", "proportional", "open");
				break;
			case "EuropeanUnion":
				PresetLoader.loadPreset('eu');
				MapLoader.loadMap("./res/eu.svg", 16, 0.25, "eu_parliament", "proportional", "open");
				break;
			case "World":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/world.svg", 38, 0.25, "1", "takeall", "open");
				break;
			case "LTE_presidential":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/lte_president.svg", 30, 1, "lte_ec", "takeall_noedit", "open");
				break;
			case "LTE_senatorial":
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/lte_senate.svg", 35, 1, "1", "takeall_noedit", "open");
				break;
			default:
				PresetLoader.loadPreset('classic');
				MapLoader.loadMap("./res/usa_presidential.svg", 16, 1, "usa_ec", "takeall", "open", {voters: 'usa_voting_pop', enablePopularVote: true});
				break;
		}
	}

	// loads the svg element into the HTML
	static loadMap(filename, fontsize, strokewidth, dataid, type, year, options) {

		// if the svg is already loaded dont load another
		if(MapLoader.save_filename === filename &&
			MapLoader.save_dataid === dataid &&
			MapLoader.save_type === type &&
			MapLoader.save_year === year &&
			MapLoader.save_fontsize === fontsize &&
			MapLoader.save_strokewidth === strokewidth) {
			if(options && options.onLoad) {
				options.onLoad();
			}

			if(options && options.clear && options.clear === true) {

			} else {
				return;
			}
		}

		setMode("paint");

		if(year !== "open") {
			var ecEditButton = document.getElementById("modebutton-ec");
			if(ecEditButton) {
				ecEditButton.style.display = "none";
			}
			var disableButton = document.getElementById("modebutton-delete");
			if(disableButton) {
				disableButton.style.display = "none";
			}
		}

		if(type === "takeall_noedit") {
			var ecEditButton = document.getElementById("modebutton-ec");
			if(ecEditButton) {
				ecEditButton.style.display = "none";
			}
			setMode('fill');	
		}

		if(type === "takeall_noedit" || type === "takeall" ||
			type === "senatorial" || type === "gubernatorial") {
			var paint = document.getElementById("modebutton-paint");
			if(paint) {
				paint.style.display = "none";
			}
			setMode('fill');	
		}

		MapLoader.save_filename = filename;
		MapLoader.save_dataid = dataid;
		MapLoader.save_type = type;
		MapLoader.save_year = year;
		MapLoader.save_fontsize = fontsize;
		MapLoader.save_strokewidth = strokewidth;

		if(options) {
			if(options.enablePopularVote) {
				PopularVote.showPopularVoteButton();
			}
			enableCongress = options.enableCongress;
			verifyCongress();
		}

		var mapHTML = document.getElementById('map-div');
		mapHTML.style.visibility = 'hidden';

		totalVotes = 0;

		/* TURNING OFF LABELS BREAKS THE LEANS ON THE GRAPH */
		strokeMultiplier = strokewidth;
		var dataname = './data/' + type + '_' + year;

		console.log('Loading ' + filename);
		$('#map-div').load(filename, function(a) {
			console.log('Done loading ' + filename);
			MapLoader.onLoadSVG();
		
			if(mobile === true) {
				InputManager.enableInputMobile();
			} else if(mobile === false) {
				InputManager.enableInputDesktop();
			}

			MapManager.centerMap();
			onResize();

			var textHTML = document.getElementById('text');
			if(textHTML !== null) {
				// convert font size to string with px
				textHTML.style.fontSize = '' + fontsize + 'px';
			}
		
			MapLoader.initData(dataid);

			countVotes();
			ChartManager.updateChart();
			LegendManager.updateLegend();
			setCongressOnHover();
			
			setPalette(CookieManager.cookies['theme']);

			var finishOptions = function() {
				if(options && options.onLoad) {
					options.onLoad();
				}

				setCongressContested();
				showShortcuts();

				if(options && options.voters) {
					for(var stateIndex = 0, length = states.length; stateIndex < length; ++stateIndex) {
						var state = states[stateIndex];
						state.voters = data[options.voters][state.name];
						state.popularVote = {};
						state.popularVote['Tossup'] = state.voters;
					}

					PopularVote.count();
				}

				// disable the load screen when the map is finished loading
				var loadScreen = document.getElementById('application-loading');

				setTimeout(function() {
					loadScreen.style.display = 'none';
				}, 200);
			}

			if(type === 'senatorial' && year !== 'open') {
				MapLoader.loadSenateFile(dataname, finishOptions);
			} else if(type === 'gubernatorial' && year !== 'open') {
				MapLoader.loadGubernatorialFile(dataname, finishOptions);
			} else {
				mapHTML.style.visibility = 'visible';
				finishOptions();
			}
		});
	}

	static onLoadSVG() {
		ifInIframe();
	}

	static loadGubernatorialFile(gubernatorialfile, onLoad) {
		CandidateManager.initCandidates();
		
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
						CandidateManager.candidates[split[1]] = candidate;
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
			ChartManager.updateChart();
			LegendManager.updateLegend();

			var mapHTML = document.getElementById('map-div');
			mapHTML.style.visibility = 'visible';

			onLoad();
		});
	}

	static loadSenateFile(senatefile, onLoad) {
		CandidateManager.initCandidates();

		var candidateNames = {};

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
						CandidateManager.candidates[split[1]] = candidate;
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
			ChartManager.updateChart();
			LegendManager.updateLegend();

			var mapHTML = document.getElementById('map-div');
			mapHTML.style.visibility = 'visible';

			onLoad();
		});
	}

	static loadSavedMap(data, options) {
		var obj = JSON.parse(data);	

		if(options) {
			enableCongress = options.enableCongress;
		} else {
			enableCongress = false;
		}

		MapLoader.loadMap(obj['filename'], obj['fontsize'], obj['strokewidth'], obj['dataid'],
				obj['type'], obj['year'],
		{	
			enableCongress: enableCongress,
			onLoad: function() {
			for(var candidateName in obj.candidates) {
				if(candidateName === 'Tossup') {
					continue;
				}
				var candidate = obj.candidates[candidateName];
				CandidateManager.addCandidate(candidateName, candidate['solid'], candidate['likely'], candidate['lean'], candidate['tilt']);
			}

			for(var stateName in obj.states) {
				var stateData = obj.states[stateName];
				var state = states.filter(state => state.name === stateName)[0];
				var voteCount = 0;
				var maxCandidateName = 'Tossup';
				var maxCandidateCount = 0;
				for(var key in stateData['delegates']) {
					var count = stateData['delegates'][key];
					voteCount += count;
					if(count > maxCandidateCount) {
						maxCandidateName = key;
						maxCandidateCount = count;
					} else if(count === maxCandidateCount) {
						maxCandidateName = 'Tossup';
					}
				}
				
				state.setVoteCount(voteCount);
				if(maxCandidateName === 'Tossup') {
					state.setColor(maxCandidateName, 2);
				} else {
					state.setColor(maxCandidateName, stateData['colorvalue']);
				}
			
				if(stateData['candidate']) {
					state.setColor(stateData['candidate'], stateData['colorvalue']);
					if(obj['type'] === "proportional") {
						state.delegates = stateData['delegates'];
					}
				} else {
					state.delegates = stateData['delegates'];
				}
	
				state.simulator = stateData['simulator'];
				if(stateData['disabled']) {
					state.toggleDisable();
				}
			}

			for(var stateName in obj.proportional) {
				var stateData = obj.proportional[stateName];
				var state = proportionalStates.filter(state => state.name === stateName)[0];
				var voteCount = 0;
				var maxCandidateName = 'Tossup';
				var maxCandidateCount = 0;
				for(var key in stateData['delegates']) {
					var count = stateData['delegates'][key];
					voteCount += count;
					if(count > maxCandidateCount) {
						maxCandidateName = key;
						maxCandidateCount = count;
					} else if(count === maxCandidateCount) {
						maxCandidateName = 'Tossup';
					}
				}

				state.setVoteCount(voteCount);
				if(maxCandidateName === 'Tossup') {
					state.setColor(maxCandidateName, 2);
				} else {
					state.setColor(maxCandidateName, stateData['colorvalue']);
				}

				state.simulator = stateData['simulator'];
				state.delegates = stateData['delegates'];
				if(stateData['disabled']) { 
					state.toggleDisable();
				}
			}

			countVotes();
			ChartManager.updateChart();
			LegendManager.updateLegend();

			var mapHTML = document.getElementById('map-div');
			mapHTML.style.visibility = 'visible';
		}});
	}

	static loadFileMap() {
		var file = document.getElementById('loadfile').files[0];
		var fileReader = new FileReader();
		fileReader.onload = function(loadEvent) {
			var a = loadEvent.target.result;
			MapLoader.loadSavedMap(a);
			closeAllPopups();
		}
		fileReader.readAsText(file, 'UTF-8');
	}

	// reads through the SVG and sets up states and buttons
	static initData(dataid) {
		// clear any previously loaded data
		states = [];
		buttons = [];
		lands = [];

		// get list of all html state elements
		var htmlElements = document.getElementById('outlines').children;

		// iterate over each element
		for(var index = 0, length = htmlElements.length; index < length; ++index) {
			var htmlElement = htmlElements[index];
			htmlElement.setAttribute('style', 'inherit');
			htmlElement.setAttribute('cursor', 'pointer');
			var name = htmlElement.getAttribute('id');
			if(name === null || name.includes('*lines*') || name.includes("*ignore*") ||
				name.includes("_ignore_") || name.includes('othertext') || name === 'text') {
				// do nothing with it paths that
				// have these ids
			} else if(name.includes('-button')) {
				// don't include buttons as states
				htmlElement.onclick = function() {
					buttonClick(this);
				}
				htmlElement.setAttribute('onmouseover', 
				'if(KeyboardManager.keyStates[70]){buttonClick(this, {setSolid: true});}');
				buttons.push(htmlElement);
			} else if(name.includes('-land')) {
				htmlElement.onclick = function() {
					landClick(this);
				}
				htmlElement.setAttribute('onmouseover', 
				'if(KeyboardManager.keyStates[70]){landClick(this, {setSolid: true});}');
				lands.push(htmlElement);
			} else {
				htmlElement.onclick = function() {
					stateClick(this);
				}
				states.push(new State(name, htmlElement, dataid));
				var stateIndex = states.length - 1;
				htmlElement.setAttribute('onmouseover', 
				"if(KeyboardManager.keyStates[70]){stateClick(this, {setSolid: true});}");
			}
		}

		var proportional = document.getElementById('proportional');
		if(proportional) {
			var proportionalElements = proportional.children;
			for(var index = 0, length = proportionalElements.length; index < length; ++index) {
				var element = proportionalElements[index];
				element.setAttribute('cursor', 'pointer');
				element.setAttribute('style', 'inherit');
				var name = element.getAttribute('id');
				var state = new State(name, element, dataid);
				proportionalStates.push(state);
				element.onclick = (function() {
					var ref_index = proportionalStates.length - 1;	
					return function() {	
						stateClickPaint(proportionalStates[ref_index], {forceProportional: true});
					}
				})();
			}
		}
	}

	// sets all states to white
	static clearMap() {
		MapLoader.loadMap(MapLoader.save_filename, MapLoader.save_fontsize, MapLoader.save_strokewidth, MapLoader.save_dataid, MapLoader.save_type, MapLoader.save_year, {clear: true});
		MapManager.setLockMap(false);
	}

	static clearMapCandidates() {
		for(var index = 0; index < states.length; ++index) {
			var state = states[index];
			state.setColor("Tossup", 2);
			state.resetDelegates();
		}

		for(var index = 0; index < proportionalStates.length; ++index) {
			var state = proportionalStates[index];
			state.setColor("Tossup", 2);
			state.resetDelegates();
		}
	}
}

MapLoader.save_filename = "";
MapLoader.save_dataid = "";
MapLoader.save_type = "";
MapLoader.save_year = "";
MapLoader.save_fontsize = "";
MapLoader.save_strokewidth = "";
