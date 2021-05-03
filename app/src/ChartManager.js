class ChartManager {
	static initChart() {
		ChartManager.chartOptions = {
			// This basically inserts HTML into the legend-div div
			// it's a WIP
			legendCallback: function(chart) {
				console.log("Generating Legend...");
				var legendDiv = document.getElementById('legend-div');
				legendDiv.innerHTML = '';
				var index = -1;
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
				legendText.style.backgroundColor = CandidateManager.candidates['Tossup'].colors[CandidateManager.tossupColor];
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

			},
			// do not display the build in legend for the chart
			legend: {
				display: false
			},
			tooltips: {
				display: true,
				position: 'average',
				titleFontColor: 'black',
				bodyFontColor: 'black',
				backgroundColor: 'white',
				borderColor: 'black',
				borderWidth: 2,
				caretSize: 0,
				cornerRadius: 0
			},
			// turn off animation
			animation: {
				animateRotate: false,
				animateScale: true
			},
			plugins: {
				datalabels: {
					//display: 'auto',
					display: function(context) {
						return context.dataset.data[context.dataIndex] !== 0;
					},
					backgroundColor: 'white',
					borderColor: 'black',
					borderRadius: 5,
					borderWidth: 2,
					color: 'black',
					font: {
						family: 'Roboto',
						size: 15,
						weight: 700
					}
				}
			},
			barStrokeWidth: 0
		}
	//Chart.defaults.global.barPercentage = 0;
	//Chart.defaults.global.categoryPercentage = 0;

		ChartManager.chartBarScales = {
			yAxes: [{
				stacked: true,
				gridLines: {
					display: false,
					drawBorder: false
				},
				ticks: {
					fontSize: 15,
					fontColor: '#ffffff',
					fontFamily: 'Roboto',
					fontStyle: 500
				}
			}],
			xAxes: [{
				stacked: true,
				gridLines: {
					display: false,
					drawBorder: false
				},
				ticks: {
					beginAtZero: true,
					fontSize: 15,
					fontColor: '#ffffff',
					fontStyle: 500,
					fontFamily: 'Roboto'
				}
			}]
		}

		ChartManager.chartPieScales = {
			yAxes: [{
				display: false
			}],
			xAxes: [{
				display: false
			}]
		}
		
		ChartManager.chartPolarScales = {
			display: false
		}

		ChartManager.chartRadarScales = {
			display: false
		}

		ChartManager.chartOptions.scales = ChartManager.chartPieScales;

		Chart.defaults.global.elements.rectangle.borderWidth = 2;
		
		// get the context
		var ctx = document.getElementById('chart-canvas').getContext('2d');
		ctx.height = 200;

		// create the chart
		ChartManager.chart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels:[],
				datasets: [{
					label: "",
					backgroundColor: '#ffffff',
					borderColor: '#ffffff',
					borderWidth: 0,
					data:[]
				}, {
					label: "",
					backgroundColor: '#ffffff',
					borderColor: '#ffffff',
					borderWidth: 0,
					data:[]
				}, {}, {}],
			},
			options: ChartManager.chartOptions,
			maintainAspectRatio: true
		});

		ChartManager.chartType = 'doughnut';
	}

	// dynamically change the chart from one form to another
	static setChart(type, position) {
		console.log('Set Chart - ' + type);
		var sidebar = document.getElementById('chart-div');
		var chartHTML = document.getElementById('chart');
		var html = document.getElementById('chart-canvas');
		var ctx = html.getContext('2d');
		var battlechart = document.getElementById('battlechart');
		chartHTML.style.display = 'inline-block';
		battlechart.style.display = 'none';
		sidebar.style.display = 'flex';
		
		sidebar.style.width = '28vw';

		if(type === 'none') {
			html.style.display = 'none';

			unsetBattleHorizontal();
			sidebar.style.display = 'none';

			ChartManager.chartType = type;
			MapManager.centerMap();
			return;
		} else if(type === 'horizontalbattle' || type === 'verticalbattle') {
			if(Object.keys(CandidateManager.candidates).length > 3) {
			
				displayNotification('Sorry',
					'This chart requires that there be two candidates');
				return;
			}
			
			if(type === 'horizontalbattle') {
				setBattleHorizontal();
				var logo = document.getElementById('logo-div');
				logo.style.width = '15%';
				logo.style.height = '100%';

				sidebar.style.borderRight = '0px';
				sidebar.style.borderTop = '1px solid black';

				logo = document.getElementById('yapms-watermark');
				logo.style.width = '15%';
				logo.style.height = '100%';
			}
			else {
				unsetBattleHorizontal();
				sidebar.style.width = '20vw';	
				var logo = document.getElementById('logo-div');
				logo.style.width = '100%';
				logo.style.height = '15%';
				sidebar.style.borderTop = '0px';
				sidebar.style.borderRight = '1px solid black';
				
				logo = document.getElementById('yapms-watermark');
				logo.style.width = '100%';
				logo.style.height = '15%';
			}

			html.style.display = 'none';
			chartHTML.style.display = 'none';
			battlechart.style.display = 'flex';
			ChartManager.chartType = type;
			ChartManager.updateChart();
			MapManager.centerMap();
			return;
		} 
		
		unsetBattleHorizontal();

		ChartManager.chartPosition = position;	
		if(position === 'bottom') {
			var application = document.getElementById('application');
			application.style.flexDirection = 'column-reverse';
			
			var map = document.getElementById('map-div');
			map.style.height = '80%';

			//var sidebar = document.getElementById('chart-div');
			sidebar.style.flexDirection = 'row';
			sidebar.style.width = '100%';	
			sidebar.style.height = '20%';
			sidebar.style.borderRight = '0px';
			sidebar.style.borderTop = '1px solid black';
		
			var charthtml = document.getElementById('chart');
			charthtml.style.height = 'auto';
			charthtml.style.width = '' + (sidebar.offsetHeight - 5) + 'px';

			var logo = document.getElementById('logo-div');
			logo.style.width = '15%';
			logo.style.height = '100%';
			logo = document.getElementById('yapms-watermark');
			logo.style.width = '15%';
			logo.style.height = '100%';
		} else {
			var application = document.getElementById('application');
			application.style.flexDirection = 'row';

			var map = document.getElementById('map-div');
			map.style.height = '100%';

			//var sidebar = document.getElementById('chart-div');
			sidebar.style.flexDirection = 'column';
			sidebar.style.width = '28vw';	
			sidebar.style.height = '100%';
			sidebar.style.borderTop = '0px';
			sidebar.style.borderRight = '1px solid black';
			
			var charthtml = document.getElementById('chart');
			charthtml.style.width = '100%';
			
			var logo = document.getElementById('logo-div');
			logo.style.width = '100%';
			logo.style.height = '15%';
			logo = document.getElementById('yapms-watermark');
			logo.style.width = '100%';
			logo.style.height = '15%';
		}

		MapManager.centerMap();
			
		ChartManager.chartType = type;
		
		ChartManager.chartData = {
			labels:[],
			datasets: [{
				borderColor: ChartManager.chartBorderColor,
				borderWidth: ChartManager.chartBorderWidth,
				data:[]
			}]
		};

		html.style.display = 'inline-block';

		// set the proper scales
		if(type === 'horizontalBar') {
			ChartManager.chartOptions.scales = ChartManager.chartBarScales;
			delete ChartManager.chartOptions.scale;
			// horizontal bar needs multiple datasets
			for(var i = 0; i < 3; ++i) {
				ChartManager.chartData.datasets.push({
					borderColor: ChartManager.chartBorderColor,
					borderWidth: ChartManager.chartBorderWidth,
					data:[]
				});
			}
		} else if(type === 'pie' || type === 'doughnut') {
			ChartManager.chartOptions.scales = ChartManager.chartPieScales;
			delete ChartManager.chartOptions.scale;
		}

		// first destroy the chart
		ChartManager.chart.destroy();
		// then rebuild
		ChartManager.chart = new Chart(ctx, {type: type, data: ChartManager.chartData, options: ChartManager.chartOptions});
		ChartManager.updateChart();
	}

	static rebuildChart() {
		var html = document.getElementById('chart-canvas');
		var ctx = html.getContext('2d');
		//var type = chart.config.type;
		ChartManager.chart.destroy();
		ChartManager.chart = new Chart(ctx, {
			type: ChartManager.chart.config.type, 
			data: ChartManager.chartData, 
			options: ChartManager.chartOptions
		});
		
		// dont display the chart if its a battle chart
		if(ChartManager.chartType === 'battle') {	
			var chartcontainer = document.getElementById('chart');
			chartcontainer.style.display = 'none';
		}

		ChartManager.updateChart();
	}

	// updates the information of the chart (so the numbers change)
	static updateChart() {
		if(ChartManager.chartType === 'verticalbattle' ||
			ChartManager.chartType === 'horizontalbattle') {
			updateBattleChart();
			return;
		} else if(ChartManager.chartType === 'horizontalBar') {
			ChartManager.updateBarChart();
		} else {
			ChartManager.updateNonRadarChart();	
		}

		ChartManager.chart.config.data = ChartManager.chartData;
		ChartManager.chart.update();
	}

	static updateBarChart() {
		ChartManager.chartData.labels = [];
		ChartManager.chartData.datasets[0].data = [];
		ChartManager.chartData.datasets[0].backgroundColor = [];
		ChartManager.chartData.datasets[1].data = [];
		ChartManager.chartData.datasets[1].backgroundColor = [];
		ChartManager.chartData.datasets[2].data = [];
		ChartManager.chartData.datasets[2].backgroundColor = [];
		ChartManager.chartData.datasets[3].data = [];
		ChartManager.chartData.datasets[3].backgroundColor = [];
		
		// each label is a candidate
		for(var key in CandidateManager.candidates) {
			ChartManager.chartData.labels.push(key);
		}

		if(ChartManager.chartLeans) {
			for(var probIndex = 0; probIndex < 4; ++probIndex) {
				for(var key in CandidateManager.candidates) {
					var candidate = CandidateManager.candidates[key];
					var name = candidate.name;
					var count = candidate.probVoteCounts[probIndex];
					ChartManager.chartData.datasets[probIndex].data.push(count);

					var color = candidate.colors[probIndex];
					ChartManager.chartData.datasets[probIndex].backgroundColor.push(color);
				}
			}
		} else {
			for(var key in CandidateManager.candidates) {
				var candidate = CandidateManager.candidates[key];
				var name = candidate.name;
				var count = candidate.voteCount;
				ChartManager.chartData.datasets[0].data.push(count);

				if(key === 'Tossup') {
					var color = candidate.colors[2];
					ChartManager.chartData.datasets[0].backgroundColor.push(color);

				} else {
					var color = candidate.colors[0];
					ChartManager.chartData.datasets[0].backgroundColor.push(color);
				}
			}
		}
	}

	static updateNonRadarChart() {
		ChartManager.chartData.labels = [];

		ChartManager.chartData.datasets[0].data = [];
		ChartManager.chartData.datasets[0].backgroundColor = [];
		ChartManager.chartData.datasets[0].borderColor = ChartManager.chartBorderColor;
		ChartManager.chartData.datasets[0].borderWidth = ChartManager.chartBorderWidth;

		// loop though candidates
		var candidateIndex = -1;
		for(var key in CandidateManager.candidates) {
			++candidateIndex;
			var candidate = CandidateManager.candidates[key];
			var name = candidate.name;
			var voteCount = candidate.voteCount;
			var color = candidate.colors[0];
			if(candidateIndex == 0) {
				color = CandidateManager.candidates['Tossup'].colors[CandidateManager.tossupColor];
				// append the candidate label
				ChartManager.chartData.labels[0] = 'Tossup';
				// append the vote count
				ChartManager.chartData.datasets[0].data[0] = voteCount;
				// change the background color of the visual
				ChartManager.chartData.datasets[0].backgroundColor.push(color);
			} else if(ChartManager.chartLeans) {
				for(var probIndex = 0; probIndex < 4; ++probIndex) {
					var count = candidate.probVoteCounts[probIndex];
					color = candidate.colors[probIndex];
					var index = (probIndex + (candidateIndex * 4)) - 3;
					ChartManager.chartData.labels[index] = name;
					ChartManager.chartData.datasets[0].data[index] = count;
					ChartManager.chartData.datasets[0].backgroundColor.push(color);
				}
			} else {
				var count = candidate.voteCount;
				color = candidate.colors[0];
				ChartManager.chartData.labels[candidateIndex] = name;
				ChartManager.chartData.datasets[0].data[candidateIndex] = count;
				ChartManager.chartData.datasets[0].backgroundColor.push(color);
			}
		}
	}

	static toggleChartLabels() {
		ChartManager.chartLabels = !ChartManager.chartLabels;
		if(ChartManager.chartOptions.plugins.datalabels.display != false) {
			ChartManager.chartOptions.plugins.datalabels.display = false;
		} else {
			ChartManager.chartOptions.plugins.datalabels.display = function(context) {
				return context.dataset.data[context.dataIndex] !== 0;
			}
		}

		ChartManager.rebuildChart();
	}

	static toggleChartLeans() {
		ChartManager.chartLeans = !ChartManager.chartLeans;
		ChartManager.rebuildChart();
		updateBattleChart();
	}
}

ChartManager.chart = null;
ChartManager.chartBorderWidth = 2;
ChartManager.chartBorderColor = '#000000';
ChartManager.chartData = {
	labels:[],
	datasets: [{
		label: "",
		backgroundColor: [],
		borderColor: ChartManager.chartBorderColor,
		borderWidth: ChartManager.chartBorderWidth,
		data:[]
	}, {}, {}, {}]
}
ChartManager.chartOptions = null;
ChartManager.chartType = null;
ChartManager.chartPosition = null;
ChartManager.chartPieScales = null;
ChartManager.chartBarScales = null;
ChartManager.chartPolarScales = null;
ChartManager.chartRadarScales = null;

ChartManager.chartLeans = true;
ChartManager.chartLabels = true;
