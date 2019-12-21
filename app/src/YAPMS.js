class Account {
	static register() {
		var formData = new FormData();
		var email = document.getElementById('email-input').value;
		formData.append('email', email);
		$.ajax({
			url: "https://yapms.org/auth/register.php",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(data) {
				console.log('Register: ' + data);
				//alert(data);
				var arr = data.split(' ');
				var registerInfo = document.getElementById('register-info');
				closeAllPopups();
				if(arr[0] === 'good') {
					displayNotification('Account Registered',
						'Please check your email, and click the verification link. (check your spam)');	
				} else if(arr[1] === 'inuse') {
					displayNotification('Register Error',
						'Account Already Registered');	
				} else if(arr[1] === 'inactive') {
					displayNotification('Register Error',
						'Verification Email Already Sent (check your spam)');	
				} else if(arr[1] === 'resent') {
					displayNotification('Account Registered',
						'Please check your email, and click the verification link. (check your spam)');	
				} else if(arr[1] === 'invalid_email') {
					displayNotification('Register Error',
						email + ' is not a valid email');	
				}
			},
			error: function(a, b, c) {
				console.log(a);
				console.log(b);
				console.log(c);
				var registerInfo = document.getElementById('register-info');
				registerInfo.innerHTML = 'Connection Error';	
			}	
		});
	}

	static login() {
		var formData = new FormData();
		var email = document.getElementById('email-login').value;
		var pass = document.getElementById('password-login').value;
		formData.append('email', email);
		formData.append('password', pass);
		$.ajax({
			url: "https://yapms.org/auth/login.php",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(data) {
				console.log('Login: ' + data);
				var arr = data.split(' ');
				Account.verifyState();
				document.getElementById('password-login').value = "";
				var loginInfo = document.getElementById('login-info');
				if(arr[0] === 'good') {
					loginInfo.innerHTML = 'Please enter your credentials';
					closeAllPopups();
				} else if(arr[0] === 'bad') {
					if(arr[1] === 'account_innactive') {
						loginInfo.innerHTML = 'Inactive Account';
					} else if(arr[1] === 'incorrect_login') {
						loginInfo.innerHTML = 'Incorrect Login';
					}
				}
			},
			error: function(a, b, c) {
				console.log(a);
				console.log(b);
				console.log(c);
				var loginInfo = document.getElementById('login-info');
				loginInfo.innerHTML = 'Connection Error';
			}	
		});
	}

	static verifyState() {
		var formData = new FormData();
		formData.append('email', Account.email);
		$.ajax({
			url: "https://yapms.org/auth/verify_login.php",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(data) {
				console.log('Verify Login: ' + data);
				var arr = data.split(' ');
				Account.isLoggedIn = (arr[0] === 'good');
				if(Account.isLoggedIn) {
					Account.email = arr[1];
					Account.id = arr[2];
				} else {
					Account.id = null;
					Account.email = null;	
				}
				Account.updateHTML();
			},
			error: function(a, b, c) {
				console.log("Account: Could not login");
			}	
		});
	}

	static logout() {
		closeAllPopups();
		$.ajax({
			url: "https://yapms.org/auth/logout.php",
			type: "POST",
			processData: false,
			contentType: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(data) {
				console.log('Logout: ' + data);
				Account.verifyState();
			},
			error: function(a, b, c) {
				console.log(a);
				console.log(b);
				console.log(c);
			}	
		});
	}

	static unlink(mapName) {
		var formData = new FormData();
		formData.append("mapName", mapName);
		$.ajax({
			url: "https://yapms.org/users/.tools/unlink.php",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(data) {
				gtag('event', currentCache, {
					'event_category': 'Account',
					'event_label': 'Map Deleted From Account'
				});
			},
			error: function(a, b, c) {
				console.log(a);
				console.log(b);
				console.log(c);
			}	
		});
	}

	static save(mapName) {
		var formData = new FormData();
		var img = document.getElementById("mysaves-current-mappreview");
		if(img) {
			formData.append("img", img.src);
		}

		if(mapName) {
			formData.append("mapName", mapName);
		} else {	
			var mapNameElement = document.getElementById("mysaves-name-input");
			if(mapNameElement) {
				formData.append("mapName", mapNameElement.value);
				mapNameElement.value = '';
			}
		}

		var error = document.getElementById("mysaves-current-error");
		if(error) {
			error.style.display = 'none';
		}
	
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
			data['states'][state.name]['simulator'] = state.simulator;
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
			data['proportional'][state.name]['simulator'] = state.simulator;
			data['proportional'][state.name]['colorvalue'] = state.colorValue;
			data['proportional'][state.name]['disabled'] = state.disabled;
		}
		
		formData.append("data", JSON.stringify(data));

		$.ajax({
			url: "https://yapms.org/users/.tools/upload.php",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(data) {
				var arr = data.split(' ');
				console.log(arr);
				if(arr[0] === "bad") {
					error.style.display = 'inline';
					if(arr[1] === "no_map_name") {
						error.innerHTML = "Enter Map Name";
					} else if(arr[1] === "file_limit") {
						error.innerHTML = "File Limit Reached";	
					} else {
						error.innerHTML = "Upload Error";	
					}
				} else {
					var base64name = arr[1];
					Account.addMapBox(base64name, true);
					gtag('event', currentCache, {
						'event_category': 'Account',
						'event_label': 'Map Saved To Account'
					});
				}
			},
			error: function(a, b, c) {
				console.log(a);
				console.log(b);
				console.log(c);
			}
		});
	}

	static changePassword() {
		var formData = new FormData();
		var current = document.getElementById('password-reset-1').value;
		var newPass = document.getElementById('password-reset-2').value;
		var verifyPass = document.getElementById('password-reset-3').value;
		formData.append('current', current);
		formData.append('new', newPass);
		formData.append('verify', verifyPass);
		$.ajax({
			url: "https://yapms.org/auth/change_password.php",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(data) {
				console.log('Change Password: ' + data);
				var arr = data.split(' ');
				var passwordChangeInfo = document.getElementById('passwordchange-info');
				if(arr[0] === 'good') {
					closeAllPopups();
					displayNotification('Password Change',
						'Your password has been changed');
					passwordChangeInfo.innerHTML = 'Please enter current and new password';
					document.getElementById('password-reset-1').value = "";
					document.getElementById('password-reset-2').value = "";
					document.getElementById('password-reset-3').value = "";
				} else if(arr[0] === 'bad') {
					if(arr[1] === 'verify_incorrect') {
						passwordChangeInfo.innerHTML = 'Passwords do not match';
					} else if(arr[1] === 'incorrect_pass') {
						passwordChangeInfo.innerHTML = 'Current password incorrect';
					} else if(arr[1] === 'no_post') {
						passwordChangeInfo.innerHTML = 'Missing information';
					}
				}
			},
			error: function(a, b, c) {
				console.log(a);
				console.log(b);
				console.log(c);
			}	
		});
	}

	static forgotPassword() {
		var formData = new FormData();
		var email = document.getElementById('email-forgot-input').value;
		formData.append('email', email);
		$.ajax({
			url: "https://yapms.org/auth/forgot_password.php",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(data) {
				console.log('Forgot Password: ' + data);
				var arr = data.split(' ');
				closeAllPopups();
				if(arr[0] === 'good') {
					if(arr[1] === 'reset_sent') {
						displayNotification('Password Reset',
							'Password reset email sent. (check your spam)');	
					}
				} else if(arr[0] === 'bad') {
					if(arr[1] === 'innactive_account') {
						displayNotification('Password Reset Error',
							email + ' is not active. Please register or verify.');	
					} else if(arr[1] === 'recent_verification') {
						displayNotification('Password Reset Error',
							'Password was recently reset, please wait.');	
					} else if(arr[1] === 'please_register') {
						displayNotification('Password Reset Error',
							email + ' is not registered. Please register.');	
					}
				}
			},
			error: function(a, b, c) {
				console.log(a);
				console.log(b);
				console.log(c);
			}	
		});
	}

	static addMapBox(base64name, preappend) {
		/* GET BASE64 DATA AND DECODE */
		var name = base64name;
		var nameDecode = atob(base64name);

		/* DELETE MAP BOX IF ALREADY EXISTS */
		var previous = document.getElementById("mappreview-" + name);
		if(previous) {
			previous.src = "https://yapms.org/users/"  + Account.id + "/" + name + ".png#" + new Date().getTime();
			return;
		}
	
		/* CREATE MAP BOX ELEMENT */	
		var mapBox = document.createElement('div');
		mapBox.className = "mysaves-mapbox";
		mapBox.id = "mapbox-" + name;
		var mapBoxHeader = document.createElement('div');
		mapBoxHeader.className = "mysaves-mapbox-header";

		/* CREATE MAP TOOLBAR */
		var mapToolbar = document.createElement('div');
		mapToolbar.className = "mysaves-mapbox-toolbar";

		/* CREATE DELETE MAP BUTTON */
		var mapDelete = document.createElement('img');
		mapDelete.className = "toolbar-button toolbar-button-red";
		mapDelete.src = "./html/deletebutton.svg";
		mapDelete.setAttribute('title', 'Delete Map');
		mapDelete.onclick = (function() {
			var name_onclick = name;
			var thisMap  = mapBox;
			var allMaps = document.getElementById("mysaves-maps");
			return function() {
				Account.unlink(name_onclick);
				if(allMaps && thisMap) {
					allMaps.removeChild(thisMap)
				}
			}
		})();
		//mapBoxHeader.appendChild(mapDelete);
		mapToolbar.appendChild(mapDelete);

		/* CREATE DOWNLOAD MAP BUTTON */
		var mapDownloadA = document.createElement('a');
		mapDownloadA.setAttribute('class', 'toolbar-button toolbar-button-blue');
		mapDownloadA.setAttribute('href', "https://yapms.org/users/.tools/download.php?u=" + Account.id + "&m=" + name);
		mapDownloadA.setAttribute('title', 'Download');
		var mapDownloadImg = document.createElement('img');
		mapDownloadImg.src = "./html/downloadbutton.svg";
		mapDownloadImg.setAttribute('class', 'toolbar-button-download');
		mapDownloadA.appendChild(mapDownloadImg);	
		mapToolbar.appendChild(mapDownloadA);

		/* CREATE OVERWRITE MAP BUTTON */
		var mapOverwrite = document.createElement('img');
		mapOverwrite.setAttribute('class', 'toolbar-button toolbar-button-green');
		mapOverwrite.src = "./html/overwritebutton.svg";
		mapOverwrite.setAttribute('title', 'Overwrite');
		mapOverwrite.onclick = (function() {
			var ref_mapName = nameDecode;
			return function() {
				Account.save(ref_mapName);
			}
		})();
		mapToolbar.appendChild(mapOverwrite);

		/* APPEND TOOLBAR */	
		mapBoxHeader.appendChild(mapToolbar);

		/* CREATE MAP NAME */
		var mapName = document.createElement('div');
		mapName.className = "mysaves-mapname";
		mapName.innerHTML = nameDecode;
		mapBoxHeader.appendChild(mapName);
		
		mapBox.appendChild(mapBoxHeader);

		/* CREATE MAP PREVIEW */	
		var mapPreview = document.createElement('img');
		mapPreview.className = "mysaves-mappreview";
		mapPreview.id = "mappreview-" + name;
		mapPreview.src = "https://yapms.org/users/"  + Account.id + "/" + name + ".png#" + new Date().getTime();
		mapPreview.alt = "No Preview";
		mapPreview.onclick = (function() {
			var url = "https://www.yapms.com/app/?u=" + Account.id + '&m=' + name;
			return function() {
				window.location.href = url;
			}
		})();
		mapBox.appendChild(mapPreview);

		/* CREATE MAP LINK */
		var mapBoxURL = document.createElement('div');
		mapBoxURL.className = "mysaves-url";
		var mapURL = document.createTextNode("https://www.yapms.com/app/?u=" + Account.id + "&m=" + name);
		mapBoxURL.appendChild(mapURL);
		mapBox.appendChild(mapBoxURL);

		var maps = document.getElementById("mysaves-maps");
		if(preappend) {
			maps.insertBefore(mapBox, maps.firstChild);
		} else {
			maps.appendChild(mapBox);
		}
	}

	static closeMyMaps() {
		var page = document.getElementById("application-mysaves");
		page.style.display = "none";
		var maps = document.getElementById("mysaves-maps");
		while(maps.firstChild) {
			maps.removeChild(maps.firstChild);
		}
	}

	static getMaps() {
		var maps = document.getElementById("mysaves-maps");
		while(maps.firstChild) {
			maps.removeChild(maps.firstChild);
		}

		var current = document.getElementById("mysaves-current-map");
		if(current) {
			current.style.display = "none";
		}
		
		var error = document.getElementById("mysaves-current-error");
		if(error) {
			error.style.display = 'none';
		}

		var page = document.getElementById("application-mysaves");
		if(page) {
			page.style.display = "inline-flex";
		}

		html2canvas(document.getElementById("application"), {logging: false, onclone: function(clone) {
			// remove the custom fonts from the clone
			var svgtext = clone.getElementById('text');
			if(svgtext) {
				svgtext.style.fontFamily = 'arial';
				svgtext.style.fontSize = '15px';
			}
			var svg = clone.getElementById('svgdata');
			var mapdiv = clone.getElementById('map-div');
			if(svg && mapdiv) {
				svg.setAttribute('width', mapdiv.offsetWidth);
				svg.setAttribute('height', mapdiv.offsetHeight);
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
			canvas.style.width = 0;
			canvas.style.height = 0;	
			canvas.style.display = 'none';
			var img = canvas.toDataURL('image/png');
			var i = document.getElementById('mysaves-current-mappreview');
			i.src = img;
			i.style.width = '40vw';
			i.style.height = 'auto';
			var current = document.getElementById("mysaves-current-map");
			if(current) {
				current.style.display = "inline-flex";
			}
		});
		
		$.ajax({
			url: "https://yapms.org/users/.tools/get_maps.php",
			type: "POST",
			processData: false,
			contentType: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(data) {
				var arr = data.split(' ');
				for(var fileIndex = 0; fileIndex < arr.length; ++fileIndex) {
					/* GET BASE64 DATA */
					var fileName = arr[fileIndex].split('/');
					var name = fileName[2].split('.')[0];
					Account.addMapBox(name, false);
				}
			},
			error: function(a, b, c) {
				console.log(a);
				console.log(b);
				console.log(c);
			}
		});
	}

	static updateHTML() {
		var loginButton = document.getElementById('login-button');
		var accountButton = document.getElementById('account-button');
		var mymapsButton = document.getElementById('mymaps-button');
		var accountEmail = document.getElementById('account-email');

		if(Account.isLoggedIn) {
			loginButton.style.display = 'none';
			accountButton.style.display = '';
			mymapsButton.style.display = '';
			accountEmail.innerHTML = Account.email;
		} else {
			loginButton.style.display = '';
			accountButton.style.display = 'none';
			mymapsButton.style.display = 'none';
		}
	}
}

Account.email = null;
Account.id = null;
Account.isLoggedIn = false;

$("#login-form").submit(function(event) {
	event.preventDefault();
	Account.login();
});
class Candidate {
	constructor(name, colors) {
		this.name = name;
		this.colors = colors;
		this.voteCount = 0;
		this.probVoteCounts = [0,0,0,0];

		if(colors[0] === colors[1] &&
			colors[0] === colors[2] &&
			colors[0] === colors[3]) {
			this.singleColor = true;
		} else {
			this.singleColor = false;
		}
	}
};

class CandidateManager {
	static initCandidates() {
		CandidateManager.candidates = {};
		CandidateManager.candidates['Tossup'] = CandidateManager.TOSSUP;
	}

	static deleteCandidate() {
		closeAllPopups();
		var candidateid = document.getElementById('candidate-originalName').value;
		for(var index = 0; index < states.length; ++index) {
			var state = states[index];
			// set the candidate to tossup
			if(state.candidate === candidateid) {
				state.setColor('Tossup', 0);
			}
			state.delegates[candidateid] = undefined;
		}

		delete CandidateManager.candidates[candidateid];
		ChartManager.chart.generateLegend();
		countVotes();
		LegendManager.updateLegend();
		ChartManager.updateChart();
		PopularVote.count();
	}

	static setCandidate() {
		closeAllPopups();

		var oldname= document.getElementById('candidate-originalName').value;
		var newname = document.getElementById('candidate-name').value;
		var solidColor = document.getElementById('candidate-solid').value;
		var likelyColor = document.getElementById('candidate-likely').value;
		var leanColor = document.getElementById('candidate-lean').value;
		var tiltColor = document.getElementById('candidate-tilt').value;
			
		// only rename the property if the name changed
		if(newname !== oldname) {
			Object.defineProperty(CandidateManager.candidates, newname,
			Object.getOwnPropertyDescriptor(CandidateManager.candidates, oldname));
			delete CandidateManager.candidates[oldname];
		}

		var candidate = CandidateManager.candidates[newname];
		candidate.name = newname;
		candidate.colors[0] = solidColor;
		candidate.colors[1] = likelyColor;
		candidate.colors[2] = leanColor;
		candidate.colors[3] = tiltColor;
		
		if(solidColor === likelyColor &&
			solidColor === leanColor &&
			solidColor === tiltColor) {
			candidate.singleColor = true;
			candidate.probVoteCounts[0] += 
				candidate.probVoteCounts[1] +
				candidate.probVoteCounts[2] +
				candidate.probVoteCounts[3];
			candidate.probVoteCounts[1] = 0;
			candidate.probVoteCounts[2] = 0;
			candidate.probVoteCounts[3] = 0;
		} else {
			candidate.singleColor = false;
		}
		
		for(var index = 0; index < states.length; ++index) {
			var state = states[index];
			if(state.candidate === newname) {
				state.setColor(newname, state.colorValue, {setDelegates: false});
				console.log(state.colorValue);
			} else if(state.candidate === oldname) {
				state.setColor(newname, state.colorValue, {setDelegates: false});
			
				state.delegates[newname] = state.delegates[oldname];
				state.delegates[oldname] = undefined;

			}	
		}

		ChartManager.chart.generateLegend();
		LegendManager.updateLegend();
		ChartManager.updateChart();
	}

	static addCandidate(name, solid, likely, leaning, tilting) {
		if(name === undefined) {
			var nameHTML = document.getElementById('name');
			if(nameHTML !== null) {
				name = nameHTML.value;
			} else {
				name = "Error";
			}
		}

		// ignore white space candidates
		if(name.trim() === '') {
			return;
		}

		if(solid === undefined) {
			var solidHTML = document.getElementById('solid');
			if(solidHTML !== null) {
				solid = solidHTML.value;
			} else {
				solid = '#000000';
			}
		}

		if(likely === undefined) {
			var likelyHTML = document.getElementById('likely');
			if(likelyHTML !== null) {
				likely = likelyHTML.value;
			} else {
				likely = '#000000';
			}
		}

		if(leaning === undefined) {
			var leaningHTML = document.getElementById('leaning');
			if(leaningHTML !== null) {
				leaning = leaningHTML.value;
			} else {
				leaning = '#000000';
			}
		}

		if(tilting === undefined) {
			var tiltingHTML = document.getElementById('tilting');
			if(tiltingHTML !== null) {
				tilting = tiltingHTML.value;
			} else {
				tilting = '#000000';
			}
		}
		
		var candidate = new Candidate(name, [solid, likely, leaning, tilting]);
		CandidateManager.candidates[name] = candidate;

		verifyPaintIndex();
		ChartManager.chart.generateLegend();
		ChartManager.updateChart();
		LegendManager.updateLegend();
	}
	
	static saveCustomColors() {
		var customColorName = document.getElementById('custom-color-name');
		var name = customColorName.value;
		var solid = document.getElementById("solidcustom").value;
		CookieManager.appendCookie(name + "solid", solid);	
		var likely = document.getElementById("likelycustom").value;
		CookieManager.appendCookie(name + "likely", likely);	
		var leaning = document.getElementById("leaningcustom").value;
		CookieManager.appendCookie(name + "leaning", leaning);	
		var tilting = document.getElementById("tiltingcustom").value;
		CookieManager.appendCookie(name + "tilting", tilting);
		CandidateManager.setColors(name);
	}

	static setColors(palette) {
		var solid = document.getElementById('solid');
		var likely = document.getElementById('likely');
		var leaning =  document.getElementById('leaning');
		var tilting = document.getElementById('tilting');

		if(palette === 'red') {
			solid.value = '#bf1d29';
			likely.value = '#ff5865';
			leaning.value = '#ff8b98';
			tilting.value ='#cf8980';
		} else if(palette === 'blue') {
			solid.value = '#1c408c';
			likely.value = '#577ccc';
			leaning.value = '#8aafff';
			tilting.value = '#949bb3';
		} else if(palette === 'green') {
			solid.value = '#1c8c28';
			likely.value = '#50c85e';
			leaning.value = '#8aff97';
			tilting.value = '#7a997e';
		} else if(palette === 'yellow') {
			solid.value = '#e6b700';
			likely.value = '#e8c84d';
			leaning.value = '#ffe78a';
			tilting.value = '#b8a252';
		} else {
			solid.value = CookieManager.cookies[palette + 'solid'];
			likely.value = CookieManager.cookies[palette + 'likely'];
			leaning.value = CookieManager.cookies[palette + 'leaning'];
			tilting.value = CookieManager.cookies[palette + 'tilting'];
		}
	}
}

CandidateManager.candidates = {};
CandidateManager.tossupColor = 2;
CandidateManager.TOSSUP = new Candidate('Tossup', ['#000000', '#ffffff', '#696969', '#000000']);
class ChartManager {
	static initChart() {
		ChartManager.chartOptions = {
			// This basically inserts HTML into the legend-div div
			// it's a WIP
			legendCallback: function(chart) {
				console.log("Generating Legend...");
				var legendDiv = document.getElementById('legend-div');
				legendDiv.innerHTML = '';
				var index = -1;
				for(var key in CandidateManager.candidates) {
					var candidate = CandidateManager.candidates[key];
					++index;
					var legendElement = document.createElement('div');
					legendElement.setAttribute('id', candidate.name);
					legendElement.setAttribute('class', 'legend-button');
					legendElement.onclick = (function() {
						var ref_key = key;
						return function() {	
							legendClick(ref_key, this);
						}
					})();
					legendElement.style.background = 'none';
					legendDiv.appendChild(legendElement);
				
					var legendText = document.createElement('div');
					legendText.setAttribute('id', candidate.name + '-text');	
					legendText.setAttribute('class', 'legend-button-text');	
					legendText.style.backgroundColor = candidate.colors[0];
					if(index == 0) {
						var color = candidate.colors[CandidateManager.tossupColor];
						legendText.style.backgroundColor = color;
					}
					legendText.style.padding = '0px';
					legendText.innerHTML = candidate.name;
					legendElement.appendChild(legendText);
		
					var legendDelete = document.createElement('div');
					legendDelete.setAttribute('class', 'legend-delete');
					legendDelete.style.backgroundColor = 'black';
					legendText.appendChild(legendDelete);

					var legendColorDiv = document.createElement('div');
					legendColorDiv.setAttribute('class', 'legend-color-div');
					legendElement.appendChild(legendColorDiv);
				
					if(candidate.singleColor) {
						legendColorDiv.style.display = 'none';
					}
					
					if(key !== 'Tossup') {
						// after adding all the candidates, add the add candidate button
						var legendDelete = document.createElement('div');
						legendDelete.setAttribute('class', 'legend-delete');
						legendDelete.onclick = (function() {
							var ref_name = candidate.name;
							return function() {
								displayCandidateEditMenu(ref_name);
							};
						})();
						legendDelete.style.background = 'none';

						/* ONLY ADD IF CANDIDATE EDIT IS ENABLED */
						if(php_candidate_edit) {
							legendDiv.appendChild(legendDelete);
						}

						var legendDeleteText = document.createElement('div');
						legendDeleteText.setAttribute('class', 'legend-delete-text');	
						legendDeleteText.style.backgroundColor = candidate.colors[0];
						
						legendDeleteText.style.padding = '0px';
						legendDeleteText.style.fontSize = '14px';
						legendDeleteText.innerHTML = '<i class="fas fa-cog"></i>';
						legendDelete.appendChild(legendDeleteText);
					}

					if(key !== 'Tossup' && LegendManager.legendLeans) {
						var amts = ['solid', 'likely', 'lean', 'tilt'];
						for(var index = 0; index < amts.length; ++index) {
							var legendColor = document.createElement('div');
							legendColor.setAttribute('class', 'legend-color');
							legendColor.setAttribute('id', candidate.name + amts[index]);
							legendColor.style.backgroundColor = candidate.colors[index];
							legendColorDiv.appendChild(legendColor);
						}
					}
				}
			
				// after adding all the candidates, add the add candidate button
				var legendElement = document.createElement('div');
				legendElement.setAttribute('id', 'legend-addcandidate-button');
				legendElement.setAttribute('class', 'legend-button');
				legendElement.onclick = displayAddCandidateMenu;
				legendElement.style.background = 'none';

				/* ONLY ADD IF CANDIDATE EDIT IS ENABLED */
				if(php_candidate_edit) {
					legendDiv.appendChild(legendElement);
				}

				var legendText = document.createElement('div');
				legendText.setAttribute('id', 'addcandidate-button-text');	
				legendText.setAttribute('class', 'legend-button-text');	
				legendText.style.backgroundColor = CandidateManager.candidates['Tossup'].colors[CandidateManager.tossupColor];
				legendText.style.padding = '0px';
				legendText.innerHTML = '+';
				legendElement.appendChild(legendText);
				var legendColorDiv = document.createElement('div');
				legendColorDiv.setAttribute('class', 'legend-color-div');
				legendElement.appendChild(legendColorDiv);
				
				var legendTooltip = document.createElement('div');
				legendTooltip.setAttribute('id', 'legend-tooltip');
				legendDiv.appendChild(legendTooltip);
				var legendText = document.createElement('div');
				legendText.setAttribute('id', 'legendtooltip-text');	
				legendText.setAttribute('class', 'legend-button-text');	
				legendText.style.padding = '0px';
				legendText.innerHTML = 'Select a candidate';
				legendTooltip.appendChild(legendText);

			},
			// do not display the build in legend for the chart
			legend: {
				display: false
			},
			tooltips: {
				display: true,
				position: 'average',
				titleFontColor: 'black',
				bodyFontColor: 'black',
				backgroundColor: 'white',
				borderColor: 'black',
				borderWidth: 2,
				caretSize: 0,
				cornerRadius: 0
			},
			// turn off animation
			animation: {
				animateRotate: false,
				animateScale: true
			},
			plugins: {
				datalabels: {
					//display: 'auto',
					display: function(context) {
						return context.dataset.data[context.dataIndex] !== 0;
					},
					backgroundColor: 'white',
					borderColor: 'black',
					borderRadius: 5,
					borderWidth: 2,
					color: 'black',
					font: {
						family: 'Roboto',
						size: 15,
						weight: 700
					}
				}
			},
			barStrokeWidth: 0
		}
	//Chart.defaults.global.barPercentage = 0;
	//Chart.defaults.global.categoryPercentage = 0;

		ChartManager.chartBarScales = {
			yAxes: [{
				stacked: true,
				gridLines: {
					display: false,
					drawBorder: false
				},
				ticks: {
					fontSize: 15,
					fontColor: '#ffffff',
					fontFamily: 'Roboto',
					fontStyle: 500
				}
			}],
			xAxes: [{
				stacked: true,
				gridLines: {
					display: false,
					drawBorder: false
				},
				ticks: {
					beginAtZero: true,
					fontSize: 15,
					fontColor: '#ffffff',
					fontStyle: 500,
					fontFamily: 'Roboto'
				}
			}]
		}

		ChartManager.chartPieScales = {
			yAxes: [{
				display: false
			}],
			xAxes: [{
				display: false
			}]
		}
		
		ChartManager.chartPolarScales = {
			display: false
		}

		ChartManager.chartRadarScales = {
			display: false
		}

		ChartManager.chartOptions.scales = ChartManager.chartPieScales;

		Chart.defaults.global.elements.rectangle.borderWidth = 2;
		
		// get the context
		var ctx = document.getElementById('chart-canvas').getContext('2d');
		ctx.height = 200;

		// create the chart
		ChartManager.chart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels:[],
				datasets: [{
					label: "",
					backgroundColor: '#ffffff',
					borderColor: '#ffffff',
					borderWidth: 0,
					data:[]
				}, {}, {}, {}],
			},
			options: ChartManager.chartOptions,
			maintainAspectRatio: true
		});

		ChartManager.chartType = 'doughnut';
	}

	// dynamically change the chart from one form to another
	static setChart(type, position) {
		console.log('Set Chart - ' + type);
		var sidebar = document.getElementById('chart-div');
		var chartHTML = document.getElementById('chart');
		var html = document.getElementById('chart-canvas');
		var ctx = html.getContext('2d');
		var battlechart = document.getElementById('battlechart');
		chartHTML.style.display = 'inline-block';
		battlechart.style.display = 'none';
		sidebar.style.display = 'flex';
		
		sidebar.style.width = '28vw';

		if(type === 'none') {
			html.style.display = 'none';

			unsetBattleHorizontal();
			sidebar.style.display = 'none';

			ChartManager.chartType = type;
			MapManager.centerMap();
			return;
		} else if(type === 'horizontalbattle' || type === 'verticalbattle') {
			if(Object.keys(CandidateManager.candidates).length > 3) {
			
				displayNotification('Sorry',
					'This chart requires that there be two candidates');
				return;
			}
			
			if(type === 'horizontalbattle') {
				setBattleHorizontal();
				var logo = document.getElementById('logo-div');
				logo.style.width = '15%';
				logo.style.height = '100%';

				sidebar.style.borderRight = '0px';
				sidebar.style.borderTop = '1px solid black';

				logo = document.getElementById('yapms-watermark');
				logo.style.width = '15%';
				logo.style.height = '100%';
			}
			else {
				unsetBattleHorizontal();
				sidebar.style.width = '20vw';	
				var logo = document.getElementById('logo-div');
				logo.style.width = '100%';
				logo.style.height = '15%';
				sidebar.style.borderTop = '0px';
				sidebar.style.borderRight = '1px solid black';
				
				logo = document.getElementById('yapms-watermark');
				logo.style.width = '100%';
				logo.style.height = '15%';
			}

			html.style.display = 'none';
			chartHTML.style.display = 'none';
			battlechart.style.display = 'flex';
			ChartManager.chartType = type;
			ChartManager.updateChart();
			MapManager.centerMap();
			return;
		} 
		
		unsetBattleHorizontal();

		ChartManager.chartPosition = position;	
		if(position === 'bottom') {
			var application = document.getElementById('application');
			application.style.flexDirection = 'column-reverse';
			
			var map = document.getElementById('map-div');
			map.style.height = '80%';

			//var sidebar = document.getElementById('chart-div');
			sidebar.style.flexDirection = 'row';
			sidebar.style.width = '100%';	
			sidebar.style.height = '20%';
			sidebar.style.borderRight = '0px';
			sidebar.style.borderTop = '1px solid black';
		
			var charthtml = document.getElementById('chart');
			charthtml.style.height = 'auto';
			charthtml.style.width = '' + (sidebar.offsetHeight - 5) + 'px';

			var logo = document.getElementById('logo-div');
			logo.style.width = '15%';
			logo.style.height = '100%';
			logo = document.getElementById('yapms-watermark');
			logo.style.width = '15%';
			logo.style.height = '100%';
		} else {
			var application = document.getElementById('application');
			application.style.flexDirection = 'row';

			var map = document.getElementById('map-div');
			map.style.height = '100%';

			//var sidebar = document.getElementById('chart-div');
			sidebar.style.flexDirection = 'column';
			sidebar.style.width = '28vw';	
			sidebar.style.height = '100%';
			sidebar.style.borderTop = '0px';
			sidebar.style.borderRight = '1px solid black';
			
			var charthtml = document.getElementById('chart');
			charthtml.style.width = '100%';
			
			var logo = document.getElementById('logo-div');
			logo.style.width = '100%';
			logo.style.height = '15%';
			logo = document.getElementById('yapms-watermark');
			logo.style.width = '100%';
			logo.style.height = '15%';
		}

		MapManager.centerMap();
			
		ChartManager.chartType = type;
		
		ChartManager.chartData = {
			labels:[],
			datasets: [{
				borderColor: ChartManager.chartBorderColor,
				borderWidth: ChartManager.chartBorderWidth,
				data:[]
			}]
		};

		html.style.display = 'inline-block';

		// set the proper scales
		if(type === 'horizontalBar') {
			ChartManager.chartOptions.scales = ChartManager.chartBarScales;
			delete ChartManager.chartOptions.scale;
			// horizontal bar needs multiple datasets
			for(var i = 0; i < 3; ++i) {
				ChartManager.chartData.datasets.push({
					borderColor: ChartManager.chartBorderColor,
					borderWidth: ChartManager.chartBorderWidth,
					data:[]
				});
			}
		} else if(type === 'pie' || type === 'doughnut') {
			ChartManager.chartOptions.scales = ChartManager.chartPieScales;
			delete ChartManager.chartOptions.scale;
		}

		// first destroy the chart
		ChartManager.chart.destroy();
		// then rebuild
		ChartManager.chart = new Chart(ctx, {type: type, data: ChartManager.chartData, options: ChartManager.chartOptions});
		ChartManager.updateChart();
	}

	static rebuildChart() {
		var html = document.getElementById('chart-canvas');
		var ctx = html.getContext('2d');
		//var type = chart.config.type;
		ChartManager.chart.destroy();
		ChartManager.chart = new Chart(ctx, {
			type: ChartManager.chart.config.type, 
			data: ChartManager.chartData, 
			options: ChartManager.chartOptions
		});
		
		// dont display the chart if its a battle chart
		if(ChartManager.chartType === 'battle') {	
			var chartcontainer = document.getElementById('chart');
			chartcontainer.style.display = 'none';
		}

		ChartManager.updateChart();
	}

	// updates the information of the chart (so the numbers change)
	static updateChart() {
		if(ChartManager.chartType === 'verticalbattle' ||
			ChartManager.chartType === 'horizontalbattle') {
			updateBattleChart();
			return;
		} else if(ChartManager.chartType === 'horizontalBar') {
			ChartManager.updateBarChart();
		} else {
			ChartManager.updateNonRadarChart();	
		}

		ChartManager.chart.config.data = ChartManager.chartData;
		ChartManager.chart.update();
	}

	static updateBarChart() {
		ChartManager.chartData.labels = [];
		ChartManager.chartData.datasets[0].data = [];
		ChartManager.chartData.datasets[0].backgroundColor = [];
		ChartManager.chartData.datasets[1].data = [];
		ChartManager.chartData.datasets[1].backgroundColor = [];
		ChartManager.chartData.datasets[2].data = [];
		ChartManager.chartData.datasets[2].backgroundColor = [];
		ChartManager.chartData.datasets[3].data = [];
		ChartManager.chartData.datasets[3].backgroundColor = [];
		
		// each label is a candidate
		for(var key in CandidateManager.candidates) {
			ChartManager.chartData.labels.push(key);
		}

		if(ChartManager.chartLeans) {
			for(var probIndex = 0; probIndex < 4; ++probIndex) {
				for(var key in CandidateManager.candidates) {
					var candidate = CandidateManager.candidates[key];
					var name = candidate.name;
					var count = candidate.probVoteCounts[probIndex];
					ChartManager.chartData.datasets[probIndex].data.push(count);

					var color = candidate.colors[probIndex];
					ChartManager.chartData.datasets[probIndex].backgroundColor.push(color);
				}
			}
		} else {
			for(var key in CandidateManager.candidates) {
				var candidate = CandidateManager.candidates[key];
				var name = candidate.name;
				var count = candidate.voteCount;
				ChartManager.chartData.datasets[0].data.push(count);

				if(key === 'Tossup') {
					var color = candidate.colors[2];
					ChartManager.chartData.datasets[0].backgroundColor.push(color);

				} else {
					var color = candidate.colors[0];
					ChartManager.chartData.datasets[0].backgroundColor.push(color);
				}
			}
		}
	}

	static updateNonRadarChart() {
		ChartManager.chartData.labels = [];

		ChartManager.chartData.datasets[0].data = [];
		ChartManager.chartData.datasets[0].backgroundColor = [];
		ChartManager.chartData.datasets[0].borderColor = ChartManager.chartBorderColor;
		ChartManager.chartData.datasets[0].borderWidth = ChartManager.chartBorderWidth;

		// loop though candidates
		var candidateIndex = -1;
		for(var key in CandidateManager.candidates) {
			++candidateIndex;
			var candidate = CandidateManager.candidates[key];
			var name = candidate.name;
			var voteCount = candidate.voteCount;
			var color = candidate.colors[0];
			if(candidateIndex == 0) {
				color = CandidateManager.candidates['Tossup'].colors[CandidateManager.tossupColor];
				// append the candidate label
				ChartManager.chartData.labels[0] = 'Tossup';
				// append the vote count
				ChartManager.chartData.datasets[0].data[0] = voteCount;
				// change the background color of the visual
				ChartManager.chartData.datasets[0].backgroundColor.push(color);
			} else if(ChartManager.chartLeans) {
				for(var probIndex = 0; probIndex < 4; ++probIndex) {
					var count = candidate.probVoteCounts[probIndex];
					color = candidate.colors[probIndex];
					var index = (probIndex + (candidateIndex * 4)) - 3;
					ChartManager.chartData.labels[index] = name;
					ChartManager.chartData.datasets[0].data[index] = count;
					ChartManager.chartData.datasets[0].backgroundColor.push(color);
				}
			} else {
				var count = candidate.voteCount;
				color = candidate.colors[0];
				ChartManager.chartData.labels[candidateIndex] = name;
				ChartManager.chartData.datasets[0].data[candidateIndex] = count;
				ChartManager.chartData.datasets[0].backgroundColor.push(color);
			}
		}
	}

	static toggleChartLabels() {
		ChartManager.chartLabels = !ChartManager.chartLabels;
		if(ChartManager.chartOptions.plugins.datalabels.display != false) {
			ChartManager.chartOptions.plugins.datalabels.display = false;
		} else {
			ChartManager.chartOptions.plugins.datalabels.display = function(context) {
				return context.dataset.data[context.dataIndex] !== 0;
			}
		}

		ChartManager.rebuildChart();
	}

	static toggleChartLeans() {
		ChartManager.chartLeans = !ChartManager.chartLeans;
		ChartManager.rebuildChart();
		updateBattleChart();
	}
}

ChartManager.chart = null;
ChartManager.chartBorderWidth = 2;
ChartManager.chartBorderColor = '#000000';
ChartManager.chartData = {
	labels:[],
	datasets: [{
		label: "",
		backgroundColor: [],
		borderColor: ChartManager.chartBorderColor,
		borderWidth: ChartManager.chartBorderWidth,
		data:[]
	}, {}, {}, {}]
}
ChartManager.chartOptions = null;
ChartManager.chartType = null;
ChartManager.chartPosition = null;
ChartManager.chartPieScales = null;
ChartManager.chartBarScales = null;
ChartManager.chartPolarScales = null;
ChartManager.chartRadarScales = null;

ChartManager.chartLeans = true;
ChartManager.chartLabels = true;
class CookieManager {
	static appendCookie(key, value) {
		if(CookieManager.consent === false) {
			console.log('Cookie Manager: no consent');
			return;
		}

		CookieManager.cookies[key] = value;
		var cookie = "";
		var expire = new Date(Date.now() + 60 * 1000 * 60 * 12 * 7 * 100).toString();
		cookie = key + '=' + CookieManager.cookies[key] + '; expires=' + expire + ';';
		document.cookie = cookie;
		console.log('Append cookie: key=' + key + ' value=' + value);
	}

	static loadCookies() {
		// preload all color cookies with black
		for(var i = 1; i < 5; ++i) {
			CookieManager.cookies['custom' + i + 'solid'] = '#000000';
			CookieManager.cookies['custom' + i + 'likely'] = '#000000';
			CookieManager.cookies['custom' + i + 'leaning'] = '#000000';
			CookieManager.cookies['custom' + i + 'tilting'] = '#000000';
		}
		CookieManager.cookies['theme'] = 'default';
		var decode = decodeURIComponent(document.cookie);
		var loadedCookies = decode.split('; ');
		for(var index in loadedCookies) {
			var cookie = loadedCookies[index].split('=');
			var key = cookie[0];
			var result = cookie[1]
			CookieManager.cookies[key] = result;
		}
	}

	static loadCustomColors() {
		var c1 = document.getElementById('custom1button');
		c1.style.background = 'linear-gradient(to right,' +
			CookieManager.cookies['custom1solid'] + ',' +
			CookieManager.cookies['custom1likely'] + ',' +
			CookieManager.cookies['custom1leaning'] + ',' +
			CookieManager.cookies['custom1tilting'] + ')';
		var c2 = document.getElementById('custom2button');
		c2.style.background = 'linear-gradient(to right,' +
			CookieManager.cookies['custom2solid'] + ',' +
			CookieManager.cookies['custom2likely'] + ',' +
			CookieManager.cookies['custom2leaning'] + ',' +
			CookieManager.cookies['custom2tilting'] + ')';
		var c3 = document.getElementById('custom3button');
		c3.style.background = 'linear-gradient(to right,' +
			CookieManager.cookies['custom3solid'] + ',' +
			CookieManager.cookies['custom3likely'] + ',' +
			CookieManager.cookies['custom3leaning'] + ',' +
			CookieManager.cookies['custom3tilting'] + ')';
		var c4 = document.getElementById('custom4button');
		c4.style.background = 'linear-gradient(to right,' +
			CookieManager.cookies['custom4solid'] + ',' +
			CookieManager.cookies['custom4likely'] + ',' +
			CookieManager.cookies['custom4leaning'] + ',' +
			CookieManager.cookies['custom4tilting'] + ')';
	}

	static askConsent() {
		/* If Consent Has Already Been Denied */
		if(CookieManager.cookies['consent'] === "false") {
			CookieManager.consent = false;
			CookieManager.consentDenied();
			return;
		/* If Consent Has Already Been Given */
		} else if(CookieManager.cookies['consent'] === "true") {
			CookieManager.consent = true;
			CookieManager.consentGiven();
			return;
		}
		
		/* Auto Consent */
		CookieManager.consent = true;
		CookieManager.consentGiven();

		/* Only Ask For Consent From EU IP Address */
/*
		if(geoplugin_cookieConsent() === false) {
			CookieManager.consent = true;
			CookieManager.consentGiven();
			return;
		} else {
			var consentPopup = document.getElementById('consent');
			consentPopup.style.display = 'inline-block';
		}
*/
	}

	static consentDenied(reload) {
		var consentPopup = document.getElementById('consent');
		consentPopup.style.display = 'none';
		
		/* Set Consent Cookie to False */
		CookieManager.consent = true;
		CookieManager.appendCookie("consent", false);
		CookieManager.consent = false;

		/* If Reload Requested */	
		if(reload) {
			location.reload();
		}
	
		/* Load Non-Personalized Adsense */
		// (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
		// (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
	}

	static consentGiven() {
		var consentPopup = document.getElementById('consent');
		consentPopup.style.display = 'none';
		
		/* Set Consent Cookie to True */
		CookieManager.consent = true;
		CookieManager.appendCookie("consent", true);

		/* Load Personalized Adsense */
		// (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;

		/* Load Google Recaptcha */
		$.ajax({
			url: "https://www.google.com/recaptcha/api.js?render=6LeDYbEUAAAAANfuJ4FxWVjoxPgDPsFGsdTLr1Jo",
			dataType: "script",
			cache: true,
			success: function() {
				console.log("Cookie Manager: Google Recaptcha Loaded");
			}
		});
	}
}

CookieManager.cookies = {};
CookieManager.consent = false;
class InputManager {
	static enableInputDesktop() {
		var enablePan = false;
		var enableZoom = false;
		if(MapManager.panObject != null) {
			enablePan = MapManager.panObject.isPanEnabled();
			enableZoom = MapManager.panObject.isZoomEnabled();
		}

		MapManager.panObject = svgPanZoom('#svgdata', {
			fit: true,
			center: true,
			contain: false,
			panEnabled: true,
			zoomEnabled: true,
			dblClickZoomEnabled: false,
			maxZoom: 100,
			zoomScaleSensitivity: 0.1
		});
	}

	static enableInputMobile() {
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

		MapManager.panObject = svgPanZoom('#svgdata', {
			fit: true,
			center: true,
			contain: false,
			maxZoom: 100,
			zoomScaleSensitivity: 0.1,
			dblClickZoomEnabled: false,
			customEventsHandler: eventHandler
		});
	}
}
class KeyboardManager {
	static quickFill() {
		return KeyboardManager.keyStates[70] === true;
	}

	static areaSelect() {
		return KeyboardManager.keyStates[68] === true;
	}
}

KeyboardManager.keyStates = {};

$("html").keydown(function(event) {
	KeyboardManager.keyStates[event.which] = true;
});

$("html").keyup(function(event) {
	KeyboardManager.keyStates[event.which] = false;
});

$("html").mouseleave(function(event) {
	KeyboardManager.keyStates = {};
});

$("html").mouseenter(function(event) {
	KeyboardManager.keyStates = {};
});
class LegendManager {
	static toggleLegendCounter() {
		LegendManager.legendCounter = !LegendManager.legendCounter;
		LegendManager.updateLegend();
	}

	static toggleLegendLeans() {
		LegendManager.legendLeans = !LegendManager.legendLeans;
		ChartManager.chart.generateLegend();
		LegendManager.updateLegend();
	}
	
	static selectCandidateDisplay(html) {
		var legendButtons = html.parentElement.children;

		for(var index = 0; index < legendButtons.length; ++index) {
			var button = legendButtons[index];
			var text = button.childNodes[0];
			text.style.padding = '4px';
		}
		
		html.childNodes[0].style.padding = '7px';
	}

	static updateLegend() {
		for(var key in CandidateManager.candidates) {
			var candidate = CandidateManager.candidates[key];
			var html = document.getElementById(candidate.name + '-text');

			var newHTML = candidate.name;

			if(LegendManager.legendCounter == true) {
				newHTML += ' ' + candidate.voteCount;
			}

			if(html !== null) {
				html.innerHTML = newHTML;
			}

			if(key === paintIndex) {
				LegendManager.selectCandidateDisplay(html.parentElement);
			}
		}
	}
}

LegendManager.legendCounter = true;
LegendManager.legendLeans = true;
class LogoManager {
	static toggleLogo(name) {
		var logoSlot = document.getElementById("logo-div");
		switch(name) {
			case "LTE":
			logoSlot.style.backgroundImage = 'url("https://www.yapms.com/app/res/lte.jpg")';
			break;
			case "RedEagle":
			logoSlot.style.backgroundImage = 'url("https://www.yapms.com/app/res/redeagletv.png")';
			break;
			case "PG":
			logoSlot.style.backgroundImage = 'url("https://www.yapms.com/app/res/pg.png")';
			break;
		}
	
		if(LogoManager.currentLogo !== name) {
			logoSlot.style.display = "inline";
		} else if(logoSlot.style.display === "") {
			logoSlot.style.display = "inline";
		} else if(logoSlot.style.display === "inline") {
			logoSlot.style.display = "";
		}

		LogoManager.currentLogo = name;
	}

	static loadButtons() {
		if(LogoManager.buttonsLoaded) {
			return;
		}
		LogoManager.buttonsLoaded = true;

		var backButtons = document.getElementsByClassName("backbutton");
		var closeButtons = document.getElementsByClassName("closebutton");

		for(var index = 0; index < backButtons.length; ++index) {
			var button = backButtons[index];
			button.setAttribute("data", "./html/backbutton.svg");
		}

		for(var index = 0; index < closeButtons.length; ++index) {
			var button = closeButtons[index];
			button.setAttribute("data", "./html/closebutton.svg");
		}
	}

	static loadFlags() {
		if(LogoManager.flagsLoaded) {
			return;
		}
		LogoManager.flagsLoaded = true;

		var countries = ['aus', 'usa', 'bra', 'can', 'ger', 'ind',
			'ita', 'ire', 'ned', 'prt', 'rus', 'esp', 'tur',
			'ukd', 'eu', 'un', 'fra', 'tat', 'che', 'zaf', 'swe',
			'arg', 'pak'];
	
		for(var countryIndex = 0; countryIndex < countries.length; ++countryIndex) {	
			var country = countries[countryIndex];
			var elements = document.getElementsByClassName("flag-" + country);
			for(var elementIndex = 0; elementIndex < elements.length; ++elementIndex) {
				var flag = elements[elementIndex];
				flag.setAttribute("src", "res/flags/" + country + ".svg");
			}	
		}
	}
}

LogoManager.currentLogo = "";
LogoManager.buttonsLoaded = false;
LogoManager.flagsLoaded = false;
class MapManager {
	static centerMap() {
		if(MapManager.panObject === null)
			return;
		
		MapManager.panObject.resize();
		MapManager.panObject.fit();
		MapManager.panObject.center();
		MapManager.panObject.zoomBy(0.85);
	}

	static setLockMap(set) {
		var lockButton = document.getElementById('lockbutton');
		if(set === true) {
			if(lockButton) {
				lockButton.style.opacity = '0.5';
			}
			MapManager.panObject.disablePan();
			MapManager.panObject.disableZoom();
			MapManager.lockedMap = true;
		} else {
			if(lockButton) {
				lockButton.style.opacity = '1';
			}
			MapManager.panObject.enablePan();
			MapManager.panObject.enableZoom();
			MapManager.lockedMap = false;
		}
	}

	static toggleLockMap() {
		var lockButton = document.getElementById('lockbutton');
		if(MapManager.lockedMap) {
			if(lockButton) {
				lockButton.style.opacity = '1';
			}
			MapManager.panObject.enablePan();
			MapManager.panObject.enableZoom();
			MapManager.lockedMap = false;
		} else {
			if(lockButton) {
				lockButton.style.opacity = '0.5';
			}
			MapManager.panObject.disablePan();
			MapManager.panObject.disableZoom();
			MapManager.lockedMap = true;
		}
	}
}

MapManager.lockedMap = false;
MapManager.panObject = null;
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
				PresetLoader.loadPreset('classic');
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
class PresetLoader {
	static loadPreset(value) {
		CandidateManager.initCandidates();

		switch(value) {
			case 'none':
				break;
			case 'classic':
				PresetLoader.loadPresetClassic();
				break;
			case 'republican primary':
				PresetLoader.loadPresetRepublicanPrimary();
				break;
			case 'democratic primary':
				PresetLoader.loadPresetDemocraticPrimary();
				break;
			case 'argentina':
				PresetLoader.loadPresetArgentina();
				break;
			case 'france':
				PresetLoader.loadPresetFrance();
				break;
			case 'germany':
				PresetLoader.loadPresetGermany();
				break;
			case 'southafrica':
				PresetLoader.loadPresetSouthAfrica();
				break;
			case 'india':
				PresetLoader.loadPresetIndia();
				break;
			case 'italy':
				PresetLoader.loadPresetItaly();
				break;
			case 'uk':
				PresetLoader.loadPresetUK();
				break;
			case 'canada':
				PresetLoader.loadPresetCanada();
				break;
			case 'australia':
				PresetLoader.loadPresetAustralia();
				break;
			case 'spain':
				PresetLoader.loadPresetSpain();
				break;
			case 'turkey':
				PresetLoader.loadPresetTurkey();
				break;
			case 'trinidad_tobago':
				PresetLoader.loadPresetTrinidadTobago();
				break;
			case 'netherlands':
				PresetLoader.loadPresetNetherlands();
				break;
			case 'brazil':
				PresetLoader.loadPresetBrazil();
				break;
			case 'ireland':
				PresetLoader.loadPresetIreland();
				break;
			case 'russia':
				PresetLoader.loadPresetRussia();
				break;
			case 'switzerland':
				PresetLoader.loadPresetSwitzerland();
				break;
			case 'sweden':
				PresetLoader.loadPresetSweden();
				break;
			case 'portugal':
				PresetLoader.loadPresetPortugal();
				break;
			case 'pakistan':
				PresetLoader.loadPresetPakistan();
				break;
		}
	
		ChartManager.updateChart();
		ChartManager.chart.generateLegend();
		LegendManager.updateLegend();
	}

	// republicans vs democrats
	static loadPresetClassic() {
		var republican = new Candidate('Republican', 
			['#BF1D29', '#FF5865', '#FF8B98', '#Cf8980']);
		var democrat = new Candidate('Democrat',
			['#1C408C', '#577CCC', '#8AAFFF', '#949BB3']);

		CandidateManager.candidates['Republican'] = republican;
		CandidateManager.candidates['Democrat'] = democrat;
	}

	static loadPresetRepublicanPrimary() {
		var trump = new Candidate('Trump',
			['#bf1d29','#bf1d29','#bf1d29','#bf1d29']);
		var weld = new Candidate('Weld',
			['#e6b700','#e6b700','#e6b700','#e6b700']);
		var walsh = new Candidate('Walsh',
			['#1c408c','#1c408c','#1c408c','#1c408c']);
		var sanford = new Candidate('Sanford',
			['#1c8c28','#1c8c28','#1c8c28','#1c8c28']);
		
		CandidateManager.candidates['Trump'] = trump;
		CandidateManager.candidates['Weld'] = weld;
		CandidateManager.candidates['Walsh'] = walsh;
		CandidateManager.candidates['Sanford'] = sanford;
	}

	static loadPresetDemocraticPrimary() {
		var biden = new Candidate('Biden',
			['#009900','#009900','#009900','#009900']);
		var steyer = new Candidate('Steyer',
			['#ff9900','#ff9900','#ff9900','#ff9900']);
		var sanders = new Candidate('Sanders',
			['#457fff','#457fff','#457fff','#457fff']);
		var warren = new Candidate('Warren',
			['#996600','#996600','#996600','#996600']);
		var buttigieg = new Candidate('Buttigieg',
			['#990099','#990099','#990099','#990099']);
		var klobuchar = new Candidate('Klobuchar',
			['#ff66ff','#ff66ff','#ff66ff','#ff66ff']);
		var booker = new Candidate('Booker',
			['#66ccff','#66ccff','#66ccff','#66ccff']);
		var yang = new Candidate('Yang',
			['#3da882','#3da882','#3da882','#3da882']);
		
		CandidateManager.candidates['Biden'] = biden;
		CandidateManager.candidates['Sanders'] = sanders;
		CandidateManager.candidates['Warren'] = warren;
		CandidateManager.candidates['Buttigieg'] = buttigieg;
		CandidateManager.candidates['Klobuchar'] = klobuchar;
		CandidateManager.candidates['Steyer'] = steyer;
		CandidateManager.candidates['Booker'] = booker;
		CandidateManager.candidates['Yang'] = yang;
	}

	// French parties
	static loadPresetFrance() {
		var lrem = new Candidate('LREM', 
			['#ccb800', '#ccb800', '#ccb800', '#ccb800']);
		var rn = new Candidate('RN',
			['#0D378A', '#0D378A', '#0D378A', '#0D378A']);
		var eelv = new Candidate('EÉLV',
			['#00C000', '#00C000', '#00C000', '#00C000']);
		var lr = new Candidate('LR',
			['#0066CC', '#0066CC', '#0066CC', '#0066CC']);
		var lfi = new Candidate('LFI',
			['#CC2443', '#CC2443', '#CC2443', '#CC2443']);
		var ps = new Candidate('PS',
			['#FF8080', '#FF8080', '#FF8080', '#FF8080']);

		CandidateManager.candidates['LREM'] = lrem;
		CandidateManager.candidates['RN'] = rn;
		CandidateManager.candidates['EÉLV'] = eelv;
		CandidateManager.candidates['LR'] = lr;
		CandidateManager.candidates['LFI'] = lfi;
		CandidateManager.candidates['PS'] = ps;
		LegendManager.toggleLegendLeans()
	}

	// German parties
	static loadPresetGermany() {
		var union = new Candidate('CDU/CSU', 
			['#000000', '#000000', '#000000', '#000000']);
		var spd = new Candidate('SPD',
			['#F0001C', '#F0001C', '#F0001C', '#F0001C']);
		var grn = new Candidate('GRÜNE',
			['#46962B', '#46962B', '#46962B', '#46962B']);
		var afd = new Candidate('AfD',
			['#009EE0', '#009EE0', '#009EE0', '#009EE0']);
		var fdp = new Candidate('FDP',
			['#dec200', '#dec200', '#dec200', '#dec200']);
		var dl = new Candidate('LINKE',
			['#BE3075', '#BE3075', '#BE3075', '#BE3075']);

		CandidateManager.candidates['CDU/CSU'] = union;
		CandidateManager.candidates['SPD'] = spd;
		CandidateManager.candidates['GRÜNE'] = grn;
		CandidateManager.candidates['AfD'] = afd;
		CandidateManager.candidates['FDP'] = fdp;
		CandidateManager.candidates['LINKE'] = dl;
		LegendManager.toggleLegendLeans()
	}

	// Italian parties
	static loadPresetItaly() {
		var lega = new Candidate('Lega', 
			['#008F21', '#008F21', '#008F21', '#008F21']);
		var pd = new Candidate('PD',
			['#FF3643', '#FF3643', '#FF3643', '#FF3643']);
		var mcs = new Candidate('M5S',
			['#FFEB3B', '#FFEB3B', '#FFEB3B', '#FFEB3B']);
		var fi = new Candidate('FI',
			['#318CE7', '#318CE7', '#318CE7', '#318CE7']);
		var fdi = new Candidate('FdI',
			['#003397', '#003397', '#003397', '#003397']);
		var eu = new Candidate('+Eu',
			['#FFD700', '#FFD700', '#FFD700', '#FFD700']);

		CandidateManager.candidates['Lega'] = lega;
		CandidateManager.candidates['PD'] = pd;
		CandidateManager.candidates['M5S'] = mcs;
		CandidateManager.candidates['FI'] = fi;
		CandidateManager.candidates['FdI'] = fdi;
		CandidateManager.candidates['+EU'] = eu;
		LegendManager.toggleLegendLeans()
	}

	// British parties
	static loadPresetUK() {
		var bxp = new Candidate('BXP',
			['#12B6CF', '#12B6CF', '#12B6CF', '#12B6CF']);
		var ldm = new Candidate('LDM',
			['#FDBB30', '#FDBB30', '#FDBB30', '#FDBB30']);
		var lab = new Candidate('LAB',
			['#DC241f', '#DC241f', '#DC241f', '#DC241f']);
		var grn = new Candidate('GRN',
			['#6AB023', '#6AB023', '#6AB023', '#6AB023']);
		var con = new Candidate('CON', 
			['#0087DC', '#0087DC', '#0087DC', '#0087DC']);
		var snp = new Candidate('SNP',
			['#cccc00', '#cccc00', '#cccc00', '#cccc00']);
		var tig = new Candidate('TIG',
			['#222221', '#222221', '#222221', '#222221']);
		var ukip = new Candidate('UKIP',
			['#70147A', '#70147A', '#70147A', '#70147A']);
		var pc = new Candidate('PC',
			['#008142', '#008142', '#008142', '#008142']);
		var sf = new Candidate('SF',
			['#008800', '#008800', '#008800', '#008800']);
		var dup = new Candidate('DUP',
			['#D46A4C', '#D46A4C', '#D46A4C', '#D46A4C']);
		var uup = new Candidate('UUP',
			['#9999FF', '#9999FF', '#9999FF', '#9999FF']);
		var apni = new Candidate('APNI',
			['#F6CB2F', '#F6CB2F', '#F6CB2F', '#F6CB2F']);

		CandidateManager.candidates['BXP'] = bxp;
		CandidateManager.candidates['LDM'] = ldm;
		CandidateManager.candidates['LAB'] = lab;
		CandidateManager.candidates['GRN'] = grn
		CandidateManager.candidates['CON'] = con;
		CandidateManager.candidates['SNP'] = snp;
		CandidateManager.candidates['TIG'] = tig;
		CandidateManager.candidates['PC'] = pc;
		CandidateManager.candidates['SF'] = sf;
		CandidateManager.candidates['DUP'] = dup;
		CandidateManager.candidates['UUP'] = uup;
		CandidateManager.candidates['APNI'] = apni;
		LegendManager.toggleLegendLeans()
	}

	// Canadian parties
	static loadPresetCanada() {
		var con = new Candidate('CON', 
			['#6495ED', '#6495ED', '#6495ED', '#6495ED']);
		var lib = new Candidate('LIB',
			['#F08080', '#F08080', '#F08080', '#F08080']);
		var ndp = new Candidate('NDP',
			['#F4A460', '#F4A460', '#F4A460', '#F4A460']);
		var grn = new Candidate('GRN',
			['#9ACD32', '#9ACD32', '#9ACD32', '#9ACD32']);
		var bqc = new Candidate('BQC',
			['#87CEFA', '#87CEFA', '#87CEFA', '#87CEFA']);
		var ppc = new Candidate('PPC',
			['#83789E', '#83789E', '#83789E', '#83789E']);

		CandidateManager.candidates['CON'] = con;
		CandidateManager.candidates['LIB'] = lib;
		CandidateManager.candidates['NDP'] = ndp;
		CandidateManager.candidates['GRN'] = grn;
		CandidateManager.candidates['BQC'] = bqc;
		CandidateManager.candidates['PPC'] = ppc;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetArgentina() {
		var lc = new Candidate("Let's Change",
			['#ccae0b','#ccae0b','#ccae0b','#ccae0b']);
		var fpv = new Candidate('FPV',
			['#75aadb','#75aadb','#75aadb','#75aadb']);
		var federal = new Candidate('Federal',
			['#19bc9d','#19bc9d','#19bc9d','#19bc9d']);
		var una = new Candidate('UNA',
			['#0a1172','#0a1172','#0a1172','#0a1172']);
		var rxa = new Candidate('RxA',
			['#00677f','#00677f','#00677f','#00677f']);
		var fcps = new Candidate('FCpS',
			['#ff0080','#ff0080','#ff0080','#ff0080']);
		var unity = new Candidate('Unity',
			['#00774f','#00774f','#00774f','#00774f',]);
		var evolution = new Candidate('Evolution',
			['#ff0000','#ff0000','#ff0000','#ff0000']);
		var fit = new Candidate('FIT',
			['#800000','#800000','#800000','#800000']);
		var catamarca = new Candidate('Catamarca',
			['#ff69b4','#ff69b4','#ff69b4','#ff69b4']);
		var other = new Candidate('Other',
			['#999999','#999999','#999999','#999999']);
		
		CandidateManager.candidates["Let's Change"] = lc;
		CandidateManager.candidates["FPV"] = fpv;
		CandidateManager.candidates["Federal"] = federal;
		CandidateManager.candidates["UNA"] = una;
		CandidateManager.candidates["RxA"] = rxa;
		CandidateManager.candidates["FCpS"] = fcps;
		CandidateManager.candidates["Unity"] = unity;
		CandidateManager.candidates["Evolution"] = evolution;
		CandidateManager.candidates["FIT"] = fit;
		CandidateManager.candidates["Catamarca"] = catamarca;
		CandidateManager.candidates["Other"] = other;
		LegendManager.toggleLegendLeans()
	}

	// Australian parties
	static loadPresetAustralia() {
		var lib = new Candidate('LIB', 
			['#0047AB', '#0047AB', '#0047AB', '#0047AB']);
		var lnp = new Candidate('LNP',
			['#063C7C', '#063C7C', '#063C7C', '#063C7C']);
		var nat = new Candidate('NAT',
			['#006644', '#006644', '#006644', '#006644']);
		var clp = new Candidate('CLP',
			['#F8981D', '#F8981D', '#F8981D', '#F8981D']);
		var ind = new Candidate('IND',
			['#C0C0C0', '#C0C0C0', '#C0C0C0', '#C0C0C0']);
		var cen = new Candidate('CEN',
			['#ff6300', '#ff6300', '#ff6300', '#ff6300']);
		var grn = new Candidate('GRN',
			['#39B54A', '#39B54A', '#39B54A', '#39B54A']);
		var lab = new Candidate('LAB',
			['#DE3533', '#DE3533', '#DE3533', '#DE3533']);

		CandidateManager.candidates['LIB'] = lib;
		CandidateManager.candidates['LNP'] = lnp;
		CandidateManager.candidates['NAT'] = nat;
		CandidateManager.candidates['CLP'] = clp;
		CandidateManager.candidates['IND'] = ind;
		CandidateManager.candidates['CEN'] = cen;
		CandidateManager.candidates['GRN'] = grn;
		CandidateManager.candidates['LAB'] = lab;
		LegendManager.toggleLegendLeans()
	}

	// Spanish Parties
	static loadPresetSpain() {
		var psoe = new Candidate('PSOE',
			['#EF1C27', '#EF1C27', '#EF1C27', '#EF1C27']);
		var pp = new Candidate('PP',
			['#1D84CE', '#1D84CE', '#1D84CE', '#1D84CE']);
		var cs = new Candidate('CS',
			['#EB6109', '#EB6109', '#EB6109', '#EB6109']);
		var unidas = new Candidate('Unidas Podemos',
			['#7B4977', '#7B4977', '#7B4977', '#7B4977']);
		var vox = new Candidate('Vox',
			['#63BE21', '#63BE21', '#63BE21', '#63BE21']);
		var erc = new Candidate('ERC-Sobiranistes',
			['#FFB232', '#FFB232', '#FFB232', '#FFB232']);
		var jxcat = new Candidate('JxCat-Junts',
			['#ED5975', '#ED5975', '#ED5975', '#ED5975']);
		var eajpnv = new Candidate('EAJ/PNV',
			['#4AAE4A', '#4AAE4A', '#4AAE4A', '#4AAE4A']);
		var eh = new Candidate('EH Bildu',
			['#B5CF18', '#B5CF18', '#B5CF18', '#B5CF18']);
		var compromis = new Candidate('Compromís 2019',
			['#EC8953', '#EC8953', '#EC8953', '#EC8953']);
		var cca = new Candidate('CCa-PNC',
			['#FFD700', '#FFD700', '#FFD700', '#FFD700']);
		var prc = new Candidate('PRC',
			['#C2CE0C', '#C2CE0C', '#C2CE0C', '#C2CE0C']);

		CandidateManager.candidates['PSOE'] = psoe;
		CandidateManager.candidates['PP'] = pp;
		CandidateManager.candidates['CS'] = cs;
		CandidateManager.candidates['Unidas Podemos'] = unidas;
		CandidateManager.candidates['Vox'] = vox;
		CandidateManager.candidates['ERC-Sobiranistes'] = erc;
		CandidateManager.candidates['JxCat-Junts'] = jxcat;
		CandidateManager.candidates['EAJ/PNV'] = eajpnv;
		CandidateManager.candidates['EH Bildu'] = eh;
		CandidateManager.candidates['Compromís 2019'] = compromis;
		CandidateManager.candidates['CCa-PNC'] = cca;
		CandidateManager.candidates['PRC'] = prc;
		LegendManager.toggleLegendLeans();
	}

	// Turkish Parties
	static loadPresetTurkey() {
		var akp = new Candidate('AKP',
			['#ffcc00','#ffcc00','#ffcc00','#ffcc00']);
		var mhp = new Candidate('MHP',
			['#870000','#870000','#870000','#870000']);
		var bbp = new Candidate('BBP',
			['#cc5252','#cc5252','#cc5252','#cc5252']);
		var chp = new Candidate('CHP',
			['#e30000','#e30000','#e30000','#e30000']);
		var hdp = new Candidate('HDP',
			['#951b88','#951b88','#951b88','#951b88']);
		var iyi = new Candidate('IYI',
			['#0099cc','#0099cc','#0099cc','#0099cc']);
		var sp = new Candidate('SP',
			['#ff5f5f','#ff5f5f','#ff5f5f','#ff5f5f']);
		var tip = new Candidate('TIP',
			['#990000','#990000','#990000','#990000']);
		var dp = new Candidate('DP',
			['#ff3333','#ff3333','#ff3333','#ff3333']);
		var ind = new Candidate('Ind',
			['#b0b0b0','#b0b0b0','#b0b0b0','#b0b0b0']);

		CandidateManager.candidates['AKP'] = akp;
		CandidateManager.candidates['MHP'] = mhp;
		CandidateManager.candidates['BBP'] = bbp;
		CandidateManager.candidates['CHP'] = chp;
		CandidateManager.candidates['HDP'] = hdp;
		CandidateManager.candidates['IYI'] = iyi;
		CandidateManager.candidates['SP'] = sp;
		CandidateManager.candidates['TIP'] = tip;
		CandidateManager.candidates['DP'] = dp;
		CandidateManager.candidates['Ind'] = ind;
		LegendManager.toggleLegendLeans()
	}
	
	// Trinidad and Tobago Parties
	static loadPresetTrinidadTobago() {
		var pnm = new Candidate('PNM',
			['#ff0000','#ff0000','#ff0000','#ff0000']);
		var unc = new Candidate('UNC',
			['#e8ac41','#e8ac41','#e8ac41','#e8ac41']);
		var cop = new Candidate('COP',
			['#000000','#000000','#000000','#000000']);
		var pdp = new Candidate('PDP',
			['#32cd32','#32cd32','#32cd32','#32cd32']);

		CandidateManager.candidates['PNM'] = pnm;
		CandidateManager.candidates['UNC'] = unc;
		CandidateManager.candidates['COP'] = cop;
		CandidateManager.candidates['PDP'] = pdp;
		LegendManager.toggleLegendLeans()
	}

	// Dutch Parties
	static loadPresetNetherlands() {
		var fvd = new Candidate('FvD',
			['#841818','#841818','#841818','#841818']);
		var vvd = new Candidate('VVD',
			['#21276A','#21276A','#21276A','#21276A']);
		var cda = new Candidate('CDA',
			['#007C5E','#007C5E','#007C5E','#007C5E']);
		var gl = new Candidate('GL',
			['#83BD00','#83BD00','#83BD00','#83BD00']);
		var pvda = new Candidate('PvdA',
			['#E12B1A','#E12B1A','#E12B1A','#E12B1A']);
		var d66 = new Candidate('D66',
			['#00B13D','#00B13D','#00B13D','#00B13D']);
		var pvv = new Candidate('PVV',
			['#21468B','#21468B','#21468B','#21468B']);
		var sp = new Candidate('SP',
			['#EE161F','#EE161F','#EE161F','#EE161F']);
		var cu = new Candidate('CU',
			['#00A7EB','#00A7EB','#00A7EB','#00A7EB']);
		var pvdd = new Candidate('PvdD',
			['#006B28','#006B28','#006B28','#006B28']);
		var a50 = new Candidate('50+',
			['#932390','#932390','#932390','#932390']);
		var sgp = new Candidate('SGP',
			['#E95D0F','#E95D0F','#E95D0F','#E95D0F']);
		var denk = new Candidate('DENK',
			['#00A7EB','#00A7EB','#00A7EB','#00A7EB']);

		CandidateManager.candidates['FvD'] = fvd;
		CandidateManager.candidates['VVD'] = vvd;
		CandidateManager.candidates['CDA'] = cda;
		CandidateManager.candidates['GL'] = gl;
		CandidateManager.candidates['PvdA'] = pvda;
		CandidateManager.candidates['D66'] = d66;
		CandidateManager.candidates['PVV'] = pvv;
		CandidateManager.candidates['SP'] = sp;
		CandidateManager.candidates['CU'] = cu;
		CandidateManager.candidates['PvdD'] = pvdd;
		CandidateManager.candidates['50+'] = a50;
		CandidateManager.candidates['DENK'] = denk;
		LegendManager.toggleLegendLeans();
	}

	// Brazilian Parties
	static loadPresetBrazil() {
		var psl = new Candidate('PSL',
			['#203B78','#203B78','#203B78','#203B78']);
		var pp = new Candidate('PP',
			['#7DC9FF','#7DC9FF','#7DC9FF','#7DC9FF']);
		var pl = new Candidate('PL',
			['#0F0073','#0F0073','#0F0073','#0F0073']);
		var psd = new Candidate('PSD',
			['#FFA500','#FFA500','#FFA500','#FFA500']);
		var mdb = new Candidate('MDB',
			['#30914D','#30914D','#30914D','#30914D']);
		var prb = new Candidate('PRB',
			['#00E6A8','#00E6A8','#00E6A8','#00E6A8']);
		var psdb = new Candidate('PSDB',
			['#0080FF','#0080FF','#0080FF','#0080FF']);
		var dem = new Candidate('DEM',
			['#8CC63E','#8CC63E','#8CC63E','#8CC63E']);
		var sd = new Candidate('SD',
			['#FF9C2B','#FF9C2B','#FF9C2B','#FF9C2B']);
		var pode = new Candidate('PODE',
			['#2DA933','#2DA933','#2DA933','#2DA933']);
		var ptb = new Candidate('PTB',
			['#7B7B7B','#7B7B7B','#7B7B7B','#7B7B7B']);
		var psc = new Candidate('PSC',
			['#009118','#009118','#009118','#009118']);
		var novo = new Candidate('NOVO',
			['#FF4D00','#FF4D00','#FF4D00','#FF4D00']);
		var patri = new Candidate('PATRI',
			['#CCAA00','#CCAA00','#CCAA00','#CCAA00']);
		
		CandidateManager.candidates['PSL'] = psl;
		CandidateManager.candidates['PP'] = pp;
		CandidateManager.candidates['PL'] = pl;
		CandidateManager.candidates['PSD'] = psd;
		CandidateManager.candidates['MDB'] = mdb;
		CandidateManager.candidates['PRB'] = prb;
		CandidateManager.candidates['PSDB'] = psdb;

		var pt = new Candidate('PT',
			['#CC0000','#CC0000','#CC0000','#CC0000']);
		var psb = new Candidate('PSB',
			['#FFCC00','#FFCC00','#FFCC00','#FFCC00']);
		var pdt = new Candidate('PDT',
			['#FF0000','#FF0000','#FF0000','#FF0000']);
		var psol = new Candidate('PSOL',
			['#700000','#700000','#700000','#700000']);
		var pcdob = new Candidate('PCdoB',
			['#A30000','#A30000','#A30000','#A30000']);
		var cidadania = new Candidate('CIDADANIA',
			['#FF9191','#FF9191','#FF9191','#FF9191']);
		var pmn = new Candidate('PMN',
			['#DD3333','#DD3333','#DD3333','#DD3333']);
		var rede = new Candidate('REDE',
			['#00C2BB','#00C2BB','#00C2BB','#00C2BB']);

		CandidateManager.candidates['PT'] = pt;
		CandidateManager.candidates['PSB'] = psb;
		CandidateManager.candidates['PDT'] = pdt;
		CandidateManager.candidates['PSOL'] = psol;

		var pros = new Candidate('PROS',
			['#FF5460','#FF5460','#FF5460','#FF5460']);
		var avante = new Candidate('AVANTE',
			['#ED5F36','#ED5F36','#ED5F36','#ED5F36']);

		CandidateManager.candidates['PROS'] = pros;
		CandidateManager.candidates['AVANTE'] = avante;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetIreland() {
		var finegael= new Candidate('FG',
			['#6699FF','#6699FF','#6699FF','#6699FF']);
		var fiannafail = new Candidate('FF',
			['#66BB66','#66BB66','#66BB66','#66BB66']);
		var sinnfein = new Candidate('SF',
			['#326760','#326760','#326760','#326760']);
		var labour = new Candidate('Lab',
			['#CC0000','#CC0000','#CC0000','#CC0000']);
		var aaapbp = new Candidate('AAA-PBP',
			['#E5E500','#E5E500','#E5E500','#E5E500']);
		var inds4change = new Candidate('I4C',
			['#FFC0CB','#FFC0CB','#FFC0CB','#FFC0CB']);
		var socialdemocrats = new Candidate('SD',
			['#752F8B','#752F8B','#752F8B','#752F8B']);
		var green = new Candidate('GP',
			['#99CC33','#99CC33','#99CC33','#99CC33']);
		var indy = new Candidate('Ind',
			['#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC']);

		CandidateManager.candidates['FG'] = finegael;
		CandidateManager.candidates['FF'] = fiannafail;
		CandidateManager.candidates['SF'] = sinnfein;
		CandidateManager.candidates['Lab'] = labour;
		CandidateManager.candidates['AAA-PBP'] = aaapbp;
		CandidateManager.candidates['I4C'] = inds4change;
		CandidateManager.candidates['SD'] = socialdemocrats;
		CandidateManager.candidates['GP'] = green;
		CandidateManager.candidates['Ind'] = indy;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetRussia() {
		var unitedrussia = new Candidate('ER',
			['#0C2C84','#0C2C84','#0C2C84','#0C2C84']);
		var libdem = new Candidate('LDPR',
			['#2862B3','#2862B3','#2862B3','#2862B3']);
		var communist = new Candidate('CPRF',
			['#D70000','#D70000','#D70000','#D70000']);
		var patriots = new Candidate('Patriots',
			['#F6DF3B','#F6DF3B','#F6DF3B','#F6DF3B']);
		var just = new Candidate('CP',
			['#FAB512','#FAB512','#FAB512','#FAB512']);
		var rodina = new Candidate('Rodina',
			['#EA484A','#EA484A','#EA484A','#EA484A']);
		var yabloko = new Candidate('Yabloko',
			['#00A800','#00A800','#00A800','#00A800']);
		var indy = new Candidate('Ind',
			['#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC']);

		CandidateManager.candidates['ER'] = unitedrussia;
		CandidateManager.candidates['LDPR'] = libdem;
		CandidateManager.candidates['CPRF'] = communist;
		CandidateManager.candidates['Patriots'] = patriots;
		CandidateManager.candidates['CP'] = just;
		CandidateManager.candidates['Rodina'] = rodina;
		CandidateManager.candidates['Yabloko'] = yabloko;
		CandidateManager.candidates['Ind'] = indy;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetPortugal() {
		var ps = new Candidate('PS', 
			['#ff61ea','#ff61ea','#ff61ea','#ff61ea']);
		var indy = new Candidate('Ind', 
			['#aaaaaa','#aaaaaa','#aaaaaa','#aaaaaa']);
		var be = new Candidate('BE', 
			['#870909','#870909','#870909','#870909']);
		var pcp = new Candidate('PCP', 
			['#ff0000','#ff0000','#ff0000','#ff0000']);
		var pev = new Candidate('PEV', 
			['#008000','#008000','#008000','#008000']);
		var ppdpsd = new Candidate('PPD/PSD',
			['#ff9900','#ff9900','#ff9900','#ff9900']);
		var cdspp = new Candidate('CDS-PP',
			['#00daff','#00daff','#00daff','#00daff']);
		var pan = new Candidate('PAN',
			['#008080','#008080','#008080','#008080']);

		CandidateManager.candidates['PS'] = ps;
		CandidateManager.candidates['BE'] = be;
		CandidateManager.candidates['PCP'] = pcp;
		CandidateManager.candidates['PEV'] = pev;
		CandidateManager.candidates['PPD/PSD'] = ppdpsd;
		CandidateManager.candidates['CDS-PP'] = cdspp;
		CandidateManager.candidates['PAN'] = pan;
		CandidateManager.candidates['Ind'] = indy;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetSouthAfrica() {
		var anc = new Candidate('ANC',
			['#006600','#006600','#006600','#006600']);
		var da = new Candidate('DA',
			['#005ba6','#005ba6','#005ba6','#005ba6']);
		var eff = new Candidate('EFF',
			['#852a2a','#852a2a','#852a2a','#852a2a']);
		var ifp = new Candidate('IFP',
			['#ff0000','#ff0000','#ff0000','#ff0000']);
		var ffp = new Candidate('FF+',
			['#ec8713','#ec8713','#ec8713','#ec8713']);
		var acdp = new Candidate('ACDP',
			['#ba0c2f','#ba0c2f','#ba0c2f','#ba0c2f']);
		var udm = new Candidate('UDM',
			['#ffde01','#ffde01','#ffde01','#ffde01']);
		var atm = new Candidate('ATM',
			['#00adee','#00adee','#00adee','#00adee']);
		var good = new Candidate('Good',
			['#f36900','#f36900','#f36900','#f36900']);
		var nfp = new Candidate('NFP',
			['#ff8040','#ff8040','#ff8040','#ff8040']);
		var aic = new Candidate('AIC',
			['#ffb543','#ffb543','#ffb543','#ffb543']);
		var cope = new Candidate('COPE',
			['#ffca08','#ffca08','#ffca08','#ffca08']);
		var pac = new Candidate('PAC',
			['#008718','#008718','#008718','#008718']);
		var alj = new Candidate('ALJ',
			['#1c9069','#1c9069','#1c9069','#1c9069']);

		CandidateManager.candidates['ANC'] = anc;
		CandidateManager.candidates['DA'] = da;
		CandidateManager.candidates['EFF'] = eff;
		CandidateManager.candidates['IFP'] = ifp;
		CandidateManager.candidates['FF+'] = ffp;
		CandidateManager.candidates['ACDP'] = acdp;
		CandidateManager.candidates['UDM'] = udm;
		CandidateManager.candidates['ATM'] = atm;
		CandidateManager.candidates['Good'] = good;
		CandidateManager.candidates['NFP'] = nfp;
		CandidateManager.candidates['AIC'] = aic;
		CandidateManager.candidates['COPE'] = cope;
		CandidateManager.candidates['PAC'] = pac;
		CandidateManager.candidates['ALJ'] = alj;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetIndia() {
		var bjp = new Candidate('BJP',
			['#ff9933','#ff9933','#ff9933','#ff9933']);
		var ysrcp = new Candidate('YSRCP',
			['#1569c7','#1569c7','#1569c7','#1569c7']);
		var ss = new Candidate('SS',
			['#ff6634','#ff6634','#ff6634','#ff6634']);
		var jd = new Candidate('JD',
			['#004285','#004285','#004285','#004285']);
		var bjd= new Candidate('BJD',
			['#006400','#006400','#006400','#006400']);
		var bsp = new Candidate('BSP',
			['#0000ff','#0000ff','#0000ff','#0000ff']);
		var trs = new Candidate('TRS',
			['#ff89ce','#ff89ce','#ff89ce','#ff89ce']);
		var ljp = new Candidate('LJP',
			['#40ff7e','#40ff7e','#40ff7e','#40ff7e']);

		var inc = new Candidate('INC',
			['#00bfff','#00bfff','#00bfff','#00bfff']);
		var dmk = new Candidate('DMK',
			['#de1100','#de1100','#de1100','#de1100']);
		var ncp = new Candidate('NCP',
			['#008080','#008080','#008080','#008080']);

		var aitc = new Candidate('AITC',
			['#00f200','#00f200','#00f200','#00f200']);
		var sp = new Candidate('SP',
			['#a30000','#a30000','#a30000','#a30000']);

		CandidateManager.candidates['BJP'] = bjp;
		CandidateManager.candidates['YSRCP'] = ysrcp;
		CandidateManager.candidates['SS'] = ss;
		CandidateManager.candidates['JD'] = jd;
		CandidateManager.candidates['BJD'] = bjd;
		CandidateManager.candidates['BSP'] = bsp;
		CandidateManager.candidates['TRS'] = trs;
		CandidateManager.candidates['LJP'] = ljp;
		CandidateManager.candidates['INC'] = inc;
		CandidateManager.candidates['DMK'] = dmk;
		CandidateManager.candidates['NCP'] = ncp;
		CandidateManager.candidates['AITC'] = aitc;
		CandidateManager.candidates['SP'] = sp;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetSweden() {
		var sap = new Candidate('SAP',
			['#ed1231','#ed1231','#ed1231','#ed1231']);
		var mp = new Candidate('MP',
			['#2b912b','#2b912b','#2b912b','#2b912b']);
		
		var c = new Candidate('C',
			['#216c3e','#216c3e','#216c3e','#216c3e']);
		var l = new Candidate('L',
			['#006ab5','#006ab5','#006ab5','#006ab5']);
		var v = new Candidate('V',
			['#ec121e','#ec121e','#ec121e','#ec121e']);
		
		var m = new Candidate('M',
			['#019cdb','#019cdb','#019cdb','#019cdb']);
		var sd = new Candidate('SD',
			['#fedf09','#fedf09','#fedf09','#fedf09']);
		var kd = new Candidate('KD',
			['#005ea3','#005ea3','#005ea3','#005ea3']);
		var ind = new Candidate('Ind',
			['#999999','#999999','#999999','#999999']);
		
		CandidateManager.candidates['SAP'] = sap;
		CandidateManager.candidates['MP'] = mp;
		CandidateManager.candidates['C'] = c;
		CandidateManager.candidates['L'] = l;
		CandidateManager.candidates['V'] = v;
		CandidateManager.candidates['M'] = m;
		CandidateManager.candidates['SD'] = sd;
		CandidateManager.candidates['KD'] = kd;
		CandidateManager.candidates['Ind'] = ind;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetSwitzerland() {
		var svpudc = new Candidate('SVP/UDC', 
			['#088a4b','#088a4b','#088a4b','#088a4b']);
		var fdpplr = new Candidate('FDP/PLR', 
			['#0e52a0','#0e52a0','#0e52a0','#0e52a0']);
		var spps = new Candidate('SDP/PSS', 
			['#FA1360','#FA1360','#FA1360','#FA1360']);
		var gpspes = new Candidate('GPS/PES', 
			['#01df01','#01df01','#01df01','#01df01']);
		var cvppdc = new Candidate('CVP/PDC', 
			['#ef7d00','#ef7d00','#ef7d00','#ef7d00']);
		var glppvl = new Candidate('GLP/PVL',
			['#a6cf42','#a6cf42','#a6cf42','#a6cf42']);
		var bdppdb = new Candidate('BDP/PBD',
			['#000000','#000000','#000000','#000000']);
		var evppev = new Candidate('EVP/PEV',
			['#ffd735','#ffd735','#ffd735','#ffd735']);
		var ldt = new Candidate('LdT',
			['#6495ed','#6495ed','#6495ed','#6495ed']);
		var pdapst = new Candidate('PdA/PST',
			['#FF0000','#FF0000','#FF0000','#FF0000']);
		var sols = new Candidate('SolS',
			['#ababab','#ababab','#ababab','#ababab']);
		var eduudf = new Candidate('EDU/UDF',
			['#9b2a58','#9b2a58','#9b2a58','#9b2a58']);

		CandidateManager.candidates['SVP/UDC'] = svpudc ;
		CandidateManager.candidates['FDP/PLR'] = fdpplr;
		CandidateManager.candidates['SP/PS'] = spps;
		CandidateManager.candidates['GPS/PES'] = gpspes;
		CandidateManager.candidates['CVP/PDC'] = cvppdc;
		CandidateManager.candidates['GLP/PVL'] = glppvl;
		CandidateManager.candidates['BDP/PBD'] = bdppdb;
		CandidateManager.candidates['EVP/PEV'] = evppev;
		CandidateManager.candidates['PdA/PST'] = pdapst;
		CandidateManager.candidates['SolS'] = sols;
		CandidateManager.candidates['EDU/UDF'] = eduudf;
		CandidateManager.candidates['LdT'] = ldt;
		LegendManager.toggleLegendLeans()
	}
	
	static loadPresetPakistan() {
		var pti = new Candidate('PTI', 
			['#ff0f0f','#ff0f0f','#ff0f0f','#ff0f0f']);
		var mqmp = new Candidate('MQM-P', 
			['#8f0303','#8f0303','#8f0303','#8f0303']);
		var pmlq = new Candidate('PML-Q', 
			['#00800d','#00800d','#00800d','#00800d']);
		var bap = new Candidate('BAP', 
			['#9eee58','#9eee58','#9eee58','#9eee58']);
		var gda = new Candidate('GDA', 
			['#769c1e','#769c1e','#769c1e','#769c1e']);
		var aml = new Candidate('AML', 
			['#4aee31','#4aee31','#4aee31','#4aee31']);
		var jwp = new Candidate('JWP', 
			['#d984e3','#d984e3','#d984e3','#d984e3']);
		
		var bnpm = new Candidate('BNP-M', 
			['#eee600','#eee600','#eee600','#eee600']);

		var pmln = new Candidate('PML-N', 
			['#228000','#228000','#228000','#228000']);
		var ppp = new Candidate('PPP', 
			['#000000','#000000','#000000','#000000']);
		var mma = new Candidate('MMA', 
			['#004c00','#004c00','#004c00','#004c00']);
		var anp = new Candidate('ANP', 
			['#ff0800','#ff0800','#ff0800','#ff0800']);

		var ind = new Candidate('Ind', 
			['#afafaf','#afafaf','#afafaf','#afafaf']);

		CandidateManager.candidates['PTI'] = pti;
		CandidateManager.candidates['MQM-P'] = mqmp;
		CandidateManager.candidates['PML-Q'] = pmlq;
		CandidateManager.candidates['BAP'] = bap;
		CandidateManager.candidates['GDA'] = gda;
		CandidateManager.candidates['AML'] = aml;
		CandidateManager.candidates['JWP'] = jwp;
		CandidateManager.candidates['BNP-M'] = bnpm;
		CandidateManager.candidates['PML-N'] = pmln;
		CandidateManager.candidates['PPP'] = ppp;
		CandidateManager.candidates['MMA'] = mma;
		CandidateManager.candidates['ANP'] = anp;
		CandidateManager.candidates['Ind'] = ind;
		LegendManager.toggleLegendLeans()
	}
}
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

	// directly change the color of a state (add error checking pls)
	setColor(candidate, colorValue, options = {setDelegates: true}) {
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

			var land = document.getElementById(this.name + '-land');
			if(land != null) {
				land.style.fill = color;
			}

			var button = document.getElementById(this.name + '-button');
			if(button != null) {
				button.style.fill = color;
			}
		}

		if(this.onChange) {
			this.onChange();
		}
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
function updateBattleChart() {

	if(Object.keys(CandidateManager.candidates).length > 3) {
		if(mobile) {
			ChartManager.setChart('pie', 'bottom');
		} else {
			ChartManager.setChart('pie');
		}

		return;
	}

	var tossup = document.getElementById('tossupbar');

	var topbar = document.getElementById('topbar');
	var topbarSolid = document.getElementById('topbar-solid');
	var topbarLikely = document.getElementById('topbar-likely');
	var topbarLean = document.getElementById('topbar-lean');
	var topbarTilt = document.getElementById('topbar-tilt');

	var bottombar = document.getElementById('bottombar');
	var bottombarSolid = document.getElementById('bottombar-solid');
	var bottombarLikely = document.getElementById('bottombar-likely');
	var bottombarLean = document.getElementById('bottombar-lean');
	var bottombarTilt = document.getElementById('bottombar-tilt');

	// this is for when the candidates get removed
	// if a candidate gets removed, it will not get cleared from
	// the graph in the loop below
	topbar.style.flexBasis = '';
	bottombar.style.flexBasis = '';

	var candidateIndex = -1;
	for(var key in CandidateManager.candidates) {
		++candidateIndex;

		var candidate = CandidateManager.candidates[key];

		if(candidateIndex == 0) {
			tossup.style.background = candidate.colors[2];
			
			tossup.style.flexBasis = '' + (candidate.voteCount / totalVotes) * 100 + '%';
			if(ChartManager.chartLabels) {
				tossup.innerHTML = '<p>' + candidate.voteCount + '</p>';
			} else {
				tossup.innerHTML = '<p></p>';
			}
		} else if(candidateIndex == 1) {
			topbar.style.flexBasis = '' + 
				(candidate.voteCount / totalVotes) * 100 + '%';
			if(ChartManager.chartLeans) {
				topbarSolid.style.flexBasis = '' + 
					(candidate.probVoteCounts[0] / candidate.voteCount) * 100 + '%';
				topbarSolid.style.background = candidate.colors[0];

				topbarLikely.style.flexBasis = '' + 
					(candidate.probVoteCounts[1] / candidate.voteCount) * 100 + '%';
				topbarLikely.style.background = candidate.colors[1];

				topbarLean.style.flexBasis = '' + 
					(candidate.probVoteCounts[2] / candidate.voteCount) * 100 + '%';
				topbarLean.style.background = candidate.colors[2];

				topbarTilt.style.flexBasis = '' +
					(candidate.probVoteCounts[3] / candidate.voteCount) * 100 + '%';
				topbarTilt.style.background = candidate.colors[3];
				
				if(ChartManager.chartLabels) {
					topbarSolid.innerHTML = '<p>'+candidate.probVoteCounts[0]+'</p>';
					topbarLikely.innerHTML = '<p>'+candidate.probVoteCounts[1]+'</p>';
					topbarLean.innerHTML = '<p>'+candidate.probVoteCounts[2]+'</p>';
					topbarTilt.innerHTML = '<p>' + candidate.probVoteCounts[3] + '</p>';
				} else {
					topbarSolid.innerHTML = '<p></p>';
					topbarLikely.innerHTML = '<p></p>';
					topbarLean.innerHTML = '<p></p>';
					topbarTilt.innerHTML = '<p></p>';
				}
			} else {
				topbarSolid.style.flexBasis = '100%'; 
				topbarSolid.style.background = candidate.colors[0];
				topbarLikely.style.flexBasis = '0%';
				topbarLikely.style.background = candidate.colors[1];
				topbarLean.style.flexBasis = '0%'; 
				topbarLean.style.background = candidate.colors[2];
				topbarTilt.style.flexBasis = '0%';
				topbarTilt.style.background = candidate.colors[3];

				if(ChartManager.chartLabels) {
					topbarSolid.innerHTML = '<p>' + (
						candidate.probVoteCounts[0] 
						+ candidate.probVoteCounts[1]
						+ candidate.probVoteCounts[2]
						+ candidate.probVoteCounts[3]) + '</p>';
					topbarLikely.innerHTML = '<p></p>';
					topbarLean.innerHTML = '<p></p>';
					topbarTilt.innerHTML = '<p></p>';
				} else {
					topbarSolid.innerHTML = '<p></p>';
					topbarLikely.innerHTML = '<p></p>';
					topbarLean.innerHTML = '<p></p>';
					topbarTilt.innerHTML = '<p></p>';
				}
			}

		} else if(candidateIndex == 2) {
			bottombar.style.flexBasis = '' + 
				(candidate.voteCount / totalVotes) * 100 + '%';
			if(ChartManager.chartLeans) {
				bottombarSolid.style.flexBasis = '' + 
					(candidate.probVoteCounts[0] / candidate.voteCount) * 100 + '%';
				bottombarSolid.style.background = candidate.colors[0];

				bottombarLikely.style.flexBasis = '' + 
					(candidate.probVoteCounts[1] / candidate.voteCount) * 100 + '%';
				bottombarLikely.style.background = candidate.colors[1];

				bottombarLean.style.flexBasis = '' + 
					(candidate.probVoteCounts[2] / candidate.voteCount) * 100 + '%';
				bottombarLean.style.background = candidate.colors[2];
				
				bottombarTilt.style.flexBasis = '' +
					(candidate.probVoteCounts[3] / candidate.voteCount) * 100 + '%';
				bottombarTilt.style.background = candidate.colors[3];

				if(ChartManager.chartLabels) {
					bottombarSolid.innerHTML = '<p>'+candidate.probVoteCounts[0]+'</p>';
					bottombarLikely.innerHTML = '<p>'+candidate.probVoteCounts[1]+'</p>';
					bottombarLean.innerHTML = '<p>'+candidate.probVoteCounts[2]+'</p>';
					bottombarTilt.innerHTML = '<p>' + candidate.probVoteCounts[3] + '</p>';
				} else {
					bottombarSolid.innerHTML = '<p></p>';
					bottombarLikely.innerHTML = '<p></p>';
					bottombarLean.innerHTML = '<p></p>';
					bottombarTilt.innerHTML = '<p></p>';
				}
			} else {	
				bottombarSolid.style.flexBasis = '100%';
				bottombarSolid.style.background = candidate.colors[0];
				bottombarLikely.style.flexBasis = '0%';
				bottombarLikely.style.background = candidate.colors[1];
				bottombarLean.style.flexBasis = '0%'; 
				bottombarLean.style.background = candidate.colors[2];
				bottombarTilt.style.flexBasis = '0%';
				bottombarTilt.style.background = candidate.colors[3];

				if(ChartManager.chartLabels) {
					bottombarSolid.innerHTML = '<p>' + (
						candidate.probVoteCounts[0] 
						+ candidate.probVoteCounts[1]
						+ candidate.probVoteCounts[2]
						+ candidate.probVoteCounts[3]) + '</p>';
					bottombarLikely.innerHTML = '<p></p>';
					bottombarLean.innerHTML = '<p></p>';
					bottombarTilt.innerHTML = '<p></p>';
				} else {
					bottombarSolid.innerHTML = '<p></p>';
					bottombarLikely.innerHTML = '<p></p>';
					bottombarLean.innerHTML = '<p></p>';
					bottombarTilt.innerHTML = '<p></p>';
				}
			}
		}
	}
}

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
			PopularVote.view(district, paintIndex)
		});
		PopularVote.view(AL, paintIndex)
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
			PopularVote.view(state, paintIndex)
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

function paintEntireState(state) {
	if(MapLoader.save_filename === './res/usa/house/12-2-2019-house.svg' ||
		MapLoader.save_filename === './res/usa_county.svg') {
		var setDisable = !state.disabled;
		var stateName = state.name.substr(0,2);
		for(var index = 0, length = states.length; index < length; ++index) {
			var state_a = states[index];
			var stateName_a = '';
			if(MapLoader.save_filename === './res/usa/house/12-2-2019-house.svg') {
				stateName = state.name.substr(0, 2);
				stateName_a = state_a.name.substr(0, 2);
			} else if(MapLoader.save_filename === './res/usa_county.svg') {

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
		MapLoader.save_filename === './res/usa_county.svg') {
		var setDisable = !state.disabled;
		var stateName = state.name.substr(0,2);
		for(var index = 0, length = states.length; index < length; ++index) {
			var state_a = states[index];
			var stateName_a = '';
			if(MapLoader.save_filename === './res/usa/house/12-2-2019-house.svg') {
				stateName = state.name.substr(0, 2);
				stateName_a = state_a.name.substr(0, 2);
			} else if(MapLoader.save_filename === './res/usa_county.svg') {

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
function verifyCongress() {
	if(mobile) {
		return false;
	}

	var element = document.getElementById('sidebar-congress');

	if(enableCongress) {
		element.style.display = 'block';
		return true;
	} else {
		element.style.display = 'none';
		return false;
	}
}

function verifyCongressContested() {
	if(mobile) {
		return false;
	}

	var element = document.getElementById('sidebar-congress-contested');

	if(enableCongressContested) {
		element.style.display = 'block';
		return true;
	} else {
		element.style.display = 'none';
		return false;
	}
}

function setCongressContested() {
	if(verifyCongressContested() === false) {
		return;
	}

	var element = document.getElementById('sidebar-congress-contested');

	db_getCongress(function(data) {
		for(var stateIndex = 0, length = states.length; stateIndex < length; ++stateIndex) {
			var state = states[stateIndex];
			var stateName = state.name.split('-')[0];
			var district = state.name.split('-')[1];

			// Convert district to a number
			// AL -> 0, 01 -> 1, 02 -> 2
			var districtIndex = district;
			if(districtIndex === 'AL') {
				districtIndex = '0';
			}
			districtIndex = parseInt(districtIndex).toString();
			
			var districtData = data.filter(obj => {
				return obj.State === stateName &&
					obj.District === districtIndex;
			})[0];

			if(state.colorValue !== 0) {
				var district = document.createElement('div');
				district.setAttribute('class', 'sidebar-box');

				var title = document.createElement('h3');
				title.innerHTML = state.name;
				district.appendChild(title);

				var rep = document.createElement('div');
				rep.innerHTML = districtData.Representative + ' - ' + districtData.Party;
				district.appendChild(rep);

				var color = document.createElement('div');
				color.setAttribute('class', 'sidebar-congress-colors');
				var proj = document.createElement('div');
				proj.innerHTML = '<span>Projection</span>';
				proj.setAttribute('class', 'sidebar-congress-color');
				proj.style.backgroundColor = state.htmlElement.style.fill;
				color.appendChild(proj);
				var map = document.createElement('div');
				map.innerHTML = '<span>Map</span>';
				map.setAttribute('class', 'sidebar-congress-color');
				map.style.backgroundColor = state.htmlElement.style.fill;
				map.style.cursor = 'pointer';
				state.onChange = (function() {
					var m = map;
					var s = state;
					return function() {
						m.style.backgroundColor = s.htmlElement.style.fill;
					}
				})();

				map.onclick = (function() {
					var s = state;
					var m = map;
					return function() {
						s.incrementCandidateColor(paintIndex, false);	
						m.style.backgroundColor = s.htmlElement.style.fill;
					}
				})();
				color.appendChild(map);

				district.appendChild(color);
				element.appendChild(district);
			}
		}
	});

}

function setCongressOnHover() {

	if(verifyCongress() === false) {
		return;
	}

	db_getCongress(function(data) {
		for(var stateIndex = 0, length = states.length; stateIndex < length; ++stateIndex) {
			var state = states[stateIndex];

			state.htmlElement.onmouseover = (function() {
				var stateName = state.name.split('-')[0];
				var district = state.name.split('-')[1];

				// Convert district to a number
				// AL -> 0, 01 -> 1, 02 -> 2
				var districtIndex = district;
				if(districtIndex === 'AL') {
					districtIndex = '0';
				}
				districtIndex = parseInt(districtIndex).toString();

				var districtData = data.filter(obj => {
					return obj.State === stateName &&
						obj.District === districtIndex;
				})[0];

				return function() {
					var element = document.getElementById('sidebar-congress-district');
					element.innerHTML = stateName + '-' + district;
					element = document.getElementById('sidebar-congress-representative');
					element.innerHTML = districtData.Representative;
					element = document.getElementById('sidebar-congress-party');
					element.innerHTML = districtData.Party;

					if(KeyboardManager.keyStates[70]) {
						stateClick(this, {setSolid: true});
					}
				}
			})();
		}
	});
}

function db_getCongress(onLoad) {
	$.ajax({
		url: 'req_congress.php',
		type: 'GET',
		success : function(data) {
			var obj = jQuery.parseJSON(data);
			onLoad(obj);
		},
		error : function(a, b, c) {
			console.log(a);
			console.log(b);
			console.log(c);
		}
	});
}
data = {
'argentina_chamber_of_deputies': {'Buenos Aires': 70, 'Buenos Aires City': 25, 'Catamarca': 5, 'Chaco': 7, 'Chubut': 5, 'Córdoba': 18, 'Corrientes': 7, 'Entre Ríos': 9, 'Formosa': 5, 'Jujuy': 6, 'La Pampa': 5, 'La Rioja': 5, 'Mendoza': 10, 'Misiones': 7, 'Neuquén': 5, 'Río Negro': 5, 'Salta': 7, 'San Juan': 6, 'San Luis': 5, 'Santa Cruz': 5, 'Santa Fe': 19, 'Santiago del Estero': 7, 'Tierra del Fuego': 5, 'Tucumán': 9},

'turkey_national_assembly': {'Adana': 15, 'Adıyaman':5, 'Afyonkarahisar':6, 'Ağrı':4, 'Aksaray':4, 'Amasya':3, 'Ankara':36, 'Antalya':16, 'Ardahan':2, 'Artvin':2, 'Aydın':8, 'Balıkesir':9, 'Bartın':2, 'Batman': 5, 'Bayburt':1, 'Bilecik':2, 'Bingöl':3, 'Bitlis':3, 'Bolu':3, 'Burdur':3, 'Bursa':20, 'Çanakkale':4, 'Çankırı':2, 'Çorum':4, 'Denizli':8, 'Diyarbakır':12, 'Düzce':3, 'Edirne':4, 'Elazığ':5, 'Erzincan':2, 'Erzurum':6, 'Eskişehir':7, 'Gaziantep':14, 'Giresun':4, 'Gümüşhane':2, 'Hakkâri':3, 'Hatay':11, 'Iğdır':2, 'Isparta':4, 'İstanbul':98, 'İzmir':28, 'Kahramanmaraş':8, 'Kars':3, 'Kastamonu':3, 'Karabük':3, 'Karaman':3, 'Kayseri':10, 'Kilis':2, 'Kırklareli':3, 'Kırıkkale':3, 'Kırşehir':2, 'Kocaeli':13, 'Konya':15, 'Kütahya':5, 'Malatya':6, 'Manisa':10, 'Mardin':6, 'Mersin':13, 'Muğla':7, 'Muş':4, 'Nevşehir':3, 'Niğde':3, 'Ordu':6, 'Osmaniye':4, 'Rize':3, 'Sakarya':7, 'Samsun':9, 'Siirt':3, 'Sinop':2, 'Sivas':5, 'Şanlıurfa':14, 'Şırnak':4, 'Tekirdağ':7, 'Tokat':5, 'Trabzon':6, 'Tunceli':2, 'Uşak':3, 'Van':8, 'Yalova':3, 'Yozgat':4, 'Zonguldak':5},

'south_africa_national_assembly': {'Eastern Cape': 25, 'Western Cape': 23, 'Northern Cape': 5, 'Gauteng': 48, 'KwaZulu': 41, 'Limpopo': 19, 'Mpumalanga': 15, 'Free State': 11, 'North West Cape': 13, 'South Africa': 200},

'portugal_constituencies': {'Lisbon': 47, 'Porto': 39, 'Braga': 19, 'Setúbal': 18, 'Aveiro': 16, 'Leiria': 10, 'Coimbra': 9, 'Faro': 9, 'Santarém': 9, 'Viseu': 9, 'Madeira': 6, 'Viana do Castelo': 6, 'Azores': 5, 'Vila Real': 5, 'Guarda': 4, 'Castelo Branco': 4, 'Beja': 3, 'Bragança': 3, 'Évora': 3, 'Portalegre': 2, 'Europe': 2, 'Outside Europe': 2},

'ireland_constituencies': {'Donegal': 5, 'Sligo-Leitrim': 4, 'Mayo': 4, 'Galway-West': 5, 'Clare': 4, 'Kerry': 5, 'Cork South-West': 3, 'Cork North-West': 3, 'Limerick County': 3, 'Limerick City': 4, 'Cork South-Central': 4, 'Cork North-Central': 4, 'Cork East': 4, 'Waterford': 4, 'Tipperary': 5, 'Carlow-Kilkenny': 5, 'Wexford': 5, 'Wicklow & East Carlow': 5, 'Kildare North': 4, 'Kildare South': 3, 'Laois': 3, 'Offaly': 3, 'Galway-East': 3, 'Roscommon-Galway': 3, 'Longford-Westmeath': 4, 'Meath West': 3, 'Meath East': 3, 'Louth': 5, 'Cavan-Monaghan': 4, 'Sligo-Leitrim': 4, 'Donegal': 5, 'Dublin Fingal': 5, 'Dublin West': 4, 'Dublin North-West': 3, 'Dublin Bay North': 5, 'Dublin Mid-West': 4, 'Dublin South-Central': 4, 'Dublin Central': 3, 'Dublin Bay South': 4, 'Dublin South-West': 5, 'Dublin Rathdown': 3, 'Dún Laoghaire': 4},

'brazil_deputies':{'São Paulo': 70, 'Minas Gerais': 53, 'Rio de Janeiro': 46, 'Bahia': 39, 'Rio Grande do Sul': 31, 'Paraná': 30, 'Pernambuco': 25, 'Ceará': 22, 'Maranhão': 18, 'Goiás': 17, 'Pará': 17, 'Santa Catarina': 16, 'Paraíba': 12, 'Espírito Santo': 10, 'Piauí': 10, 'Alagoas': 9, 'Acre': 8, 'Amazonas': 8, 'Amapá': 8, 'Distrito Federal do Brasil': 8, 'Mato Grosso do Sul': 8, 'Mato Grosso': 8, 'Rio Grande do Norte': 8, 'Rondônia': 8, 'Roraima': 8, 'Sergipe': 8, 'Tocantins': 8},

'netherlands_provinces':{'Groningen': 43, 'Friesland': 43, 'Drenthe': 41, 'Overijssel': 47, 'Flevoland': 41, 'Gelderland': 55, 'Utrecht': 49, 'Noord-Holland': 55, 'Zuid-Holland': 55, 'Zeeland': 39, 'Noord-Brabant': 55, 'Limburg': 47},

'spain_constituencies': {'La Coruña': 8, 'Pontevedra': 7, 'Lugo': 4, 'Orense': 4, 'Asturias': 7, 'León': 4,'Zamora': 3, 'Salamanca': 4, 'Cáceres': 4, 'Badajoz': 6, 'Huelva': 5, 'Seville': 12, 'Cádiz': 9, 'Cordoba': 6, 'Málaga': 11, 'Granada': 7, 'Almeria': 6, 'Jaen': 5, 'Murcia': 10, 'Alicante': 12, 'Albacete': 4, 'Ciudad Real': 5, 'Toledo': 6, 'Cuenca': 3, 'Valencia': 15, 'Castellón': 5, 'Teruel': 3, 'Guadalajara': 3, 'Madrid': 37, 'Avila': 3, 'Segovia': 3, 'Valladolid': 5, 'Palencia': 3, 'Burgos': 4, 'Soria': 2, 'Zaragoza': 7, 'Tarragona': 6, 'Barcelona': 32, 'Girona': 6, 'Lreida': 4, 'Huesca': 3, 'Navarre': 5, 'La Rioja': 4, 'Álava': 4, 'Guipuzcoa': 6, 'Biscay': 8, 'Cantabria': 5, 'Ceuta': 1, 'Melilla': 1, 'Santa Cruz de Tenerife': 7, 'Las Palmas': 8, 'Balearic Islands': 8},

'switzerland_national_council': {'Aargau': 16, 'Appenzell Outer Rhodes': 1, 'Appenzell Inner Rhodes': 1, 'Basel-Landschaft': 7, 'Basel-Stadt': 5, 'Bern': 24, 'Fribourg': 7, 'Geneva': 12, 'Glarus': 1, 'Graubünden': 5, 'Jura': 2, 'Lucerne': 9, 'Neuchâtel': 4, 'Nidwalden': 1, 'Obwalden': 1, 'St. Gallen': 12, 'Schaffhausen': 2, 'Schwyz': 4, 'Solothurn': 6, 'Thurgau': 6, 'Ticino': 8, 'Uri': 1, 'Vaud': 19, 'Valais': 8, 'Zurich': 35, 'Zug': 3},

'switzerland_council_of_states': {'Aargau': 2, 'Appenzell Outer Rhodes': 1, 'Appenzell Inner Rhodes': 1, 'Basel-Landschaft': 1, 'Basel-Stadt': 1, 'Bern': 2, 'Fribourg': 2, 'Geneva': 2, 'Glarus': 2, 'Graubünden': 2, 'Jura': 2, 'Lucerne': 2, 'Neuchâtel': 2, 'Nidwalden': 1, 'Obwalden': 1, 'St. Gallen': 2, 'Schaffhausen': 2, 'Schwyz': 2, 'Solothurn': 2, 'Thurgau': 2, 'Ticino': 2, 'Uri': 2, 'Vaud': 2, 'Valais': 2, 'Zurich': 2, 'Zug': 2},

'sweden_riksdag': {'Sweden': 39, 'Stockholms kommun': 29, 'Stockholm': 39, 'Uppsala': 11, 'Södermanland': 9, 'Östergötland': 14, 'Jönköping': 11, 'Kronoberg': 6, 'Kalmar': 8, 'Gotland': 2, 'Blekinge': 5, 'Malmö kommun': 10, 'Skåne läns västra': 9, 'Skåne läns södra': 12, 'Skåne läns norra och östra': 10, 'Värmland': 9, 'Örebro': 9, 'Västmanland': 8, 'Dalarna': 9, 'Gävleborg': 9, 'Västernorrland': 8, 'Jämtland': 4, 'Västerbotten': 9, 'Norrbotten': 8, 'Halland': 10, 'Göteborgs kommun': 17, 'Västra Götalands läns norra': 8, 'Västra Götalands läns östra': 9, 'Västra Götalands läns västra': 11, 'Västra Götalands läns södra': 7},

'usa_voting_pop': {'AL': 3766477, 'AK': 554567, 'AZ': 5299579, 'AR': 2283195, 'CA': 30157154, 'CO': 4279173, 'CT': 2823158, 'DE': 747791, 'FL': 16465727, 'GA': 7798827, 'HI': 1120541, 'ID': 1245967, 'IL': 9875430, 'IN': 5057601, 'IA': 2403962, 'KS': 2192338, 'KY': 3426345, 'LA': 3567717, 'ME': 1081705, 'ME-AL': 1081705, 'ME-D1': 555860, 'ME-D2': 525845, 'MD': 4667719, 'MA': 5433677, 'MI': 7737243, 'MN': 4231619, 'MS': 2267438, 'MO': 4706137, 'MT': 814909, 'NE': 1445479, 'NE-AL': 1445479, 'NE-D1': 493216, 'NE-D2': 493516, 'NE-D3': 458747, 'NV': 2262631, 'NH': 1074207, 'NJ': 6969717, 'NM': 1590352, 'NY': 15564730, 'NC': 7848068, 'ND': 581641, 'OH': 9002201, 'OK': 2961933, 'OR': 3224738, 'PA': 10109422, 'RI': 848045, 'SC': 3863498, 'SD': 652167, 'TN': 5149399, 'TX': 20568009, 'UT': 2129444, 'VT': 506066, 'VA': 6541685, 'WA': 5658502, 'WV': 1456034, 'WI': 4491015, 'WY': 446600, 'DC': 560277},

'usa_territories_ec': {'AL': 9, 'AK': 3, 'AZ': 11, 'AR': 6, 'CA': 55, 'CO': 9, 'CT': 7, 'DE': 3, 'FL': 29, 'GA': 16, 'HI': 4, 'ID': 4, 'IL': 20, 'IN': 11, 'IA': 6, 'KS': 6, 'KY': 8, 'LA': 8, 'ME': 4, 'ME-AL': 2, 'ME-D1': 1, 'ME-D2': 1, 'MD': 10, 'MA': 11, 'MI': 16, 'MN': 10, 'MS': 6, 'MO': 10, 'MT': 3, 'NE': 5, 'NE-AL': 2, 'NE-D1': 1, 'NE-D2': 1, 'NE-D3': 1, 'NV': 6, 'NH': 4, 'NJ': 14, 'NM': 5, 'NY': 29, 'NC': 15, 'ND': 3, 'OH': 18, 'OK': 7, 'OR': 7, 'PA': 20, 'RI': 4, 'SC': 9, 'SD': 3, 'TN': 11, 'TX': 38, 'UT': 6, 'VT': 3, 'VA': 13, 'WA': 12, 'WV': 5, 'WI': 10, 'WY': 3, 'DC': 3, 'AS': 1, 'GU': 1, 'MP': 1, 'PR': 1, 'VI': 1},

'usa_ec': {'AL': 9, 'AK': 3, 'AZ': 11, 'AR': 6, 'CA': 55, 'CO': 9, 'CT': 7, 'DE': 3, 'FL': 29, 'GA': 16, 'HI': 4, 'ID': 4, 'IL': 20, 'IN': 11, 'IA': 6, 'KS': 6, 'KY': 8, 'LA': 8, 'ME': 4, 'ME-AL': 2, 'ME-D1': 1, 'ME-D2': 1, 'MD': 10, 'MA': 11, 'MI': 16, 'MN': 10, 'MS': 6, 'MO': 10, 'MT': 3, 'NE': 5, 'NE-AL': 2, 'NE-D1': 1, 'NE-D2': 1, 'NE-D3': 1, 'NV': 6, 'NH': 4, 'NJ': 14, 'NM': 5, 'NY': 29, 'NC': 15, 'ND': 3, 'OH': 18, 'OK': 7, 'OR': 7, 'PA': 20, 'RI': 4, 'SC': 9, 'SD': 3, 'TN': 11, 'TX': 38, 'UT': 6, 'VT': 3, 'VA': 13, 'WA': 12, 'WV': 5, 'WI': 10, 'WY': 3, 'DC': 3},

'usa_1972_ec': {'AL': 9, 'AK': 3, 'AZ': 6, 'AR': 6, 'CA': 45, 'CO': 7, 'CT': 8, 'DE': 3, 'FL': 17, 'GA': 12, 'HI': 4, 'ID': 4, 'IL': 26, 'IN': 13, 'IA': 8, 'KS': 7, 'KY': 9, 'LA': 10, 'ME': 4, 'ME-AL': 2, 'ME-D1': 1, 'ME-D2': 1, 'MD': 10, 'MA': 14, 'MI': 21, 'MN': 10, 'MS': 7, 'MO': 12, 'MT': 4, 'NE': 5, 'NV': 3, 'NH': 4, 'NJ': 17, 'NM': 4, 'NY': 41, 'NC': 13, 'ND': 3, 'OH': 25, 'OK': 8, 'OR': 6, 'PA': 27, 'RI': 4, 'SC': 8, 'SD': 4, 'TN': 10, 'TX': 26, 'UT': 4, 'VT': 3, 'VA': 11, 'WA': 9, 'WV': 6, 'WI': 11, 'WY': 3, 'DC': 3},

'usa_pre_civilwar_ec': {'AL': 9, 'AK': 0, 'AZ': 0, 'AR': 4, 'CA': 4, 'CO': 0, 'CT': 6, 'DE': 3, 'FL': 3, 'GA': 10, 'HI': 0, 'ID': 0, 'IL': 11, 'IN': 13, 'IA': 4, 'KS': 0, 'KY': 12, 'LA': 6, 'ME': 8, 'MD': 8, 'MA': 13, 'MI': 6, 'MN': 4, 'MS': 7, 'MO': 9, 'MT': 0, 'NE': 0, 'NV': 0, 'NH': 5, 'NJ': 7, 'NM': 0, 'NY': 35, 'NC': 10, 'ND': 0, 'OH': 23, 'OK': 0, 'OR': 3, 'PA': 27, 'RI': 4, 'SC': 8, 'SD': 0, 'TN': 12, 'TX': 4, 'UT': 0, 'VT': 5, 'VA': 15, 'WA': 0, 'WI': 5, 'WY': 0, 'DC': 0},

'usa_no_districts_ec': {'AL': 9, 'AK': 3, 'AZ': 11, 'AR': 6, 'CA': 55, 'CO': 9, 'CT': 7, 'DE': 3, 'FL': 29, 'GA': 16, 'HI': 4, 'ID': 4, 'IL': 20, 'IN': 11, 'IA': 6, 'KS': 6, 'KY': 8, 'LA': 8, 'ME': 4,'MD': 10, 'MA': 11, 'MI': 16, 'MN': 10, 'MS': 6, 'MO': 10, 'MT': 3, 'NE': 5, 'NV': 6, 'NH': 4, 'NJ': 14, 'NM': 5, 'NY': 29, 'NC': 15, 'ND': 3, 'OH': 18, 'OK': 7, 'OR': 7, 'PA': 20, 'RI': 4, 'SC': 9, 'SD': 3, 'TN': 11, 'TX': 38, 'UT': 6, 'VT': 3, 'VA': 13, 'WA': 12, 'WV': 5, 'WI': 10, 'WY': 3, 'DC': 3},

'lte_ec': {'NE': 11, 'SE': 9, 'MW': 8, 'WE': 6, 'SW': 5, 'OV': 7},

'dem_primary': {'AL': 52, 'AK': 14, 'AS': 6, 'AZ': 67, 'AR': 31, 'CA': 416, 'CO': 67, 'CT': 49, 'DE': 17, 'DA': 13, 'DC': 17, 'FL': 219, 'GA': 105, 'GU': 6, 'HI': 22, 'ID': 20, 'IL': 155, 'IN': 70, 'IA': 41, 'KS': 33, 'KY': 46, 'LA': 50, 'ME': 24, 'MD': 79, 'MA': 91, 'MI': 125, 'MN': 75, 'MS': 36, 'MO': 68, 'MT': 16, 'NE': 25, 'NV': 36, 'NH': 24, 'NJ': 107, 'NM': 29, 'NY': 224, 'NC': 110, 'ND': 14, 'NI': 6, 'OH': 136, 'OK': 37, 'OR': 52, 'PA': 153, 'PR': 51, 'RI': 21, 'SC': 54, 'SD': 14, 'SU': 764, 'TN': 64, 'TX': 228, 'UT': 29, 'VT': 16, 'VI': 6, 'VA': 99, 'WA': 89, 'WV': 24, 'WI': 77, 'WY': 13},

'rep_primary': {'AL': 50, 'AK': 28, 'AS': 9, 'AZ': 57, 'AR': 40, 'CA': 172, 'CO': 37, 'CT': 28, 'DE': 16, 'DC': 19, 'FL': 122, 'GA': 76, 'GU': 9, 'HI': 19, 'ID': 32, 'IL': 67, 'IN': 70, 'IA': 40, 'KS': 39, 'KY': 46, 'LA': 46, 'ME': 22, 'MD': 38, 'MA': 41, 'MI': 73, 'MN': 39, 'MS': 39, 'MO': 54, 'MT': 27, 'NE': 36, 'NV': 25, 'NH': 22, 'NJ': 49, 'NM': 22, 'NY': 95, 'NC': 71, 'ND': 29, 'NI': 9, 'OH': 82, 'OK': 43, 'OR': 28, 'PA': 88, 'PR': 23, 'RI': 19, 'SC': 50, 'SD': 29, 'TN': 58, 'TX': 155, 'UT': 40, 'VT': 17, 'VI': 9, 'VA': 49, 'WA': 44, 'WV': 34, 'WI': 52, 'WY': 29},

'eu_parliament': {'IE-S':5,'IE-N':4,'IE-D':4,'BE-D':12,'BE-F':8,'BE-G':1,'FR':79,'ES':59,'PT':21,'IT':76,'MT':6,'CY':6,'GR':21,'BG':17,'RO':33,'HR':12,'HU':21,'SL':8,'AT':19,'SK':14,'CZ':21,'PO':52,'LI':11,'LV':8,'EE':7,'FI':14,'SE':21,'DK':14,'NL':29,'LU':6,'DE':96},

'to_short_hand': {'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD', 'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY' } 
}
class SimulatorData {
}

SimulatorData.USA_2020_Cook = {
	"AK": {"Republican": 100, "Democrat": 0},
	"AL": {"Republican": 100, "Democrat": 0},
	"AR": {"Republican": 100, "Democrat": 0},
	"AZ": {"Republican": 50, "Democrat": 50},
	"CA": {"Republican": 0, "Democrat": 100},
	"CO": {"Republican": 20, "Democrat": 80},
	"CT": {"Republican": 0, "Democrat": 100},
	"DE": {"Republican": 0, "Democrat": 100},
	"FL": {"Republican": 50, "Democrat": 50},
	"GA": {"Republican": 70, "Democrat": 30},
	"HI": {"Republican": 0, "Democrat": 100},
	"IA": {"Republican": 70, "Democrat": 30},
	"ID": {"Republican": 100, "Democrat": 0},
	"IL": {"Republican": 0, "Democrat": 100},
	"IN": {"Republican": 100, "Democrat": 0},
	"KS": {"Republican": 100, "Democrat": 0},
	"KY": {"Republican": 100, "Democrat": 0},
	"LA": {"Republican": 100, "Democrat": 0},
	"ME-AL": {"Republican": 30, "Democrat": 70},
	"ME-D1": {"Republican": 0, "Democrat": 100},
	"ME-D2": {"Republican": 70, "Democrat": 20},
	"MI": {"Republican": 50, "Democrat": 50},
	"MD": {"Republican": 0, "Democrat": 100},
	"MA": {"Republican": 0, "Democrat": 100},
	"MN": {"Republican": 30, "Democrat": 70},
	"MS": {"Republican": 100, "Democrat": 0},
	"MO": {"Republican": 100, "Democrat": 0},
	"MT": {"Republican": 100, "Democrat": 0},
	"NE-AL": {"Republican": 100, "Democrat": 0},
	"NE-D1": {"Republican": 100, "Democrat": 0},
	"NE-D2": {"Republican": 70, "Democrat": 30},
	"NE-D3": {"Republican": 100, "Democrat": 0},
	"NE-AL": {"Republican": 100, "Democrat": 0},
	"NE-AL": {"Republican": 100, "Democrat": 0},
	"NV": {"Republican": 30, "Democrat": 70},
	"NH": {"Republican": 30, "Democrat": 70},
	"NJ": {"Republican": 0, "Democrat": 100},
	"NM": {"Republican": 0, "Democrat": 100},
	"NY": {"Republican": 0, "Democrat": 100},
	"NC": {"Republican": 70, "Democrat": 30},
	"ND": {"Republican": 100, "Democrat": 0},
	"OH": {"Republican": 80, "Democrat": 20},
	"OK": {"Republican": 100, "Democrat": 0},
	"OR": {"Republican": 0, "Democrat": 100},
	"PA": {"Republican": 50, "Democrat": 50},
	"RI": {"Republican": 0, "Democrat": 100},
	"SC": {"Republican": 100, "Democrat": 0},
	"SD": {"Republican": 100, "Democrat": 0},
	"TN": {"Republican": 100, "Democrat": 0},
	"TX": {"Republican": 80, "Democrat": 20},
	"UT": {"Republican": 100, "Democrat": 0},
	"VT": {"Republican": 0, "Democrat": 100},
	"VA": {"Republican": 20, "Democrat": 80},
	"WA": {"Republican": 0, "Democrat": 100},
	"WI": {"Republican": 50, "Democrat": 50},
	"WV": {"Republican": 100, "Democrat": 0},
	"WY": {"Republican": 100, "Democrat": 0},
	"DC": {"Republican": 0, "Democrat": 100},
}
var textOn = true;
var presentationMode = false;

// when the yapnews div gets resized, center the map
if(document.getElementById("yapnews")) {
	document.getElementById("yapnews").addEventListener("transitionend",
	function() {
		MapManager.centerMap();
	});
}

function enableFullscreen() {
	var el = document.documentElement;
	rfs = el.requestFullScreen ||
		el.webkitRequestFullScreen ||
		el.mozRequestFullScreen ||
		el.msRequestFullScreen;
	
	if(typeof rfs !== 'undefined') {
		rfs.call(el);
	}
}

function displayCandidateEditMenu(candidate) {
	LogoManager.loadFlags();
	LogoManager.loadButtons();
	closeAllPopups();

	var candidateedit = document.getElementById('candidateedit');
	candidateedit.style.display = 'flex';
	var nameinput = document.getElementById('candidate-name');
	nameinput.value = candidate;
	var solidinput = document.getElementById('candidate-solid');
	solidinput.value = CandidateManager.candidates[candidate].colors[0];
	var likelyinput = document.getElementById('candidate-likely');
	likelyinput.value = CandidateManager.candidates[candidate].colors[1];
	var leaninput = document.getElementById('candidate-lean');
	leaninput.value = CandidateManager.candidates[candidate].colors[2];
	var tiltinput = document.getElementById('candidate-tilt');
	tiltinput.value = CandidateManager.candidates[candidate].colors[3];
	var hiddeninput = document.getElementById('candidate-originalName');
	var message = document.getElementById('candidateedit-message');
	message.innerHTML = 'Edit ' + candidate;
	hiddeninput.value = candidate;
}

function displayUpdateServiceWorker() {
	var notification = document.getElementById('notification-update-serviceworker');
	notification.style.display = 'inline';
}

function displayNotification(title, text) {
	LogoManager.loadFlags();
	LogoManager.loadButtons();
	var notification = document.getElementById('notification');
	var messageHTML = notification.querySelector('#notification-message');
	var titleHTML = notification.querySelector('#notification-title');
	notification.style.display = 'inline';
	messageHTML.innerHTML = text;
	titleHTML.innerHTML = title;
}

function displayAddCandidateMenu(type) {
	LogoManager.loadFlags();
	LogoManager.loadButtons();
	closeAllPopups();
	CookieManager.loadCustomColors();
	var addcandidatemenu = document.getElementById('addcandidatemenu');
	addcandidatemenu.style.display = 'flex';
}

function closeAllPopups() {
	var popups = document.getElementsByClassName('popup');
	for(var index = 0; index < popups.length; ++index) {
		var popup = popups[index];
		if(popup.style) {
			popup.style.display = 'none';
		}
	}

	var mysaves = document.getElementById("application-mysaves");
	if(mysaves) {
		Account.closeMyMaps();
	}

	// Remove active focus from close button
	document.activeElement.blur();
}

function displayCustomColorMenu(type) {
	LogoManager.loadFlags();
	LogoManager.loadButtons();
	closeAllPopups();
	var customColorName = document.getElementById('custom-color-name');
	customColorName.value = type;
	var miscmenu = document.getElementById('customcolormenu');
	miscmenu.style.display = 'flex';
	document.getElementById("solidcustom").value = CookieManager.cookies[type + 'solid'];
	document.getElementById("likelycustom").value = CookieManager.cookies[type + 'likely'];
	document.getElementById("leaningcustom").value = CookieManager.cookies[type + 'leaning'];
	document.getElementById("tiltingcustom").value = CookieManager.cookies[type + 'tilting'];
}

function setPalette(palette, setCookie) {
	if(setCookie) {
		CookieManager.appendCookie('theme', palette);
	}

	switch(palette) {
		case 'dark':
			darkPalette();
			break;
		case 'greyscale':
			greyscalePalette();
			break;
		case 'terminal':
			terminalPalette();
			break;
		case 'contrast':
			contrastPalette();
			break;
		case 'metallic':
			metallicPalette();
			break;
		case 'halloween':
			halloweenPalette();
			break;
		case 'white':
			toWinPalette();
			break;
		case 'default':
			lightPalette();
			break;
		default:
			lightPalette();
			break;
	}

	/* Fix All States Tossup Color */
	for(var index = 0, length = states.length; index < length; ++index) {
		var state = states[index];
		state.verifyTossupColor();
	}
}

function darkPalette() {
	setBackgroundColor('#181922');

	setOtherText('white');

	setDisableColor('#212326');
	setTossupColor('#6b6e73');
	setMapStyle('#181922', 1.5);
	setTextStyle('white', 'bold');
	setChartBorderStyle(1, '#2b2e33');
	setChartBarColor('#2b2e33');
	setChartBarShadow('');
	
	setClickButtonColor('#2b2e33');
	setClickButtonColor('#2B2E33');
	setClickButtonTextColor('#FFFFFF');
	setMenuColor('#000000');
	
	setSideBarColor('#2b2e33');
	setSideBarTextStyle('#ffffff');

	setBorderStyle('#000000', 7.0);

	ChartManager.chartOptions.plugins.datalabels.borderWidth = 2;
	ChartManager.chartOptions.plugins.datalabels.borderRadius = 4;

	ChartManager.chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	ChartManager.chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	ChartManager.setChart(ChartManager.chartType, ChartManager.chartPosition);
	previousPalette = darkPalette;
}

function greyscalePalette() {
	setBackgroundColor('#252525');
	
	setOtherText('white');

	setDisableColor('#212326');
	setTossupColor('#888888');
	setMapStyle('#181922', 1.5);
	setTextStyle('white', 'bold');
	setChartBorderStyle(1, '#1b1b1b');
	setChartBarColor('#454545');
	setChartBarShadow('');
	
	setClickButtonColor('#454545');
	setClickButtonTextColor('#FFFFFF');
	setMenuColor('#101010');
	
	setSideBarColor('#454545');
	setSideBarTextStyle('#ffffff');

	setBorderStyle('#252525', 7.0);

	ChartManager.chartOptions.plugins.datalabels.borderWidth = 2;
	ChartManager.chartOptions.plugins.datalabels.borderRadius = 4;

	ChartManager.chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	ChartManager.chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	ChartManager.setChart(ChartManager.chartType, ChartManager.chartPosition);
	previousPalette = darkPalette;
}

function terminalPalette() {
	setBackgroundColor('#000000');

	setOtherText('white');

	setDisableColor('#bcc8d9');
	setTossupColor('black');
	setChartBorderStyle(2, '#ffffff');
	setTextStyle('white', 'bold');
	setMapStyle('white', 1.5);
	setChartBarColor('black');
	setChartBarShadow('');

	setClickButtonColor('#000000');
	setClickButtonTextColor('#ffffff');
	setMenuColor('#f8f9fa');
	
	setSideBarColor('#f8f9fa');
	setSideBarTextStyle('#000000');
	
	setBorderStyle('#ffffff', 6.0);
	
	ChartManager.chartOptions.plugins.datalabels.borderWidth = 2;
	ChartManager.chartOptions.plugins.datalabels.borderRadius = 4;
	
	ChartManager.chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	ChartManager.chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	ChartManager.setChart(ChartManager.chartType, ChartManager.chartPosition);
	previousPalette = terminalPalette;
}

function lightPalette() {
	setBackgroundColor('#dcdcdc');
	
	setOtherText('black');

	setDisableColor('#212326');
	setTossupColor('#696969');
	setMapStyle('#dcdcdc', 1.5);

	setChartBarColor('#3b3e43');
	setChartBarShadow('');

	setTextStyle('white', 'bold');
	setChartBorderStyle(1, '#3b3e43');
	
	setClickButtonColor('#3b3e43');
	setClickButtonTextColor('white');
	setMenuColor('#000000');
	
	setSideBarColor('#dcdcdc');
	setSideBarTextStyle('#000000');
	
	setBorderStyle('#000000', 6.0);
	
	ChartManager.chartOptions.plugins.datalabels.borderWidth = 2;
	ChartManager.chartOptions.plugins.datalabels.borderRadius = 4;
	
	ChartManager.chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	ChartManager.chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	ChartManager.setChart(ChartManager.chartType, ChartManager.chartPosition);
	previousPalette = lightPalette;
}

function contrastPalette() {
	setBackgroundColor('#f8f9fa');

	setOtherText('black');

	setDisableColor('#212326');
	setTossupColor('#36454f');
	setMapStyle('#f8f9fa', 1.5);
	setTextStyle('white', 'bold');
	setChartBorderStyle(1, '#fafafa');
	setChartBarColor('#fafafa');
	setChartBarShadow('');

	setClickButtonColor('#fafafa');
	setClickButtonTextColor('#000000');
	setMenuColor('#222222');

	setSideBarColor('#f8f9fa');
	setSideBarTextStyle('#000000');
	
	setBorderStyle('#f8f9fa', 6.0);

	ChartManager.chartOptions.plugins.datalabels.borderWidth = 2;
	ChartManager.chartOptions.plugins.datalabels.borderRadius = 4;

	ChartManager.chartBarScales.yAxes[0].ticks.fontColor = '#000000';
	ChartManager.chartBarScales.xAxes[0].ticks.fontColor = '#000000';
	ChartManager.setChart(ChartManager.chartType, ChartManager.chartPosition);
	previousPalette = contrastPalette;
}

function metallicPalette() {
	setBackgroundImage('linear-gradient(#696969, #33353b)');
	
	setOtherText('white');
	
	setDisableColor('#212326');
	setTossupColor('#808080');
	setMapStyle('black', 1.5);
	setTextStyle('white', 'bold');
	setChartBorderStyle(1, '#33353b');
	setChartBarColor('#33353b');
	setChartBarShadow('');
	
	setClickButtonColor('#33353b');
	setClickButtonTextColor('#FFFFFF');
	setMenuColor('black');
	
	setSideBarColor('#33353b');
	setSideBarTextStyle('#ffffff');
	
	setBorderStyle('#000000', 6.0);

	ChartManager.chartOptions.plugins.datalabels.borderWidth = 2;
	ChartManager.chartOptions.plugins.datalabels.borderRadius = 4;
	
	ChartManager.chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	ChartManager.chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	ChartManager.setChart(ChartManager.chartType, ChartManager.chartPosition);
	previousPalette = metallicPalette;
}

function halloweenPalette() {
	setBackgroundImage('url("./res/images/halloween.jpg")');

	setOtherText('#ffffff');

	setDisableColor('#dddddd');
	setTossupColor('#928e85');
	setMapStyle('#000000', 1.25);
	setTextStyle('white', 'bold');
	setChartBorderStyle(1, '#000000');
	setChartBarColor('#060606');
	setChartBarShadow('0px -5px 5px 2px #060606');

	setSideBarColor('#9c9b98');
	setSideBarTextStyle('#000000');
	
	setClickButtonColor('#060606');
	setClickButtonTextColor('#ffffff');
	setMenuColor('#928e85');
	setBorderStyle('#ffffff', 6.0);

	ChartManager.chartOptions.plugins.datalabels.borderWidth = 0;
	ChartManager.chartOptions.plugins.datalabels.borderRadius = 2;

	ChartManager.chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	ChartManager.chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	ChartManager.setChart(ChartManager.chartType, ChartManager.chartPosition);
	previousPalette = halloweenPalette;
}

function toWinPalette() {
	setBackgroundColor('#f8f9fa');

	setOtherText('black');

	setDisableColor('#dddddd');
	setTossupColor('#9E8767');
	setMapStyle('#fffbf2', 1);
	setTextStyle('white', 'bold');
	setChartBorderStyle(1, '#fafafa');
	setChartBarColor('#fafafa');
	setChartBarShadow('');
	
	setClickButtonColor('#fafafa');
	setClickButtonTextColor('#000000');
	setMenuColor('#000000');
	
	setSideBarColor('#f8f9fa');
	setSideBarTextStyle('#000000');

	setBorderStyle('#f8f9fa', 6.0);

	ChartManager.chartOptions.plugins.datalabels.borderWidth = 0;
	ChartManager.chartOptions.plugins.datalabels.borderRadius = 2;

	ChartManager.chartBarScales.yAxes[0].ticks.fontColor = '#000000';
	ChartManager.chartBarScales.xAxes[0].ticks.fontColor = '#000000';
	ChartManager.setChart(ChartManager.chartType, ChartManager.chartPosition);
	previousPalette = toWinPalette;
}

function setOtherText(color) {
	var text = document.getElementById('othertext');
	if(text) {
		text.setAttribute('fill', color);
	}
}

function setBackgroundImage(img) {
	var body = document.getElementById('application');
	body.style.backgroundColor = '';
	body.style.backgroundImage = img;
}

function setBackgroundColor(color) {
	var body = document.getElementById('application');
	body.style.background = color;
	body.style.backgroundImage = '';
}

function setChartBorderStyle(width, color) {
	ChartManager.chartBorderWidth = width;
	ChartManager.chartBorderColor = color;

	var battlechart = document.getElementById('battlechartright');
	battlechart.style.border = '1px solid ' + color;	
	ChartManager.updateChart();

	var legenddiv = document.getElementById('legend-div');
	legenddiv.style.borderColor = color;
}

function setMenuColor(color) {
	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = color;
	var clickButtons = document.getElementsByClassName('click-button');
	for(var index = 0; index < clickButtons.length; ++index) {
		button = clickButtons[index];
		button.style.borderColor = color;
	}
}

function setMenuImage(image) {
	var menu = document.getElementById('menu-div');
	menu.style.backgroundImage = image;
	menu.style.backgroundSize = 'contain';
}

function setClickButtonTextColor(color) {
	var clickButtons = document.getElementsByClassName('click-button');
	for(var index = 0; index < clickButtons.length; ++index) {
		button = clickButtons[index];
		button.style.color = color;
	}
}

function setClickButtonColor(color) {
	var clickButtons = document.getElementsByClassName('click-button');
	for(var index = 0; index < clickButtons.length; ++index) {
		button = clickButtons[index];
		button.style.backgroundColor = color;
	}
}

function setDisableColor(color) {
	CandidateManager.TOSSUP.colors[1] = color;
}

function setTossupColor(color) {
	CandidateManager.TOSSUP.colors[2] = color;
	var tossupText = document.getElementById('Tossup-text');
	tossupText.style.backgroundColor = color;
	var addCandidateButton = document.getElementById('addcandidate-button-text');
	if(addCandidateButton) {
		addCandidateButton.style.backgroundColor = color;
	}
}

function setMapStyle(color, strokeWidth) {
	var outlines = document.getElementById('outlines');
	outlines.style.stroke = color;
	outlines.style.strokeWidth = strokeWidth * strokeMultiplier;

	var proportional = document.getElementById('proportional');
	if(proportional) {
		proportional.style.stroke = color;
		proportional.style.strokeWidth = strokeWidth * strokeMultiplier;
	}

	var special = document.getElementById('special');
	if(special != null) {
		special.style.stroke = color;
		special.style.strokeWidth = strokeWidth * strokeMultiplier;
	}
}

function setBorderStyle(color, strokeWidth) {
	var border = document.getElementById('*lines*');
	if(border !== null) {
		border.style.stroke = color;
		border.style.strokeWidth = strokeWidth * strokeMultiplier;
	}
}

function setSideBarColor(color) {
	var sidebar = document.getElementById('sidebar');
	if(sidebar) {

	} else {
		return;
	}

	sidebar.style.background = color;
}

function setSideBarTextStyle(color) {
	var sidebar = document.getElementById('sidebar');
	if(sidebar) {
		sidebar.style.color = color;
	}
}

function setSideBarSocialOutline(color, width) {
	var sidebar = document.getElementById('sidebar');
	if(sidebar) {
		var elements = sidebar.querySelectorAll(".sidebar-button");
		for(var index = 0; index < elements.length; ++index) {
			var element = elements[index];
			element.style.borderColor = color;
			element.style.borderWidth = width;
		}
	}
}

function setChartBarColor(color) {
	var sidebar = document.getElementById('chart-div');
	sidebar.style.background = color;
}

function setChartBarShadow(shadow) {
	var sidebar = document.getElementById('chart-div');
	sidebar.style.boxShadow = shadow;
}

function setTextStyle(color, weight) {
	var text = document.getElementById('text');
	if(text !== null) {
		text.style.strokeWidth = 0;
		text.style.fontWeight = weight;
		text.style.fill = color;
		text.style.textAlign = 'center';
		
		for(key in text.children) {
			var child = text.children[key];
			try {
				child.setAttribute('text-anchor', 'middle');
				child.setAttribute('alignment-baseline', 'central');
			} catch(e) {

			}
		} 
	}

	var battlechart = document.getElementById('battlechart');
	battlechart.style.color = color;
	battlechart.style.fontWeight = weight;

	var legenddiv = document.getElementById('legend-div');
	legenddiv.style.color = color;
	legenddiv.style.weight = weight;
}

function setBattleHorizontal() {
	var application = document.getElementById('application');
	application.style.flexDirection = 'column-reverse';

	var map = document.getElementById('map-div');
	map.style.height = '85%';

	var sidebar = document.getElementById('chart-div');
	sidebar.style.flexDirection = 'row';
	sidebar.style.width = '100%';	
	sidebar.style.height = '15%';

	var battlechart = document.getElementById('battlechart');
	battlechart.style.flexDirection = 'column';
	battlechart.style.height = '75%';
	battlechart.style.margin = '5%';
	
	var battlechartmidpoly = document.getElementById('battlechartmidpoly');
	battlechartmidpoly.setAttribute("transform", "translate(20 0) rotate(90)");

	var battlechartmid = document.getElementById('battlechartmid');
	//battlechartmid.setAttribute('transform', 'rotate(90)');
	battlechartmid.style.height = '100%';
	battlechartmid.style.width = '';

	var battlechartright = document.getElementById('battlechartright');
	battlechartright.style.flexDirection = 'row';
	battlechartright.style.height = '80%';
	battlechartright.style.width = '100%';

	var battlechartleft = document.getElementById('battlechartleft');
	battlechartleft.style.height = '20%';
	battlechartleft.style.width = '100%';

	var topbar = document.getElementById('topbar');
	topbar.style.borderRight = topbar.style.borderBottom;
	topbar.style.borderBottom = '';
	topbar.style.flexDirection = 'row';
	topbar.style.minWidth = '0';

	var bottombar = document.getElementById('bottombar');
	//bottombar.style.boxShadow = '-1px 0px 3px black';
	bottombar.style.borderLeft = bottombar.style.borderTop;	
	bottombar.style.borderTop = '';
	bottombar.style.flexDirection = 'row';
	bottombar.style.minWidth = '0';
}

function unsetBattleHorizontal() {
	var application = document.getElementById('application');
	application.style.flexDirection = 'row';
	
	var map = document.getElementById('map-div');
	map.style.height = '100%';

	var sidebar = document.getElementById('chart-div');
	sidebar.style.flexDirection = 'column';
	sidebar.style.width = '28vw';	
	sidebar.style.height = '100%';

	var battlechart = document.getElementById('battlechart');
	battlechart.style.flexDirection = 'row';
	battlechart.style.height = '100%';
	battlechart.style.margin = '5%';
	if(mobile) {
		battlechart.style.width = '100%';
	} else {
		battlechart.style.width = '50%';
	}
	
	var battlechartmidpoly = document.getElementById('battlechartmidpoly');
	battlechartmidpoly.setAttribute("transform", "translate(0 0) rotate(0)");

	var battlechartmid = document.getElementById('battlechartmid');
//	battlechartmid.setAttribute('transform', 'rotate(0)');
	battlechartmid.style.height = '';
	battlechartmid.style.width = '100%';

	var battlechartright = document.getElementById('battlechartright');
	battlechartright.style.flexDirection = 'column';
	battlechartright.style.width = '85%';
	battlechartright.style.height = '100%';
	var battlechartright = document.getElementById('battlechartleft');
	battlechartleft.style.height = '20%';
	battlechartleft.style.width = '15%';
	
	var topbar = document.getElementById('topbar');
	//topbar.style.boxShadow = '0px -1px 3px black';
	topbar.style.borderBottom = topbar.style.borderRight;
	topbar.style.borderRight = '';
	topbar.style.flexDirection = 'column';
	topbar.style.minWidth = '0';

	var bottombar = document.getElementById('bottombar');
	//bottombar.style.boxShadow = '0px 1px 3px black';
	bottombar.style.borderTop = bottombar.style.borderLeft;
	bottombar.style.borderLeft = '';
	bottombar.style.flexDirection = 'column';
	bottombar.style.minWidth = '0';
}

function toggleYAPNews() {
	var yapnews = document.getElementById("sidebar");
	if(yapnews !== null) {
		if(yapnews.style.display === "none") {
			yapnews.style.display = "inline-flex";
			gtag('event', currentCache, {
				'event_category': 'Sidebar',
				'event_label': 'Toggle On'
			});
		} else {
			yapnews.style.display = "none";
			gtag('event', currentCache, {
				'event_category': 'Sidebar',
				'event_label': 'Toggle Off'
			});
		}
		MapManager.centerMap();
	}
}

function ifInIframe() {
	if(window.location !== window.parent.location) {
		var element= document.getElementById('sidebar');
		if(element) {
			element.style.display = 'none';
		}
		element = document.getElementById('menu-div');
		if(element) {
			element.style.display = 'none';
		}
		element = document.getElementById('yapms-watermark');
		if(element) {
			element.style.display = 'flex';
		}
		var elements = document.getElementsByClassName('adslot_mobile');
		for(var index = 0; index < elements.length; ++index) {
			element = elements[index];
			element.style.display = 'none';
		}
		setPalette("light", false);
	}
}

function showShortcuts() {
	if(MapLoader.save_filename === './res/usa_county.svg' ||
		MapLoader.save_filename === './res/usa/house/12-2-2019-house.svg') {
		var countyHouse = document.getElementById("county-house-d");
		if(countyHouse) {
			countyHouse.style.display = '';
		}
	}
}
function displayVersionInfo() {
	var versioninfotext = document.getElementById('versioninfo-text');
	versioninfotext.innerHTML = currentCache;
}

function displayShareMenu() {
	var sharebuttons = document.getElementById('sharebuttons');
	if(sharebuttons) {
		sharebuttons.style.display = 'none';
	}

	var shareurl = document.getElementById('shareurl');
	if(shareurl) {
		shareurl.style.display = 'none';
		shareurl.innerHTML = '';
	}

	var image = document.getElementById('screenshotimg');
	if(image) {
		image.style.display = 'none';
	}
		
	var loadingAnimation = document.getElementById('loading-animation');
	if(loadingAnimation) {
		loadingAnimation.style.display = '';
	}
}

function displayMenu(name) {
	LogoManager.loadFlags();
	LogoManager.loadButtons();
	closeAllPopups();

	var menu = document.getElementById(name);
	menu.style.display = 'flex';

	switch(name) {
		case 'versionmenu':
			displayVersionInfo();
		break;
		case 'sharemenu':
			displayShareMenu();
		break;
	}
}

function hideMenu(name) {
	closeAllPopups();
	var menu = document.getElementById(name);
	menu.style.display = 'none';
}
class Simulator {
	static init() {
		if(mobile) {
			return; 
		}

		var noclick = document.getElementById('simulator-noclick');
		noclick.addEventListener('change', function(event) {
			Simulator.ignoreClick = event.target.checked;
		});
		
		var presets = document.getElementById("sidebar-presets-select-simulator");
		presets.addEventListener('change', function(event) {
			switch(this.value) {
				case "cook":
					Simulator.cookPresidentialPreset();
					break;
				case "random":
					Simulator.randomPreset();
					break;
				case "uniform":
					Simulator.uniformPreset();
					break;
			}
		});
	
		var select = document.getElementById("sidebar-presets-select-simulator");
		while(select.firstChild) {
			select.removeChild(select.firstChild);
		}
		
		var option = document.createElement("option");
		option.text = "Custom";
		option.value = "custom";
		option.selected = true;
		option.disabled = true;
		option.hidden = true;
		presets.appendChild(option);

		option = document.createElement("option");
		option.text = "Uniform";
		option.value = "uniform";
		presets.appendChild(option);
		
		option = document.createElement("option");
		option.text = "Random";
		option.value = "random";
		presets.appendChild(option);

		if(php_load_map_id === "USA_2020_presidential") {
			option = document.createElement("option");
			option.text = "Cook";
			option.value = "cook";
			presets.appendChild(option);

			if(php_load_map === false) {
				Simulator.cookPresidentialPreset();
			}
		} else {
			if(php_load_map === false) {
				Simulator.uniformPreset();
			}
		}

		if(states[0].simulator === undefined) {
			Simulator.uniformPreset();
		}
	}

	static uniformPreset() {
		if(mobile) {
			return; 
		}

		console.log("Simulator: Uniform preset");

		var presets = document.getElementById("sidebar-presets-select-simulator");
		presets.value = "uniform";	
		for(var index = 0; index < states.length; ++index) {
			var state = states[index];
			state.simulator = {};
			for(var key in CandidateManager.candidates) {
				if(key === "Tossup") {
					continue;
				}
				state.simulator[key] = 0;
			}			
		}
		
		for(var index = 0; index < proportionalStates.length; ++index) {
			var state = proportionalStates[index];
			state.simulator = {};
			
			for(var key in CandidateManager.candidates) {
				if(key === "Tossup") {
					continue;
				}
				state.simulator[key] = 0;
			}
		}
	
		if(Simulator.state) {	
			Simulator.view(Simulator.state);
		}
	}

	static randomPreset() {
		if(mobile) {
			return; 
		}
		
		console.log("Simulator: Random preset");

		var presets = document.getElementById("sidebar-presets-select-simulator");
		presets.value = "random";	
		for(var index = 0; index < states.length; ++index) {
			var state = states[index];
			state.simulator = {};
			for(var key in CandidateManager.candidates) {
				if(key === "Tossup") {
					continue;
				}
				state.simulator[key] = Math.random() * 100;
			}			
		}	
		
		for(var index = 0; index < proportionalStates.length; ++index) {
			var state = proportionalStates[index];
			state.simulator = {};
			
			for(var key in CandidateManager.candidates) {
				if(key === "Tossup") {
					continue;
				}
				state.simulator[key] = Math.random() * 100;
			}
		}

		if(Simulator.state) {	
			Simulator.view(Simulator.state);
		}
	}

	static cookPresidentialPreset() {
		if(mobile) {
			return; 
		}
		
		console.log("Simulator: Cook preset");

		var presets = document.getElementById("sidebar-presets-select-simulator");
		presets.value = "cook";	

		CandidateManager.addCandidate("Republican", "#bf1d29", "#ff5865", "#ff8b98", "#cf8980");
		CandidateManager.addCandidate("Democrat", "#1c408c", "#577ccc", "#8aafff", "#949bb3");
		countVotes();
		ChartManager.updateChart();
	
		for(var index = 0; index < states.length; ++index) {
			var state = states[index];
			state.simulator = {};
			for(var key in CandidateManager.candidates) {
				if(key !== "Republican" && key !== "Democrat") {
					continue;
				}
				state.simulator[key] = SimulatorData.USA_2020_Cook[state.name][key];
			}			
		}

		if(Simulator.state) {	
			Simulator.view(Simulator.state);
		}
	}

	static toggle() {
		if(mobile) {
			return; 
		}

		Simulator.enabled = !Simulator.enabled;
		var e1 = document.getElementById('sidebar-state-simulator');
		var e2 = document.getElementById('sidebar-run-simulator');
		var e3 = document.getElementById('sidebar-simulator-head');
		var e4 = document.getElementById('sidebar-settings-simulator');
		var e5 = document.getElementById('sidebar-presets-simulator');
		if(Simulator.enabled) {
			e1.style.display = 'block';
			e2.style.display = 'block';
			e4.style.display = 'block';
			e5.style.display = 'block';
			e3.innerHTML = 'Disable Simulator';
			Simulator.init();
			gtag('event', currentCache, {
				'event_category': 'Simulator',
				'event_label': 'Simulator Enabled'
			});
		} else {
			e1.style.display = 'none';
			e2.style.display = 'none';
			e4.style.display = 'none';
			e5.style.display = 'none';
			e3.innerHTML = 'Enable Simulator';
			gtag('event', currentCache, {
				'event_category': 'Simulator',
				'event_label': 'Simulator Disabled'
			});
		}
	}

	static view(state) {
		if(mobile) {
			return; 
		}

		if(!Simulator.enabled) {
			return;
		}

		Simulator.state = state;
		
		var ranges = document.getElementById("simulator-ranges");
		while(ranges.firstChild) {
			ranges.removeChild(ranges.firstChild);
		}

		for(var key in CandidateManager.candidates) {
			if(key === "Tossup") {
				continue;
			}
	
			var total = 0;
			for(var stateKey in state.simulator) {
				total += state.simulator[stateKey];
			}
			var percent = 100;
			if(total !== 0) {
				percent = ((state.simulator[key] / total) * 100).toFixed(2);
			}

			var display = document.createElement("DIV");
			display.setAttribute("id", "simulator-display-" + key);
			display.innerHTML = key + " - " + percent + "%";

			var range = document.createElement("INPUT");
			range.setAttribute("id", "simulator-range-" + key);
			range.setAttribute("type", "range");
			range.setAttribute("max", 100);
			range.setAttribute("min", 0);
			range.setAttribute("step", 1);
			range.value = state.simulator[key];

			range.oninput = (function() {
				var refstate = state;
				var refkey = key;
				var refdisplay = display;
				return function() {
					var value = parseInt(this.value);
					refstate.simulator[refkey] = value;
					
					var total = 0;
					for(var key in CandidateManager.candidates) {
						if(key === "Tossup") {
							continue;
						}
						total += refstate.simulator[key];	
					}
					
					for(var key in CandidateManager.candidates) {
						if(key === "Tossup") {
							continue;
						}
						var display = document.getElementById("simulator-display-" + key);
						var percent = 100;
						if(total !== 0) {
							percent = ((refstate.simulator[key] / total) * 100).toFixed(2);
						}
						display.innerHTML = key + " - "  + percent + "%";
					}
				}
			})();
			ranges.appendChild(display);
			ranges.appendChild(range);
		}

		var title = document.getElementById("simulator-state-title");
		if(state.name.match(/(Geometry|path([0-9]+)|g([0-9]+))/g)) {
			title.innerHTML = state.fakename;
		} else {
			title.innerHTML = state.name.replace(/_/g, " ");
		}
	}

	static run() {
		if(mobile) {
			return; 
		}

		if(Simulator.runState !== 0) {
			return;
		}

		Simulator.runState = 2;
		MapLoader.clearMapCandidates();
		Simulator.runTimeout = 5000 / states.length;
		Simulator.runLoop(states, 0, MapLoader.save_type === "proportional" || MapLoader.save_type === "primary");
		Simulator.runLoop(proportionalStates, 0, true);
	}

	static runLoop(stateList, count, proportional) {
		if(stateList.length === 0) {
			Simulator.runState -= 1;
			return;
		}

		setTimeout(function() {
			var state = stateList[count];
			var candidates = [];
			var totalPower = 0;
			for(var candidateKey in state.simulator) {
				totalPower += state.simulator[candidateKey];
				candidates.push({"name": candidateKey, "power": state.simulator[candidateKey]});
			}

			for(var index = 0; index < candidates.length; ++index) {
				var percentage = 1 / candidates.length;
				if(totalPower !== 0) {
					percentage = candidates[index].power / totalPower;
				}
				if(index !== 0) {
					percentage += candidates[index - 1].percent;
				}
				candidates[index].percent = percentage;
			}

			if(proportional) {
				Simulator.runProportionalState(state, candidates);
			} else {
				Simulator.runTakeAllState(state, candidates);
			}
			
			count += 1;
			
			// Skip disabled states
			while(count < stateList.length &&
				stateList[count].disabled) {
				count += 1;
			}

			if(count < stateList.length) {
				Simulator.runLoop(stateList, count, proportional);
			} else {
				Simulator.runLoopFinish(stateList);
			}
		}, Simulator.runTimeout);
	}
	
	static runTakeAllState(state, candidates) {
		var random = Math.random();
		for(var index = 0; index < candidates.length; ++index) {
			var percent = candidates[index].percent;
			var name = candidates[index].name;
			if(random <= percent) {
				state.setColor(name, 0);
				countVotes();
				ChartManager.updateChart();
				LegendManager.updateLegend();
				break;
			}
		}
	}

	static runProportionalState(state, candidates) {
		var total = state.voteCount;
		for(var index = 0; index < total; ++index) {
			var random = Math.random();
			for(var candidateIndex = 0; candidateIndex < candidates.length; ++candidateIndex) {
				var percent = candidates[candidateIndex].percent;
				if(random <= percent) {
					var name = candidates[candidateIndex].name;
					if(state.delegates[name]) {
						state.delegates[name] += 1;
					} else {
						state.delegates[name] = 1;
					}
					state.delegates["Tossup"] -= 1;
					break;
				}
			}
		}
	
		var majorityIndex = 0;
		for(var candidateIndex = 1; candidateIndex < candidates.length; ++candidateIndex) {
			var checkName = candidates[candidateIndex].name;
			var majorityName = candidates[majorityIndex].name;
			if(state.delegates[checkName] > state.delegates[majorityName]) {
				majorityIndex = candidateIndex;
			}
		}

		state.setColor(candidates[majorityIndex].name, 0, {setDelegates: false});

		countVotes();
		LegendManager.updateLegend();
		ChartManager.updateChart();
	}

	static runLoopFinish(stateList) {
		Simulator.runState -= 1;
		if(MapLoader.save_dataid === "usa_ec") {
			var me01 = stateList.find(obj => {
				return obj.name === "ME-D1";
			});
			var me02 = stateList.find(obj => {
				return obj.name === "ME-D2";
			});
			if(me01.candidate === me02.candidate) {
				var meal = stateList.find(obj => {
					return obj.name === "ME-AL";
				});

				meal.setColor(me01.candidate, 0);
			}

			var ne01 = stateList.find(obj => {
				return obj.name === "NE-D1";
			});
			var ne02 = stateList.find(obj => {
				return obj.name === "NE-D2";
			});
			var ne03 = stateList.find(obj => {
				return obj.name === "NE-D3";
			});
			if(ne01.candidate === ne02.candidate && ne02.candidate === ne03.candidate) {
				var neal = stateList.find(obj => {
					return obj.name === "NE-AL";
				});
				neal.setColor(ne01.candidate, 0);
			}
		}	
	}
}

Simulator.enabled = false;
// 0 = available
Simulator.runState = 0;
Simulator.runTimeout = 100;
Simulator.ignoreClick = false;
Simulator.state = null;
class PopularVote {
	static showPopularVoteButton() {
		var element = document.getElementById('sidebar-toggle-popularvote');
		if(element) {
			element.style.display = 'block';
		}
	}

	static autoMarginsOnClick() {
		if(PopularVote.enabled === false) {
			return;
		}

		var autoMargins = document.getElementById('popularvote-automargins').checked;

		if(autoMargins === false) {
			return; 
		}

		// loop through all states and set the margins
		for(var index in states) {
			var state = states[index];
			PopularVote.calculateAutoMargin(state);
		}
	}

	static view(state, candidate) {
		if(PopularVote.enabled === false) {
			return;
		}

		var autoPopularVote = document.getElementById('popularvote-clicksetpv').checked;
		if(autoPopularVote) {
			for(var key in CandidateManager.candidates) {
				if(key === candidate) {
					state.popularVote[key] = state.voters * (state.turnout / 100.0);
				} else {
					state.popularVote[key] = 0;
				}
			}
			PopularVote.count();
		}

		var popularVoteCalc = document.getElementById('sidebar-popularvote');
		if(state.disabled) {
			popularVoteCalc.style.display = 'none';	
		} else {
			// ONLY DISPLAY IF POPULAR VOTE IS ENABLED
			if(PopularVote.enabled === true) {
				popularVoteCalc.style.display = 'block';	
			}
		}
		var title = document.getElementById("popularvote-state-title");
		title.innerHTML = state.name;

		var message = document.getElementById("popularvote-message");
		message.innerHTML = "";
		
		var ranges = document.getElementById("popularvote-ranges");
		while(ranges.firstChild) {
			ranges.removeChild(ranges.firstChild);
		}

		if(state.name.includes('-AL')) {
			title.innerHTML = "Select a district to set popular vote";
			return;
		}

		var displayTossup = document.createElement('DIV');
		displayTossup.setAttribute('id', 'popular-display-Tossup');

		var displayTurnout = document.createElement('DIV');
		displayTurnout.setAttribute('id', 'popularvote-turnout-display');
		displayTurnout.innerHTML = 'Turnout - ' + state.turnout + '%';
		var turnoutRange = document.createElement('INPUT');
		turnoutRange.setAttribute('id', 'popularvote-turnout');
		turnoutRange.setAttribute('type', 'range');
		turnoutRange.setAttribute('max', 100);
		turnoutRange.setAttribute('step', 0.1);
		turnoutRange.setAttribute('value', state.turnout);

		var max  = state.voters * (state.turnout / 100.0);
		var total = 0;

		turnoutRange.onchange = (function() {
			return function() {
				var turnout = document.getElementById('popularvote-turnout').value;
				state.turnout = turnout;
				
				var autoMargins = document.getElementById('popularvote-automargins').checked;

				if(autoMargins) {
					state.setColor('Tossup', 0, true);
				}

				for(var key in CandidateManager.candidates) {
					if(key === 'Tossup') {
						continue;
					}
					var range = document.getElementById('popular-range-' + key);
					range.setAttribute('max', (state.voters * (turnout / 100.0)));
					range.value = 0;
					// call on input to reset prevValue to 0
					range.oninput();
					var rangeDisplay = document.getElementById('popular-display-' + key);
					rangeDisplay.innerHTML = key + ' - 0 - 0%';
				}

				var displayTurnout = document.getElementById('popularvote-turnout-display');
				displayTurnout.innerHTML = 'Turnout - ' + this.value + '%';

				var displayTossup = document.getElementById('popular-display-Tossup');
				displayTossup.innerHTML = 'Tossup - ' + numberWithCommas((state.voters * (turnout / 100.0)).toFixed(0)) + ' - 100%';
				
				total = 0;

				PopularVote.count();
			}
		})();

		turnoutRange.oninput = (function() {
			return function() {
				var displayTurnout = document.getElementById('popularvote-turnout-display');
				displayTurnout.innerHTML = 'Turnout - ' + this.value + '%';
			}
		})();

		ranges.appendChild(displayTurnout);
		ranges.appendChild(turnoutRange);

		for(var key in CandidateManager.candidates) {
			if(key === 'Tossup')
				continue;

			var range = document.createElement('INPUT');
			range.setAttribute('id', 'popular-range-' + key);
			range.setAttribute('type', 'range');
			range.setAttribute('max', max);
			range.setAttribute('step', 1);
			if(typeof state.popularVote[key] === 'undefined') {
				state.popularVote[key] = 0;
			}
			range.value = state.popularVote[key];
			total += state.popularVote[key];
			// create display for slider
			var display = document.createElement('DIV');
			display.setAttribute('id', 'popular-display-' + key);
			display.innerHTML = key + ' - ' + numberWithCommas(range.value) + ' - ' +
				((state.popularVote[key] / max) * 100).toFixed(2) + '%';

			range.onchange = (function() {
				return function(b) {
					var totalVotes = 0;
					for(var candidate in CandidateManager.candidates) {
						if(candidate === 'Tossup')
							continue;
						var range = document.getElementById('popular-range-' + candidate);
						var rangeValue = 0;
						if(range) {
							rangeValue = parseInt(range.value);
						}
						state.popularVote[candidate] = rangeValue;
						totalVotes += rangeValue;
					}
					state.popularVote['Tossup'] = state.voters - totalVotes;

					var autoMargins = document.getElementById('popularvote-automargins').checked;
					if(autoMargins) {
						PopularVote.calculateAutoMargin(state);

						if(state.name.includes('-D')) {
							var name = state.name.split('-')[0];
							PopularVote.calculateAutoMarginAL(name);
						}
					}

					PopularVote.count();
					countVotes();
					LegendManager.updateLegend();
					ChartManager.updateChart();
				}
			})();

			range.oninput = (function() {
				var refkey = key;
				var refdisplay = display;
				var refdisplayTossup = displayTossup;
				var prevvalue = parseInt(range.value);
				var refstate = state;
				var refcandidate = key;
				return function(b) {
					total -= prevvalue;
					total += parseInt(this.value);

					max = state.voters * (state.turnout / 100.0);
					if(total > max) {
						var diff = total - max;
						total -= diff;
						this.value -= diff;
					}
					
					prevvalue = parseInt(this.value);

					displayTossup.innerHTML = 'Tossup - ' + numberWithCommas((max - total).toFixed(0)) + ' - ' +
						(( (max - total) / max) * 100).toFixed(2) + '%';
					
					// update the display	
					refdisplay.innerHTML = refkey + ' - ' + numberWithCommas(this.value) + ' - ' + 
						((this.value / max) * 100).toFixed(2) + '%';
		
					state.popularVote[refkey] = parseInt(this.value);
				}
			})();
			
			ranges.appendChild(display);
			ranges.appendChild(range);
		}

		displayTossup.innerHTML = 'Tossup - ' + numberWithCommas((max - total).toFixed(0)) + ' - ' + (( (max - total) / max) * 100).toFixed(2) + '%';
		ranges.appendChild(displayTossup);
	}

	static count() {
		if(PopularVote.enabled === false) {
			return;
		}

		var ranges = document.getElementById("national-popularvote-ranges");
		while(ranges.firstChild) {
			ranges.removeChild(ranges.firstChild);
		}

		var popularVote = {};
		var splitState = {};

		for(var stateIndex = 0, length = states.length; stateIndex < length; ++stateIndex) {
			var state = states[stateIndex];

			// skip at large state portions
			if(state.name.includes('-AL')) {
				continue;
			}

			for(var candidate in state.popularVote) {
				if(state.popularVote[candidate]) {
					if(popularVote[candidate]) {
						popularVote[candidate] += state.popularVote[candidate];
						
					} else {
						popularVote[candidate] = 0;
						popularVote[candidate] += state.popularVote[candidate];
					}
				
					if(state.name.includes('-') && state.name.includes('AL') === false) {
						var mainName = state.name.split('-')[0];
						var district = state.name.split('-')[1];
						if(typeof splitState[mainName] === 'undefined') {
							splitState[mainName] = {}; 
						}

						if(typeof splitState[mainName][district] === 'undefined') {
							splitState[mainName][district] = {};
						}

						splitState[mainName][district][candidate] = state.popularVote[candidate];
					}
				} else {
					state.popularVote[candidate] = 0;
				}
			}
		}

		for(var candidate in popularVote) {
			var display = document.createElement('DIV');
			display.setAttribute('id', 'national-popular-display-' + candidate);
			display.innerHTML = candidate + ' - ' + numberWithCommas(popularVote[candidate].toFixed(0));
			ranges.appendChild(display);
		}
	}

	static calculateAutoMarginAL(stateName) {
		var allDistricts = states.filter(obj => {
			return obj.name.includes(stateName) &&
				obj.name.includes('-AL') === false;
		});

		var atLarge = states.filter(obj => {
			return obj.name.includes(stateName + '-AL');
		})[0];

		var firstCount = 0;
		var firstCandidate = "Tossup";
		var secondCount = 0;
		var secondCandidate = "Tossup";
		for(var candidate in CandidateManager.candidates) {
			if(candidate === 'Tossup')
				continue;

			var votes = 0;
			for(var key in allDistricts) {
				if(allDistricts[key].popularVote[candidate]) {
					votes += allDistricts[key].popularVote[candidate];
				}
			}

			if(votes > firstCount) {
				secondCount = firstCount;
				secondCandidate = firstCandidate;
				firstCount = votes;
				firstCandidate = candidate;
			} else if(votes > secondCount) {
				secondCount = votes;
				secondCandidate = candidate;
			}
		}

		var combine = firstCount + secondCount;
		var margin = (((firstCount - secondCount) / combine) * 100);

		if(firstCandidate === 'Tossup') {
			atLarge.setColor('Tossup', 0);
		} else {
			if(margin < 5.0) {
				atLarge.setColor(firstCandidate, 3);
			} else if(margin < 10.0) {
				atLarge.setColor(firstCandidate, 2);
			} else if(margin < 15.0) {
				atLarge.setColor(firstCandidate, 1);
			} else {
				atLarge.setColor(firstCandidate, 0);
			}
		}
	}

	static calculateAutoMargin(state) {
		var win = 0;
		var winCandidate = "Tossup";
		var secondWin = 0;
		var secondWinCandidate = "Tossup";
		for(var candidate in CandidateManager.candidates) {
			// don't compare margins with the no vote
			if(candidate === 'Tossup')
				continue;
			var votes = state.popularVote[candidate];
			if(votes > win) {
				secondWin = win;
				secondWinCandidate = winCandidate;
				win = votes;
				winCandidate = candidate;
			} else if(votes > secondWin) {
				secondWin = votes;
				secondWinCandidate = candidate;
			}
		}

		var combine = win + secondWin;
		var margin = (((win - secondWin) / combine) * 100);
		if(winCandidate === 'Tossup') {
			state.setColor('Tossup', 0);
		} else {
			if(margin < 5.0) {
				state.setColor(winCandidate, 3, false);
			} else if(margin < 10.0) {
				state.setColor(winCandidate, 2, false);
			} else if(margin < 15.0) {
				state.setColor(winCandidate, 1, false);
			} else {
				state.setColor(winCandidate, 0, false);
			}
		}
	}

	static toggle() {
		var e1 = document.getElementById('sidebar-popularvote');
		var e2 = document.getElementById('sidebar-national-popularvote');
		var e3 = document.getElementById('sidebar-popularvote-settings');
		var e4 = document.getElementById('sidebar-popularvote-head');
		if(PopularVote.enabled === false) {
			e1.style.display = 'block';
			e2.style.display = 'block';
			e3.style.display = 'block';
			e4.innerHTML = 'Disable Popular Vote';
			PopularVote.enabled = true;
			gtag('event', currentCache, {
				'event_category': 'Popular Vote',
				'event_label': 'Popular Vote Enabled'
			});
		} else if(PopularVote.enabled === true) {
			e1.style.display = 'none';
			e2.style.display = 'none';
			e3.style.display = 'none';
			e4.innerHTML = 'Enable Popular Vote';
			PopularVote.enabled = false;
			gtag('event', currentCache, {
				'event_category': 'Popular Vote',
				'event_label': 'Popular Vote Disabled'
			});
		}
	}
}

PopularVote.enabled = false;
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
		data['states'][state.name] = {};
		data['states'][state.name]['candidate'] = state.candidate;
		data['states'][state.name]['delegates'] = state.delegates;
		data['states'][state.name]['colorvalue'] = state.colorValue;
		data['states'][state.name]['disabled'] = state.disabled;
	}

	for(var stateIndex = 0; stateIndex < proportionalStates.length; ++stateIndex) {
		var state = proportionalStates[stateIndex];
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
		data['states'][state.name] = {};
		data['states'][state.name]['delegates'] = state.delegates;
		data['states'][state.name]['colorvalue'] = state.colorValue;
		data['states'][state.name]['disabled'] = state.disabled;
	}

	for(var stateIndex = 0; stateIndex < proportionalStates.length; ++stateIndex) {
		var state = proportionalStates[stateIndex];
		data['proportional'][state.name] = {};
		data['proportional'][state.name]['delegates'] = state.delegates;
		data['proportional'][state.name]['colorvalue'] = state.colorValue;
		data['proportional'][state.name]['disabled'] = state.disabled;
	}
	
	formData.append("data", JSON.stringify(data));

	$.ajax({
		//url: "./savemap_external.php",
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
function numberWithCommas(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
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
