<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

session_start();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Online Exam</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link href="quiz.css" rel="stylesheet" type="text/css">

<script language="javascript">

	function check1(){

		if(document.form2.loginid2.value=="")
  {
    alert("Plese Enter Login Id");
	document.form2.loginid2.focus();
	return false;
  }

 if(document.form2.pass2.value=="")
  {
    alert("Plese Enter Your Password");
	document.form2.pass2.focus();
	return false;
  } 

}

</script>
</head>

<body>
<?php
include("header.php");
include("database.php");
extract($_POST);

if(isset($submit))
{
	$rs=mysql_query("select * from mst_user where login='$loginid' and pass='$pass'");
	if(mysql_num_rows($rs)<1)
	{
		$found="N";
	}
	else
	{
		$_SESSION['login']=$loginid;
	}
}
if (isset($_SESSION['login']))
{

		echo '<table width="28%"  border="0" align="center">
		<tr> <td width="100%" height="65" valign="bottom"><h1 class="style8" align=center>ONLINE EXAMS</h1></td></tr>
		<tr> <td width="100%" height="65" valign="bottom"><img src="image/Exam-1.jpg" width="150" height="150" border="2" align="middle"></td></tr>
  <tr>

    <td width="100%" valign="bottom" bordercolor="#0000FF"> <a href="sublist.php" class="style4">Choose Exam</a></td>
  </tr>
  <tr>

    <td valign="bottom"> <a href="result.php" class="style4">View Exam Results </a></td>
  </tr>
</table>';
include("footer.php");
		exit;

}

?>
<table width="100%" border="0">

  <tr>
    <td height="20%" valign="top"><div align="center">
      <div class="on">  <h1 class="style8">WELCOME TO ONLINE EXAM(DEMO)</h1> </div>
      <span class="style5"><img src="image/Exams.jpg" width="229" height="200" border="2">

<p align="left" class="style5">&nbsp;</p>

          <p align="left" class="style5"><span class="style7">Welcome to Online
            Exam by oLete. oLete provides complete Technical solution for conducting <b>Online exams</b> or <b>Compter Based Exams</b>.
            <br/>To Start Exam you need to Create you profile and login.
            <br/>Select Exam and Read rules.
            <br/>Start Exam.

					</span></p>

    </div></td>
    <td width="20%">
	   <span class="style8"><img src="images/connected_multiple_big.jpg" width="131" height="155"></span>
	   <form name="form2" method="post" action="index.php"  onSubmit="return check1();">
      <table width="200" border="0">
        <tr>
          <td><span class="style2">Login ID </span></td>
          <td><input name="loginid" type="text" id="loginid2"></td>
        </tr>
        <tr>
          <td><span class="style2">Password</span></td>
          <td><input name="pass" type="password" id="pass2"></td>
        </tr>
        <tr>
          <td colspan="2"><span class="errors">
            <?php
		  if(isset($found))
		  {
		  	echo "Invalid Username or Password";
		  }
		  ?>
          </span>

          </td>
          </tr>
        <tr>
          <td colspan=2 align=center class="errors">
		  <input name="submit" type="submit" id="submit" value="Login">		
		  <br/>
		   <span class="style4">New User ? <a href="Profile.php">Create Free Profile</a></span>

		    </td>
        </tr>
        </table>
        </form>
			 </td>
			 </tr>
 </table>
 <p>&nbsp; </p>
 <?php include("footer.php"); ?>
</body>
</html>
