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
		for(var i = 1; i < 11; ++i) {
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
		for(var index = 1; index < 11; ++index) {
			var c = document.getElementById('custom' + index + 'button');
			c.style.background = 'linear-gradient(to right,' +
				CookieManager.cookies['custom' + index + 'solid'] + ',' +
				CookieManager.cookies['custom' + index + 'likely'] + ',' +
				CookieManager.cookies['custom' + index + 'leaning'] + ',' +
				CookieManager.cookies['custom' + index + 'tilting'] + ')';
			
		}
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
	}
}

CookieManager.cookies = {};
CookieManager.consent = false;
