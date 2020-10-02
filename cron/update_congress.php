<?php
require 'dblogin.php';
$sql = 'select * from congress';
$q = $dbh->query($sql);

echo 'HELLO WORLD</br>';

foreach($q as $row) {
	print_r($row);
	echo '</br>';
}
?>
