<!DOCTYPE html>
<?php echo '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' ?>
<html class="noSelect" lang="en">

<head>
	<meta charset="UTF-8">
<?php
	include './html/description.php';
?>
	<meta name="keywords" content="Map,Election,Political,Interactive,Simulator,Electoral,270,2020">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<meta property="og:title" content="YAPms - Yet Another Political Map Simulator">
	<meta property="og:description" content="Interactive Political Maps">
	<meta property="og:image:type" content="image/jpeg">
	<meta property="og:site_name" content="yapms.com">

	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="yapms.com">
	<meta name="twitter:description" content="Interactive Political Maps">

	<meta name="theme-color" content="#ffffff"/>
	
	<!-- CSSs (1st is Font Awesome) -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
	<link rel="icon" href="https://www.yapms.com/favicon.ico" type="image/x-icon"/>
	<link rel="shortcut icon" href="https://www.yapms.com/favicon.ico" type="image/x-icon"/>
	<link rel="manifest" href="./manifest.json">

	<?php
		$mobile = false;
		
		if(strpos($_SERVER['HTTP_USER_AGENT'], 'Mobi')) {
			$mobile = true;	
			echo '<script>var mobile = true</script>';
		} else {
			$mobile = false;	
			echo '<script>var mobile = false</script>';
		};

		if(isset($_GET["m"]) && !empty($_GET["m"]) &&
			is_numeric($_GET["m"])) {
			echo '<script>' .
				'var php_load_map = true;' .
				'var php_load_type_map = false;' .
				'var php_load_map_id = '.$_GET["m"].';' .
				'</script>';	

			echo '<meta property="og:image" content="http://www.yapms.com/app/maps/' . $_GET["m"] . '.png">';
			echo '<meta property="og:image:secure_url" content="https://www.yapms.com/app/maps/' . $_GET["m"] . '.png">';
			echo '<meta name="twitter:image" content="https://www.yapms.com/app/maps/' . $_GET["m"] . '.png">';
		} else if(isset($_GET["t"]) && !empty($_GET["t"])) {
			echo '<script>' .
				'var php_load_map = false;' .
				'var php_load_type_map = true;' .
				'var php_load_map_id = "' . $_GET["t"] . '";' .
			     '</script>';
				
		} else {
			echo '<script>' .
				'var php_load_map = false;' .
				'var php_load_type_map = false;' .
				'var php_load_map_id = 0;' .
			     '</script>';
		}
	?>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-132710089-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-132710089-1');
	</script>

	<style>
		<?php
			include './style/menu.css';
			include './style/selectmenu.css';
			include './style/popup.css';
			include './style/legend.css';
			include './style/style.css';
			include './style/battlechart.css';
			include './style/yapnews.css';
		?>
	</style>

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
</head>

<body id="body" onresize="onResize()">

<div id="yapms">

<div id="menu-div">
	<button class="click-button" onclick="clearMap()" style="white-space: nowrap;">
		<i class="fas fa-window-close"></i> Clear
	</button>

	<button class="click-button" onclick="displayMapMenu()" style="white-space: nowrap;">
		<i class="fas fa-map"></i> Maps
	</button>

	<button id="modesbutton" class="click-button" onclick="displayModeMenu()" style="white-space: nowrap;">
		<i class="fas fa-cog"></i> Modes (<i class="fas fa-paint-brush"></i> Paint/Move)
	</button>

	<button class="click-button" onclick="displayChartMenu()" style="white-space: nowrap;">
		<i class="fas fa-chart-pie"></i> Charts
	</button>

	<button class="click-button" onclick="displayThemeMenu()" style="white-space: nowrap;">
		<i class="fas fa-palette"></i> Themes
	</button>

	<a href="https://www.yapms.com/privacypolicy.html" target="_blank">
	<button id="takeallbutton" class="click-button" style="white-space: nowrap; display: none;">
		<i class="fas fa-sliders-h"></i> Take All	
	</button>
	</a>

	<button class="click-button" onclick="share()" style="white-space: nowrap;">
		<i class="fas fa-share-alt"></i> Share
	</button>

<?php
if($mobile === false) {
	echo '<button class="click-button" onclick="displayLoadMenu()" style="white-space: nowrap;">
		<i class="fas fa-upload"></i> Load
		</button>';
}
?>

	<button class="click-button" onclick="enableFullscreen()" style="white-space: nowrap;">
		<i class="fas fa-expand-arrows-alt"></i> Fullscreen	
	</button>

	<button class="click-button" onclick="displayMiscMenu()" style="white-space: nowrap;">
		<i class="fas fa-clipboard"></i> Misc
	</button>

	<button class="click-button" onclick='location.href = "https://www.yapms.com/privacypolicy.html"' style="white-space: nowrap;">
		<i class="fas fa-user-secret"></i> Privacy Policy
	</button>
</div>


<div id="application">
	<div id="legend-div">
	</div>

	<div id="chart-div">
		<div id="chart">
		<canvas id="chart-canvas" width="100" height="100"></canvas>
		</div>

		<?php
			include 'html/battlechart.html';
		?>

		<div id="logo-redeagle-div">
		</div>
		<div id="logo-div">
		</div>
	</div>

	<div id="map-div">

	</div>
<?php
if($mobile === false) {
	echo '<div id="yapnews-close" onclick="toggleYAPNews()">',
		'<svg class="yapnews-close-svg" width="8" height="24">',
			'<line id="yapnews-close-l1" x1="1" y1="0" x2="8" y2="12" stroke="#333333" stroke-width="2"/>',
			'<line id="yapnews-close-l2" x1="1" y1="24" x2="8" y2="12" stroke="#333333" stroke-width="2"/>',
		'</svg>',
		'</div>';
}
?>
</div>
</div>
<?php
if($mobile === false) {
	echo '<div id="yapnews">' ,
		'<div id="yapnews-header">' ,
		'<a href="https://www.yapms.com/news" target="_blank" ', 
		'style="color:inherit; text-decoration: none;">' ,
			'YAPNews' , 
		'</a>' ,
		'</div>' ,
		'<a id="yapnews-discord-link" href="https://discord.gg/WQh5fHU" target="_blank">',
		'<div id="yapnews-discord">',
			'Join Our Discord',
			'</div>',
		'</a>',
		'<div id="yapnews-articles">' ,
		'</div>' ,
	'</div>';
}
?>

<div id="demdel" class="popup">
	<h3 id="demdel-message"></h3>
	<div id="demdel-ranges">
	</div>
	<input id="demdel-state-name" type="hidden">
	<br>
	<button class="setbutton" onclick="setDelegates(this)">set</button>
</div>

<div id="ecedit" class="popup">
	<h3 id="ecedit-message"></h3>
	<input id="state-ec" type="number" name="value" min="1" max="10000" step="1">
	<input id="state-id" type="hidden">
	<button class="setbutton" onclick="setEC(this);">set</button>
</div>

<div id="candidateedit" class="popup">
	<h3 id="candidateedit-message"></h3>
	Name <input id="candidate-name" type="text" name="name"><br><br>
	Solid <input id="candidate-solid" type="color"><br>
	Likely <input id="candidate-likely" type="color"><br>
	Lean <input id="candidate-lean" type="color"><br>
	Tilt <input id="candidate-tilt" type="color"><br><br>
	<input id="candidate-originalName" type="hidden">
	<button class="setbutton" onclick="setCandidate(this)">set</button>
	<!--<button id="deletecandidate" onclick="deleteCandidate(this)">delete</button>-->
</div>

<div id="miscmenu" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Misc</h2>
	<a class="selectmenu-button" onclick="displayVersionInfo()">Version Info</a>
	<a class="selectmenu-button" onclick="centerMap()">Center Map</a>
	<a class="selectmenu-button" onclick="toggleLTELogo()">LTE Logo</a>
	<a class="selectmenu-button" onclick="toggleRedEagleLogo()">RedEagle Logo</a>
	<a class="selectmenu-button" onclick="disableNews()">Disable News</a>
</div>

<div id="customcolormenu" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Custom Color Edit</h2>
	<input id="custom-color-name" type="hidden">
	<a class="selectmenu-button">Solid <input id="solidcustom" type="color"></a>
	<a class="selectmenu-button">Likely <input id="likelycustom" type="color"></a>
	<a class="selectmenu-button">Leaning <input id="leaningcustom" type="color"></a>
	<a class="selectmenu-button">Tilting<input id="tiltingcustom" type="color"></a>
	<a class="selectmenu-button" onclick="saveCustomColors(); displayAddCandidateMenu()">Set</a>
</div>

<div id="addcandidatemenu" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Add Candidate</h2>
	<a class="selectmenu-button">Name <input id="name" type="text"></a>
	<a class="selectmenu-button selectmenu-red" onclick='setColors("red")'>Red Colors</a>
	<a class="selectmenu-button selectmenu-blue" onclick='setColors("blue")'>Blue Colors</a>
	<a class="selectmenu-button selectmenu-green" onclick='setColors("green")'>Green Colors</a>
	<a class="selectmenu-button selectmenu-yellow" onclick='setColors("yellow")'>Yellow Colors</a>
	<div class="selectmenu-button-double">
		<a id="custom1button" class="selectmenu-button-left selectmenu-button selectmenu-button-bold"
			onclick='setColors("custom1")'>Custom 1</a>	
		<a class="selectmenu-button-right selectmenu-button fas fa-cog"
			onclick='displayCustomColorMenu("custom1")'></a>
	</div>
	<div class="selectmenu-button-double">
		<a id="custom2button" class="selectmenu-button-left selectmenu-button selectmenu-button-bold"
			onclick='setColors("custom2")'>Custom 2</a>	
		<a class="selectmenu-button-right selectmenu-button fas fa-cog"
			onclick='displayCustomColorMenu("custom2")'></a>
	</div>
	<div class="selectmenu-button-double">
		<a id="custom3button" class="selectmenu-button-left selectmenu-button selectmenu-button-bold"
			onclick='setColors("custom3")'>Custom 3</a>	
		<a class="selectmenu-button-right selectmenu-button fas fa-cog"
			onclick='displayCustomColorMenu("custom3")'></a>
	</div>
	<div class="selectmenu-button-double">
		<a id="custom4button" class="selectmenu-button-left selectmenu-button selectmenu-button-bold"
			onclick='setColors("custom4")'>Custom 4</a>	
		<a class="selectmenu-button-right selectmenu-button fas fa-cog"
			onclick='displayCustomColorMenu("custom4")'></a>
	</div>
	<a class="selectmenu-button">Solid <input id="solid" type="color"></a>
	<a class="selectmenu-button">Likely <input id="likely" type="color"></a>
	<a class="selectmenu-button">Leaning <input id="leaning" type="color"></a>
	<a class="selectmenu-button">Tilting<input id="tilting" type="color"></a>
	<a class="selectmenu-button" onclick="addCandidate(); closeNotification(this);">Add</a>
</div>

<div id="deletecandidateconfirm" class="popup">
	<h2>Delete Candidate?</h2>
	<input id="delete-candidate-name" type="hidden">
	<button class="yes-button" onclick='deleteCandidateByName(document.getElementById("delete-candidate-name").value); closeNotification(this);'>Yes</button>
	<button class="no-button" onclick="closeNotification(this);">No</button>
</div>

<div id="modemenu" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Select Mode</h2>
	<a class="selectmenu-button" id="paintmovebutton" onclick='closeNotification(this); setMode("paintmove")'><i class="fas fa-paint-brush"></i> Paint/Move</a>
	<a class="selectmenu-button" onclick='closeNotification(this); setMode("paint")'><i class="fas fa-paint-brush"></i> Paint</a>
	<a class="selectmenu-button" id="movebutton" onclick='closeNotification(this); setMode("move")'><i class="fas fa-arrows-alt"></i> Move</a>
	<a class="selectmenu-button" onclick='closeNotification(this); setMode("delete")'><i class="fas fa-eraser"></i> Disable State</a>
	<a class="selectmenu-button" onclick='closeNotification(this); setMode("ec")'><i class="far fa-edit"></i> EC Edit</a>
	<a class="selectmenu-button" onclick='closeNotification(this); setMode("candidate")'><i class="fas fa-user-edit"></i> Edit Candidate</a>
</div>

<div id="thememenu" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Select Theme</h2>	
	<a class="selectmenu-button" onclick='darkPalette()'>Dark</a>
	<a class="selectmenu-button" onclick='terminalPalette()'>Terminal</a>
	<a class="selectmenu-button" onclick='lightPalette()'>Light</a>
	<a class="selectmenu-button" onclick='contrastPalette()'>Contrast</a>
	<a class="selectmenu-button" onclick='metallicPalette()'>Metallic</a>
	<a class="selectmenu-button" onclick='toWinPalette()'>Default</a>
</div>

<div id="chartmenu" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Select Chart</h2>	
	<a class="selectmenu-split">Charts</a>
	<a class="selectmenu-button" onclick='setChart("horizontalbattle")'>Horizontal Battle</a>
	<a class="selectmenu-button" onclick='setChart("verticalbattle")'>Vertical Battle</a>
	<a class="selectmenu-button" onclick='setChart("pie")'>Side Pie</a>
	<a class="selectmenu-button" onclick='setChart("pie","bottom")'>Bottom Pie</a>
	<a class="selectmenu-button" onclick='setChart("doughnut")'>Side Doughnut</a>
	<a class="selectmenu-button" onclick='setChart("doughnut", "bottom")'>Bottom Doughnut</a>
	<a class="selectmenu-button" onclick='setChart("horizontalBar")'>Side Bar</a>
	<a class="selectmenu-button" onclick='setChart("none")'>None</a>
	<a class="selectmenu-split">Chart Settings</a>
	<a class="selectmenu-button" onclick='toggleLegendCounter()'>Legend Counter</a>
	<a class="selectmenu-button" onclick='toggleChartLabels()'>Chart Labels</a>
	<a class="selectmenu-button" onclick='toggleChartLeans()'>Chart Leans</a>
	<a class="selectmenu-button" onclick='toggleLegendLeans()'>Legend Leans</a>
</div>

<div id="presetmenu" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Add Candidates</h2>	
	<a class="selectmenu-split">Custom</a>
	<a class="selectmenu-button" onclick='customColorBackground(); displayAddCandidateMenu();'>Add Custom</a>
	<a class="selectmenu-split">Preset</a>
	<a class="selectmenu-button" onclick='loadPreset("tossup")'>Clear</a>
	<a class="selectmenu-button" onclick='loadPreset("classic")'>R/D</a>
	<a class="selectmenu-button" onclick='loadPreset("libertarian")'>R/D/L</a>
	<a class="selectmenu-button" onclick='loadPreset("green")'>R/D/G</a>
	<a class="selectmenu-button" onclick='loadPreset("majors")'>R/D/G/L</a>
</div>

<!-- UK Maps -->
<div id="mapmenu-uk" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>United Kingdom</h2>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/unitedkingdom.svg", 16, 0.075, "congressional", "congressional", "open");'>United Kingdom</a>
</div>

<!-- Canada Maps -->
<div id="mapmenu-canada" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Canada</h2>
	<a class="selectmenu-button" href="./?t=Canada_provinces">Canada Provinces</a>
	<a class="selectmenu-button" href="./?t=Canada_constituencies">Canada Constituencies</a>
</div>

<!-- German Maps -->
<div id="mapmenu-germany" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Germany</h2>
	<a class="selectmenu-button" href="./?t=Germany_states">States</a>
	<a class="selectmenu-button" href="./?t=Germany_constituencies">Constituencies</a>
</div>

`<!-- Australia Maps -->
<div id="mapmenu-australia" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Australia</h2>
	<a class="selectmenu-button" href="./?t=Australia_states">States</a>
	<a class="selectmenu-button" href="./?t=Australia_constituencies">Constituencies</a>
</div>

<!-- Italy Maps -->
<div id="mapmenu-italy" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Italy</h2>
	<a class="selectmenu-button" href="./?t=Italy_states">States</a>
	<!--<a class="selectmenu-button" href="./?t=Italy_constituencies">Constituencies</a>-->
</div>

<!-- USA Maps -->
<div id="mapmenu-usa" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>USA Maps</h2>
	<a class="selectmenu-split">2020</a>
	<a class="selectmenu-button" href="./?t=2020_presidential">Presidential</a>
	<a class="selectmenu-button" href="./?t=2020_senatorial">Senatorial</a>
	<a class="selectmenu-button" href="./?t=2020_gubernatorial">Gubernatorial</a>
	<a class="selectmenu-split">Forecasts</a>
	<a class="selectmenu-button" href="./?t=2020_cook">Cook Political Report</a>
	<a class="selectmenu-button" href="./?t=2020_inside">Inside Elections</a>
	<a class="selectmenu-button" href="./?t=2020_sabatos">Sabatos Crystal Ball</a>
	<a class="selectmenu-split">Primaries</a>
	<a class="selectmenu-button" href="./?t=2020_democratic_primary">Democratic</a>
	<a class="selectmenu-button" href="./?t=2020_republican_primary">Republican</a>
	<a class="selectmenu-split">Open</a>
	<a class="selectmenu-button" href="./?t=USA_takeall">Presidential Take All</a>
	<a class="selectmenu-button" href="./?t=USA_proportional">Presidential Proportional</a>
	<a class="selectmenu-button" href="./?t=USA_senatorial">Senatorial</a>
	<a class="selectmenu-button" href="./?t=USA_gubernatorial">Gubernatorial</a>
	<a class="selectmenu-button" href="./?t=USA_congressional">Congressional Present</a>
	<a class="selectmenu-button" href="./?t=USA_congressional_2008">Congressional 2008</a>
	<a class="selectmenu-button" href="./?t=USA_county">County</a>
</div>

<!-- USA Historical Maps -->
<div id="mapmenu-usa-historical" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>USA Historical Maps</h2>
	<a class="selectmenu-button" href="./?t=2016_presidential">Presidential 2016</a>
        <a class="selectmenu-button" href="./?t=2016_presidential_county">Presidential County 2016</a>
	<a class="selectmenu-button" href="./?t=2012_presidential">Presidential 2012</a>
        <a class="selectmenu-button" href="./?t=2012_presidential_county">Presidential County 2012</a>
	<a class="selectmenu-button" href="./?t=2008_presidential">Presidential 2008</a>
	<a class="selectmenu-button" href="./?t=2004_presidential">Presidential 2004</a>
	<a class="selectmenu-button" href="./?t=2000_presidential">Presidential 2000</a>
	<a class="selectmenu-button" href="./?t=1996_presidential">Presidential 1996</a>
	<a class="selectmenu-button" href="./?t=1992_presidential">Presidential 1992</a>
	<a class="selectmenu-button" href="./?t=1988_presidential">Presidential 1988</a>
	<a class="selectmenu-button" href="./?t=1984_presidential">Presidential 1984</a>
	<a class="selectmenu-button" href="./?t=1980_presidential">Presidential 1980</a>
	<a class="selectmenu-button" href="./?t=1976_presidential">Presidential 1976</a>
	<a class="selectmenu-button" href="./?t=1972_presidential">Presidential 1972</a>
	<a class="selectmenu-button" href="./?t=1968_presidential">Presidential 1968</a>
	<a class="selectmenu-button" href="./?t=1964_presidential">Presidential 1964</a>
	<a class="selectmenu-button" href="./?t=1960_presidential">Presidential 1960</a>
	<a class="selectmenu-button" href="./?t=1956_presidential">Presidential 1956</a>
	<a class="selectmenu-button" href="./?t=1952_presidential">Presidential 1952</a>
	<a class="selectmenu-button" href="./?t=1948_presidential">Presidential 1948</a>
	<a class="selectmenu-button" href="./?t=1944_presidential">Presidential 1944</a>
	<a class="selectmenu-button" href="./?t=1940_presidential">Presidential 1940</a>
	<a class="selectmenu-button" href="./?t=1936_presidential">Presidential 1936</a>
	<a class="selectmenu-button" href="./?t=1932_presidential">Presidential 1932</a>
	<a class="selectmenu-button" href="./?t=1928_presidential">Presidential 1928</a>
	<a class="selectmenu-button" href="./?t=1924_presidential">Presidential 1924</a>
	<a class="selectmenu-button" href="./?t=1920_presidential">Presidential 1920</a>
	<a class="selectmenu-button" href="./?t=1916_presidential">Presidential 1916</a>
	<a class="selectmenu-button" href="./?t=1912_presidential">Presidential 1912</a>
	<a class="selectmenu-button" href="./?t=1908_presidential">Presidential 1908</a>
	<a class="selectmenu-button" href="./?t=1904_presidential">Presidential 1904</a>
	<a class="selectmenu-button" href="./?t=1900_presidential">Presidential 1900</a>
	<a class="selectmenu-button" href="./?t=1896_presidential">Presidential 1896</a>
	<a class="selectmenu-button" href="./?t=1892_presidential">Presidential 1892</a>
	<a class="selectmenu-button" href="./?t=1888_presidential">Presidential 1888</a>
	<a class="selectmenu-button" href="./?t=1884_presidential">Presidential 1884</a>
	<a class="selectmenu-button" href="./?t=1880_presidential">Presidential 1880</a>
	<a class="selectmenu-button" href="./?t=1876_presidential">Presidential 1876</a>
	<a class="selectmenu-button" href="./?t=1872_presidential">Presidential 1872</a>
	<a class="selectmenu-button" href="./?t=1868_presidential">Presidential 1868</a>
	<a class="selectmenu-button" href="./?t=1864_presidential">Presidential 1864</a>
</div>

<!-- Mock Maps -->
<div id="mapmenu-lte" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>LTE</h2>
	<a class="selectmenu-button" href="./?t=LTE_presidential">Presidential</a>
	<a class="selectmenu-button" href="./?t=LTE_senatorial">Senatorial</a>
	<a class="selectmenu-button" href="./?t=LTE_congressional">Congressional</a>
</div>

<!-- Maps menu -->
<div id="mapmenu" class="popup selectmenu">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Select Map</h2>
	<a class="selectmenu-split">Countries</a>
	<a class="selectmenu-button" onclick='closeNotification(this); displayCountryMenu("usa")'; >USA</a>
	<a class="selectmenu-button" onclick='closeNotification(this); displayCountryMenu("usa-historical")'; >USA Historical</a>
	<a class="selectmenu-button" onclick='closeNotification(this); displayCountryMenu("germany")'; >Germany</a>
	<a class="selectmenu-button" onclick='closeNotification(this); displayCountryMenu("canada")'>Canada</a>
	<a class="selectmenu-button" onclick='closeNotification(this); displayCountryMenu("australia")'; >Australia</a>
	<a class="selectmenu-button" href="./?t=Italy_states">Italy</a>
	<a class="selectmenu-button" href="./?t=UnitedKingdom_constituencies">United Kingdom</a>
	<a class="selectmenu-button" href="./?t=France_constituencies">France</a>
	<a class="selectmenu-button" href="./?t=EuropeanUnion">EU</a>
	<a class="selectmenu-button" href="./?t=World">World</a>
	<a class="selectmenu-split">Mock</a>
	<a class="selectmenu-button" onclick='closeNotification(this); displayCountryMenu("lte")'; >LTE</a>
</div> 

<div id="notification" class="popup">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h3 id="notification-title"></h3>
	<p id="notification-message"></p>
</div>

<div id="share" class="popup">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h3>Share Link</h3>
	<div id="shareurl"></div>
	<br>
<?php 
if($mobile === false) {
	echo '<a id="downloadbutton" class="download-button"><i class="fas fa-download"></i>  Download</a><br><br>';
}
?>
	<img id="screenshotimg"/>
</div>

<div id="loadmenu" class="popup">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Load From File</h2>
	<p>Select a yapms file to load</p>
	<form action="load.php" method="post" enctype="multipart/form-data">
		<input type="file" name"file" id="loadfile">
		<input type="button" value="Load" onclick='loadFileMap()'>
	</form>

</div>

<div id="versioninfo" class="popup">
	<object type="image/svg+xml" data="./html/closebutton.svg" >Error</object>
	<h2>Version Info</h2>
	<a id="versioninfo-text"></a>
</div>

<script>
	if('serviceWorker' in navigator) {
		console.log('Attempting to register service worker');
		navigator.serviceWorker
		.register('../sw.js')
		.then(function(a) {
			console.log('SW: registered');
		}, function(err) {
			console.log('SW: register error... ', err);
		});
	}
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.5.0"></script> 
<script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.5.0/dist/svg-pan-zoom.min.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
<script src="./src/Candidate.js"></script>
<script src="./src/loadmap.js"></script>
<script src="./src/savemap.js"></script>
<script src="./src/data.js"></script>
<script src="./src/State.js"></script>
<script src="./src/htmlControl.js"></script>
<script src="./src/battlechart.js"></script>
<script src="./src/presets.js"></script>
<script src="./src/click.js"></script>
<script src="./src/main.js"></script>
<?php 
	if($mobile === true) {
		echo '<script src="./src/mobile.js"></script>';
	} else {
		echo '<script src="./src/yapnews.js"></script>';
	}
?>
<script src="./src/html2canvas.min.js"></script>
<script src="./src/deferedImages.js"></script>
</body>
</html>
