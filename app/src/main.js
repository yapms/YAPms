const currentCache = 'v3.0.0';

let states = [];
let lands = [];
let buttons = [];
let proportionalStates = [];

let paintIndex = 'Tossup';
let maxColorValue = 2;

let mode = 'paint';

let maxColorValues = 4;

let mapOptions = {}

let strokeMultiplier = 1;

let previousPalette = function() {
	toWinPalette();	
}

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
	const button = document.getElementById('share-button');
	if(button) {
		button.disabled = true;
		button.style.opacity = '0.5';
		setTimeout(function() {
			button.disabled = false;
			button.style.opacity = '1';
		}, 3000);
	}

	const application = document.getElementById('application');
	domtoimage.toPng(application, {
		width: application.offsetWidth,
		height: application.offsetHeight
	})
	.then(function(data) {
		const image = document.getElementById('screenshotimg');
		image.src = data;
		image.style.width = '40vw';
		image.style.height = 'auto';
		image.style.display = '';
		const loadingAnimation = document.getElementById('loading-animation');
		loadingAnimation.style.display = 'none';
		if(grecaptcha) {
			grecaptcha.execute('6LeDYbEUAAAAANfuJ4FxWVjoxPgDPsFGsdTLr1Jo', {action: 'share'})
			.then(function(token) {
				SaveMap.upload(data, token);
			});
		}
	})
	.catch(function(error) {
		console.log('dom-to-image: ', error);
	});

	/*
	html2canvas(document.getElementById('application'), {
		logging: true, onclone: function(clone) {
		console.log(clone.getElementById("svgdata"));
		const svgtext = clone.getElementById('text');
		if(svgtext) {
			svgtext.style.fontFamily = 'arial';
			svgtext.style.fontSize = '15px';
		}

		const svg = clone.getElementById("svgdata");
		const mapdiv = clone.getElementById("map-div");
		if(svg && mapdiv) {
			const width = mapdiv.offsetWidth + (mapdiv.offsetWidth * 0);
			const height = mapdiv.offsetHeight + (mapdiv.offsetHeight * 0);
			svg.setAttribute('width', width);
			svg.setAttribute('height', height);
		}

		const notification = clone.getElementById('legend-tooltip');
		if(notification) {
			notification.style.display = 'none';
		}

		const editButtons = clone.getElementsByClassName('legend-delete');
		for(const element of editButtons) {
			element.style.display = 'none';
		}

		const addCandidate = clone.getElementById('legend-addcandidate-button');
		if(addCandidate) {
			addCandidate.style.display = 'none';
		}
	}}).then(function(canvas) {
		notification.appendChild(canvas);
		canvas.style.width = 0;
		canvas.style.height = 0;	
		canvas.style.display = 'none';
		const img = canvas.toDataURL('image/png');
		notification.removeChild(canvas);
		const i = document.getElementById('screenshotimg');
		i.src = img;
		i.style.width = '40vw';
		i.style.height = 'auto';
		i.style.display = '';
		var loadingAnimation = document.getElementById('loading-animation');
		if(loadingAnimation) {
			loadingAnimation.style.display = 'none';
		}
		if(grecaptcha)
		grecaptcha.execute('6LeDYbEUAAAAANfuJ4FxWVjoxPgDPsFGsdTLr1Jo', {action: 'share'})
		.then(function(token) {
			SaveMap.upload(img, token);
		});
	});
	*/
}

/* CATCH ERRORS AND LOG THEM */
window.onerror = function(message, source, lineno, colno, error) {
	if(message.includes('a[b].target.className.indexOf')
	|| message.includes('Script error.')) {
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
	} else if(set === 'highlight') {
		var button = document.getElementById('modebutton-highlight');
		button.style.opacity = '0.5';
	}
}

// if paint index is invalid, change it to tossup
function verifyPaintIndex() {
	if(typeof CandidateManager.candidates[paintIndex] === 'undefined') {
		paintIndex = 'Tossup';
	}
}

// iterate over each state and delegate votes to the candidate
function countVotes() {
	const mid = document.getElementById("battlechartmid");
	if(mid) {
		mid.setAttribute("fill", CandidateManager.TOSSUP.colors[2]);
	}

	for(let key in CandidateManager.candidates) {
		const candidate = CandidateManager.candidates[key];
		candidate.voteCount = 0;
		candidate.probVoteCounts = [0,0,0,0];
		for(const state of states) {	
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

		for(const state of proportionalStates) {
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

function updateArticles() {
	fetch("req_articles.php")
	.then(response => response.json())
	.then(data => {
		var articles = document.getElementById("yapnews-articles");

		if(articles === null) {
			return;
		}

		for(var index = 0; index < data.length; ++index) {
			var article = document.createElement('div');
			article.setAttribute('class', 'yapnews-article');
			var articleTitle = document.createElement('a');
			articleTitle.setAttribute('class', 'yapnews-article-title');
			articleTitle.setAttribute('href', 'https://www.yapms.com/news/article.php?a=' + data[index]['id']);
			articleTitle.setAttribute('target', '_blank');
			var articleAuthor = document.createElement('div');
			articleAuthor.setAttribute('class', 'yapnews-article-author');
			var articleSnippet = document.createElement('div');
			articleSnippet.setAttribute('class', 'yapnews-article-snippet');
			articleTitle.innerHTML = data[index]['title'];
			articleAuthor.innerHTML = data[index]['author'];
			articleSnippet.innerHTML = data[index]['snippet'];

			article.appendChild(articleTitle);
			article.appendChild(articleAuthor);
			article.appendChild(articleSnippet);
			articles.appendChild(article);
		}
	});
}

function updateMobile() {
	var clickButtons = document.getElementsByClassName('click-button');
	for(var index = 0; index < clickButtons.length; ++index) {
		clickButtons[index].style.padding = '7px';
	}
	
	var modeButtons = document.getElementsByClassName('mode-button');
	for(var index = 0; index < modeButtons.length; ++index) {
		modeButtons[index].style.paddingLeft = '12px';
		modeButtons[index].style.paddingRight = '12px';
	}

	var sidebarToggle = document.getElementById("sidebar-toggle");
	if(sidebarToggle) {
		sidebarToggle.style.display = "none";
	}

	var lockButton = document.getElementById("lockbutton");
	if(lockButton) {
		lockButton.style.display = "none";
	}
}

function start() {
	CookieManager.loadCookies();
	CookieManager.askConsent();

	CandidateManager.initCandidates();
	ChartManager.initChart();

	ChartManager.setChart('horizontalbattle');

	if(mobile) {
		updateMobile();
	} else {
		updateArticles();
	}

	if(php_load_map === true) {
		let url = null;
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
		MapLoader.loadMap("./res/usa_presidential.svg", 16, 1, "usa_ec", "presidential", "open");
	}

	setTimeout(function() {
		LogoManager.loadButtons();
	}, 2500);
}

start();

if('serviceWorker' in navigator) {
	console.log('Attempting to register service worker');
	navigator.serviceWorker
	.register('../sw.js')
	.then(function(a) {
		console.log('SW: registered');
		if(a.waiting) {
			console.log('SW: update found');
			var updateButton = document.getElementById("update-button");
			if(updateButton) {
				updateButton.style.display = "inline";
			}
		}
	}, function(err) {
		console.log('SW: register error ', err);
	});
} else {
	console.log('No service worker detected');
}
