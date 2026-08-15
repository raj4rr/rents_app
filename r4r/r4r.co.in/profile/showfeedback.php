<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$name=$_POST["name"];
$email=$_POST["email"];
$message=$_POST["message"];

if (!$connection)

  {

  die('Could not connect: ' . mysql_error());

  }

 $result = mysql_query("SELECT  *  FROM `feedback`");

while($row = mysql_fetch_array($result)){

echo $row['name'];
echo $row['email'];
echo $row['message'];
echo '<hr>';
}

mysql_close($connection);

?>

