<?php session_start();

  include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

   $error='';
   $con=mysql_connect($hostname,$username,$password);
   mysql_select_db($database,$con);

 $exam=$_POST['exam'];

if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

	$sql_query = "SELECT DISTINCT code FROM `center_details` WHERE `exam_name` ='$exam' ";
	//echo 	$sql_query ;
	$result_set=mysql_query($sql_query);

	if(mysql_num_rows($result_set)>0)
	{
        while($row=mysql_fetch_row($result_set))
		{

			$cheksql_query = "SELECT *FROM `off_login` WHERE `examid` ='$exam'  and username='$row[0]'";
	//echo $cheksql_query;
			$check_set=mysql_query($cheksql_query);

			if(mysql_num_rows($check_set)>0)
			{

			}else {
				$pass= rand(100000,999999); 

		$isql="INSERT INTO `off_login` (`id`, `username`, `passcode`, `centercode`, `examid`, `status`) VALUES (NULL,'$row[0]', '$pass','$row[0]','$exam', '1');";
     //echo $isql;
		mysql_query($isql);
		echo "Record updated successfully:- $row[0]<br/>";
			}

	}
	}

echo '<a href="dashboard-UserName-Password.php">Back</a>'
	  //mysqli_close($con);

	 // include 'getlabdetails1.php';
?>
