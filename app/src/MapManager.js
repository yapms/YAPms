class MapManager {
	static centerMap() {
		if(MapManager.panObject === null)
			return;
		/*
		MapManager.panObject.resize();
		MapManager.panObject.fit();
		MapManager.panObject.center();
		MapManager.panObject.zoomBy(0.85);
		*/
	}

	static setLockMap(set) {
		var lockButton = document.getElementById('lockbutton');
		if(set === true) {
			if(lockButton) {
				lockButton.style.opacity = '0.5';
			}
			/*
			MapManager.panObject.disablePan();
			MapManager.panObject.disableZoom();
			*/
			MapManager.lockedMap = true;
		} else {
			if(lockButton) {
				lockButton.style.opacity = '1';
			}
			/*
			MapManager.panObject.enablePan();
			MapManager.panObject.enableZoom();
			*/
			MapManager.lockedMap = false;
		}
	}

	static toggleLockMap() {
		var lockButton = document.getElementById('lockbutton');
		if(MapManager.lockedMap) {
			if(lockButton) {
				lockButton.style.opacity = '1';
			}
			/*
			MapManager.panObject.enablePan();
			MapManager.panObject.enableZoom();
			*/
			MapManager.lockedMap = false;
		} else {
			if(lockButton) {
				lockButton.style.opacity = '0.5';
			}
			/*
			MapManager.panObject.disablePan();
			MapManager.panObject.disableZoom();
			*/
			MapManager.lockedMap = true;
		}
	}
}

MapManager.lockedMap = false;
MapManager.panObject = null;
