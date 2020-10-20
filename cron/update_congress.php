<?php
/*
require 'dblogin.php';
$sql = 'select * from congress';
$q = $dbh->query($sql);

echo 'HELLO WORLD</br>';

foreach($q as $row) {
	print_r($row);
	echo '</br>';
}*/
$data = file_get_contents("../app/res/presets/usa/USA_current_house");
$json = json_decode($data, true);
echo '<br>';
var_dump($json["states"]["AL-01"]);
echo '<br>';

$congress = file_get_contents("https://theunitedstates.io/congress-legislators/legislators-current.json");
$congress_json = json_decode($congress, true);

echo '<br>';
$count = 0;
foreach($congress_json as &$congress_person) {
	$term = end($congress_person['terms']);
	$type = $term['type'];
	$party = $term['party'];
	$state = $term['state'];
	$district = strval($term['district']);

	if(strlen($district) === 1) {
		$district = "0" . $district;
	}
	
	if($type === 'sen') {
		continue;
	} else {
		echo 'Representative ';
	}

	echo $party . ' ';
	echo $congress_person['name']['official_full'] . ' ';
	echo $state . ' ';
	echo $district;
	echo '<br>';
	var_dump($json["states"][$state . "-" . $district]);
	$json["states"][$state . "-" . $district]["delegates"] = array($party => 1);
	echo '<br>';
	var_dump($json["states"][$state . "-" . $district]);
	echo '<br>';
	$count += 1;
}
echo '<br>';

/*
echo $congress_json[0]['name']['official_full'];
echo ' ';
echo end($congress_json[0]['terms'])['type'];
echo '<br>';

echo $congress_json[1]['name']['official_full'];
echo '<br>';
echo '<br>';
var_dump($congress_json);
 */
?>
