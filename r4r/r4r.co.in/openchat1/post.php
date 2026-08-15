<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";
  if($_POST['user']){
    $name = $_POST['user'];
    $nameColor = "#007fff";
    $text = $_POST['msg'];
    $textColor = "#ff0000";
    $sql = "INSERT INTO voicebox(name,text,nameColor,textColor,time) VALUES('$name','$text','$nameColor','$textColor',now())";
    mysql_query($sql,$connection);
     mysql_close($connection); 
 }die(header("Location:index.shtml"));   
?>
