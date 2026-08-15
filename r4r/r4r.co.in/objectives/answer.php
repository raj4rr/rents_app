<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<HTML><HEAD><TITLE>R4R Insert Answer</TITLE>
<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META content=r4r.co.in name=owner>
<META content="Rajesh Kumar" name=author>
<META http-equiv=expires content=0>
 <meta name="description" CONTENT="R4R Insert Answer" >
 <meta name="keywords" CONTENT="R4R, Insert, Answer,Question">
<LINK 
href="images/new_css.css" type=text/css 
rel=stylesheet>
<STYLE>
#LeftMNav UL A {
	HEIGHT: 1em
}
#LeftMNav LI {
	CLEAR: both; FLOAT: left; WIDTH: 100%
}
.style3 {
	COLOR: #11449e
}
</STYLE>

<META content="MSHTML 6.00.2900.2180" name=GENERATOR></HEAD>
<BODY leftMargin=0 topMargin=0>
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>

<DIV id=LeftMNav><?php include("images/new_menu.shtml"); ?>
<?php @include('images/new_menu.shtml'); ?></DIV>
<TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>
  <TBODY>
  <TR>
    <TD width="120" vAlign=top class=nav>
      <DIV id=LeftMNav align=left>
<?php include("images/new_left_menu.shtml"); ?>
<?php @include('images/new_left_menu.shtml'); ?>
      </DIV>
	  </TD>
    <TD width="673" align=left vAlign=top>

<br><br>
<br><br>
<br><br><br><br><br><br><br><br><br><br><br><br><br><br>
<form action="Answers.php" method="post">
<B>Question:
<?php  require_once dirname(__FILE__) . '/config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "db/dbconnection.php";

$question_id=$_REQUEST["id"];

if (!$connection)
  {
  die('Could not connect: ' . mysql_error());
  }
  mysql_select_db("r4rcocom_abes", $connection);
  $result = mysql_query("SELECT  *  FROM `question` WHERE `id`='$question_id' ");
$row = mysql_fetch_array($result);
   echo htmlspecialchars($row['question']);
?>

<input type="hidden" name="id" value="<?php echo $_REQUEST["id"] ; ?>">
</B><br>User Name:<input type="text" name="username"><br>
Answers: <textarea name="answer" cols="50" rows="5">
</textarea><br>
<br>
<input type="submit" value="Save"> <input type="reset"
	value="Reset">

</form>

 <BLINK><U><A 
      href="/public-shtml/contactus.shtml"><FONT 
      color=#800000>Contact Us</FONT></A></U><FONT color=#800000> 
    </FONT></BLINK>		</p>
  </p></p></p>   

	  </TD><TD vAlign=top align=left width="120">
<?php include("images/new_topic.shtml"); ?>
	  <?php @include('images/new_topic.shtml'); ?>
	  </TD>
    <TD width="120" align=left vAlign=top >
<?php include("images/project_list.shtml"); ?>
	<?php @include('images/project_list.shtml'); ?>
      </TD></TR>
  <TR>
    <TD vAlign=top><?php include("images/contact_us.shtml"); ?><?php @include('images/contact_us.shtml'); ?> </TD>
    <TD align=left vAlign=top><?php include("images/comment.shtml"); ?><?php @include('images/comment.shtml'); ?></TD>
    <TD vAlign=top align=left><?php include("images/news.shtml"); ?><?php @include('images/news.shtml'); ?></TD>
    <TD align=left vAlign=top ><?php include($_SERVER['DOCUMENT_ROOT'] . "/template/footer.php"); ?><?php include($_SERVER['DOCUMENT_ROOT'] . "/template/footer.php"); ?></TD>
  </TR>
  </TBODY></TABLE>
</DIV>
<DIV></DIV>
</BODY></HTML>
