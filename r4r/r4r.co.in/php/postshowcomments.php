<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

  $pageURL = 'http';

 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}

 $pageURL .= "://";

 if ($_SERVER["SERVER_PORT"] != "80") {

  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"].$_SERVER['QUERY_STRING'];

 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["SCRIPT_NAME"].$_SERVER["QUERY_STRING"];

 }

$connection=mysql_connect("localhost","r4r_abes","rajesh!@#");

if (!$connection)

  {

  die('Could not connect: ' . mysql_error());

  }

  mysql_select_db("r4r_abes", $connection);

$result = mysql_query("SELECT * FROM comment WHERE hide='NO' and url= '$pageURL' order by id desc ");
while (list($id, $username,$emailid,$comment,$url,$hide) = mysql_fetch_row($result)) {
?>

<b>Username :</b><?= htmlspecialchars($username);  ?><br>

<b>Comments :</b><pre><?= htmlspecialchars($comment);  ?></pre><br>
<hr>

<?php
}

mysql_close($connection); 

?>

