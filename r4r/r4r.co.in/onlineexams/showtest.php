<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

session_start();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Online Exam - Exams List</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

</head>
<body>
<?php
include("header.php");
include("database.php");
if(!isset($_SESSION['login']) )
{
	header("location: index.php");
}
extract($_GET);
$rs1=mysql_query("select * from mst_subject where sub_id=$subid");
$row1=mysql_fetch_array($rs1);
echo "<h1 align=center><font color=blue> $row1[1]</font></h1>";

$rs=mysql_query("select * from mst_test where sub_id=$subid and status=2");
if(mysql_num_rows($rs)<1)
{
	echo "<br><br><h2 class=head1> No Quiz for this Subject </h2><a href=sublist.php>Back</a></td></tr></table>";
	include("footer.php");
	exit;
}

echo "<table align=center width='80%' border='1'><tr><th>Exam Name</th><th>Number of Questions</th><th> Actions </th><th> Ranks </th></tr>";

while($row=mysql_fetch_row($rs))
{
	echo "<tr><td>$row[2]</td><td>$row[4]</td><td><a href=exams.php?testid=$row[0]&subid=$subid><font size=4>Start</font></a></td><td><a href=ranks.php?testid=$row[0]&subid=$subid><font size=4>Ranks</font></a></td></tr>";
}

echo "</table>";

include("footer.php");
?>
</body>
</html>
