<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";
$date = date("d.m.y"); 

$questions=$_POST["question"];
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
$comment=$_POST["comment"];
$language=$_POST["language"];
$userName=$_POST["username"];

if (!$connection)

  {

  die('Could not connect: ' . mysql_error());

  }

  $result = mysql_query("SELECT  *  FROM `question` WHERE `question`='$questions' ");

$row = mysql_fetch_array($result);

  if($row['question']==$questions){

die(header("Location:/question_alreadyexist.shtml"));

exit();

}else{

mysql_query("INSERT INTO question(question,language,hide) VALUES('$questions','$language','No')") or die("State query error!");

$result1 = mysql_query("SELECT  id  FROM `question` WHERE `question`='$questions' ");
list($id)= mysql_fetch_row($result1) ;
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

mysql_query("INSERT INTO o_comments(q_ID,comments) VALUES('$id','$comment')");

die(header("Location:/Qbjective.shtml"));
}

mysql_close($connection);

?>

