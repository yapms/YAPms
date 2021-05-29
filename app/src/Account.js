class Account {
	static register() {
		const formData = new FormData();
		const email = document.getElementById('email-input').value;
		formData.append('email', email);

		fetch('https://yapms.org/auth/register.php', {
			method: 'POST',
			body: formData,
			credentials: 'include'
		})
		.then(response => response.text())
		.then(data => {
			console.log('Register: ' + data);
			const arr = data.split(' ');
			const registerInfo = document.getElementById('register-info');
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
		}).catch(error => {
			console.log(error);	
			const registerInfo = document.getElementById('register-info');
			registerInfo.innerHTML = 'Connection Error';	
		});

		/*
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
				const arr = data.split(' ');
				const registerInfo = document.getElementById('register-info');
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
		*/
	}

	static login() {
		const formData = new FormData();
		const email = document.getElementById('email-login').value;
		const pass = document.getElementById('password-login').value;
		formData.append('email', email);
		formData.append('password', pass);

		fetch('https://yapms.org/auth/login.php', {
			method: 'POST',
			body: formData,
			credentials: 'include'
		})
		.then(response => response.text())
		.then(data => {
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
		}).catch(error => {
			console.log(error);
			const loginInfo = document.getElementById('login-info');
			loginInfo.innerHTML = 'Connection Error';
		});

		/*
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
		*/
	}

	static verifyState() {
		const formData = new FormData();
		formData.append('email', Account.email);
		
		fetch('https://yapms.org/auth/verify_login.php', {
			method: 'POST',
			body: formData,
			credentials: 'include'
		})
		.then(response => response.text())
		.then(data => {
			console.log('Verify Login: ' + data);
			const arr = data.split(' ');
			Account.isLoggedIn = (arr[0] === 'good');
			if(Account.isLoggedIn) {
				Account.email = arr[1];
				Account.id = arr[2];
			} else {
				Account.id = null;
				Account.email = null;	
			}
			Account.updateHTML();
		}).catch(error => {
			console.log(error);
			console.log("Account: Could not login");
		});

		/*
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
				const arr = data.split(' ');
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
		*/
	}

	static logout() {
		closeAllPopups();
		
		fetch('https://yapms.org/auth/logout.php', {
			method: 'POST',
			credentials: 'include'
		})
		.then(response => response.text())
		.then(data => {
			console.log('Logout: ' + data);
			Account.verifyState();
		}).catch(error => {
			console.log(error);
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

		const application = document.getElementById('application');
		domtoimage.toPng(application, {
			width: application.offsetWidth,
			height: application.offsetHeight
		})
		.then(function(data) {
			canvas.style.width = 0;
			canvas.style.height = 0;	
			canvas.style.display = 'none';
			const image = document.getElementById('mysaves-current-mappreview');
			image.src = data;
			image.style.width = '40vw';
			image.style.height = 'auto';
			const current = document.getElementById('mysaves-current-map');
			current.style.display = "inline-flex";
		})
		.catch(function(error) {
			console.log('dom-to-image: ', error);
		});

		/*
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
			const img = canvas.toDataURL('image/png');
			const i = document.getElementById('mysaves-current-mappreview');
			i.src = img;
			i.style.width = '40vw';
			i.style.height = 'auto';
			const current = document.getElementById("mysaves-current-map");
			if(current) {
				current.style.display = "inline-flex";
			}
		});
		*/

		fetch('https://yapms.org/users/.tools/get_maps.php', {
			method: 'POST',
			credentials: 'include'
		})
		.then(response => response.text())
		.then(data => {
			data = data.split(' ');
			for(let fileIndex = 0; fileIndex < data.length; ++fileIndex) {
				/* GET BASE64 DATA */
				const fileName = data[fileIndex].split('/');
				const name = fileName[2].split('.')[0];
				Account.addMapBox(name, false);
			}
		})
		.catch(error => {
			console.log(error);
		});

		/*
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
				const arr = data.split(' ');
				for(let fileIndex = 0; fileIndex < arr.length; ++fileIndex) {
					const fileName = arr[fileIndex].split('/');
					const name = fileName[2].split('.')[0];
					Account.addMapBox(name, false);
				}
			},
			error: function(a, b, c) {
				console.log(a);
				console.log(b);
				console.log(c);
			}
		});
		*/
	}

	static updateHTML() {
		const loginButton = document.getElementById('login-button');
		const accountButton = document.getElementById('account-button');
		const mymapsButton = document.getElementById('mymaps-button');
		const accountEmail = document.getElementById('account-email');

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
