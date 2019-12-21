<?php
	require './v2/html/map-datalist.php';
?>

<div id="topbar">
	<h1>
		Yet Another Political Map Simulator
	</h1>
</div>

<div id="layout">
	<div id="navigation">
		<?php
			require './v2/html/map-search.php';
			require './v2/html/usa-national-elections.php';
			require './v2/html/usa-forecasts.php';
			require './v2/html/usa-current-congress.php';
			require './v2/html/usa-state-legislatures.php';
			require './v2/html/usa-presidential-results.php';
			require './v2/html/usa-primary-results.php'; 
			require './v2/html/usa-other.php'; 
			require './v2/html/arg.php'; 
			require './v2/html/aus.php'; 
			require './v2/html/bra.php'; 
			require './v2/html/can.php'; 
			require './v2/html/fra.php'; 
			require './v2/html/ger.php'; 
			require './v2/html/ind.php'; 
			require './v2/html/ita.php'; 
			require './v2/html/ire.php'; 
			require './v2/html/ned.php'; 
			require './v2/html/pak.php';
			require './v2/html/prt.php'; 
			require './v2/html/rus.php'; 
			require './v2/html/zaf.php'; 
			require './v2/html/esp.php'; 
			require './v2/html/swe.php'; 
			require './v2/html/che.php'; 
			require './v2/html/tur.php'; 
			require './v2/html/tat.php'; 
			require './v2/html/ukd.php'; 
			require './v2/html/global.php'; 
		?>			
	</div>

	<div id="featured">
	<?php
		require './v2/html/help-box.php';
		if($mobile === false) {
			require './v2/html/featured.php';
		} else {
			require './v2/html/warning.php';
		}
	?>
	</div>
</div>

<?php
/*
if($mobile === false) {
	require './v2/html/footer.php';
}
*/
?>
