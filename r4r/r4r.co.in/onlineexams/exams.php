<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

session_start();
error_reporting(1);
include("database.php");
extract($_POST);
extract($_GET);
extract($_SESSION);
/*$rs=mysql_query("select * from mst_question where test_id=$tid",$cn) or die(mysql_error());
if($_SESSION['qn']>mysql_num_rows($rs))
{
unset($_SESSION['qn']);
exit;
}*/
if(isset($subid) && isset($testid))
{
$_SESSION['sid']=$subid;
$_SESSION['tid']=$testid;
header("location:exams.php");
}
if(!isset($_SESSION['sid']) || !isset($_SESSION['tid']) ||!isset($_SESSION['login']) )
{
	header("location: index.php");
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Online Exam</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link href="quiz.css" rel="stylesheet" type="text/css">
</head>

<body>
<?php
include("header1.php");
?>
<table><tr align="center"><td >
<?php 

$query="select * from mst_question";

$rs=mysql_query("select * from mst_question where test_id=$tid",$cn) or die(mysql_error());
if(!isset($_SESSION['qn']))
{
	$_SESSION['qn']=0;
	mysql_query("delete from mst_useranswer where sess_id='" . session_id() ."'") or die(mysql_error());
	$_SESSION['trueans']=0;

}
else
{	
		if($submit=='Next Question' && isset($ans))
		{
				mysql_data_seek($rs,$_SESSION['qn']);
				$row= mysql_fetch_row($rs);	
				mysql_query("insert into mst_useranswer(sess_id, test_id, que_des, ans1,ans2,ans3,ans4,true_ans,your_ans) values ('".session_id()."', $tid,'$row[2]','$row[3]','$row[4]','$row[5]', '$row[6]','$row[7]','$ans')") or die(mysql_error());
				if($ans==$row[7])
				{
							$_SESSION['trueans']=$_SESSION['trueans']+1;
				}
				$_SESSION['qn']=$_SESSION['qn']+1;
		}
		else if($submit=='Get Result' && isset($ans))
		{
				mysql_data_seek($rs,$_SESSION['qn']);
				$row= mysql_fetch_row($rs);	
				mysql_query("insert into mst_useranswer(sess_id, test_id, que_des, ans1,ans2,ans3,ans4,true_ans,your_ans) values ('".session_id()."', $tid,'$row[2]','$row[3]','$row[4]','$row[5]', '$row[6]','$row[7]','$ans')") or die(mysql_error());
				if($ans==$row[7])
				{
							$_SESSION['trueans']=$_SESSION['trueans']+1;
				}
				echo "<h1 class=head1> Result</h1>";
				$_SESSION['qn']=$_SESSION['qn']+1;
				echo "<Table align=center><tr class=tot><td>Total Question<td> $_SESSION['qn']";
				echo "<tr class=tans><td>True Answer<td>".$_SESSION['trueans'];
				$w=$_SESSION['qn']-$_SESSION['trueans'];
				echo "<tr class=fans><td>Wrong Answer<td> ". $w;
				echo "</table>";
				mysql_query("insert into mst_result(login,test_id,score) values('$login',$tid,$_SESSION['trueans'])") or die(mysql_error());

				$rank_rs=mysql_query("select bestscore from rank where testid=$tid and userid='$login'",$cn) or die(mysql_error());

				if((mysql_num_rows($rank_rs))<=0)
					{

				mysql_query("insert into rank(userid,testid,score,bestscore) values('$login',$tid,$_SESSION['trueans'],$_SESSION['trueans'])") or die(mysql_error());
				}
				else 
				{
					$rowbest = mysql_fetch_array($rank_rs);
						$bestscore=$rowbest[0];
						if($_SESSION['trueans']>$bestscore)
						$bestscore=$_SESSION['trueans'];
				mysql_query("UPDATE `rank` SET  score=$_SESSION['trueans'],bestscore=$bestscore WHERE userid='$login' and testid=$tid") or die(mysql_error());

			    }
				echo "<h1 align=center><a href=review.php> Review Question</a> </h1>";
				unset($_SESSION['qn']);
				unset($_SESSION['sid']);
				unset($_SESSION['tid']);
				unset($_SESSION['trueans']);
				exit;
		}
}
$rs=mysql_query("select * from mst_question where test_id=$tid",$cn) or die(mysql_error());
if($_SESSION['qn']>mysql_num_rows($rs)-1)
{
unset($_SESSION['qn']);
echo "<h1 class=head1>Some Error  Occured</h1>";
session_destroy();
echo "Please <a href=index.php> Start Again</a>";

exit;
}
mysql_data_seek($rs,$_SESSION['qn']);
$row= mysql_fetch_row($rs);
echo "<form name=myfm method=post action=exams.php>";
echo "<table width=100%> <tr> <td width=30>&nbsp;<td> <table border=0>";
$n=$_SESSION['qn']+1;
echo "<tR><td><span class=style2>Que ".  $n .": $row[2]</style>";
echo "<tr><td class=style8><input type=radio name=ans value=1>$row[3]";
echo "<tr><td class=style8> <input type=radio name=ans value=2>$row[4]";
echo "<tr><td class=style8><input type=radio name=ans value=3>$row[5]";
echo "<tr><td class=style8><input type=radio name=ans value=4>$row[6]";

if($_SESSION['qn']<mysql_num_rows($rs)-1)
echo "<tr><td><input type=submit name=submit value='Next Question'></form>";
else
echo "<tr><td><input type=submit name=submit value='Get Result'></form>";
echo "</table></table></td></tr></table>";

include("footer1.php");

?>
</body>
</html>
