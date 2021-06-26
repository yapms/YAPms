<!DOCTYPE html>
<html class="noSelect" lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="description" content="Create and share interactive political maps for countries all across the world. Including the USA, UK, Canada, Germany and more!">
	<meta name="keywords" content="Map,Election,Political,Interactive,Simulator,Electoral,270,2020,Forecast,Historical,Voting,Vote">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<meta property="og:title" content="YAPms - Yet Another Political Map Simulator">
	<meta property="og:description" content="Interactive Political Maps">
	<meta property="og:image:type" content="image/jpeg">
	<meta property="og:site_name" content="yapms.com">

	<meta property="og:image" content="http://www.yapms.com/app/res/yapms/yapms-96.png">
	<meta property="og:image:secure_url" content="https://www.yapms.com/app/res/yapms/yapms-96.png">

	<meta name="twitter:card" content="summary">
	<meta name="twitter:title" content="yapms.com">
	<meta name="twitter:description" content="Interactive Political Maps">

	<meta property="twitter:image" content="https://www.yapms.com/app/res/yapms/yapms-96.png">
	
	<meta name="theme-color" content="#ffffff"/>
	<link rel="icon" href="./app/res/yapms/yapms-16.png" sizes="16x16" type="image/png"/>
	<link rel="icon" href="./app/res/yapms/yapms-32.png" sizes="32x32" type="image/png"/>
	<link rel="icon" href="./app/res/yapms/yapms-48.png" sizes="48x48" type="image/png"/>
	<link rel="apple-touch-icon" href="./app/res/yapms/yapms-180.png" sizes="180x180" type="image/png"/>
	<link rel="manifest" href="./manifest.json">

	<title>YAPms - Yet Another Political Map Simulator</title>

	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-132710089-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-0NFKPJSSSY');
	</script>

	<script data-ad-client="ca-pub-1660456925957249" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap">
	<script defer src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/js/all.min.js"></script>
	<script defer src="./src/script/navigation.js"></script>
	<script defer src="./src/script/bookmark.js"></script>
	<script defer src="./src/script/cookies.js"></script>

	<link rel="stylesheet" type="text/css" href="./src/style/style.css">
	<link rel="stylesheet" type="text/css" href="./src/style/navigation.css">
</head>

<body>
<?php
	require './src/html/body.php';
?>
<script>
if('serviceWorker' in navigator) {
	navigator.serviceWorker
	.register('./sw.js')
	.then(function(a) {
		console.log('SW: registered');
		if(a.waiting && a.active) {
			console.log('SW: update found');
		}
	}, function(err) {
		console.log('SW: register error ', err);
	});
} else {
	console.log('No service worker detected');
}

let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
	deferredPrompt = e;
	const install = document.getElementById('installbutton');
	if(install) {
		console.log('Display Install Button');
		install.style.display = 'inline-block';
		install.onclick = function() {
			install.style.display = 'none';
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((result) => {
				deferredPrompt = null;
			});
		}
	}	
});

window.addEventListener('appinstalled', (evt) => {
	if(gtag) {
		gtag('event', 'Home Page', {
			'event_category': 'Install',
			'event_label': 'User installed to homescreen',
			'non_interaction': false
		});
	}
});

const ref = document.referrer;
if(ref.includes('android-app')) {
	const warning = document.getElementById('warning');
	if(warning) {
		warning.style.display = 'inline-block';
		if(gtag) {
			gtag('event', 'Home Page', {
				'event_category': 'Warning',
				'event_label': 'Warning displayed',
				'non_interaction': true
			});
		}
	}
}

function refetchHome() {
	if('serviceWorker' in navigator) {
		navigator.serviceWorker.register('../sw.js')
		.then(function(reg) {
			reg.active.postMessage("refetch-home");
			setTimeout(function() {
				location.reload();
			}, 150);
		});
	} else {
		location.reload();
	}
}
</script>
</body>
</html>
