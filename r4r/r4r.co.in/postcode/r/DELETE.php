<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/sdbconnection.php";

$question_id=$_GET["id"];
$option=$_GET["option"];

if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }
 mysql_query("delete FROM `sourcecode` WHERE `id`='$question_id' ")or die("State query error!");

die(header("Location:ShowAnswers.php?option=$option"));
exit();

mysql_close($sconnection);

?>
