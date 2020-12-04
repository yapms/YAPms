function verifyCongress() {
	if(mobile) {
		return false;
	}

	var element = document.getElementById('sidebar-congress');

	if(enableCongress) {
		element.style.display = 'block';
		return true;
	} else {
		element.style.display = 'none';
		return false;
	}
}

function verifyCongressContested() {
	if(mobile) {
		return false;
	}

	var element = document.getElementById('sidebar-congress-contested');

	if(enableCongressContested) {
		element.style.display = 'block';
		return true;
	} else {
		element.style.display = 'none';
		return false;
	}
}

function setCongressContested() {
	if(verifyCongressContested() === false) {
		return;
	}

	var element = document.getElementById('sidebar-congress-contested');

	db_getCongress(function(data) {
		for(var stateIndex = 0, length = states.length; stateIndex < length; ++stateIndex) {
			var state = states[stateIndex];
			var stateName = state.name.split('-')[0];
			var district = state.name.split('-')[1];

			// Convert district to a number
			// AL -> 0, 01 -> 1, 02 -> 2
			var districtIndex = district;
			if(districtIndex === 'AL') {
				districtIndex = '0';
			}
			districtIndex = parseInt(districtIndex).toString();
			
			var districtData = data.filter(obj => {
				return obj.State === stateName &&
					obj.District === districtIndex;
			})[0];

			if(state.colorValue !== 0) {
				var district = document.createElement('div');
				district.setAttribute('class', 'sidebar-box');

				var title = document.createElement('h3');
				title.innerHTML = state.name;
				district.appendChild(title);

				var rep = document.createElement('div');
				rep.innerHTML = districtData.Representative + ' - ' + districtData.Party;
				district.appendChild(rep);

				var color = document.createElement('div');
				color.setAttribute('class', 'sidebar-congress-colors');
				var proj = document.createElement('div');
				proj.innerHTML = '<span>Projection</span>';
				proj.setAttribute('class', 'sidebar-congress-color');
				proj.style.backgroundColor = state.htmlElement.style.fill;
				color.appendChild(proj);
				var map = document.createElement('div');
				map.innerHTML = '<span>Map</span>';
				map.setAttribute('class', 'sidebar-congress-color');
				map.style.backgroundColor = state.htmlElement.style.fill;
				map.style.cursor = 'pointer';
				state.onChange = (function() {
					var m = map;
					var s = state;
					return function() {
						m.style.backgroundColor = s.htmlElement.style.fill;
					}
				})();

				map.onclick = (function() {
					var s = state;
					var m = map;
					return function() {
						s.incrementCandidateColor(paintIndex, false);	
						m.style.backgroundColor = s.htmlElement.style.fill;
					}
				})();
				color.appendChild(map);

				district.appendChild(color);
				element.appendChild(district);
			}
		}
	});

}

function setCongressOnHover() {

	if(verifyCongress() === false) {
		return;
	}

	db_getCongress(function(data) {
		for(var stateIndex = 0, length = states.length; stateIndex < length; ++stateIndex) {
			var state = states[stateIndex];

			state.htmlElement.onmouseover = (function() {
				var stateName = state.name.split('-')[0];
				var district = state.name.split('-')[1];

				// Convert district to a number
				// AL -> 0, 01 -> 1, 02 -> 2
				var districtIndex = district;
				if(districtIndex === 'AL') {
					districtIndex = '0';
				}
				districtIndex = parseInt(districtIndex).toString();

				var districtData = data.filter(obj => {
					return obj.State === stateName &&
						obj.District === districtIndex;
				})[0];

				return function() {
					var element = document.getElementById('sidebar-congress-district');
					element.innerHTML = stateName + '-' + district;
					element = document.getElementById('sidebar-congress-representative');
					element.innerHTML = districtData.Representative;
					element = document.getElementById('sidebar-congress-party');
					element.innerHTML = districtData.Party;

					if(KeyboardManager.keyStates[70]) {
						stateClick(this, {setSolid: true});
					}
				}
			})();
		}
	});
}

function db_getCongress(onLoad) {
	fetch("req_congress.php")
	.then(response => response.json())
	.then(data => {
		onLoad(data);
	});
}
