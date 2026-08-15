<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

/*
define('DB_SERVER','localhost');
define('DB_USER','root');
define('DB_PASS' ,'');
define('DB_NAME', 'r4rcoin');

$hostname="localhost"; //local server name default localhost
$username="root";  //mysql username default is root.
$password="";       //blank if no password is set for mysql.
$database="r4rcoin";  //database name which you created
*/
define('DB_SERVER','localhost');
define('DB_USER','db_shashir4r');
define('DB_PASS' ,'R%^&*(IUYT');
define('DB_NAME', 'r4rcoin');

$hostname="localhost"; //local server name default localhost
$username="db_shashir4r";  //mysql username default is root.
$password="R%^&*(IUYT";       //blank if no password is set for mysql.
$database="r4rcoin";

/*
define('DB_SERVER','localhost');
define('DB_USER','root');
define('DB_PASS' ,'');
define('DB_NAME', 'aius');
* 
* 
*/
$conn = mysql_connect(DB_SERVER,DB_USER,DB_PASS) or die('connection problem'.mysql_error());
	mysql_select_db(DB_NAME, $conn);

?>
