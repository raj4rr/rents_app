<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$name=$_POST["name"];
$email=$_POST["email"];
$message=$_POST["message"];

if (!$connection)

  {

  die('Could not connect: ' . mysql_error());

  }

mysql_query("INSERT INTO feedback(name,email,message) VALUES('$name','$email','$message')");

mysql_close($connection);
echo 'Thanks for feedback/comments...'

?>

