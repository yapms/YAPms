const version = '3.3.3';

const _cache = [
	'./',
	'./index.php',
	'./offline.php',

	'./src/style/navigation.css',
	'./src/style/style.css',
	'./src/script/navigation.js',
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
	'./app/?t=USA_2024_presidential',
	'./app/?t=USA_2022_senate',
	'./app/?t=USA_2022_governors',
	'./app/?t=USA_2022_house',
	'./app/?t=USA_county',
	'./app/?t=USA_governors',
	'./app/?t=USA_senate',
	'./app/?t=USA_takeall',
	'./app/?t=USA_proportional',
	'./app/?t=USA_split_maine',

	'./app/?t=Argentina_chamber_of_deputies',
	'./app/?t=Australia_states',
	'./app/?t=Australia_house_of_representatives',
	'./app/?t=Canada_provinces',
	'./app/?t=Canada_house_of_commons',
	'./app/?t=Canada_2019_house_of_commons',
	'./app/?t=UnitedKingdom_house_of_commons',
	'./app/?t=UnitedKingdom_current_parliament',
	
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
	'./app/res/ukd/unitedkingdom.svg',

	'./app/res/images/halloween.jpg',

	'./app/res/presets/usa/USA_current_house',
	'./app/res/presets/usa/USA_2020_house_cook',
	'./app/res/presets/usa/USA_current_senate',
	'./app/res/presets/usa/USA_2016_presidential_county',
	'./app/res/presets/usa/USA_2016_republican_primary',
	'./app/res/presets/usa/USA_2016_democratic_primary',
	
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

	'https://fonts.googleapis.com/css?family=Roboto&display=swap',
	'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/js/all.min.js',
	'https://cdn.jsdelivr.net/npm/dom-to-image@2.6.0/dist/dom-to-image.min.js',
	'https://cdn.jsdelivr.net/npm/panzoom@9.4.2/dist/panzoom.min.js',
	'https://cdn.jsdelivr.net/npm/chart.js@3.3.2/dist/chart.min.js',
	'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0-rc.1/dist/chartjs-plugin-datalabels.min.js',

	'./manifest.json'
];

const _staticCache = [

];

function swLog(cache, message) {
	console.log('SW ' + cache + ': ' + message);
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
	swLog(version, 'installing');
	event.waitUntil(caches.has(version).then(function(exists) {
		if(exists === false) {
			return caches.open(version).then(function(cache) {
				return cache.addAll(_cache);
			});
		}
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
					event.request.url.includes('yapms.com/app/savemap_simple.php') === false &&
					event.request.url.includes('adsbygoogle.js') === false) {
					swLog('Web', 'fetch+cache ' + event.request.url);
					return fetch(event.request)
					.then(function(response) {
						swLog('Web', 'caching ' + event.request.url);
						return caches.open(version).then(function(cache) {
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
				if(cacheName === version) {
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
