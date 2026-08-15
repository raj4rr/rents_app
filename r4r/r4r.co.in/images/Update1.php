<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$question_id=$_POST["id"];
$question=$_POST["question"];
$language=$_POST["language"];
$option=$_POST["option"];

if (!$connection)
  {
  die('Could not connect: ' . mysql_error());
  }
  mysql_query("Update `question` set question='$question',language='$language',hide='NO' WHERE `id`='$question_id' ");

mysql_close($connection);
die(header("Location:/ShowAnswers1.php?option=$option"));
exit();
?>
