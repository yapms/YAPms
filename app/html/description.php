<?php
$h1title = "YAPms";

if (isset($_GET["t"]) && !empty($_GET["t"])) {
	if(strpos($_GET['t'], '_presidential') && !strpos($_GET['t'], '_county') && !strpos($_GET['t'], '_territories')) {
		$year = substr($_GET['t'], 4, 4);
		echo "<meta name=\"description\" content=\"United States interactive {$year} presidential election map\">
			<title>USA - {$year} Presidential Election Map</title>
			<meta property=\"og:title\" content=\"YAPms - USA {$year} Presidential Election Map\">
			<meta property=\"og:description\" content=\"Interactive USA {$year} Presidential Election Map\">";
		$h1title = "USA {$year} Presidential Election";
	} else if(strpos($_GET['t'], '_democratic_primary')) {
		$year = substr($_GET['t'], 4, 4);
		echo "<meta name=\"description\" content=\"United States interactive {$year} democratic primary election map\">
			<title>USA - {$year} Democratic Primary Map</title>
			<meta property=\"og:title\" content=\"YAPms - USA {$year} Democratic Primary Map\">
			<meta property=\"og:description\" content=\"Interactive USA {$year} Democratic Primary Map\">";
		$h1title = "USA {$year} Democratic Primary";
	} else if(strpos($_GET['t'], '_republican_primary')) {
		$year = substr($_GET['t'], 4, 4);
		echo "<meta name=\"description\" content=\"United States interactive {$year} republican primary election map\">
			<title>USA - {$year} Republican Primary Map</title>
			<meta property=\"og:title\" content=\"YAPms - USA {$year} Republican Primary Map\">
			<meta property=\"og:description\" content=\"Interactive USA {$year} Republican Primary Map\">";
		$h1title = "USA {$year} Republican Primary";
	} else if(strpos($_GET['t'], 'state_lower')) { 
		$split = explode('_', $_GET['t']);
		$state = $split[0];
		switch($state) {
			case "NewJersey": 
				$state = "New Jersey";
				break;
			case "NorthDakota":
				$state = "North Dakota";
				break;
			case "NewMexico":
				$state = "New Mexico";
				break;
		}	
		$year = $split[1];
		echo "<meta name=\"description\" content=\"Interactive {$state} {$year} Lower State Legislature Map\">
			<title>USA - {$state} {$year} Lower State Legislature Election Map</title>
			<meta property=\"og:title\" content=\"YAPms - USA {$state} {$year} Lower State Legislature Map\">
			<meta property=\"og:description\" content=\"Interactive {$state} {$year} Lower State Legislature Map\">";
		$h1title = "{$state} Lower Legislature";
	} else if(strpos($_GET['t'], 'state_upper')) {
		$split = explode('_', $_GET['t']);
		$state = $split[0];
		switch($state) {
			case "NewJersey": 
				$state = "New Jersey";
				break;
		}	
		$year = $split[1];
		echo "<meta name=\"description\" content=\"Interactive {$state} {$year} Upper State Legislature Map\">
			<title>USA - {$state} {$year} Upper State Legislature Election Map</title>
			<meta property=\"og:title\" content=\"YAPms - USA {$state} {$year} Upper State Legislature Map\">
			<meta property=\"og:description\" content=\"Interactive {$state} {$year} Upper State Legislature Map\">";
		$h1title = "{$state} Upper Legislature";
	} else {

	switch($_GET['t']) {
		case 'USA_2020_senate':
		echo '<meta name="description" content="United States interactive 2020 senate election map">
			<title>USA - 2020 Senate Election Map</title>
			<meta property="og:title" content="YAPms - USA 2020 Senate">
			<meta property="og:description" content="Interactive USA 2020 Senate Map">';
			$h1title = "USA 2020 Senate Election";
		break;
		case 'USA_2020_governors':
		echo '<meta name="description" content="United States interactive 2020 governors election map">
			<title>USA - 2020 Governors Election Map</title>
			<meta property="og:title" content="YAPms - USA 2020 Governors Map">
			<meta property="og:description" content="Interactive USA 2020 Governors Election Map">';
			$h1title = "USA 2020 Governors Election";
		break;
		case 'USA_2020_house':
		echo '<meta name="description" content="United States interactive 2020 interactive house election map">
			<title>USA - 2020 House Election Map</title>
			<meta property="og:title" content="YAPms - USA 2020 House">
			<meta property="og:description" content="Interactive USA 2020 House Map">';
			$h1title = "USA 2020 House Election";
		break;
		case 'USA_takeall':
		echo '<meta name="description" content="United States interactive take all 2020 presidential election map">
			<title>USA - 2020 Take All Election Map</title>
			<meta property="og:title" content="YAPms - USA 2020 Take All Presidential Election Map">
			<meta property="og:description" content="Interactive USA 2020 Take All Presidential Election Map">';
			$h1title = "USA Take All";
		break;
		case 'USA_presidential_territories':
		echo '<meta name="description" content="United States interactive 2020 presidential election map with territories">
			<title>USA - 2020 Presidential Election Map With Territories</title>
			<meta property="og:title" content="YAPms - USA 2020 Presidential Election Map With Territories">
			<meta property="og:description" content="Interactive USA 2020 Presidential Election Map With Territories">';
			$h1title = "USA Presidential Territories";
		break;
		case 'USA_proportional':
		echo '<meta name="description" content="United States interactive proportional 2020 presidential election map">
			<title>USA - 2020 Proportional Election Map</title>
			<meta property="og:title" content="YAPms - USA 2020 Proportional Presidential Election Map">
			<meta property="og:description" content="Interactive USA 2020 Proportional Presidential Election Map">';
			$h1title = "USA Proportional Election";
		break;
		case 'USA_trump_impeachment_support':
		echo '<meta name="description" content="Trump Impeachment Support Map">
			<title>USA - Trump Impeachment Support Map</title>
			<meta property="og:title" content="YAPms - Trump Impeachment Support Map">
			<meta property="og:description" content="Interactive Trump Impeachment Support Map">';
			$h1title = "Trump Impeachment Support";
		break;
		case 'USA_2020_cook':
		echo '<meta name="description" content="United States interactive 2020 Cook Political Report forecast">
			<title>USA - 2020 Cook Political Report Election Forecast</title>
			<meta property="og:title" content="YAPms - USA 2020 Cook Political Report Forecast">
			<meta property="og:description" content="Interactive USA 2020 Cook Political Report Map">';
			$h1title = "Cook's 2020 Presidential Forecast";
		break;
		case 'USA_2020_inside':
		echo '<meta name="description" content="United States interactive 2020 Inside Elections forecast">
			<title>USA - 2020 Inside Elections Election Forecast</title>
			<meta property="og:title" content="YAPms - USA 2020 Inside Elections Forecast">
			<meta property="og:description" content="Interactive USA 2020 Cook Political Report Map">';
			$h1title = "Inside Election's 2020 Presidential Forecast";
		break;
		case 'USA_2020_sabatos':
		echo '<meta name="description" content="United States interactive 2020 Sabatos Crystal Ball forecast">
			<title>USA - 2020 Sabatos Crystal Ball Election Forecast</title>
			<meta property="og:title" content="YAPms - USA 2020 Sabatos Crystal Ball Forecast">
			<meta property="og:description" content="Interactive USA 2020 Sabatos Crystal Ball Map">';
			$h1title = "Sabato's 2020 Presidential Forecast";
		break;
		case 'USA_county':
		echo '<meta name="description" content="United States interactive county election map">
			<title>USA - County Election Map</title>
			<meta property="og:title" content="YAPms - USA County">
			<meta property="og:description" content="Interactive USA County Map">';
			$h1title = "USA County Map";
		break;
		case 'USA_2016_presidential_county':
		echo '<meta name="description" content="United States interactive 2016 county election map">
			<title>USA - 2016 County Election Map</title>
			<meta property="og:title" content="YAPms - USA 2016 County Election Results">
			<meta property="og:description" content="Interactive USA 2016 County Election Results Map">';
			$h1title = "USA 2016 County Results";
		break;
		case 'USA_governors':
		echo '<meta name="description" content="United States interactive governors election map">
			<title>USA - Governors Election Map</title>
			<meta property="og:title" content="YAPms - USA Governors">
			<meta property="og:description" content="Interactive USA Governors Map">';
			$h1title = "USA Governors Map";
		break;
		case 'USA_senate':
		echo '<meta name="description" content="United States interactive senate election map">
			<title>USA - Senate Election Map</title>
			<meta property="og:title" content="YAPms - USA Senate">
			<meta property="og:description" content="Interactive USA Senate Map">';
			$h1title = "USA Senate Map";
		break;
		case 'USA_current_senate':
		echo '<meta name="description" content="United States interactive current senate map">
			<title>USA - Current Senate Map</title>
			<meta property="og:title" content="YAPms - USA Current Senate Map">
			<meta property="og:description" content="Interactive USA Current Senate Map">';
			$h1title = "USA Current Senate";
		break;
		case 'USA_current_house':
		echo '<meta name="description" content="United States interactive current house map">
			<title>USA - Current House Map</title>
			<meta property="og:title" content="YAPms - USA Current House Map">
			<meta property="og:description" content="Interactive USA Current House Map">';
			$h1title = "USA Current House";
		break;
		case 'USA_2020_house_cook':
		echo '<meta name="description" content="United States interactive 2020 House Cook Political Report forecast">
			<title>USA - 2020 Cook Political Report House Forecast</title>
			<meta property="og:title" content="YAPms - USA 2020 House Cook Political Report Forecast">
			<meta property="og:description" content="Interactive USA 2020 House Cook Political Report Map">';
			$h1title = "Cook's 2020 House Forecast";
		break;
		case 'USA_2008_house':
		echo '<meta name="description" content="United States interactive 2008 house election map">
			<title>USA - 2008 House Election Map</title>
			<meta property="og:title" content="YAPms - USA 2008 House">
			<meta property="og:description" content="Interactive USA 2008 House Map">';
			$h1title = "USA 2018 House Map";
		break;
		case 'USA_2024_projection':
		echo '<meta name="description" content="United States interactive 2024 electoral college projection map">
			<title>USA - 2024 Electoral College Projection Map</title>
			<meta property="og:title" content="YAPms - USA 2024 Electoral College Projection">
			<meta property="og:description" content="Interactive USA 2024 Electoral College Projection Map">';
			$h1title = "USA 2024 Electoral College";
		break;

		case 'Germany_bundestag':
		echo '<meta name="description" content="Germany - Interactive Bundestag election map">
			<title>Germany - Bundestag Election Map</title>
			<meta property="og:title" content="YAPms - Germany Bundestag">
			<meta property="og:description" content="Interactive German Budestag Map">';
			$h1title = "German Bundestag";
		break;
		case 'Germany_states':
		echo '<meta name="description" content="Germany - Interactive state election map">
			<title>Germany - State Election Map</title>
			<meta property="og:title" content="YAPms - Germany States">
			<meta property="og:description" content="Interactive German States Map">';
			$h1title = "German States";
		break;

		case 'Canada_provinces':
		echo '<meta name="description" content="Canada - Interactive province election map">
			<title>Canada - Province Election Map</title>
			<meta property="og:title" content="YAPms - Canada Provinces">
			<meta property="og:description" content="Interactive Canadian Provinces Map">';
			$h1title = "Canadian Provinces";
		break;
		case 'Canada_constituencies':
		case 'Canada_house_of_commons':
		echo '<meta name="description" content="Canada - Interactive House of Commons election map">
			<title>Canada - House of Commons Election Map</title>
			<meta property="og:title" content="YAPms - Canada House of Commons">
			<meta property="og:description" content="Interactive Canadian House of Commons Map">';
			$h1title = "Canadian House of Commons";
		break;
		case 'Canada_2019_house_of_commons':
		echo '<meta name="description" content="Canada - Interactive 2019 House of Commons election results map">
			<title>Canada - 2019 House of Commons Election Results Map</title>
			<meta property="og:title" content="YAPms - 2019 Canada House of Commons Election Results">
			<meta property="og:description" content="Interactive 2019 Canadian House of Commons Election Results Map">';
			$h1title = "Canadian 2019 House of Commons Results";
		break;

		case 'Argentina_chamber_of_deputies':
		echo '<meta name="description" content="Argentina - Interactive Chamber of Deputies election map">
			<title>Argentina - Chamber of Deputies Election Map</title>
			<meta property="og:title" content="YAPms - Argentina Chamber of Deputies Election Map">
			<meta property="og:description" content="Interactive Argentine Chamber of Deputies Election Map">';
			$h1title = "Argentinian Chamber of Deputies";
		break;

		case 'Australia_states':
		echo '<meta name="description" content="Australia - Interactive state election map">
			<title>Australia - State Election Map</title>
			<meta property="og:title" content="YAPms - Australia States Election Map">
			<meta property="og:description" content="Interactive Australian State Election Map">';
			$h1title = "Australian States";
		break;
		case 'Australia_constituencies':
		case 'Australia_house_of_representatives':
		echo '<meta name="description" content="Australia - House of Representatives election map">
			<title>Australia - House of Representatives Election</title>
			<meta property="og:title" content="YAPms - Australia House of Representatives">
			<meta property="og:description" content="Interactive Australian House of Representatives Map">';
			$h1title = "Australian House of Representatives";
		break;

		case 'Netherlands_provinces':
		echo '<meta name="description" content="Netherland - Interactive provinces election map">
			<title>Netherlands - Province Election Map</title>
			<meta property="og:title" content="YAPms - Netherland Provinces">
			<meta property="og:description" content="Interactive Dutch Provinces Map">';
			$h1title = "Dutch Provinces";
		break;
		case 'Netherlands_gemeenten':
		echo '<meta name="description" content="Netherlands - Interactive Gemeenten election map">
			<title>Netherlands - Gemeenten Election Map</title>
			<meta property="og:title" content="YAPms - Netherland Gemeenten">
			<meta property="og:description" content="Interactive Dutch Gemeenten Map">';
			$h1title = "Dutch Gemeenten";
		break;

		case 'Brazil_deputies':
		case 'Brazil_chamber_of_deputies':
		echo '<meta name="description" content="Brazil - Interactive Chamber of Deputies election map">
			<title>Brazil - Chamber of Deputies Election Map</title>
			<meta property="og:title" content="YAPms - Brazil Chamber of Deputies">
			<meta property="og:description" content="Interactive Brazilian Chamber of Deputies Map">';
			$h1title = "Brazilian Deputies";
		break;
		case 'Brazil_federal_senate':
		echo '<meta name="description" content="Brazil - Interactive Federal Senate election map">
			<title>Brazil - Federal Senate Election Map</title>
			<meta property="og:title" content="YAPms - Brazil Federal Senate">
			<meta property="og:description" content="Interactive Brazilian Federal Senate Map">';
			$h1title = "Brazilian Federal Senate";
		break;

		case 'Spain_constituencies':
		case 'Spain_congress_of_deputies':
		echo '<meta name="description" content="Spain - Interactive Congress of Deputies election map">
			<title>Spain - Congress of Deputies Election Map</title>
			<meta property="og:title" content="YAPms - Spain Congress of Deputies">
			<meta property="og:description" content="Interactive Spanish Congress of Deputies Map">';
			$h1title = "Spanish Congress of Deputies";
		break;

		case 'Turkey_national_assembly':
		echo '<meta name="description" content="Turkey - Interactive National Assembly election map">
			<title>Turkey - National Assembly Election Map</title>
			<meta property="og:title" content="YAPms - Turkey National Assembly">
			<meta property="og:description" content="Interactive Turkey National Assembly Map">';
			$h1title = "Turkish National Assembly";
		break;

		case 'Trinidad_Tobago_house_of_representatives':
		echo '<meta name="description" content="Trinidad & Tobago - Interactive House of Representatives election map">
			<title>Trinidad & Tobago - House of Representatives Election Map</title>
			<meta property="og:title" content="YAPms - Trinidad Tobago House of Representatives">
			<meta property="og:description" content="Interactive Trinidad Tobago House of Representatives Map">';
			$h1title = "Trinidad and Tobago House";
		break;

		case 'Portugal_assembly_of_the_republic':
		echo '<meta name="description" content="Portugal - Interactive Assembly of the Republic election map">
			<title>Portugal - Assembly of the Republic Election Map</title>
			<meta property="og:title" content="YAPms - Portugal Assembly of the Republic">
			<meta property="og:description" content="Interactive Portuguese Assembly of the Republic Map">';
			$h1title = "Portuguese Assembly of the Republic";
		break;

		case 'India_lok_sabha':
		echo '<meta name="description" content="India - Interactive Lok Sabha election map">
			<title>India - Lok Sabha Election Map</title>
			<meta property="og:title" content="YAPms - India Lok Sabha">
			<meta property="og:description" content="Interactive Indian Lok Sabha Map">';
			$h1title = "Indian Lok Sabha";
		break;
		case 'India_2019_lok_sabha':
		echo '<meta name="description" content="India - Interactive 2019 Lok Sabha election results map">
			<title>India - 2019 Lok Sabha Election Results Map</title>
			<meta property="og:title" content="YAPms - 2019 India Lok Sabha Election Results">
			<meta property="og:description" content="Interactive 2019 Indian Lok Sabha Election Results Map">';
			$h1title = "Indian 2019 Lok Sabha Results";
		break;

		case 'SouthAfrica_national_assembly':
		echo '<meta name="description" content="South Africa - Interactive National Assembly election map">
			<title>South Africa - National Assembly Election Map</title>
			<meta property="og:title" content="YAPms - South Africa National Assembly">
			<meta property="og:description" content="Interactive South African National Assembly Map">';
			$h1title = "South African National Assembly";
		break;

		case 'Sweden_riksdag':
		echo '<meta name="description" content="Sweden - Interactive Riksdag election map">
			<title>Sweden - Riksdag Election Map</title>
			<meta property="og:title" content="YAPms - Sweden Riksdag Election Map">
			<meta property="og:description" content="Interactive Sweden Riksdag Election Map">';
			$h1title = "Swedish Riksdag";
		break;

		case 'Italy_states':
		echo '<meta name="description" content="Italy - Interactive State election map">
			<title>Italy - State Election Map</title>
			<meta property="og:title" content="YAPms - Italy States">
			<meta property="og:description" content="Interactive Italian States Map">';
			$h1title = "Italian States";
		break;

		case 'UnitedKingdom_historic_counties':
		echo '<meta name="description" content="United Kingdom - Interactive Historic county map">	
			<title>United Kingdom - Historic County Map</title>
			<meta property="og:title" content="YAPms - United Kingdom Historic County Map">
			<meta property="og:description" content="Interactive United Kingdom Historic County Map">';
			$h1title = "UK Historic Counties";
		break;
		case 'UnitedKingdom_house_of_commons':
		echo '<meta name="description" content="United Kingdom - Interactive House of Commons election map">
			<title>United Kingdom - House of Commons Election Map</title>
			<meta property="og:title" content="YAPms - United Kingdom House of Commons">
			<meta property="og:description" content="Interactive United Kingdom House of Commons Map">';
			$h1title = "UK House of Commons";
		break;
		case 'UnitedKingdom_current_parliament':
		echo '<meta name="description" content="United Kingdom - Interactive current Parliament map">
			<title>United Kingdom - Current Parliament Map</title>
			<meta property="og:title" content="YAPms - United Kingdom Current Parliament">
			<meta property="og:description" content="Interactive United Kingdom Current Parliament Map">';
			$h1title = "UK Current Parliament";
		break;

		case 'Ireland_dail_eireann':
		echo '<meta name="description" content="Ireland - Interactive Dáil Éireann election map">
			<title>Ireland - Dáil Éireann Election Map</title>
			<meta property="og:title" content="YAPms - Ireland Dáil Éireann">
			<meta property="og:description" content="Interactive Irish Dáil Éireann Map">';
			$h1title = "Irish Dáil Éireann";
		break;

		case 'France_national_assembly':
		echo '<meta name="description" content="France - Interactive National Assembly election map">
			<title>France - National Assembly Election Map</title>
			<meta property="og:title" content="YAPms - France National Assembly">
			<meta property="og:description" content="Interactive French National Assembly Map">';
			$h1title = "French National Assembly";
		break;

		case 'Pakistan_national_assembly':
		echo '<meta name="description" content="Pakistan - Interactive National Assembly election map">
			<title>Pakistan - National Assembly Election Map</title>
			<meta property="og:title" content="YAPms - Pakistan National Assembly">
			<meta property="og:description" content="Interactive Pakistan National Assembly Map">';
			$h1title = "Pakistan National Assembly";
		break;

		case 'Russia_federal_council':
		echo '<meta name="description" content="Russia - Interactive Federal Council election map">
			<title>Russia - Federal Council Election Map</title>
			<meta property="og:title" content="YAPms - Russia Federal Council">
			<meta property="og:description" content="Interactive Russian Federal Council Map">';
			$h1title = "Russian Federal Council";
		break;
		case 'Russia_duma':
		echo '<meta name="description" content="Russia - Interactive Duma election map">
			<title>Russia - Duma Election Map</title>
			<meta property="og:title" content="YAPms - Russia Duma">
			<meta property="og:description" content="Interactive Russian Duma Map">';
			$h1title = "Russian Duma";
		break;

		case 'Switzerland_council_of_states':
		echo '<meta name="description" content="Switzerland - Interactive Council of States map">
			<title>Switzerland - Council of States Election Map</title>
			<meta property="og:title" content="YAPms - Switzerland Council of States">
			<meta property="og:description" content="Interactive Switzerland Council of States Map">';
			$h1title = "Swiss Council of States";
		break;
		case 'Switzerland_national_council':
		echo '<meta name="description" content="Switzerland - Interactive National Council map">
			<title>Switzerland - National Council Election Map</title>
			<meta property="og:title" content="YAPms - Switzerland National Council">
			<meta property="og:description" content="Interactive Switzerland National Council Map">';
			$h1title = "Swiss National Council";
		break;

		case 'USA_Canada':
		echo '<meta name="description" content="Combined USA and Canada election map">
			<title>USA/Canada Election Map</title>
			<meta property="og:title" content="YAPms - USA / Canada">
			<meta property="og:description" content="Interactive USA / Canada Map">';
			$h1title = "USA / Canada";
		break;

		case 'EuropeanUnion':
		echo '<meta name="description" content="Interactive European Union election map">
			<title>European Union Election Map</title>
			<meta property="og:title" content="YAPms - European Union">
			<meta property="og:description" content="Interactive European Union Map">';
			$h1title = "European Union";
		break;

		case 'World':
		echo '<meta name="description" content="Interactive world map">
			<title>World Map</title>
			<meta property="og:title" content="YAPms - World">
			<meta property="og:description" content="Interactive World Map">';
			$h1title = "World Map";
		break;
		default:
		echo '<meta name="description" content="United States Presidential, Senatorial, Congressional, Guberntorial and Primary interactive election maps. United Kingdom, Canada, Germany election maps.">
			<title>YAPms - Interactive Political Election Maps</title>
			<meta property="og:title" content="YAPms - Yet Another Political Map Simulator">
			<meta property="og:description" content="Interactive Political Maps">';
		break;
	}
	}
} else if (isset($_GET["m"]) && !empty($_GET["m"])) {
	echo '<meta name="description" content="Create and share interactive political maps for countries all across the world. Including the USA, UK, Canada, Germany and more!">
		<title>YAPms - Interactive Political Election Maps</title>
		<meta property="og:title" content="YAPms - Yet Another Political Map Simulator">
		<meta property="og:description" content="Interactive User Created Map">';

} else {
	echo '<meta name="description" content="United States interactive 2020 presidential election map">
		<title>USA - 2020 Presidential Election Map</title><link rel="canonical" href="https://www.yapms.com/app/?t=USA_2020_presidential"/>
		<meta property="og:title" content="YAPms - Yet Another Political Map Simulator">
		<meta property="og:description" content="Interactive Political Maps">
		<meta property="og:image" content="http://www.yapms.com/app/res/yapms-96.png">
		<meta property="og:image:secure_url" content="https://www.yapms.com/app/res/yapms-96.png">';
}
?>
