var currentCache = 'v1.12.8';

var states = [];
var lands = [];
var buttons = [];
var proportionalStates = [];

// paint data
var paintIndex = 'Tossup';
var maxColorValue = 2;

var mode = 'paint';

var maxColorValues = 4;

var mapOptions = {
}

var strokeMultiplier = 1;

var previousPalette = function() {
	toWinPalette();	
};

function share(autoCenter) {
	closeAllPopups();
	if(typeof grecaptcha !== 'undefined') {
		console.log('reCaptcha detected');
	} else {
		console.log('reCaptcha not detected');
		CookieManager.askConsent();
		return;
	}
	
	displayMenu('sharemenu');
	
	if(autoCenter) {
		MapManager.centerMap();
		setTimeout(share_afterCenter, 200);
	} else {
		share_afterCenter();
	}
}

function share_afterCenter() {
	// disable button to prevent spam
	var button = document.getElementById('share-button');
	if(button) {
		button.disabled = true;
		button.style.opacity = '0.5';
		setTimeout(function() {
			button.disabled = false;
			button.style.opacity = '1';
		}, 3000);
	}

	html2canvas(document.getElementById('application'), {/*width: 1200, height: 630,*/ logging: false, onclone: function(clone) {
/*
		console.log(clone);
		clone.getElementById('application').style.maxWidth = '1200px';
		clone.getElementById('application').style.width = '1200px';
		clone.getElementById('application').style.minWidth = '1200px';
		clone.getElementById('application').style.maxHeight = '630px';
		clone.getElementById('application').style.height = '630px';
		clone.getElementById('application').style.minHeight = '630px';
*/ 

		// remove the custom fonts from the clone
		var svgtext = clone.getElementById('text');
		if(svgtext) {
			svgtext.style.fontFamily = 'arial';
			svgtext.style.fontSize = '15px';
		}

		var svg = clone.getElementById("svgdata");
		var mapdiv = clone.getElementById('map-div');
		if(svg && mapdiv) {
/*
			var view = svg.firstChild;
			while(view.firstChild) {
				view.parentNode.insertBefore(view.firstChild, view);
			}
			view.parentNode.removeChild(view);
*/

			var width = mapdiv.offsetWidth + (mapdiv.offsetWidth * 0);
			var height = mapdiv.offsetHeight + (mapdiv.offsetHeight * 0);
			svg.setAttribute('width', width);
			svg.setAttribute('height', height);
/*
			svg.setAttribute('viewBox', -width * 0.35 + ' ' + 0 + ' ' + width * 1.35 + ' ' + height);
			console.log(svg);
			var pan = svgPanZoom(svg, {
				fit: true,
				center: true,
				contain: false,
				panEnabled: true,
				zoomEnabled: true,
				dblClickZoomEnabled: false,
				maxZoom: 100,
				zoomScaleSensitivity: 0.1
			});
*/
		}
		var notification = clone.getElementById('legend-tooltip');
		if(notification) {
			notification.style.display = 'none';
		}
		var editButtons = clone.getElementsByClassName('legend-delete');
		for(var index = 0, length = editButtons.length; index < length; ++index) {
			var element = editButtons[index];
			if(element) {
				element.style.display = 'none';
			}
		}
		var addCandidate = clone.getElementById('legend-addcandidate-button');
		if(addCandidate) {
			addCandidate.style.display = 'none';
		}
	}}).then(function(canvas) {
		notification.appendChild(canvas);
		canvas.style.width = 0;
		canvas.style.height = 0;	
		canvas.style.display = 'none';
		var img = canvas.toDataURL('image/png');
		notification.removeChild(canvas);
		var i = document.getElementById('screenshotimg');
		i.src = img;
		i.style.width = '40vw';
		i.style.height = 'auto';
		//i.style.display = '';
		if(grecaptcha)
		grecaptcha.execute('6LeDYbEUAAAAANfuJ4FxWVjoxPgDPsFGsdTLr1Jo', {action: 'share'})
		.then(function(token) {
			saveMap_new(img, token);
		});
	});
}

/* CATCH ERRORS AND LOG THEM */
window.onerror = function(message, source, lineno, colno, error) {
	if(message.includes('a[b].target.className.indexOf') ||
		message.includes('Script error.')) {
		return;
	}
	
	gtag('event', currentCache, {
		'event_category': 'Error',
		'event_label': message + ', ' + source + ', ' + lineno + ', ' + currentCache,
		'non_interaction': true
	});
}

function setMode(set) {
	console.log('mode ' +  mode + ' | set ' + set + 
		' | mapType ' + MapLoader.save_type + ' | mapYear ' + MapLoader.save_year);

	LogoManager.loadButtons();

	console.log('allowed');

	mode = set;

	var modeHTML = document.getElementById('modesbutton');
	var modeText;
	var notificationText;

	var modeButtons = document.getElementsByClassName('mode-button');
	for(var index = 0; index < modeButtons.length; ++index) {
		var button = modeButtons[index];
		if(button) {
			button.style.opacity = '1';
		}
	}

	if(set === 'paint') {
		modeText = '<i class="fas fa-paint-brush"></i> paint';
		var button = document.getElementById('modebutton-paint');
		button.style.opacity = '0.5';
	} else if(set === 'ec') {
		modeText = '<i class="fas fa-edit"></i> Delegate Edit';
		notificationText = "Click on a state to set its delegate total";
		var button = document.getElementById('modebutton-ec');
		button.style.opacity = '0.5';
	} else if(set === 'delete') {
		modeText = '<i class="fas fa-eraser"></i> Disable';
		notificationText = "Click on a state to disable/enable it";
		var button = document.getElementById('modebutton-delete');
		button.style.opacity = '0.5';
	} else if(set === 'fill') {
		var button = document.getElementById('modebutton-fill');
		button.style.opacity = '0.5';
	}

/*
	var notification = document.getElementById('notification');
	if(mode === 'paint' || mode === 'fill' || mode === 'delete' || mode === 'edit') {
		var notification = document.getElementById('notification');
		notification.style.display = 'none';
	} else {
		var notification = document.getElementById('notification');
		var message = notification.querySelector('#notification-message');
		var title = notification.querySelector('#notification-title');
		notification.style.display = 'inline';
		title.innerHTML = modeText;
		message.innerHTML = notificationText;
	}
*/
}

// if paint index is invalid, change it to tossup
function verifyPaintIndex() {
	if(typeof CandidateManager.candidates[paintIndex] === 'undefined') {
		paintIndex = 'Tossup';
	}
}

// iterate over each state and delegate votes to the candidate
function countVotes() {
	var mid = document.getElementById("battlechartmid");
	if(mid) {
		mid.setAttribute("fill", CandidateManager.TOSSUP.colors[2]);
	}

	for(var key in CandidateManager.candidates) {
		var candidate = CandidateManager.candidates[key];
		candidate.voteCount = 0;
		candidate.probVoteCounts = [0,0,0,0];
		for(var stateIndex = 0, length = states.length; stateIndex < length; ++stateIndex) {
			var state = states[stateIndex];
			if(typeof state.delegates === 'undefined') {
				state.delegates = {};
			}
			if(typeof state.delegates[key] === 'undefined') {
				state.delegates[key] = 0;
			}

			candidate.voteCount += state.delegates[key];
			if(state.candidate === "Tossup" && key !== "Tossup") {
				candidate.probVoteCounts[0] += state.delegates[key];
			} else {
				candidate.probVoteCounts[state.colorValue] += state.delegates[key];
			}
		}

		for(var stateIndex = 0, length = proportionalStates.length; stateIndex < length; ++stateIndex) {
			var state = proportionalStates[stateIndex];
			if(typeof state.delegates === 'undefined') {
				state.delegates = {};
			}
			if(typeof state.delegates[key] === 'undefined') {
				state.delegates[key] = 0;
				if(key === 'Tossup') {
					state.delegates[key] = state.voteCount;
				}
			}
			
			candidate.voteCount += state.delegates[key];
			if(state.candidate === "Tossup" && key !== "Tossup") {
				candidate.probVoteCounts[0] += state.delegates[key];
			} else {
				candidate.probVoteCounts[state.colorValue] += state.delegates[key];
			}
		}
		if(mid) {
			if(candidate.voteCount > Math.ceil(totalVotes / 2)) {
				if(key === 'Tossup') {
					mid.setAttribute("fill",candidate.colors[2]);
				} else {
					mid.setAttribute("fill", candidate.colors[0]);
				}
			}
		}
	}
}

function onResize() {
	MapManager.centerMap();

	// make sure the height is maxed out if the chart is on the bottom	
	if(ChartManager.chartPosition === 'bottom') {
		var sidebarhtml = document.getElementById('chart-div');
		var charthtml = document.getElementById('chart');
		charthtml.style.height = 'auto';
		charthtml.style.width = '' + (sidebarhtml.offsetHeight - 5) + 'px';
	} else {
		var sidebarhtml = document.getElementById('chart-div');
		var charthtml = document.getElementById('chart');
		charthtml.style.height = 'auto';
		charthtml.style.width = '100%';

	}
}

function setChangeCandidate(oldCandidate, newCandidate) {
	for(var stateIndex = 0, length = states.length; stateIndex < length; ++stateIndex) {
		var state = states[stateIndex];

		if(state.candidate === oldCandidate) {
			state.setColor(newCandidate, state.colorValue, {updateDelegates: false});	
			alert("test");
		}

		state.delegates[newCandidate] = state.delegates[oldCandidate];
		state.delegates[oldCandidate] = undefined;
	}
}

function forceUpdate() {
	if('serviceWorker' in navigator) {
		navigator.serviceWorker.register('../sw.js')
		.then(function(reg) {
			if(reg.waiting) {
				reg.waiting.postMessage("skipwaiting");
				gtag('event', currentCache, {
					'event_category': 'Manual Update',
					'event_label': 'Manual update from ' + currentCache,
					'non_interaction': true
				});
				setTimeout(function() {
					location.reload();
				}, 150);
			}
		});
	}
}

function start() {
	CookieManager.loadCookies();
	CookieManager.askConsent();

	CandidateManager.initCandidates();
	ChartManager.initChart();

	ChartManager.setChart('horizontalbattle');

	if(php_load_map === true) {
		var url = null;
		if(php_load_user === true) {
			url = 'https://yapms.org/users/' + php_load_user_id + '/' + php_load_map_id + '.txt'; 	
		} else {
			url = 'https://yapms.org/maps/' + php_load_map_id + '.txt'; 	
		}
		MapLoader.loadMapFromURL(url);

		if(php_auto_reload) {
			window.setInterval(function() {
				MapLoader.loadMapFromURL(url);
			}, 30000 + (Math.floor(Math.random() * 30000)));
		}
	} else if(php_load_type_map === true) {
		MapLoader.loadMapFromId(php_load_map_id);
	} else {
		PresetLoader.loadPreset("classic");
		MapLoader.loadMap("./res/usa_presidential.svg", 16, 1, "usa_ec", "presidential", "open", {voters: 'usa_voting_pop', enablePopularVote: true});
	}

	Account.verifyState();

	setTimeout(function() {
		LogoManager.loadButtons();
	}, 2500);
}

start();
