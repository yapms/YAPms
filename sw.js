const indexCache = 'i2.55.2';
const staticCache = 's2.55.2';

const _indexCache = [
	'./',
	'./index.php',
	'./offline.php',

	'./src/style/mobile-navigation.css',
	'./src/style/desktop-navigation.css',
	'./src/style/style.css',
	'./src/script/mobile-navigation.js',
	'./src/script/bookmark.js',
	'./src/script/cookies.js',
	
	'./app/html/battlechart.html',
	'./app/html/closebutton.svg',
	'./app/html/backbutton-addcandidate.svg',
	'./app/html/backbutton.svg',
	'./app/html/loading.svg',
	'./app/html/deletebutton.svg',
	'./app/html/downloadbutton.svg',
	'./app/html/overwritebutton.svg',

	'./app/bin/yapms.min.js',
	'./app/bin/yapms.css',

	'./app/?t=USA_current_house',
	'./app/?t=USA_current_senate',
	'./app/?t=USA_2016_presidential_county',
	'./app/?t=USA_2020_presidential',
	'./app/?t=USA_2020_cook',
	'./app/?t=USA_2020_inside',
	'./app/?t=USA_2020_sabatos',
	'./app/?t=USA_2020_senate',
	'./app/?t=USA_2022_senate',
	'./app/?t=USA_2020_governors',
	'./app/?t=USA_2020_house',
	'./app/?t=USA_2020_democratic_primary',
	'./app/?t=USA_2020_republican_primary',
	'./app/?t=USA_county',
	'./app/?t=USA_governors',
	'./app/?t=USA_senate',
	'./app/?t=USA_takeall',
	'./app/?t=USA_proportional',
	'./app/?t=USA_split_maine',
	'./app/?t=USA_2024_projection',
	'./app/?t=USA_2020_house_cook',

	'./app/?t=Argentina_chamber_of_deputies',
	'./app/?t=Australia_states',
	'./app/?t=Australia_house_of_representatives',
	'./app/?t=Canada_provinces',
	'./app/?t=Canada_house_of_commons',
	'./app/?t=Canada_2019_house_of_commons',
	'./app/?t=Germany_states',
	'./app/?t=Germany_bundestag',
	'./app/?t=India_2019_lok_sabha',
	'./app/?t=Ireland_dail_eireann',
	'./app/?t=Switzerland_council_of_states',
	'./app/?t=Switzerland_national_council',
	'./app/?t=UnitedKingdom_house_of_commons',
	'./app/?t=UnitedKingdom_current_parliament'
];

const _staticCache = [
	'./app/res/usa/presidential/usa_presidential.svg',
	'./app/res/usa/presidential/usa_pre_civilwar.svg',
	'./app/res/usa/presidential/usa_1972_presidential.svg',
	'./app/res/usa/presidential/usa_no_districts.svg',
	'./app/res/usa/primary/usa_dem_primary.svg',
	'./app/res/usa/primary/usa_rep_primary.svg',
	'./app/res/usa/governors/usa_gubernatorial.svg',
	'./app/res/usa/senate/usa_senate.svg',
	'./app/res/usa/county/usa_county.svg',
	'./app/res/usa/house/12-2-2019-house.svg',

	'./app/res/arg/argentina_provinces_buenos.svg',
	'./app/res/aus/australia_constituencies.svg',
	'./app/res/aus/australia.svg',
	'./app/res/can/canada_states.svg',
	'./app/res/can/canada_constituencies.svg',
	'./app/res/deu/germany.svg',
	'./app/res/deu/germany_constituencies.svg',
	'./app/res/irl/ireland_constituencies_2020.svg',
	'./app/res/ukd/unitedkingdom.svg',

	'./app/res/images/halloween.jpg',

	'./app/res/presets/usa/USA_current_house',
	'./app/res/presets/usa/USA_2020_house_cook',
	'./app/res/presets/usa/USA_current_senate',
	'./app/res/presets/usa/USA_2016_presidential_county',
	'./app/res/presets/usa/USA_2016_republican_primary',
	'./app/res/presets/usa/USA_2016_democratic_primary',

	'./app/res/presets/usa/USA_2024_projection',
	'./app/res/presets/usa/USA_trump_impeachment_support',

	'./app/res/presets/usa/USA_2020_cook',
	'./app/res/presets/usa/USA_2020_inside',
	'./app/res/presets/usa/USA_2020_sabatos',
	
	'./app/res/presets/can/Canada_2019_house_of_commons',
	'./app/res/presets/ind/India_2019_lok_sabha',
	'./app/res/presets/ukd/UnitedKingdom_current_parliament',

	'./app/res/flags/arg.svg',
	'./app/res/flags/aus.svg',
	'./app/res/flags/bra.svg',
	'./app/res/flags/can.svg',
	'./app/res/flags/esp.svg',
	'./app/res/flags/tur.svg',
	'./app/res/flags/prt.svg',
	'./app/res/flags/eu.svg',
	'./app/res/flags/fra.svg',
	'./app/res/flags/ger.svg',
	'./app/res/flags/ire.svg',
	'./app/res/flags/ita.svg',
	'./app/res/flags/ned.svg',
	'./app/res/flags/rus.svg',
	'./app/res/flags/ukd.svg',
	'./app/res/flags/un.svg',
	'./app/res/flags/usa.svg',
	'./app/res/flags/ind.svg',
	'./app/res/flags/tat.svg',
	'./app/res/flags/che.svg',
	'./app/res/flags/swe.svg',
	'./app/res/flags/zaf.svg',

	'./app/data/gubernatorial_2018',
	'./app/data/gubernatorial_2020',
	'./app/data/gubernatorial_current',
	'./app/data/senatorial_2020',
	'./app/data/senatorial_2022',
	'./app/data/senatorial_current',
	
	'./app/res/fonts/roboto/roboto-v20-latin-regular.woff',

	'./app/res/fontawesome/js/all.min.js',
	'https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.7/dist/html2canvas.min.js',
	'https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js',
	'https://cdn.jsdelivr.net/npm/panzoom@9.4.2/dist/panzoom.min.js',
	'https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js',
	'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0/dist/chartjs-plugin-datalabels.min.js',
	'https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
	'https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.min.js',

	'./manifest.json'
];

function swLog(cache, message) {
	console.log('SW ' + cache + ': ' + message + ' ( ' + staticCache + ' / ' + indexCache + ' )');
}

self.addEventListener('message', function(event) {
	const clientID = event.source.id;
	swLog('Message', event.data);
	if(event.data === 'loaded') {
		self.skipWaiting();
	} else if(event.data === 'skipwaiting') {
		self.skipWaiting();
	} else if(event.data === 'refetch-home') {
		caches.open(indexCache).then(function(cache) {
			cache.delete('./').then(cache.add('./'));
			cache.delete('./index.php').then(cache.add('./index.php'));
		});
	}
});

self.addEventListener('install', function(event) {
	event.waitUntil(caches.has(staticCache).then(function(exists) {
		if(exists === false) {
			return caches.open(staticCache).then(function(cache) {
				swLog(staticCache, 'installing');
				return cache.addAll(_staticCache).then(function() {
					cache.add('./app/res/presets/usa/USA_1789_presidential');
					for(let i = 1792; i < 2016; i += 4) {
						cache.add('./app/res/presets/usa/USA_' + i + '_presidential');
					}
					return cache;
				});
			})
		}
	}).then(caches.has(indexCache).then(function(exists) {
		if(exists === false) {
			return caches.open(indexCache).then(function(cache) {
				swLog(indexCache, 'installing');
				return cache.addAll(_indexCache).then(function() {
					cache.add('./app/?t=USA_1789_presidential');
					for(let i = 1792; i < 2016; i += 4) {
						cache.add('./app/?t=USA_' + i + '_presidential');
					}
					return cache;
				});
			})
		}
	})).then(function() {
		return caches.open(staticCache).then(function(cache) {
			swLog('flycatch', 'installing');
			return cache.addAll([]);
		});
	}));
});

// first see if request is in cache, then check web
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				if(response) {
					swLog('Cache' , 'fetch ' + event.request.url);
					return response;
				} else if(event.request.url.includes('yapms.com/app/') === true &&
					event.request.url.includes('yapms.com/app/req_articles.php') === false &&
					event.request.url.includes('yapms.com/app/?m=') === false &&
					event.request.url.includes('yapms.com/app/savemap.php') === false &&
					event.request.url.includes('yapms.com/app/savemap_new.php') === false &&
					event.request.url.includes('yapms.com/app/savemap_simple.php') === false) {
					swLog('Web', 'fetch+cache ' + event.request.url);
					return fetch(event.request)
					.then(function(response) {
						swLog('Web', 'caching ' + event.request.url);
						return caches.open('flycache').then((cache) => {
							cache.put(event.request, response.clone());
							return response;
						});
					}).catch(function(err){ 
						swLog('Offline', 'error - ' + err);
						return caches.match('./offline.php');
					});
				} else {
					swLog('Web', 'fetch ' + event.request.url);
					return fetch(event.request);
				}
			})
			.catch(function(err) {
				swLog('Error ', err + ' ' + event.request.url);
			})
		);
	}
);

// clear old versions of the cache
self.addEventListener('activate', function(event) {
	return event.waitUntil(
		caches.keys().then(function(cacheNames) {
			cacheNames.forEach(function(cacheName) {
				if(cacheName === staticCache ||
				cacheName === indexCache) {
					swLog(cacheName, 'keep');
				} else {
					swLog(cacheName, 'delete');
					return caches.delete(cacheName);
				}
			});
		}).then(function() {
			return self.clients.claim();
		})
	);
});
