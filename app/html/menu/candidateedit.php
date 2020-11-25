<div id="candidateedit" class="popup selectmenu">
<input id="candidate-originalName" type="hidden">
<div class="selectmenu-header">
<div class="selectmenu-controls">
       <object class="closebutton" type="image/svg+xml">Close</object>
</div>
<div class="selectmenu-display-header">
	<h2 id="candidateedit-message" class="selectmenu-display-header-text">Candidate Edit</h2>
</div>
</div>
<div class="selectmenu-content">
<div class="selectmenu-button">Name <input id="candidate-name" type="text" name="name"></div>
<div class="selectmenu-section">Solid <input id="candidate-solid" type="color"></div>
<div class="selectmenu-section">Likely <input id="candidate-likely" type="color"></div>
<div class="selectmenu-section">Lean <input id="candidate-lean" type="color"></div>
<div class="selectmenu-section">Tilt <input id="candidate-tilt" type="color"></div>
<div class="selectmenu-button" onclick="CandidateManager.setCandidate(); Simulator.uniformPreset();">
	<div class="selectmenu-button-text">Apply</div>
</div>
<div class="selectmenu-button" onclick='CandidateManager.deleteCandidate(); Simulator.uniformPreset();'>
	<div class="selectmenu-button-text">Delete</div>
</div>
</div>
</div>
