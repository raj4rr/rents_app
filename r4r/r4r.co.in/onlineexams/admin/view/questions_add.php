<?php
	session_start();
	$userid=$_SESSION['userid'];
	include_once('connection.php');

	if(isset($_POST['add'])){
		$test_id = $_POST['test_id'];
		$sub_id = $_POST['sub_id'];
		if($test_id){
		$que_desc = $_POST['que_desc'];
		$ans1 = $_POST['ans1'];
		$ans2 = $_POST['ans2'];
		$ans3 = $_POST['ans3'];
		$ans4 = $_POST['ans4'];
		$true_ans = $_POST['true_ans'];

		//$address = $_POST['address'];
		$sql = "INSERT INTO mst_question (test_id,que_desc,ans1,ans2,ans3,ans4,true_ans,userid) VALUES ('$test_id', '$que_desc', '$ans1', '$ans2', '$ans3', '$ans4', '$true_ans','$userid')";

		//use for MySQLi OOP
		if($conn->query($sql)){
			$_SESSION['success'] = 'Questions added successfully';
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

	header('location: questions.php?test_id='.$test_id.'&sub_id='.$sub_id);
?>
