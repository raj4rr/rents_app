<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";   

 $pageURL=$pageURL.$_SERVER['SCRIPT_NAME'].$_SERVER['QUERY_STRING'];

    if (!$connection)
  {

  die('Could not connect: ' . mysql_error());
  }
$sql1="select * from comment where comment='$_POST['comment']'";
$obj1=mysql_query($sql1);
if(mysql_num_rows($obj1)==0){ 
$sql="INSERT INTO comment(username, emailid,comment,url)
VALUES('$_POST['username']','$_POST['email']','$_POST['comment']','$_POST['url']')";
mysql_query($sql);
mysql_close($connection); 
?><?php 
echo '<script type=text/javascript>alert("Thanks\n\n\n\nSubmitted Successfully!!");</script>';
}
?>

<iframe src="/common-files/comments.php" scrolling="no"  width="728" height="450" frameborder="0"> </iframe>
