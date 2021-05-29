class MapManager {
	static centerMap() {
		if(MapManager.panObject) {
			MapManager.panObject.dispose();

			const mapdiv = document.getElementById("map-div");
			const svg = document.getElementById("svgdata");
			const bb = svg.getBBox();
			svg.setAttribute("viewBox", "0 0 " + 
				(bb.x + bb.width + bb.x) + " " + 
				(bb.y + bb.height + bb.y));
			MapManager.panObject = panzoom(svg, {
				transformOrigin: {x: 0.5, y: 0.5},
				autocenter: true,
				zoomDoubleClickSpeed: 1,
				smoothScroll: false,
				initialX: mapdiv.offsetWidth / 2,
				initialY: mapdiv.offsetHeight / 2,
				initialZoom: 0.85,
				zoomSpeed: 0.05,
				onTouch: function(e) {
					return false;
				}
			});
		}
	}

	static setLockMap(set) {
		const lockButton = document.getElementById('lockbutton');
		if(set === true) {
			if(lockButton) {
				lockButton.style.opacity = '0.5';
			}
			MapManager.panObject.pause();
			MapManager.lockedMap = true;
		} else {
			if(lockButton) {
				lockButton.style.opacity = '1';
			}
			MapManager.panObject.resume();
			MapManager.lockedMap = false;
		}
	}

	static toggleLockMap() {
		const lockButton = document.getElementById('lockbutton');
		if(MapManager.lockedMap) {
			if(lockButton) {
				lockButton.style.opacity = '1';
			}
			MapManager.panObject.resume();
			MapManager.lockedMap = false;
		} else {
			if(lockButton) {
				lockButton.style.opacity = '0.5';
			}
			MapManager.panObject.pause();
			MapManager.lockedMap = true;
		}
	}
}

MapManager.lockedMap = false;
MapManager.panObject = null;
