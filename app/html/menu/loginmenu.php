<div id="loginmenu" class="popup selectmenu">
<div class="selectmenu-header">
<div class="selectmenu-controls">
       <object class="closebutton" type="image/svg+xml">Close</object>
</div>
<div class="selectmenu-display-header">
	<h2 class="selectmenu-display-header-text">Login - Beta</h2>
</div>
</div>
<div class="selectmenu-content">
<div class="selectmenu-section" style="word-wrap: break-word; max-width: 20em;">
	<small>This login system is currently in beta. All accounts may be subject to deletion during this phase.</small>
</div>
<div class="selectmenu-section" id="login-info">
	Please enter your credentials
</div>
<form action="/" id="login-form">
	<div class="selectmenu-section">Email <input id="email-login" type="text"></div>
	<div class="selectmenu-section">Password <input id="password-login" type="password"></div>
	<input type="submit" class="selectmenu-button" value="Login">
</form>
<a class="selectmenu-button" onclick='displayMenu("registermenu");'>
	<div class="selectmenu-button-text">Register</div>
</a>
<a class="selectmenu-button" onclick='displayMenu("forgotpasswordmenu");'>
	<div class="selectmenu-button-text">Forgot Password</div>
</a>
</div>
</div>
