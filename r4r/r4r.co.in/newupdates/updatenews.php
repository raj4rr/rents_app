<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$id=$_POST['id'];
$title=$_POST['title'];
$updates=$_POST['updates'];
$url=$_POST['url'];
$name=$_POST['name'];
$cdate=date("m.d.y");
$status=$_POST['status'];

mysql_query("UPDATE `newupdates` SET `title` = '$title', `upadates` = '
$updates', `url` = '$url', `name` = '$name', `cdate` = '$cdate',`status` = '$status' WHERE `newupdates`.`id` = $id;");
mysql_close($connection);

?>
