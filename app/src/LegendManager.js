class LegendManager {
	static toggleLegendCounter() {
		LegendManager.legendCounter = !LegendManager.legendCounter;
		LegendManager.updateLegend();
	}

	static toggleLegendLeans() {
		LegendManager.legendLeans = !LegendManager.legendLeans;
		LegendManager.generateLegend();
		LegendManager.updateLegend();
	}
	
	static selectCandidateDisplay(html) {
		const legendButtons = html.parentElement.children;

		for(const button of legendButtons) {
			const text = button.childNodes[0];
			text.style.padding = '4px';
		}
		
		html.childNodes[0].style.padding = '7px';
	}

	static updateLegend() {
		for(var key in CandidateManager.candidates) {
			var candidate = CandidateManager.candidates[key];
			var html = document.getElementById(candidate.name + '-text');

			var newHTML = candidate.name;

			if(LegendManager.legendCounter == true) {
				newHTML += ' ' + candidate.voteCount;
			}

			if(html !== null) {
				html.innerHTML = newHTML;
			}

			if(key === paintIndex) {
				LegendManager.selectCandidateDisplay(html.parentElement);
			}
		}
	}

	static generateLegend() {
		console.log("Generating Legend...");
		const legendDiv = document.getElementById('legend-div');
		legendDiv.innerHTML = '';
		let index = -1;
		for(const key in CandidateManager.candidates) {
			const candidate = CandidateManager.candidates[key];
			++index;
			const legendElement = document.createElement('div');
			legendElement.setAttribute('id', candidate.name);
			legendElement.setAttribute('class', 'legend-button');
			legendElement.addEventListener("click", (function() {
				const ref_key = key;
				return function() {
					legendClick(ref_key, this);
				}
			})());
			legendElement.style.background = 'none';
			legendDiv.appendChild(legendElement);
		
			const legendText = document.createElement('div');
			legendText.setAttribute('id', candidate.name + '-text');	
			legendText.setAttribute('class', 'legend-button-text');	
			legendText.style.backgroundColor = candidate.colors[0];
			if(index == 0) {
				const color = candidate.colors[CandidateManager.tossupColor];
				legendText.style.backgroundColor = color;
			}
			legendText.style.padding = '0px';
			legendText.innerHTML = candidate.name;
			legendElement.appendChild(legendText);

			const legendDelete = document.createElement('div');
			legendDelete.setAttribute('class', 'legend-delete');
			legendDelete.style.backgroundColor = 'black';
			legendText.appendChild(legendDelete);

			const legendColorDiv = document.createElement('div');
			legendColorDiv.setAttribute('class', 'legend-color-div');
			legendElement.appendChild(legendColorDiv);
		
			if(candidate.singleColor) {
				legendColorDiv.style.display = 'none';
			}
			
			if(key !== "Tossup") {
				// after adding all the candidates, add the add candidate button
				const legendEdit = document.createElement('div');
				legendEdit.setAttribute('class', 'legend-delete');
				legendEdit.addEventListener("click", (function() {
					const ref_name = candidate.name;
					return function() {
						displayCandidateEditMenu(ref_name);
					}
				})());
				legendEdit.style.background = 'none';

				/* ONLY ADD IF CANDIDATE EDIT IS ENABLED */
				if(php_candidate_edit) {
					legendDiv.appendChild(legendEdit);
				}

				const legendEditText = document.createElement('div');
				legendEditText.setAttribute('class', 'legend-delete-text');	
				legendEditText.style.backgroundColor = candidate.colors[0];
				legendEditText.style.padding = '0px';
				legendEditText.style.fontSize = '14px';
				const legendEditIcon = document.createElement('i');
				legendEditIcon.classList.add('fas', 'fa-cog');
				legendEditText.appendChild(legendEditIcon);
				legendEdit.appendChild(legendEditText);
			}

			if(key !== 'Tossup' && LegendManager.legendLeans) {
				const amts = ['solid', 'likely', 'lean', 'tilt'];
				for(let index = 0; index < amts.length; ++index) {
					const legendColor = document.createElement('div');
					legendColor.classList.add('legend-color');
					legendColor.setAttribute('id', candidate.name + amts[index]);
					legendColor.style.backgroundColor = candidate.colors[index];
					legendColorDiv.appendChild(legendColor);
				}
			}
		}
	
		// after adding all the candidates, add the add candidate button
		const legendElement = document.createElement('div');
		legendElement.id = 'legend-addcandidate-button';
		legendElement.classList.add('legend-button');
		legendElement.addEventListener('click', displayAddCandidateMenu);
		legendElement.style.background = 'none';

		/* ONLY ADD IF CANDIDATE EDIT IS ENABLED */
		if(php_candidate_edit) {
			legendDiv.appendChild(legendElement);
		}

		var legendText = document.createElement('div');
		legendText.setAttribute('id', 'addcandidate-button-text');	
		legendText.setAttribute('class', 'legend-button-text');	
		legendText.style.backgroundColor = 
			CandidateManager.candidates['Tossup'].colors[CandidateManager.tossupColor];
		legendText.style.padding = '0px';
		legendText.innerHTML = '+';
		legendElement.appendChild(legendText);
		var legendColorDiv = document.createElement('div');
		legendColorDiv.setAttribute('class', 'legend-color-div');
		legendElement.appendChild(legendColorDiv);
		
		var legendTooltip = document.createElement('div');
		legendTooltip.setAttribute('id', 'legend-tooltip');
		legendDiv.appendChild(legendTooltip);
		var legendText = document.createElement('div');
		legendText.setAttribute('id', 'legendtooltip-text');	
		legendText.setAttribute('class', 'legend-button-text');	
		legendText.style.padding = '0px';
		legendText.innerHTML = 'Select a candidate';
		legendTooltip.appendChild(legendText);
	}
}

LegendManager.legendCounter = true;
LegendManager.legendLeans = true;
