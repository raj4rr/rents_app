
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

require_once dirname(__FILE__) . '/../config/site_config.php';

 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$rec_limit = 10;

$sql = "SELECT count(id) FROM `newupdates` ";
$retval = mysql_query( $sql, $connection );
if(! $retval )
{
  die('Could not get data: ' . mysql_error());
}
$row = mysql_fetch_array($retval, MYSQL_NUM );
$rec_count = $row[0];

if( isset($_GET{'page'} ) )
{
   $page = $_GET{'page'} + 1;
   $offset = $rec_limit * $page ;
}
else
{
   $page = 0;
   $offset = 0;
}
$left_rec = $rec_count - ($page * $rec_limit);

$resulttitle = mysql_query("SELECT * FROM `newupdates` where status='Yes' or status='NU' order by id desc LIMIT $offset, $rec_limit");
$title1='';
if(!isset($_GET{'page'} ))
$title1='R4R New Updates:- Tutorials,examples and Interview Questions with answers';
while (list($id, $titles) = mysql_fetch_row($resulttitle)){

 $title1=$title1." ".htmlspecialchars($titles); 
}

$result = mysql_query("SELECT * FROM `newupdates` where status='Yes' or status='NU' order by id desc LIMIT 0,50");

while (list($id, $title,$updates,$url,$name,$cdate) = mysql_fetch_row($result)){

?>

<p>

<?=$id ?><a href="<?=$url ?>"><b><?= htmlspecialchars($title);  ?></b></a>
<?= $updates  ?>
<font size='2'>Posted By: <?= htmlspecialchars($name);  ?> &nbsp;&nbsp;&nbsp;

Posted Date:<?= htmlspecialchars($cdate);  ?>

</font>

</p>

<?php

}

mysql_close($connection); 

?>
