<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/sdbconnection.php";
$date = date("d.m.y"); 

$title=$_POST["title"];
$keywords=$_POST["keywords"];
$descriptions=$_POST["descriptions"];
$introduction=$_POST["introduction"];
$classdescription=$_POST["classdescription"];
$methoddescription=$_POST["methoddescription"];
$sourcecodedescription=$_POST["sourcecodedescription"];
$sourcecode=$_POST["sourcecode"];
$output=$_POST["output"];
$file=$_POST["file"];
$language=$_POST["language"];
$username=$_POST["username"];

if (!$sconnection)

  {

  die('Could not connect: ' . mysql_error());

  }

  $result = mysql_query("SELECT * FROM `sourcecode` WHERE `title`='$title'")or die("State query error!Select");

//$row = mysql_fetch_array($result);

  if(mysql_num_rows($result)>0){

die(header("Location:/question_alreadyexist.shtml"));

exit();

}else{

mysql_query("INSERT INTO sourcecode(title,keywords,descriptions,introduction,classdescription,methoddescription,sourcecodedescription,sourcecode,output,file,language,username,date,hide) VALUES('$title','$keywords','$descriptions','$introduction','$classdescription','$methoddescription','$sourcecodedescription','$sourcecode','$output','$file','$language','$username','$date','NO')") or die("State query error!");

die(header("Location:postcode.shtml"));
}

mysql_close($sconnection);

?>

