class KeyboardManager {
	static quickFill() {
		return KeyboardManager.keyStates[70] === true;
	}

	static areaSelect() {
		return KeyboardManager.keyStates[68] === true;
	}
}

KeyboardManager.keyStates = {};

document.addEventListener("keydown", function(event) {
	KeyboardManager.keyStates[event.which] = true;
});

document.addEventListener("keyup", function(event) {
	KeyboardManager.keyStates[event.which] = false;
});

document.addEventListener("mouseleave", function(event) {
	KeyboardManager.keyStates = {};
});

document.addEventListener("mouseenter", function(event) {
	KeyboardManager.keyStates = {};
});
