<?php
	session_start();
	include_once('connection.php');

	if(isset($_POST['add'])){
		$sub_name = $_POST['sub_name'];
		$status = $_POST['status'];
		//$address = $_POST['address'];
		$sql = "INSERT INTO mst_subject (sub_name, status) VALUES ('$sub_name', '$status')";

		//use for MySQLi OOP
		if($conn->query($sql)){
			$_SESSION['success'] = 'Subject added successfully';
		}
		///////////////

		//use for MySQLi Procedural
		// if(mysqli_query($conn, $sql)){
		// 	$_SESSION['success'] = 'Member added successfully';
		// }
		//////////////

		else{
			$_SESSION['error'] = 'Something went wrong while adding';
		}
	}
	else{
		$_SESSION['error'] = 'Fill up add form first';
	}

	header('location: subject.php');
?>
