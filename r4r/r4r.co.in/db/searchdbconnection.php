<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

$searchconnection = mysql_connect($CONFIG['MYSQL_HOST'],$CONFIG['Search_USER'],$CONFIG['Search_PASSWORD']);
mysql_select_db($CONFIG['Search_DATABASE'],$searchconnection);

?>
