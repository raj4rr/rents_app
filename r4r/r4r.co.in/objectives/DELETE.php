<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$question_id=$_GET["id"];
$option=$_GET["option"];

if (!$connection)
  {
  die('Could not connect: ' . mysql_error());
  }
 mysql_query("delete FROM `question` WHERE `id`='$question_id' ")or die("State query error!");
 mysql_query("delete FROM `o_answer` WHERE `q_ID`='$question_id' ")or die("State query error!");
 mysql_query("delete FROM `o_comments` WHERE `q_ID`='$question_id' ")or die("State query error!");

die(header("Location:ShowAnswers.php?option=$option"));
exit();

mysql_close($connection);

?>
