<?php
	require '../../external/db_congress.php';

	$dbh = null;
	try {
		$dbh = new PDO("mysql:host=$hostname; dbname=$database;", $username, $password);
	} 
	catch(PDOException $e) {
		//echo "Error: " . $e->getMessage();
		echo '<div class="error">Error: Failed to connect to database</div>';
		die();
	}
?>
