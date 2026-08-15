<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";
$questions=$_POST["question"];
$id=$_POST["q_ID"];
$option1=$_POST["option1"];
$option2=$_POST["option2"];
$option3=$_POST["option3"];
$option4=$_POST["option4"];
$option5=$_POST["option5"];
$option6=$_POST["option6"];
$optionCheck1=$_POST["optionCheck1"];
$optionCheck2=$_POST["optionCheck2"];
$optionCheck3=$_POST["optionCheck3"];
$optionCheck4=$_POST["optionCheck4"];
$optionCheck5=$_POST["optionCheck5"];
$optionCheck6=$_POST["optionCheck6"];
$date = date("d.m.y"); 
$comment=$_POST["comment"];
$language=$_POST["language"];
$Q_Option=$_POST["option"];
$userName=$_POST["user_name"];

if (!$connection)

  {

  die('Could not connect: ' . mysql_error());

  }
mysql_query(" update `question`  set `question`='$questions',`language`='$language' WHERE `id`='$id'") or die("State query error! question");
mysql_query("delete FROM `o_answer` WHERE `q_ID`='$id' ")or die("State query error!");
mysql_query("delete `o_answer` WHERE `q_ID`='$id'");
if(!$option1==NULL)
mysql_query("INSERT INTO `o_answer` (`q_ID` ,`answer` ,`option` ,`date` ,`name` ,`hide`) VALUES('$id','$option1','$optionCheck1','$date','$userName','NO')") or die("State query error!");
if(!$option2==NULL)
mysql_query("INSERT INTO `o_answer` (`q_ID` ,`answer` ,`option` ,`date` ,`name` ,`hide`) VALUES('$id','$option2','$optionCheck2','$date','$userName','NO')") or die("State query error!");
if(!$option3==NULL)
mysql_query("INSERT INTO `o_answer` (`q_ID` ,`answer` ,`option` ,`date` ,`name` ,`hide`) VALUES('$id','$option3','$optionCheck3','$date','$userName','NO')") ;
if(!$option4==NULL)
mysql_query("INSERT INTO `o_answer` (`q_ID` ,`answer` ,`option` ,`date` ,`name` ,`hide`) VALUES('$id','$option4','$optionCheck4','$date','$userName','NO')"); 
if(!$option5==NULL)
mysql_query("INSERT INTO `o_answer` (`q_ID` ,`answer` ,`option` ,`date` ,`name` ,`hide`) VALUES('$id','$option5','$optionCheck5','$date','$userName','NO')") ;
if(!$option6==NULL)
mysql_query("INSERT INTO `o_answer` (`q_ID` ,`answer` ,`option` ,`date` ,`name` ,`hide`) VALUES('$id','$option6','$optionCheck6','$date','$userName','NO')") ;

mysql_query("update  `o_comments` set comments='$comment' WHERE q_ID='$id'");
die(header("Location:ShowAnswers.php?option=$Q_Option"));

mysql_close($connection);

?>

