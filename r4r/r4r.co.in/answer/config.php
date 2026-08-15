<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 $web_url="http://r4r.in/";
//error_reporting(E_ALL ^ E_DEPRECATED);
/*
$host_name = 'localhost';
$user_name = 'db_shashir4r';
$pass_word = 'R%^&*(IUYT';
$database_name = 'r4rin';

$conn = mysql_connect($host_name, $user_name, $pass_word) or die ('Error connecting to mysql');
mysql_select_db($database_name,$conn);
*/
$dsn = "mysql:host=localhost;dbname=u978544338_exams";
$user = "root";
$passwd = "";
$pdo = new PDO($dsn, $user, $passwd);

$timezone = "Asia/Calcutta";
if(function_exists('date_default_timezone_set')) date_default_timezone_set($timezone);
$time_now=date('H:i:s');
$date_now=date('Y-m-d');
$date_time = date('Y-m-d H:i:s');

?>

