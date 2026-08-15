<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$questions=$_POST["question"];
$language=$_POST["language"];
$hide=$_POST["hide'"];
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
mysql_query("INSERT INTO question(question,language,hide) VALUES('$questions','$language','$hide')");
die(header("Location:/question_inserted.shtml"));
}
mysql_close($connection);

?>
