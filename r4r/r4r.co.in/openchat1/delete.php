<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$sql1="DELETE FROM `voicebox` WHERE `voicebox`.`id` = '$_GET['id']'";

$obj1=mysql_query($sql1);

mysql_query($sql);

mysql_close($connection);  
?>
