const navs = document.getElementsByClassName("navigation-1");

for(const element of navs) {
	element.addEventListener("click", (function() {
		const navs2 = element.getElementsByClassName("navigation-2")[0];
		return function() {
			if(navs2.style.display === "" || navs2.style.display === "none") {
				navs2.style.display = "flex";
			} else if(navs2.style.display === "flex") {
				navs2.style.display = "none";
			}
		}
	})());
}
