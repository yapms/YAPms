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

	<meta property="og:image" content="http://www.yapms.com/app/res/yapms-96.png">
	<meta property="og:image:secure_url" content="https://www.yapms.com/app/res/yapms-96.png">

	<meta name="twitter:card" content="summary">
	<meta name="twitter:title" content="yapms.com">
	<meta name="twitter:description" content="Interactive Political Maps">

	<meta property="twitter:image" content="https://www.yapms.com/app/res/yapms-96.png">
	
	<meta name="theme-color" content="#ffffff"/>
	<link rel="icon" href="https://www.yapms.com/favicon.ico" type="image/x-icon"/>
	<link rel="apple-touch-icon" href="./res/yapms-192.png"/>
	<link rel="shortcut icon" href="https://www.yapms.com/favicon.ico" type="image/x-icon"/>
	<link rel="manifest" href="./manifest.json">

	<title>YAPms - Yet Another Political Map Simulator</title>

	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-132710089-1"></script>
	<script>
		var host = window.location.hostname;
		if(host !== "localhost") {
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', 'UA-132710089-1');
		}
	</script>

	<link rel="icon" href="https://www.yapms.com/favicon.ico" type="image/x-icon"/>
	<link rel="shortcut icon" href="https://www.yapms.com/favicon.ico" type="image/x-icon"/>
	
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
	<script async src="./app/res/fontawesome/js/all.min.js"></script>

	<link rel="prerender" href="https://www.yapms.com/app/?t=USA_2020_presidential">
	
	<link rel="stylesheet" type="text/css" href="./src/style/style.css">
	<link rel="stylesheet" type="text/css" href="./src/style/embed.css">
</head>

<body>
<div id="topbar">
	<h1>
		<a href="./index.php">
			Yet Another Political Map Simulator
		</a>
	</h1>
</div>

<h2>
	How to embed a map on a website
</h2>

<div id="list-container">
<ol>
	<li>
		Register and Login into an account.
	</li>
	<li>
		Create a map.
	</li>
	<li>
		Click "My Maps" at the top right of the screen.
	</li>
	<li>
		In the "Current Map" box give your map a new and click save.
	</li>
	<li>
		A new box should popup with the name you entered. Select and copy the URL at the bottom of the box.
	</li>
	<li>
		<p>On your website insert the following code</p>
		<code>
			&ltiframe src=[YOUR LINK HERE]>&lt/iframe>
		</code>
		<p>Replace [YOUR LINK HERE] with the URL you copied in step 5.</p>
	</li>
	<li>
		Adjust the CSS to your liking.
	</li>
</ol>
</div>
</body>
</html>
