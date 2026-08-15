<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

session_start();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Online Exams - Exam List</title>
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

$rs=mysql_query("select * from mst_subject where status=2 order by `sub_name` ASC");
echo "<div height='200px' overflow='auto'><table align=center width='90%' ><tr><td align=center width='20%'><ul>";
while($row=mysql_fetch_row($rs))
{
	echo "<li><a href=showtest.php?subid=$row[0]><font size=4>$row[1]</font></a></li>";
}
echo "</ul></td><td width='90%'>";

echo "</td></tr></table></div>";

include("footer.php");
?>

</body>
</html>
