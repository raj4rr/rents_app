<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";  
 $sessionid=$_POST['sessionid']; 
 if($sessionid){
if (!$connection)
{

  die('Could not connect: ' . mysql_error());

}
$comments=$_POST['comment'];
if(! (strpos($comments,'&#')=='FALSE') && !(strpos($comments,'<a href')=='FALSE'))
{
	$sql="INSERT INTO comment(username, emailid,comment,url) VALUES ('$_POST['username']','$_POST['email']','$_POST['comment']','$_POST['url']')";
	if(!mysql_query($sql))
	{

		session_start();
		$_SESSION['message']='Error:'.mysql_error();
		mysql_close($connection); 
		$url=$_SERVER['HTTP_REFERER'];
		header("location:$url");
	}
	else
	{
		mysql_close($connection); 
		session_start();
		$_SESSION['message']='Thanks for your feedback. We will revert you soon !';
		$url=$_SERVER['HTTP_REFERER'];
		header("location:$url");
	}
}
else
{
	session_start();
	$_SESSION['message']='Not allowed to access!';
	$url=$_SERVER['HTTP_REFERER'];
	header("location:$url");
}
}
?>
