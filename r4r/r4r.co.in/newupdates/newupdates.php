<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$title=$_POST['title'];
$updates=$_POST['updates'];
$url=$_POST['url'];
$name=$_POST['name'];
$status=$_POST['status'];

$cdate=date("m.d.y");

mysql_query("INSERT INTO `newupdates` (`title`, `upadates`, `url`, `name`, `cdate`, `status`) VALUES ('$title', '$updates', '$url', '$name', '$cdate', '$status');");
mysql_close($connection);

?>
