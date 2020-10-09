var maplist = [];
maplist['USA Presidential'] = './app/?t=USA_2020_presidential';
maplist['USA Senate'] = './app/?t=USA_2020_senate';
maplist['USA House'] = './app/?t=USA_2020_house';
maplist['USA Governors'] = './app/?t=USA_2020_governors';
maplist['USA Democratic Primary'] = './app/?t=USA_2020_democratic_primary';
maplist['USA Republican Primary'] = './app/?t=USA_2020_republican_primary';
maplist['USA Current Senate'] = './app/?t=USA_current_senate';
maplist['USA Current House'] = './app/?t=USA_current_house';
maplist['USA Blank Senate'] = './app/?t=USA_senate';
maplist['USA Blank Governors'] = './app/?t=USA_governors';
maplist['USA Counties'] = './app/?t=USA_county';
maplist['USA Cook Political Report House'] = './app/?t=USA_2020_house_cook';
maplist['USA Cook Political Report Presidential'] = './app/?t=USA_2020_cook';
maplist['USA Sabatos Crystal Ball Presidential'] = './app/?t=USA_2020_sabatos';
maplist['USA Inside Elections Presidential'] = './app/?t=USA_2020_inside';
maplist['USA Take All'] = './app/?t=USA_takeall';
maplist['USA Territories'] = './app/?t=USA_presidential_territories';
maplist['USA 2024 Projection'] = './app/?t=USA_2024_projection';
maplist['USA Proportional'] = './app/?t=USA_proportional';
maplist['USA Impeachment Support'] = './app/?t=USA_trump_impeachment_support';
maplist['USA 2016 Democratic Primary'] = './app/?t=USA_2016_democratic_primary';
maplist['USA 2016 Republican Primary'] = './app/?t=USA_2016_republican_primary';
for(var index = 2016; index > 1792; index -= 4) {
	maplist['USA ' + index + ' Presidential'] = './app/?t=USA_' + index + '_presidential';
}

maplist['Arkansas Upper Legislature'] = './app/?t=Arkansas_2020_state_upper';
maplist['New Jersey Upper Legislature'] = './app/?t=NewJersey_2020_state_upper';
maplist['Pennsylvania Upper Legislature'] = './app/?t=Pennsylvania_2020_state_upper';
maplist['Texas Upper Legislature'] = './app/?t=Texas_2020_state_upper';

maplist['Alabama Lower Legislature'] = './app/?t=Alabama_2020_state_lower';
maplist['Alaska Lower Legislature'] = './app/?t=Alaska_2020_state_lower';
maplist['Arkansas Lower Legislature'] = './app/?t=Arkansas_2020_state_lower';
maplist['California Lower Legislature'] = './app/?t=California_2020_state_lower';
maplist['Colorado Lower Legislature'] = './app/?t=Colorado_2020_state_lower';
maplist['Connecticut Lower Legislature'] = './app/?t=Connecticut_2020_state_lower';
maplist['Florida Lower Legislature'] = './app/?t=Florida_2020_state_lower';
maplist['Hawaii Lower Legislature'] = './app/?t=Hawaii_2020_state_lower';
maplist['Idaho Lower Legislature'] = './app/?t=Idaho_2020_state_lower';
maplist['Iowa Lower Legislature'] = './app/?t=Iowa_2020_state_lower';
maplist['Michigan Lower Legislature'] = './app/?t=Michigan_2020_state_lower';
maplist['Minnesota Lower Legislature'] = './app/?t=Minnesota_2020_state_lower';
maplist['New Jersey Lower Legislature'] = './app/?t=NewJersey_2020_state_lower';
maplist['New Mexico Lower Legislature'] = './app/?t=NewMexico_2020_state_lower';
maplist['North Dakota Lower Legislature'] = './app/?t=NorthDakota_2020_state_lower';
maplist['Oregon Lower Legislature'] = './app/?t=Oregon_2020_state_lower';
maplist['Pennsylvania Lower Legislature'] = './app/?t=Pennsylvania_2020_state_lower';
maplist['Texas Lower Legislature'] = './app/?t=Texas_2020_state_lower';
maplist['Washington Lower Legislature'] = './app/?t=Washington_2020_state_lower';
maplist['Wisconsin Lower Legislature'] = './app/?t=Wisconsin_2020_state_lower';

maplist['Argentina Chamber of Deputies'] = './app/?t=Argentina_chamber_of_deputies';
maplist['Australia States'] = './app/?t=Australia_states';
maplist['Australia House of Representatives'] = './app/?t=Australia_house_of_representatives';
maplist['Brazil Federal Senate'] = './app/?t=Brazil_federal_senate';
maplist['Brazil Chamber of Deputies'] = './app/?t=Brazil_chamber_of_deputies';
maplist['Canada House of Commons'] = './app/?t=Canada_house_of_commons';
maplist['Canada 2019 Results'] = './app/?t=Canada_2019_house_of_commons';
maplist['Canada Provinces'] = './app/?t=Canada_provinces';
maplist['France National Assembly'] = './app/?t=France_national_assembly';
maplist['Germany Bundestag'] = './app/?t=Germany_bundestag';
maplist['Germany States'] = './app/?t=Germany_states';
maplist['India Lok Sabha'] = './app/?t=India_lok_sabha';
maplist['India 2019 Results'] = './app/?t=India_2019_lok_sabha';
maplist['Italy States'] = './app/?t=Italy_states';
maplist['Ireland Dáil Éireann'] = './app/?t=Ireland_dail_eireann';
maplist['Netherlands Gemeeten'] = './app/?t=Netherlands_gemeenten';
maplist['Netherlands Provinces'] = './app/?t=Netherlands_provinces';
maplist['Portugal Assembly of the Republic'] = './app/?t=Portugal_assembly_of_the_republic';
maplist['Russia Federation Council'] = './app/?t=Russia_federal_council';
maplist['Russia Duma'] = './app/?t=Russia_duma';
maplist['South Africa National Assembly'] = './app/?t=SouthAfrica_national_assembly';
maplist['Spain Congress of Deputies'] = './app/?t=Spain_congress_of_deputies';
maplist['Sweden Riksdag'] = './app/?t=Sweden_riksdag';
maplist['Switzerland Council of States'] = './app/?t=Switzerland_council_of_states';
maplist['Switzerland National Council'] = './app/?t=Switzerland_national_council';
maplist['Turkey National Assembly'] = './app/?t=Turkey_national_assembly';
maplist['Trinidad and Tobago House of Representatives'] = './app/?t=Trinidad_Tobago_house_of_representatives';
maplist['United Kingdom House of Commons'] = './app/?t=UnitedKingdom_house_of_commons';
maplist['United Kingdom Current Parliament'] = './app/?t=UnitedKingdom_current_parliament';
maplist['United Kingdom Historic Counties'] = './app/?t=UnitedKingdom_historic_counties';
maplist['World'] = './app/?t=World';
maplist['European Union'] = './app/?t=EuropeanUnion';
maplist['USA / Canada'] = './app/?t=USA_Canada';

class BookmarkManager {
	static appendBookmark(name, href) {
		var link = document.createElement("a");
		link.setAttribute("class", "link");
		link.setAttribute("href", href);
		link.setAttribute("id", "bookmark-" + name);
		link.innerHTML = '<div>' + name + '</div>';
		var bookmarkList = document.getElementById("bookmark-list");
		bookmarkList.appendChild(link);
	}

	static deleteBookmark(name) {
		var bookmarkList = document.getElementById("bookmark-list");
		var bookmark = document.getElementById("bookmark-" + name);
		bookmarkList.removeChild(bookmark);
		CookieManager.deleteCookie("bookmark-" + name.replace(/ /g, "_"));
	}
}

$("#bookmark-form").submit(function(event) {
	event.preventDefault();

	var name = event.currentTarget[0].value;
	var nameUnderscore = name.replace(/ /g, "_");

	if(CookieManager.cookies["bookmark-" + nameUnderscore] === "true") {
		BookmarkManager.deleteBookmark(name);
		return;
	}

	var href = maplist[name];
	if(href) {
		BookmarkManager.appendBookmark(name, href);		
		CookieManager.appendCookie("bookmark-" + nameUnderscore, "true");
	}
});

$("#search-form").submit(function(event) {
	event.preventDefault();
	var value = maplist[event.currentTarget[0].value];
	var newURL = window.parent.location.href + value.substring(2);
	window.location = newURL;
});
