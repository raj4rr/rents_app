<?php
	session_start();
	include_once('connection.php');
		$test_id = $_GET['test_id'];
		$sub_id = $_GET['sub_id'];
	if(isset($_GET['id'])){
		$sql = "DELETE FROM mst_question WHERE que_id = '".$_GET['id']."'";

		//use for MySQLi OOP
		if($conn->query($sql)){
			$_SESSION['success'] = 'Questions deleted successfully';
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

		header('location: questions.php?test_id='.$test_id.'&sub_id='.$sub_id);
?>
