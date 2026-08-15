<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');include("lock.php");
$question_id="";$er=mysql_query("select id from question where language='$_GET['delete_category_id']'",$r4r_con);
while($row_array=mysql_fetch_array($er))
{$question_id=$question_id.','.$row_array["id"];}
$question_id=substr($question_id,1);

$sql_delete1 ="DELETE FROM answer where question_id in ($question_id)";
if (!mysql_query($sql_delete1,$r4r_con))
{echo 'Error: ' . mysql_error();}
else{$sql_delete ="DELETE FROM question where language='$_GET['delete_category_id']'";
if (!mysql_query($sql_delete,$r4r_con))
{echo 'Error: ' . mysql_error();}
else{echo '1';}}

 ?>