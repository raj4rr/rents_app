<?php
session_start();
 $examid=$_SESSION['examid'];
	 $examname=$_SESSION['examname'];

include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

	// variables for input data
	$exam_city = $_POST['exam_city'];
	$college = $_POST['college'];
	$center_address = $_POST['center_address'];

	$exam_date = $_POST['exam_date'];

	$shift1 = $_POST['shift1'];
	$shift2 = $_POST['shift2'];
	$shift3 = $_POST['shift3'];
	$shifts;
	if($shift1=='on')
	$shifts=array("Shift-I");
	if($shift2=='on')
	array_push($shifts,"Shift-II");
	if($shift3=='on')
	array_push($shifts,"Shift-III");

	//echo $shifts[];
	//echo count($shifts);
	$code = $_POST['code'];

	 for($count = 0; $count<count($shifts); $count++)
 {
	 $shift=$shifts[$count];
	 //echo $shift;
	$sql_query1="SELECT * FROM center_details where exam_city='$exam_city' and colloge='$college' and centeraddress='$center_address' and exam_date='$exam_date' and shift='$shift' and code='$code'";
	$result_set1=mysql_query($sql_query1);
	if(mysql_num_rows($result_set1)>0)
	{
		//echo "Data Already Inserted.";

	}else{

	$sql_query = "INSERT INTO center_details(exam_city,exam_name,colloge,centeraddress,exam_date,shift,code) VALUES('$exam_city','$examid','$college','$center_address','$exam_date','$shift','$code')";
	echo $sql_query;
	if(mysql_query($sql_query))
	{

	}
	else
	{
	echo 'Eroor';
	}

}}
echo 'Eroor';
?>
