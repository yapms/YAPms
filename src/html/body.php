<?php
	require './src/html/map-datalist.php';
?>

<div id="topbar">
	<h1>
		Yet Another Political Map Simulator
	</h1>
</div>

<div id="layout">
	<div id="navigation">
		<?php
			require './src/html/map-search.php';
			require './src/html/usa-national-elections.php';
			require './src/html/usa-forecasts.php';
			require './src/html/usa-current-congress.php';
			require './src/html/usa-state-legislatures.php';
			require './src/html/usa-presidential-results.php';
			require './src/html/usa-primary-results.php'; 
			require './src/html/usa-other.php'; 
			require './src/html/arg.php'; 
			require './src/html/aus.php'; 
			require './src/html/bra.php'; 
			require './src/html/can.php'; 
			require './src/html/fra.php'; 
			require './src/html/ger.php'; 
			require './src/html/ind.php'; 
			require './src/html/ita.php'; 
			require './src/html/ire.php'; 
			require './src/html/ned.php'; 
			require './src/html/pak.php';
			require './src/html/prt.php'; 
			require './src/html/rus.php'; 
			require './src/html/zaf.php'; 
			require './src/html/esp.php'; 
			require './src/html/swe.php'; 
			require './src/html/che.php'; 
			require './src/html/tur.php'; 
			require './src/html/tat.php'; 
			require './src/html/ukd.php'; 
			require './src/html/global.php'; 
		?>			
	</div>

	<div id="featured">
	<?php
		require './src/html/help-box.php';
		if($mobile === false) {
			require './src/html/featured.php';
		}
	?>
	</div>
</div>

<?php
if($mobile === false) {
	require './src/html/footer.php';
}
?>
