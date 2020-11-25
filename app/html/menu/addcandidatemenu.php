<div id="addcandidatemenu" class="popup selectmenu">
<div class="selectmenu-header">
<div class="selectmenu-controls">
       <object class="closebutton" type="image/svg+xml">Close</object>
</div>
<div class="selectmenu-display-header">
	<h2 class="selectmenu-display-header-text">Add Candidate</h2>
</div>
</div>
<div class="selectmenu-content">
<div class="selectmenu-section">Name<input id="name" type="text"></div>
<a class="selectmenu-button" onclick='displayMenu("classiccolormenu")'>
	<div class="selectmenu-button-text">Classic Colors</div>
</a>
<a class="selectmenu-button" onclick='displayMenu("altcolormenu")'>
	<div class="selectmenu-button-text">Alt Colors</div>
</a>
<a class="selectmenu-button" onclick='displayMenu("customcolormenu")'>
	<div class="selectmenu-button-text">Custom Colors</div>
</a>
<div class="selectmenu-section">Solid <input id="solid" type="color"></div>
<div class="selectmenu-section">Likely <input id="likely" type="color"></div>
<div class="selectmenu-section">Leaning <input id="leaning" type="color"></div>
<div class="selectmenu-section">Tilt <input id="tilting" type="color"></div>
<div class="selectmenu-button" onclick="CandidateManager.addCandidate(); Simulator.uniformPreset(); closeAllPopups();">
	<div class="selectmenu-button-text">Add</div>
</div>
</div>
</div>
