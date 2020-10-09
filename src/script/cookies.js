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

	static deleteCookie(key) {
		var cookie = "";
		var expire = new Date(Date.now() - 20).toString();
		cookie = key + '= ; expires=' + expire + ';';
		document.cookie = cookie;
		delete CookieManager.cookies[key];
		console.log('Delete cookie: key=' + key);
	}

	static loadCookies() {
		var decode = decodeURIComponent(document.cookie);
		var loadedCookies = decode.split('; ');
		for(var index in loadedCookies) {
			var cookie = loadedCookies[index].split('=');
			var key = cookie[0];
			var result = cookie[1]
			CookieManager.cookies[key] = result;
			if(key.includes("bookmark-")) {
				var name = key.substring(9).replace(/_/g, " ");
				BookmarkManager.appendBookmark(name, maplist[name]);
			}
		}
	}
}

CookieManager.cookies = {};
CookieManager.loadCookies();
