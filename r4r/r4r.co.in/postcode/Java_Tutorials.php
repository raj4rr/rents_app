<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/sdbconnection.php";
  define('MAX_REC_PER_PAGE', 20);
if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }
$option=$_GET["option"];
$id=$_GET["id"];
    $rs = mysql_query("SELECT  *  FROM `sourcecode` WHERE  id='$id' and language='$option'") or die("State query error!");
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

href="../images/new_css.css" type=text/css 

rel=stylesheet>

<STYLE>#LeftMNav UL A {

	HEIGHT: 1em

}

#LeftMNav LI {

	CLEAR: both; FLOAT: left; WIDTH: 100%

}

.style3 {

	COLOR: #11449e

}

.style5 {

	FONT-WEIGHT: bold; COLOR: #000066

}

.style6 {

	FONT-WEIGHT: bold; COLOR: #ff0000

}

.style4 {

	COLOR: #ff0000

}

</STYLE>

</HEAD>

<BODY leftMargin=0 topMargin=0>

<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>

<DIV id=LeftMNav>

<?php include("../images/new_menu.shtml"); ?></DIV>

<TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>

  <TBODY>

  <TR>

    <TD width="120" vAlign=top class=nav>

      <DIV id=LeftMNav align=left>

<?php include("../images/new_left_menu.shtml"); ?>

      </DIV>

	  </TD>

    <TD width="728" align=left vAlign=top>

<table><tr><td width="242">
<a href="Java_Tutorials.php?id=<?php echo $id-1; ?>&option=test">Back</a></td><td width="242"  align="center">

<a href="index.php">Home</a></td><td width="242" align="right">
<a href="Java_Tutorials.php?id=<?php echo $id+1; ?>&option=test">Next</a></td></tr></table>
<p><font color="#FF0000">R4R --->Test-->Test Tutorial -->Test Index</font></p>

<center>
<p><b><?= htmlspecialchars($title) ?></b></p></center>
<p>

         <?= htmlspecialchars($descriptions) ?>   </p><p>          
 <?= htmlspecialchars($introduction) ?></p><p>  
 <?= htmlspecialchars($classdescription) ?></p><p>  
  <?= htmlspecialchars($methoddescription) ?></p><p>  
   <b>SourceCode:</b><br/>
  <table border="2"><tr><td>
   <?= htmlspecialchars($sourcecodedescription) ?></p></td></tr></table><br/>
   <b>Output of SourceCode:</b><br/>
   <table border="1" bgcolor="#000000" color="white"><tr><td>
   <font color="#FFFFFF"> <?= htmlspecialchars($output) ?></font></td></tr></table>

<br><br><br>

   <table><tr><td width="242">
<a href="Java_Tutorials.php?id=<?php echo $id-1; ?>&option=test">Back</a></td><td width="242"  align="center">

<a href="index.php">Home</a></td><td width="242" align="right">
<a href="Java_Tutorials.php?id=<?php echo $id+1; ?>&option=test">Next</a></td></tr></table>
<br>
<p><font color="#FF0000">R4R --->Test-->Test Tutorial -->Test Index</font></p>

<br>
	    <A 

      href="/public-shtml/contactus.shtml"><FONT 

      color="#800000">Contact Us</FONT></A>

	  </TD><TD vAlign="top" align="left" width="120">

	  <?php include("../images/new_topicp.shtml"); ?>

	  </TD>

    <TD width="120" align="left" vAlign="top" >

	<?php include("../images/project_listp.shtml"); ?>

      </TD>
      </TR>

  <TR>

    <TD vAlign="top"><?php include("../images/contact_us.shtml"); ?> </TD>

    <TD align="left" vAlign="top"><?php include("../images/comment.php"); ?></TD>

    <TD vAlign="top" align="left"><?php include("../images/news.shtml"); ?></TD>

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
