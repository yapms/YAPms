<!DOCTYPE html>
<html id="html" class="noSelect" lang="en">
<head>
	<meta charset="UTF-8">
<?php
	require './html/description.php';
?>
	<meta name="keywords" content="Map,Election,Political,Interactive,Simulator,Electoral,2020,USA,Presidential">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="HandheldFriendly" content="true">
	<meta name="apple-mobile-web-app-capable" content="yes">
	
	<meta property="og:image:type" content="image/png">
	<meta property="og:site_name" content="yapms.com">
	<meta property="og:type" content="article">

	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="yapms.com">
	<meta name="twitter:description" content="Interactive Political Maps">

	<meta name="theme-color" content="#ffffff"/>
	<link rel="icon" href="./res/yapms/yapms-16.png" sizes="16x16" type="image/png"/>
	<link rel="icon" href="./res/yapms/yapms-32.png" sizes="32x32" type="image/png"/>
	<link rel="icon" href="./res/yapms/yapms-48.png" sizes="48x48" type="image/png"/>
	<link rel="apple-touch-icon" href="./res/yapms/yapms-180.png" sizes="180x180" type="image/png"/>
	<link rel="manifest" href="../manifest.json">

	<link href="https://www.google-analytics.com" rel="preconnect">
	<link href="https://www.gstatic.com" rel="preconnect">
	<link href="https://www.google.com" rel="preconnect">
	<link href="https://www.googletagmanager.com" rel="preconnect">
	<link href="https://tpc.googlesyndication.com" rel="preconnect">
	<link href="https://fonts.googleapis.com" rel="preconnect">
	
	<link href="https://cdn.jsdelivr.net" rel="preconnect">

	<link rel="preload" href="./res/fonts/roboto/roboto-v20-latin-regular.woff" as="font">
<?php
		$mobile = strpos($_SERVER['HTTP_USER_AGENT'], 'Mobi');
		$mobileText = $mobile ? "true" : "false";	
		$autoReload = isset($_GET["autoReload"]) ? "true" : "false";
		$allowEdit = isset($_GET["preventEdit"]) ? "false" : "true";

		$loadMap = "false";
		$loadTypeMap = "false";
		$userid = "-1";
		$userMap = "false";
		$loadMapID = 0;
		$linkURL = "https://www.yapms.com/app/";
		$secureImageURL = "https://www.yapms.com/app/res/yapms/yapms-96.png";
		$imageURL = "http://www.yapms.com/app/res/yapms/yapms-96.png";
		if(isset($_GET["m"])) {
			$loadMap = "true";
			$loadMapID = $_GET["m"];
			$imageURL = "http://yapms.org/maps/{$loadMapID}.png";
			$secureImageURL = "https://yapms.org/maps/{$loadMapID}.png";
			$linkURL = "https://www.yapms.com/app/?m={$loadMapID}";
			if(isset($_GET["u"])) {
				$userMap = "true";
				$userid = $_GET["u"];
				$imageURL = "http://yapms.org/users/{$userid}/{$loadMapID}.png";
				$secureImageURL = "https://yapms.org/users/{$userid}/{$loadMapID}.png";
				$linkURL = "https://www.yapms.com/app/?u={$userid}&m={$loadMapID}";
			}
		} else if(isset($_GET["t"])) {
			$loadMapType = "true";
			$loadMapID = $_GET["t"];
			$imageURL = "http://www.yapms.com/app/res/yapms/yapms-96.png";
			$secureImageURL = "https://www.yapms.com/app/res/yapms/yapms-96.png";
			$linkURL = "https://www.yapms.com/app/?t={$loadMapID}";
		}

		echo "<meta property='og:image:secure_url' content='{$secureImageURL}'>
		<meta property='og:image' content='{$imageURL}'>
		<meta name='twitter:image' content='{$imageURL}'>
		<meta property='og:url' content='{$linkURL}'>";
	?>

	<!-- Ads -->
	<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<script>
		//(adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
		(adsbygoogle = window.adsbygoogle || []).push({
		google_ad_client: "ca-pub-1660456925957249",
		enable_page_level_ads: true});
	</script>

	<!-- Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-132710089-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-132710089-1');
	</script>

	<style>
	<?php
	require './style/fonts.css';
	?>
	</style>

	<link rel="stylesheet" type="text/css" href="./bin/yapms.css">
	<?php
	if($mobile) {
		echo '<link rel="stylesheet" type="text/css" href="./style/mobile.css">';
	}
	?>

	<script async src="./res/fontawesome/js/all.min.js"></script>
</head>
<body id="body" onresize="onResize()">
<div id="yapms">
<div id="menu-div">
	<div class="click-button" onclick="MapLoader.clearMap()" style="white-space: nowrap;">
	<i class="fas fa-window-close"></i> Clear
	</div>
	
	<div class="click-button" onclick="displayMenu('mapmenu')" style="white-space: nowrap;">
	<i class="fas fa-map"></i> Map
	</div>

	<div id="modebutton-paint" class="click-button mode-button" onclick='setMode("paint")' style='opacity: 0.5'>
		<i class="fas fa-paint-brush"></i>
		<div class="tooltip-menu">
			Paint
		</div>
	</div>
	<div id="modebutton-fill" class="click-button mode-button" onclick='setMode("fill");'>
		<i class="fas fa-fill-drip"></i>
		<div class="tooltip-menu">
			Fill
		</div>
	</div>
	<div id="modebutton-delete" class="click-button mode-button" onclick='setMode("delete")'>
		<i class="fas fa-eraser"></i>
		<div class="tooltip-menu">
			Disable	
		</div>
	</div>
	<div id="modebutton-ec" class="click-button mode-button" onclick='setMode("ec")'>
		<i class="fas fa-edit"></i>
		<div class="tooltip-menu">
			Delegate Edit
		</div>
	</div>
<!--
	<div id="modebutton-highlight" class="click-button mode-button" onclick='setMode("highlight")'>
		<i class="fas fa-sun"></i>
		<div class="tooltip-menu">
			Highlight
		</div>
	</div>
-->
<?php
	if($mobile === false) {
	echo '<div id="lockbutton" class="click-button lock-button" onclick="MapManager.toggleLockMap()">
		<i class="fas fa-lock"></i>
		<div class="tooltip-menu">
			Lock Map
		</div>
		</div>';
	}
?>

	<div id="update-button" class="click-button" onclick="forceUpdate()" style="white-space: nowrap; display: none;">
		<i class="fas fa-arrow-up"></i> Update
	</div>

	<div class="click-button" id="share-button" onclick="displayMenu('sharemenu-autocenter');" style="white-space: nowrap;">
	<i class="fas fa-share-alt"></i> Share Map
	</div>

	<div class="click-button" onclick="displayMenu('stylemenu')" style="white-space: nowrap;">
	<i class="fas fa-palette"></i> Style
	</div>

	<div class="click-button" onclick="displayMenu('miscmenu')" style="white-space: nowrap;">
	<i class="fas fa-clipboard"></i> Misc
	</div>

	<div id="login-button" class="customGPlusSignIn click-button" style="white-space: nowrap; margin-left: auto;" onclick='displayMenu("loginmenu");'>	
		<i class="fas fa-sign-in-alt"></i> Login
	</div>
	<div id="mymaps-button" class="click-button" style="margin-left: auto; white-space: nowrap; display: none;" onclick='Account.getMaps();'>
		My Maps
	</div>
	<div id="account-button" class="click-button" style="display: none;" onclick='displayMenu("accountmenu");'>
		Account
	</div>
	
	<div class="click-button" style="white-space: nowrap;">
	<a class="click-button" href="https://www.yapms.com/privacypolicy.html" target="_blank" rel="noreferrer">
	<i class="fas fa-user-secret"></i> Privacy
	</a>
	</div>

<?php
	/* margin-left: auto; moves the button all the way to the right */
	if($mobile === false) {
		echo '
	<div class="click-button" onclick="toggleYAPNews()" style="white-space: nowrap; margin-left: 0px;">
	<i class="fas fa-bars"></i> Sidebar
	</div>';
	}
?>
</div>

<div id="application-loading">
	<div id="application-loading-div">
		<object id="application-loading-image" type="image/svg+xml" data="./html/loading.svg"></object>
	</div>
</div>

<div id="application-mysaves" style="display: none;">
	<?php require './html/menu/application-mysaves.php'; ?>
</div>

<div id="application-sidebar-div">
<div id="application">
	<div id="legend-div"></div>
	<div id="chart-div">
		<div id="chart">
		<canvas id="chart-canvas" width="100" height="100"></canvas>
		</div>
		<?php
			require 'html/battlechart.html';
		?>
		<div id="logo-div">
		</div>
		<div id="yapms-watermark" onclick='window.open(window.location, "_blank");'>
			<div id="yapms-watermark-header">
				Powered By
			</div>
			<div id="yapms-watermark-graphic">
				yapms.com
			</div>
		</div>
	</div>
	<div id="map-div"></div>
</div>
<?php
if($mobile == false) {
	require "./html/component/sidebar.php";
}
?>
</div>
<?php
	if($mobile) {
		echo '<!-- mobile-ad -->
		<ins class="adsbygoogle adslot_mobile"
			style="display:inline-block;"
			data-full-width-responsive="true"
			data-ad-client="ca-pub-1660456925957249"
			data-ad-slot="8771249229"
		</ins>
		<script>
		     (adsbygoogle = window.adsbygoogle || []).push({});
		</script>';
	}
?>
</div>

<?php
require "./html/menu/delegateedit.php";
require "./html/menu/ecedit.php";
require "./html/menu/candidateedit.php";
require "./html/menu/classiccolormenu.php";
require "./html/menu/altcolormenu.php";
require "./html/menu/customcolormenu.php";
require './html/menu/customcoloreditor.php';
require './html/menu/addcandidatemenu.php';

require './html/menu/mapmenu.php';
require './html/menu/mapmenu-usa.php';
require './html/menu/mapmenu-usa-state.php';
require './html/menu/mapmenu-usa-historical.php'; 
require './html/menu/mapmenu-russia.php';
require './html/menu/mapmenu-netherlands.php';
require './html/menu/mapmenu-germany.php';
require './html/menu/mapmenu-canada.php';
require './html/menu/mapmenu-brazil.php';
require './html/menu/mapmenu-australia.php';
require './html/menu/mapmenu-uk.php';
require './html/menu/mapmenu-switzerland.php';
require './html/menu/mapmenu-india.php';

require './html/menu/stylemenu.php';
require './html/menu/sharemenu.php';
require './html/menu/sharemenu-autocenter.php';
require './html/menu/loadmenu.php';
require './html/menu/loginmenu.php';
require './html/menu/forgotpasswordmenu.php';
require './html/menu/registermenu.php';
require './html/menu/passwordmenu.php';
require './html/menu/accountmenu.php';
require './html/menu/miscmenu.php';
require './html/menu/versionmenu.php'; 
?>

<div id="notification" class="popup selectmenu">
	<div class="selectmenu-header">
	<div class="selectmenu-controls">
	       <object class="closebutton" type="image/svg+xml">Close</object>
	</div>
	<div class="selectmenu-display-header">
		<h2 id="notification-title"></h2>
	</div>
	</div>
	<div class="selectmenu-content">
	<a class="selectmenu-section" id="notification-message"></a>
	</div>
</div>

<div id="consent" style="display: none;">
	<?php require './html/consent.php'; ?>
</div>

<!--<script src="https://www.google.com/recaptcha/api.js?render=6LeDYbEUAAAAANfuJ4FxWVjoxPgDPsFGsdTLr1Jo"></script>-->
<!--<script src="http://www.geoplugin.net/extras/cookielaw.js"></script>-->
<?php
echo "<script>
var mobile = {$mobileText};
var php_auto_reload = {$autoReload};
var php_candidate_edit = {$allowEdit};
var php_load_user = {$userMap};
var php_load_user_id = \"{$userid}\";
var php_load_map = {$loadMap};
var php_load_type_map = {$loadTypeMap};
var php_load_map_id = \"{$loadMapID}\";
</script>";
?>

<script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.2/dist/Chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0/dist/chartjs-plugin-datalabels.min.js"></script>
<script src="./bin/yapms.js"></script>
<?php 
if($mobile === true) {
	echo '<script>';
	require './src/mobile.js';
	echo '</script>';
} else {
	echo '<script>';
	require './src/yapnews.js';
	echo '</script>';
}
?>
<script>
if('serviceWorker' in navigator) {
	console.log('Attempting to register service worker');
	navigator.serviceWorker
	.register('../sw.js')
	.then(function(a) {
		console.log('SW: registered');
		if(a.waiting) {
			console.log('SW: update found');
			var updateButton = document.getElementById("update-button");
			if(updateButton) {
				updateButton.style.display = "inline";
			}
		}
	}, function(err) {
		console.log('SW: register error ', err);
	});
} else {
	console.log('No service worker detected');
}
</script>
</body>
</html>
