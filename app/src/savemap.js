function logData() {
	var data = {};
	data['filename'] = MapLoader.save_filename;
	data['dataid'] = MapLoader.save_dataid;
	data['type'] = MapLoader.save_type;
	data['year'] = MapLoader.save_year;
	data['fontsize'] = MapLoader.save_fontsize;
	data['strokewidth'] = MapLoader.save_strokewidth;
	data['candidates'] = {};
	data['states'] = {};
	data['proportional'] = {};

	for(var key in CandidateManager.candidates) {
		if(key === 'Tossup') {
			continue;
		}
		var candidate = CandidateManager.candidates[key];
		data['candidates'][candidate.name] = {};
		data['candidates'][candidate.name]['solid'] = candidate.colors[0];
		data['candidates'][candidate.name]['likely'] = candidate.colors[1];
		data['candidates'][candidate.name]['lean'] = candidate.colors[2];
		data['candidates'][candidate.name]['tilt'] = candidate.colors[3];
	}

	for(var stateIndex = 0; stateIndex < states.length; ++stateIndex) {
		var state = states[stateIndex];
		// Remove zero delegates
		for(var key in state.delegates) {
			var count = state.delegates[key];
			if(count === 0) {
				delete state.delegates[key];
			}
		}
		data['states'][state.name] = {};
		data['states'][state.name]['delegates'] = state.delegates;
		data['states'][state.name]['colorvalue'] = state.colorValue;
		data['states'][state.name]['disabled'] = state.disabled;
	}

	for(var stateIndex = 0; stateIndex < proportionalStates.length; ++stateIndex) {
		var state = proportionalStates[stateIndex];
		// Remove zero delegates
		for(var key in state.delegates) {
			var count = state.delegates[key];
			if(count === 0) {
				delete state.delegates[key];
			}
		}
		data['proportional'][state.name] = {};
		data['proportional'][state.name]['delegates'] = state.delegates;
		data['proportional'][state.name]['colorvalue'] = state.colorValue;
		data['proportional'][state.name]['disabled'] = state.disabled;
	}

	console.log(JSON.stringify(data));
}

function saveMap_user() {
	var formData = new FormData();
	formData.append('token', Account.token);
	
	var element = document.getElementById('savemap-name');
	formData.append('mapName', element.value);

	var data = {};
	data['filename'] = MapLoader.save_filename;
	data['dataid'] = MapLoader.save_dataid;
	data['type'] = MapLoader.save_type;
	data['year'] = MapLoader.save_year;
	data['fontsize'] = MapLoader.save_fontsize;
	data['strokewidth'] = MapLoader.save_strokewidth;
	data['candidates'] = {};
	data['states'] = {};
	data['proportional'] = {};

	for(var key in CandidateManager.candidates) {
		if(key === 'Tossup') {
			continue;
		}
		var candidate = CandidateManager.candidates[key];
		data['candidates'][candidate.name] = {};
		data['candidates'][candidate.name]['solid'] = candidate.colors[0];
		data['candidates'][candidate.name]['likely'] = candidate.colors[1];
		data['candidates'][candidate.name]['lean'] = candidate.colors[2];
		data['candidates'][candidate.name]['tilt'] = candidate.colors[3];
	}

	for(var stateIndex = 0; stateIndex < states.length; ++stateIndex) {
		var state = states[stateIndex];
		// Remove zero delegates
		for(var key in state.delegates) {
			var count = state.delegates[key];
			if(count === 0) {
				delete state.delegates[key];
			}
		}
		data['states'][state.name] = {};
		data['states'][state.name]['candidate'] = state.candidate;
		data['states'][state.name]['delegates'] = state.delegates;
		data['states'][state.name]['colorvalue'] = state.colorValue;
		data['states'][state.name]['disabled'] = state.disabled;
	}

	for(var stateIndex = 0; stateIndex < proportionalStates.length; ++stateIndex) {
		var state = proportionalStates[stateIndex];
		// Remove zero delegates
		for(var key in state.delegates) {
			var count = state.delegates[key];
			if(count === 0) {
				delete state.delegates[key];
			}
		}
		data['proportional'][state.name] = {};
		data['proportional'][state.name]['candidate'] = state.candidate;
		data['proportional'][state.name]['delegates'] = state.delegates;
		data['proportional'][state.name]['colorvalue'] = state.colorValue;
		data['proportional'][state.name]['disabled'] = state.disabled;
	}

	formData.append("data", JSON.stringify(data));
	
	$.ajax({
		url: "https://yapms.org/upload_user.php",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: function(data) {
			console.log(data);
		},
		error: function(a,b,c) {
			console.log(a);
			console.log(b);
			console.log(c);
		}
	});
}

function saveMap_new(img, token) {
	var formData = new FormData();
	formData.append("captcha", token);
	formData.append("img", img);
	
	var data = {};
	data['filename'] = MapLoader.save_filename;
	data['dataid'] = MapLoader.save_dataid;
	data['type'] = MapLoader.save_type;
	data['year'] = MapLoader.save_year;
	data['fontsize'] = MapLoader.save_fontsize;
	data['strokewidth'] = MapLoader.save_strokewidth;
	data['candidates'] = {};
	data['states'] = {};
	data['proportional'] = {};

	var formData = new FormData();
	console.log('token: ' + token);
	formData.append("captcha", token);
	formData.append("img", img);

	for(var key in CandidateManager.candidates) {
		if(key === 'Tossup') {
			continue;
		}
		var candidate = CandidateManager.candidates[key];
		data['candidates'][candidate.name] = {};
		data['candidates'][candidate.name]['solid'] = candidate.colors[0];
		data['candidates'][candidate.name]['likely'] = candidate.colors[1];
		data['candidates'][candidate.name]['lean'] = candidate.colors[2];
		data['candidates'][candidate.name]['tilt'] = candidate.colors[3];
	}

	for(var stateIndex = 0; stateIndex < states.length; ++stateIndex) {
		var state = states[stateIndex];
		// Remove zero delegates
		for(var key in state.delegates) {
			var count = state.delegates[key];
			if(count === 0) {
				delete state.delegates[key];
			}
		}
		data['states'][state.name] = {};
		data['states'][state.name]['delegates'] = state.delegates;
		data['states'][state.name]['colorvalue'] = state.colorValue;
		data['states'][state.name]['disabled'] = state.disabled;
	}

	for(var stateIndex = 0; stateIndex < proportionalStates.length; ++stateIndex) {
		var state = proportionalStates[stateIndex];
		// Remove zero delegates
		for(var key in state.delegates) {
			var count = state.delegates[key];
			if(count === 0) {
				delete state.delegates[key];
			}
		}
		data['proportional'][state.name] = {};
		data['proportional'][state.name]['delegates'] = state.delegates;
		data['proportional'][state.name]['colorvalue'] = state.colorValue;
		data['proportional'][state.name]['disabled'] = state.disabled;
	}
	
	formData.append("data", JSON.stringify(data));

	$.ajax({
		url: "https://yapms.org/upload.php",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: function(a,b,c) {
			console.log(a);
			var data = a.split(' ');
			var url = data[0];
			var filename = data[1];

			var shareurl = document.getElementById('shareurl');
			if(url === 'reCaptcha_Failed(restart_web_browser)') {
				shareurl.setAttribute('href', url);
				shareurl.innerHTML = 'reCaptcha Failed: possible solution is to restart your web-browser';

			} else if(url === 'reCaptcha_Bot_Detected') {
				shareurl.setAttribute('href', url);
				shareurl.innerHTML = 'reCaptcha Failed: suspicious activity detected';
				
			} else {
				shareurl.setAttribute('href', url);
				shareurl.innerHTML = url;
			}
			
			shareurl.style.display = '';

			var sharebuttons = document.getElementById('sharebuttons');
			if(sharebuttons) {
				sharebuttons.style.display = 'flex';
			}
			var downloadbtn = document.getElementById('downloadbutton');
			if(downloadbtn) {
				if(mobile) {
					downloadbtn.style.display = 'none';
				} else {
					downloadbtn.style.display = '';
					downloadbtn.setAttribute('href', 'https://yapms.org/downloadmap.php?f=' + filename);
				}
			}

			var loadingAnimation = document.getElementById('loading-animation');
			if(loadingAnimation) {
				loadingAnimation.style.display = 'none';
			}
		
			var image = document.getElementById('screenshotimg');
			if(image) {
				image.style.display = '';
			}

			var facebookBtn = document.getElementById('facebook-share');
			if(facebookBtn) {
				facebookBtn.setAttribute('href', 'https://www.facebook.com/sharer.php?u=' + url);
				facebookBtn.setAttribute('target', '_blank');
			}

			var twitterBtn = document.getElementById('twitter-share');
			if(twitterBtn) {
				twitterBtn.setAttribute('href', 'https://twitter.com/intent/tweet?text=' + url);
				twitterBtn.setAttribute('target', '_blank');
			}

			var redditBtn = document.getElementById('reddit-share');
			if(redditBtn) {
				redditBtn.setAttribute('href', 'https://www.reddit.com/submit?title=My%20YAPms%20Map&url=' + url);
				redditBtn.setAttribute('target', '_blank');
			}

			console.log('Map save NEW succeeded');
			gtag('event', currentCache, {
				'event_category': 'Map Save',
				'event_label': 'Map save succeeded'
			});
		},
		error: function(a,b,c) {
			console.log(a);
			console.log(b);
			console.log(c);
			var button = document.getElementById('share-button');
			if(button) {
				button.setAttribute('onclick', 'share()');
			}
			gtag('event', currentCache, {
				'event_category': 'Map Save',
				'event_label': 'Map save failed'
			});
		}
	});
}
