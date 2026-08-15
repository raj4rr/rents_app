<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

session_start();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Online Exams  - Ranks </title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link href="quiz.css" rel="stylesheet" type="text/css">
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
$rs=mysql_query("select t.test_name,rn.userid,rn.bestscore from  rank rn INNER JOIN mst_test t ON 
rn.testid=t.test_id where rn.testid=$testid order by rn.bestscore desc",$cn) or die(mysql_error());

echo "<h1 class=head1> Rank List </h1>";
if(mysql_num_rows($rs)<1)
{
	echo "<br><br><h1 class=head1> No one has given this test paper yet.</h1>";
	exit;
}
echo "<table border=1 align=center><tr class=style2><td>Test Name</td><td>User Id</td><td>Ranks</td><td>Best Score</td> ";
$rank=0;
while($row=mysql_fetch_row($rs))

{
$rank++;
echo "<tr class=style8><td>$row[0] </td><td>$row[1] </td><td>$rank</td><td align=center> $row[2] </td></tr>";

}
echo "</table>";
echo "<h4>* If applicants get same marks first exam date will given high priority</h4>";
include("footer.php");
?>
</body>
</html>
