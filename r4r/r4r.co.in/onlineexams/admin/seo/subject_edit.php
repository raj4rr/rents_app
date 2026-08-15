<?php
	session_start();
	include_once('connection.php');

	if(isset($_POST['edit'])){
		$id = $_POST['id'];
		$sub_name = $_POST['sub_name'];
		$sub_title = $_POST['sub_title'];
		$sub_meta_desc = $_POST['sub_meta_desc'];
		$sub_keyworlds = $_POST['sub_keyworlds'];
		$sub_desc = $_POST['sub_desc'];

		$sql = "UPDATE mst_subject SET sub_name = '$sub_name', sub_title = '$sub_title', sub_meta_desc = '$sub_meta_desc', sub_keyworlds = '$sub_keyworlds', sub_desc = '$sub_desc' WHERE sub_id = '$id'";

		//use for MySQLi OOP
		if($conn->query($sql)){
			$_SESSION['success'] = 'Subject updated successfully';
		}
		///////////////

		//use for MySQLi Procedural
		// if(mysqli_query($conn, $sql)){
		// 	$_SESSION['success'] = 'Member updated successfully';
		// }
		///////////////

		else{
			$_SESSION['error'] = 'Something went wrong in updating Subject';
		}
	}
	else{
		$_SESSION['error'] = 'Select Subject to edit first';
	}

	header('location: subject.php');

?>
