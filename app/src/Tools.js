function numberWithCommas(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
