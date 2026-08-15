<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
$cn=mysql_connect("localhost","root","") or die("Could not Connect My Sql");
mysql_select_db("u978544338_onlineexam",$cn)  or die("Could connect to Database");
?>
