<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
       require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

 $userName=$_POST["userName"];
 $password=$_POST["password"];

if (!$connection)
  {
  die('Could not connect: ' . mysql_error());
  }
$result = mysql_query("SELECT * FROM profile where userID='$userName' and password='$password'");

while($row = mysql_fetch_array($result))
{
session_start();
$_SESSION['userName']=$row['username'];
$_SESSION['userID']=$row['id'];
mysql_close($connection);

die(header("Location:/openchat?chatwith=all"));

}

?>

