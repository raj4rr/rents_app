<?php
	session_start();
		$userid=$_SESSION['userid'];
	include_once('connection.php');

	if(isset($_POST['add'])){
		$sub_id = $_POST['sub_id'];
		if($sub_id){
		$test_name = $_POST['test_name'];

		$total_que = $_POST['total_que'];

		//$address = $_POST['address'];
		$sql = "INSERT INTO mst_test (test_name,sub_id,total_que,userid) VALUES ('$test_name', '$sub_id', '$total_que','$userid')";

		//use for MySQLi OOP
		if($conn->query($sql)){
			$_SESSION['success'] = 'Test added successfully';
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
	}else $_SESSION['error'] = 'Something went wrong while adding';
	}
	else{
		$_SESSION['error'] = 'Fill up add form first';
	}

	header('location: tests.php?sub_id='.$sub_id);
?>
