
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/sdbconnection.php";

if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }

$id=$_POST["id"];
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
$rs=mysql_query("update `sourcecode` set `title`='$title',`keywords`='$keywords',`descriptions`='$descriptions',`introduction` ='$introduction',`classdescription`='$classdescription',`methoddescription`='$methoddescription',`sourcecodedescription`='$sourcecodedescription' ,`sourcecode`='$sourcecode',`output`='$output',`file`= '$file',`language`='$language',`username`='$username' WHERE id='$id' ") or die("State query error!");

echo "<a href=ShowAnswers.php?option=$language>Click Here For Back</a>";

mysql_close($sconnection);
?>
