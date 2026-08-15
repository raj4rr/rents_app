<?php
	session_start();
	include_once('connection.php');

	if(isset($_GET['test_id'])){

		$test_id = $_GET['test_id'];
		$ip = $_GET['ip'];
		$sub_id = $_GET['sub_id'];

		$sql = "UPDATE mst_test SET status = '$ip' WHERE test_id = '$test_id'";

		//use for MySQLi OOP
		if($conn->query($sql)){
			$_SESSION['success'] = 'Test updated successfully';
		}
		///////////////

		//use for MySQLi Procedural
		// if(mysqli_query($conn, $sql)){
		// 	$_SESSION['success'] = 'Member updated successfully';
		// }
		///////////////

		else{
			$_SESSION['error'] = 'Something went wrong in updating questions';
		}
	}
	else{
		$_SESSION['error'] = 'Select questions to edit first';
	}

		header('location: tests.php?sub_id='.$sub_id);

?>
