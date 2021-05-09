class InputManager {
	static enableInputDesktop() {
		/*
		let enablePan = false;
		let enableZoom = false;
		if(MapManager.panObject != null) {
			enablePan = MapManager.panObject.isPanEnabled();
			enableZoom = MapManager.panObject.isZoomEnabled();
		}

		MapManager.panObject = svgPanZoom('#svgdata', {
			fit: true,
			center: true,
			contain: false,
			panEnabled: true,
			zoomEnabled: true,
			dblClickZoomEnabled: false,
			maxZoom: 100,
			zoomScaleSensitivity: 0.1
		});
		*/
		const svg = document.getElementById("svgdata");
		const bb = svg.getBBox();
		svg.setAttribute("viewBox", "0 0 " + 
			(bb.x + bb.width + bb.x) + " " + 
			(bb.y + bb.height + bb.y));
		MapManager.panObject = panzoom(svg, {
			autocenter: true,
			bounds: false,
			smoothScroll: false,
			onDoubleClick: function(e) {
				return false;
			}
		}); 
	}

	static enableInputMobile() {
		const area = document.getElementById("svgdata");
		const bb = svg.getBBox();
		svg.setAttribute("viewBox", "0 0 " + 
			(bb.x + bb.width + bb.x) + " " + 
			(bb.y + bb.height + bb.y));
		MapManager.panObject = panzoom(area, {
			autocenter: true,
			bounds: false,
			smoothScroll: false,
			onDoubleClick: function(e) {
				return false;
			}
		}); 
		/*
		var eventHandler = {
			haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
			init: function(options) {
				var instance = options.instance;
				var initialScale = 1;
				var pannedX = 0;
				var pannedY = 0;

				this.hammer = Hammer(options.svgElement, {
					inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
				});
			
				this.hammer.get('pinch').set({enable: true});

				this.hammer.on('panstart panmove', function(ev) {
					if(ev.type === 'panstart') {
						pannedX = 0;
						pannedY = 0;
					}
					instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY});
					pannedX = ev.deltaX;
					pannedY = ev.deltaY;			
				});

				this.hammer.on('pinchstart pinchmove', function(ev) {
					if(ev.type === 'pinchstart') {
						initialScale = instance.getZoom();
						instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y});
					}
					
					instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y});
				});
			}
		
		}

		MapManager.panObject = svgPanZoom('#svgdata', {
			fit: true,
			center: true,
			contain: false,
			maxZoom: 100,
			zoomScaleSensitivity: 0.1,
			dblClickZoomEnabled: false,
			customEventsHandler: eventHandler
		});
		*/
	}
}
