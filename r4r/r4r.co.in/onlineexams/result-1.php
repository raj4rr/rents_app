<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

session_start();

include("database.php");
extract($_SESSION);
$rs=mysql_query("select t.test_name,t.total_que,r.test_date,r.score from mst_test t, mst_result r where
t.test_id=r.test_id and r.login='$login'",$cn) or die(mysql_error());

if(mysql_num_rows($rs)<1)
{
	echo "<br><br><h1 class=head1> You have not given any Exam.</h1>";
	exit;
}
echo "<table border=1 align=center><tr class=style2><td width=300>Test Name <td> Total<br> Question </td><td>Date Time</td><td> Score</td>";
while($row=mysql_fetch_row($rs))
{
echo "<tr class=style8><td>$row[0] </td><td align=center> $row[1] </td><td align=center> $row[2]</td><td align=center> $row[3]</td></tr>";
}
echo "</table>";

?>

