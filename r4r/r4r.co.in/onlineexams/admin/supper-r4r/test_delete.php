<?php
	session_start();
	include_once('connection.php');
		$sub_id = $_GET['sub_id'];
	if(isset($_GET['id'])){
		$sql = "DELETE FROM mst_test WHERE test_id = '".$_GET['id']."'";

		//use for MySQLi OOP
		if($conn->query($sql)){
			$_SESSION['success'] = 'Test deleted successfully';
		}
		////////////////

		//use for MySQLi Procedural
		// if(mysqli_query($conn, $sql)){
		// 	$_SESSION['success'] = 'Member deleted successfully';
		// }
		/////////////////

		else{
			$_SESSION['error'] = 'Something went wrong in deleting member';
		}
	}
	else{
		$_SESSION['error'] = 'Select questions to delete first';
	}

		header('location: tests.php?sub_id='.$sub_id);
?>
