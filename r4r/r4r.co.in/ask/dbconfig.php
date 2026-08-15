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
$user = "root";
$password = "";
$datbase = "u978544338_ask";

$conn =mysql_connect($host,$user,$password);
mysql_select_db($datbase);
?>
