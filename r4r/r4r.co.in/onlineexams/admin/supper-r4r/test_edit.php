<?php
	session_start();
	include_once('connection.php');

	if(isset($_POST['edit'])){
		$id = $_POST['id'];

		$test_name = $_POST['test_name'];
		$sub_id = $_POST['sub_id'];
		$total_que = $_POST['total_que'];

		$sql = "UPDATE mst_test SET test_name = '$test_name', total_que = '$total_que' WHERE test_id = '$id'";

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
