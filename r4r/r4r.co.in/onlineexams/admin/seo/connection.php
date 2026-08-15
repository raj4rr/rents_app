<?php
	//for MySQLi OOP
	$conn = new mysqli('localhost', 'db_shashir4r', 'R%^&*(IUYT', 'r4r_onlineexams');
	if($conn->connect_error){
	   die("Connection failed: " . $conn->connect_error);
	}
	////////////////

	//for MySQLi Procedural
	// $conn = mysqli_connect('localhost', 'root', '', 'mydatabase');
	// if(!$conn){
	//     die("Connection failed: " . mysqli_connect_error());
	// }
	////////////////
?>
