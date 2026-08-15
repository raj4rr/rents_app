<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../../../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../../../db/sdbconnection.php";

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

<!DOCTYPE HTML PUBLIC "-/W3C/DTD HTML 4.01 Transitional/EN" "http:/www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">

<HTML><HEAD><TITLE><?php echo $title; ?></TITLE>

<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META content="Rajesh Kumar" name="author">
<META http-equiv="expires" content="0">
<META content="r4r.co.in" name="owner">
<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META name="description" CONTENT="<?php echo $descriptions; ?>" >
<META name="keywords" CONTENT="<?php echo $keywords; ?>">

<LINK href="/css/new_css.css" type="text/css" rel="stylesheet">
<script type="text/Ajaxscript" src="/js/directlinks.js"></script>
<LINK href="/images/logo.gif" type="image/gif" rel="SHORTCUT ICON">

</HEAD>

<BODY leftMargin=0 topMargin=0>

<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>

<DIV id=LeftMNav>

<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/new_menu.shtml'); ?></DIV>

<TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>

  <TBODY>

  <TR>

    <TD width="120" vAlign=top class=nav>

      <DIV id=LeftMNav align=left>

<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/new_left_menu.shtml'); ?>

      </DIV>

	  </TD>

    <TD width="728" align=left vAlign=top>

<a href="/">R4R </a><img src="/images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN Ajax Tutorials"><a href="/ajax">Ajax</a><img src="/images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN Ajax Tutorials"> <a href="#">Core Ajax Basic</a><img src="/images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN Ajax Tutorials"><a href="#">Core Ajax Basic Tutorial</a> <img src="/images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN Ajax Tutorials"><a href="#">Ajax Basic Tutorial Index</a>

<center><p><h1><?= htmlspecialchars($title) ?></h1></p></center>
<h1>Introduction:</h1>
<p>
   <div id="contentpre"><?= htmlspecialchars($introduction) ?></div></p>

<table width="728"><tr><td align="left">
<a href="ajax_basic_tutorials.php?id=<?php echo $id-1; ?>&option=Ajax Basic">

<img src="/images/previous.gif" border="0" alt="Previous" title="Previous"></a>
</td><td align="center">

<a href="index.php"><img src="/images/home.gif" border="0" alt="Home" title="Home"></a></td><td align="right">

<a href="ajax_basic_tutorials.php?id=<?php echo $id+1; ?>&option=Ajax Basic"><img src="/images/next.gif" border="0" alt="Next" title="Next"></a>
</td></tr></table>

 <div id="contentpre"><?= htmlspecialchars($classdescription) ?></div></p><p>  
<br>

   <h1>Descriptions:</h1>

<div id="contentpre"> <?= htmlspecialchars($methoddescription) ?></div></p><p> 
 <div id="contentpre"> <?= htmlspecialchars($sourcecodedescription) ?></div></p><p>  
<?php if(trim($sourcecode," ")!="") { ?>
   <b>SourceCode:</b><br/>
  <table border="2"><tr><td width="728" id="sourcecodedescription">
  <div id="contentpre"> <?= htmlspecialchars($sourcecode) ?></div></p></td></tr></table><br/>
<?php } 

?>
<?php if(trim($output," ")!="") { ?>
   <b>Output of SourceCode:</b><br/>
   <table border="1" bgcolor="#000000" color="white"><tr><td width="728" id="output">
   <div id="contentpre"><font color="#FFFFFF"> <?= htmlspecialchars($output) ?></font></div></td></tr></table>
<br><br><br>
   <?php } ?>

<table width="728"><tr><td align="left">
<a href="ajax_basic_tutorials.php?id=<?php echo $id-1; ?>&option=Ajax Basic">

<img src="/images/previous.gif" border="0" alt="Previous" title="Previous"></a>
</td><td align="center">

<a href="index.php"><img src="/images/home.gif" border="0" alt="Home" title="Home"></a></td><td align="right">

<a href="ajax_basic_tutorials.php?id=<?php echo $id+1; ?>&option=Ajax Basic"><img src="/images/next.gif" border="0" alt="Next" title="Next"></a>
</td></tr></table>

<br>
<center><p><h1><?= htmlspecialchars($title) ?></h1></p></center>

<a href="/">R4R </a><img src="/images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN Ajax Tutorials"><a href="/ajax">Ajax</a><img src="/images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN Ajax Tutorials"> <a href="#">Core Ajax Basic</a><img src="/images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN Ajax Tutorials"><a href="#">Core Ajax Basic Tutorial</a> <img src="/images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN Ajax Tutorials"><a href="#">Ajax Basic Tutorial Index</a>

<hr />

<?php include("../../../php/postcomment.php"); ?>
<hr />	 
   <A 

      href="/public-shtml/contactus.shtml"><FONT 

      color="#800000">Contact Us</FONT></A>

	  </TD><TD vAlign="top" align="left" width="120">

	  <?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/new_topicp.shtml'); ?>

	  </TD>

    <TD width="120" align="left" vAlign="top" >

	<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/project_list.shtml'); ?>

      </TD>
      </TR>

  <TR>

    <TD vAlign="top"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/contact_us.shtml'); ?> </TD>

      <TD align="left" vAlign="top"><?php include("../../../php/comment.php"); ?></TD>

    <TD vAlign="top" align="left"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/news.shtml'); ?></TD>

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
