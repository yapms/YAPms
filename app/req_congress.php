<?php
include '../../external/db_congress.php';

$dbh = null;

try {
	$dbh = new PDO("mysql:host=$hostname; dbname=$database;", $username, $password);
} catch(PDOException $e) {
	echo "req_congress Error: " . $e->getMessage();
	die();
}

$sql = 'select * from congress';

$q = $dbh->query($sql);

$data = array();

foreach($q as $row) {
	array_push($data, $row);
}

echo json_encode($data);
?>
