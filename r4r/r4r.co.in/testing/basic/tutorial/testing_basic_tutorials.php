<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../../../config/site_config.php';
 require_once $CONFIG['_PATH'] . "../../../db/sdbconnection.php";

if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }
$option=$_GET["option"];
$id=$_GET["id"];
    $rs = mysql_query("SELECT  *  FROM `sourcecode` WHERE  id='$id' and language='$option' AND hide='NO'") or die("State query error!");
if(!mysql_numrows($rs)>0){
	die(header("Location:index.php"));
}
else
{
   while(list($id,$title,$keywords,$descriptions,$introduction,$classdescription,$methoddescription,$sourcecodedescription,$sourcecode,$output,$file,$language,$username,$date,$hide) = mysql_fetch_row($rs)) {
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">

<HTML><HEAD><TITLE><?php echo $title; ?></TITLE>

<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META content="Rajesh Kumar" name="author">
<META http-equiv="expires" content="0">
<META content="r4r.co.in" name="owner">
<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<meta name="description" CONTENT="<?php echo $descriptions; ?>" >
<meta name="keywords" CONTENT="<?php echo $keywords; ?>">
<LINK 

href="../../../images/new_css.css" type="text/css" rel="stylesheet">

</HEAD>

<BODY leftMargin=0 topMargin=0>

<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>

<DIV id=LeftMNav>

<?php include("../../../images/new_menu.shtml"); ?></DIV>

<TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>

  <TBODY>

  <TR>

    <TD width="120" vAlign=top class=nav>

      <DIV id=LeftMNav align=left>

<?php include("../../../images/new_left_menu.shtml"); ?>

      </DIV>

	  </TD>

    <TD width="728" align=left vAlign=top>

<table width="728"><tr><td align="left">
<a href="testing_basic_tutorials.php?id=<?php echo $id-1; ?>&option=testing Basic">

<img src="../../../images/previous.gif" border="0" alt="Previous" title="Previous"></a>
</td><td align="center">

<a href="index.php"><img src="../../../images/home.gif" border="0" alt="Home" title="Home"></a></td><td align="right">

<a href="testing_basic_tutorials.php?id=<?php echo $id+1; ?>&option=testing Basic"><img src="../../../images/next.gif" border="0" alt="Next" title="Next"></a>
</td></tr></table>

<br>
<a href="/">R4R </a>---><a href="/testing">Testing</a>-->> <a href="#"> Testing Basic</a>--><a href="#">Testing Basic Tutorial</a> -->>Testing Basic Tutorial Index

<center>
<p><h1><?= htmlspecialchars($title) ?></h1></p></center>
<h1>Introduction:</h1>
<p>
   <div id="contentpre"><?= htmlspecialchars($introduction) ?></div></p><p>
   <h1>Descriptions:</h1>

 <div id="contentpre"><?= htmlspecialchars($classdescription) ?></div></p><p>  
<div id="contentpre"> <?= htmlspecialchars($methoddescription) ?></div></p><p> 
 <div id="contentpre"> <?= htmlspecialchars($sourcecodedescription) ?></div></p><p>  
   <b>SourceCode:</b><br/>
  <table border="2"><tr><td width="728" id="sourcecodedescription">
  <div id="contentpre"> <?= htmlspecialchars($sourcecode) ?></div></p></td></tr></table><br/>
   <b>Output of SourceCode:</b><br/>
   <table border="1" bgcolor="#000000" color="white"><tr><td width="728" id="output">
   <div id="contentpre"><font color="#FFFFFF"> <?= htmlspecialchars($output) ?></font></div></td></tr></table>

<br><br><br>

<table width="728"><tr><td align="left">
<a href="testing_basic_tutorials.php?id=<?php echo $id-1; ?>&option=testing Basic">

<img src="../../../images/previous.gif" border="0" alt="Previous" title="Previous"></a>
</td><td align="center">

<a href="index.php"><img src="../../../images/home.gif" border="0" alt="Home" title="Home"></a></td><td align="right">

<a href="testing_basic_tutorials.php?id=<?php echo $id+1; ?>&option=testing Basic"><img src="../../../images/next.gif" border="0" alt="Next" title="Next"></a>
</td></tr></table>

<br>
<br>
<a href="/">R4R </a>---><a href="/testing">Testing</a>-->> <a href="#">Testing Basic</a>--><a href="#">Testing Basic Tutorial</a> -->>Testing Basic Tutorial Index

<br>
<?php include("../../../images/comment.php"); ?>
	    <A 

      href="/public-shtml/contactus.shtml"><FONT 

      color="#800000">Contact Us</FONT></A>

	  </TD><TD vAlign="top" align="left" width="120">

	  <?php include("../../../images/new_topicp.shtml"); ?>

	  </TD>

    <TD width="120" align="left" vAlign="top" >

	<?php include("../../../images/project_listp.shtml"); ?>

      </TD>
      </TR>

  <TR>

    <TD vAlign="top"><?php include("../../../images/contact_us.shtml"); ?> </TD>

    <TD align="left" vAlign="top"></TD>

    <TD vAlign="top" align="left"><?php include("../../../images/news.shtml"); ?></TD>

    <TD align="left" vAlign="top" ><?php include($_SERVER['DOCUMENT_ROOT'] . "/template/footer.php"); ?></TD>

  </TR>

  </TBODY>

  </TABLE>

</BODY>
</HTML>
<?php
}
mysql_close($sconnection);

}
?>
