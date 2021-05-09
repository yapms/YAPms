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
			$loadTypeMap = "true";
			$loadMapID = $_GET["t"];
			$imageURL = "http://www.yapms.com/app/res/yapms/yapms-96.png";
			$secureImageURL = "https://www.yapms.com/app/res/yapms/yapms-96.png";
			$linkURL = "https://www.yapms.com/app/?t={$loadMapID}";
		}

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
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: local('Roboto'), local('Roboto-Regular'),
		url('./res/fonts/roboto/roboto-v20-latin-regular.woff') format('woff');
	}
	</style>
	<link rel="stylesheet" type="text/css" href="./bin/yapms.css">

	<script defer src="./res/fontawesome/js/all.min.js"></script>
	<script defer src="https://www.google.com/recaptcha/api.js?render=6LeDYbEUAAAAANfuJ4FxWVjoxPgDPsFGsdTLr1Jo"></script>
	<script defer src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"></script>
	<script defer src="https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.min.js"></script>
	<script defer src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.7/dist/html2canvas.min.js"></script>
	<script defer src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js"></script>
	<script defer src="https://cdn.jsdelivr.net/npm/panzoom@9.4.2/dist/panzoom.min.js"></script>
	<script defer src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
	<script defer src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0/dist/chartjs-plugin-datalabels.min.js"></script>
	<script defer src="./bin/yapms.min.js"></script>
</head>
<body id="body" onresize="onResize()">
<div id="yapms">
<?php 
	require './html/component/application-menubar.php';
	require './html/component/application-loading.php';
	require './html/component/application-mysaves.php'; 
?>

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
		style="display:inline-block; height: 50px"
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
</body>
</html>
