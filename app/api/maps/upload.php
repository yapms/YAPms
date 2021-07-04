<?php
$mapnumber = 0;
$updateresult = 0;
try {
	$dbh = new PDO("sqlite:/home/external/YAPms/mapcount.db");
	$sql_select = "SELECT * FROM number";
	$sql_update = "UPDATE number SET value = CASE WHEN (value < 600000) THEN (value + 1) ELSE 0 END";
	$dbh->beginTransaction();
	$res_select = $dbh->query($sql_select);
	$res_update = $dbh->exec($sql_update);
	$dbh->commit();
	$dbh = null;

	$updateresult = $res_update;
	foreach($res_select as $row) {
		$mapnumber = $row[0];
	}
} catch(PDOException $e) {
	echo "error1";
	die();
}

$filename = base_convert($mapnumber, 10, 36);

$imgData = $_POST["img"];
$imgData = str_replace(" ", "+", $imgData);
$imgData = substr($imgData, strpos($imgData, ",") + 1);
$imgData = base64_decode($imgData);

$file = fopen("../../maps/{$filename}.png", "w");
if($file) {
	fwrite($file, $imgData);
	fclose($file);
} else {
	echo "error2";
	die();
}

shell_exec("pngquant -f --ext .png --quality=60-90 -s2 ../../maps/{$filename}.png > /dev/null 2>/dev/null &");

$file = gzopen("../../maps/{$filename}.txt.gz", "w9");
if($file) {
	gzwrite($file, $_POST["data"]);
	gzclose($file);
	echo "https://www.yapms.com/app/?m={$filename} {$filename} {$updateresult}";
} else {
	echo "error3";
	die();
}
?>
