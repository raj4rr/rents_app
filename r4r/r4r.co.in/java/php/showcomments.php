<a href="/showallcomments.shtml" target="_new">Show All</a><br/>
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

       $pageURL = 'http';

 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}

 $pageURL .= "://";

 if ($_SERVER["SERVER_PORT"] != "80") {

  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];

 } else {

  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];

 }

$connection=mysql_connect("localhost","r4r_abes","rajesh!@#");

if (!$connection)

  {

  die('Could not connect: ' . mysql_error());

  }

  mysql_select_db("r4r_abes", $connection);

$result = mysql_query("SELECT * FROM comment WHERE hide='NO' order by id desc  limit 1,10");
while (list($id, $username,$emailid,$comment,$url,$hide) = mysql_fetch_row($result)) {
?>

<b>Username :</b><?= htmlspecialchars($username);  ?><br>
<b>Email    :</b><?= htmlspecialchars($emailid);  ?><br>
<b>Comments :</b><?= htmlspecialchars($comment);  ?><br>
<hr>

<?php
}

mysql_close($connection); 

?>
<a href="/showallcomments.shtml"  target="_new">Show All</a>

