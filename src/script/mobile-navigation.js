var navs = document.getElementsByClassName("navigation-1");

for(var index = 0; index < navs.length; ++index) {
	var element = navs[index];
	element.addEventListener("click", (function() {
		var navs2 = element.getElementsByClassName("navigation-2")[0];
		return function() {
			if(navs2.style.display === "" || navs2.style.display === "none") {
				navs2.style.display = "flex";
			} else if(navs2.style.display === "flex") {
				navs2.style.display = "none";
			}
		}
	})());
}
