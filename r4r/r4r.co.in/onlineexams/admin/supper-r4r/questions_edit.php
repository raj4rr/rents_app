<?php
	session_start();
	include_once('connection.php');

	if(isset($_POST['edit'])){
		$id = $_POST['id'];
		$sub_id = $_POST['sub_id'];
		$test_id = $_POST['test_id'];
		$que_desc = $_POST['que_desc'];
		$ans1 = $_POST['ans1'];
		$ans2 = $_POST['ans2'];
		$ans3 = $_POST['ans3'];
		$ans4 = $_POST['ans4'];
		$true_ans = $_POST['true_ans'];

		$sql = "UPDATE mst_question SET que_desc = '$que_desc', ans1 = '$ans1', ans2 = '$ans2', ans3 = '$ans3', ans4 = '$ans4', true_ans = '$true_ans' WHERE que_id = '$id'";

		//use for MySQLi OOP
		if($conn->query($sql)){
			$_SESSION['success'] = 'Question updated successfully';
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

		header('location: questions.php?test_id='.$test_id.'&sub_id='.$sub_id);

?>
