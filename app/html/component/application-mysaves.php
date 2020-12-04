<div id="application-mysaves" style="display: none;">
<div id="mysaves-header">
	<img id="mysaves-header-close" src="./html/deletebutton.svg" onclick="Account.closeMyMaps();">
	</img>
	<h2 id="mysaves-header-text">
		My Maps
	</h2>
</div>
<div id="mysaves-scroll">
	<div id="mysaves-current-map">
		<div id="mysaves-current-header">
			Current Map
		</div>
		<div id="mysaves-current-mappreview-container">
			<img id="mysaves-current-mappreview"></img>
		</div>
		<div id="mysaves-current-footer">
			<div id="mysaves-current-error">
			</div>
			<input id="mysaves-name-input" type="text" name="title" maxlength="30">
			</input>
			<div id="mysaves-save" onclick="Account.save();">
				Save
			</div>
		</div>
	</div>
	<br>
	<div id="mysaves-load">
		<div id="mysaves-load-header">
			Load Map From File
		</div>
		<div id="mysaves-load-input">
			<form action="load.php" method="post" enctype="multipart/form-data">
				<input type="file" name="file" id="loadfile">
				<input type="button" value="Load" onclick="MapLoader.loadFileMap();">
			</form>
		</div>
	</div>
	<div id="mysaves-maps">
	</div>
</div>
</div>
