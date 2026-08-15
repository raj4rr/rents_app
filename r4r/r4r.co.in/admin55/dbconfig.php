<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

error_reporting(0);
/*
$host = "localhost";
$user = "root";
$password = "";
$datbase = "r4rcoin";
*/

$host = "localhost";
$user = "db_shashir4r";
$password = "R%^&*(IUYT";
$datbase = "r4rcoin";

$conn =mysql_connect($host,$user,$password);
mysql_select_db($datbase);
?>
