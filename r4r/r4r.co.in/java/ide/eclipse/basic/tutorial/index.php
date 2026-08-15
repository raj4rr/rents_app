<!DOCTYPE HTML PUBLIC "-/W3C/DTD HTML 4.01 Transitional/EN" "http:/www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">

<HTML><HEAD><TITLE>IVR Basic Tutorials,IVR Basic Tutorials with Examples</TITLE>

<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META content="Rajesh Kumar" name="author">
<META http-equiv="expires" content="0">
<META content="r4r.co.in" name="owner">
<meta name="description" CONTENT="IVR Basic Tutorials,IVR Basic Tutorials with Examples" >
<meta name="keywords" CONTENT="IVR Basic Tutorials,IVR Basic Tutorials with Examples">
<LINK 
href="../../../css/new_css.css" type="text/css" rel="stylesheet">
</HEAD>

<BODY leftMargin=0 topMargin=0>
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>

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

    <TD width="673" align=left vAlign=top>

<a href="/">R4R </a><img src="../../../images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN IVR Tutorials"><a href="/java/ivr">IVR</a><img src="../../../images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN IVR Tutorials"> <a href="#">Core IVR Basic</a><img src="../../../images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN IVR Tutorials"><a href="#">Core IVR Basic Tutorial</a> <img src="../../../images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN IVR Tutorials"><a href="#">IVR Basic Tutorial Index</a>
<h2>IVR Basic Tutorials,IVR Basic Tutorials with Examples</h2>

<?php  require_once dirname(__FILE__) . '/../../../../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../../../../db/sdbconnection.php";

  define('MAX_REC_PER_PAGE', 25);

if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }

$rs = mysql_query("SELECT  COUNT(*)  FROM `sourcecode` WHERE  language='IVR Basic' AND hide='NO' ") or die("Count query error!");
    list($total) = mysql_fetch_row($rs);
    $total_pages = ceil($total / MAX_REC_PER_PAGE);
    $page = intval(@$_GET["page"]); 

    if (0 == $page)
        $page = 1; # 1-based

    $start = MAX_REC_PER_PAGE * ($page - 1); 
    $max = MAX_REC_PER_PAGE; 

?>          

 <img src="../../../images/total.gif" border="0" alt="Total" title="R4R CO IN IVR Tutorials"><?php echo $total; ?>  <img src="../../../images/GoTo.gif" border="0" alt="GoTO Page" title="R4R CO IN IVR Tutorials">

<?php
    for ($i = 1; $i <= $total_pages; $i++) {
        $txt = $i;
        if ($page != $i) 
            $txt = "<a href=\"" ."index.php". "?page=$i\">$txt</a>";
?>

    <?= $txt ?>
<?php
    }
?>

<?php

    $rs = mysql_query("SELECT  *  FROM `sourcecode` WHERE  language='IVR Basic'  ORDER BY  id  ASC LIMIT $start, $max ") or die("State query error!");

?>
    <h3><img src="../../../images/page.jpg" border="0" alt="Page" title="R4R CO IN IVR Tutorials"><?= $page ?></h3>

<?php

    while (list($id,$title,$keywords,$descriptions,$introduction,$classdescription,$methoddescription,$sourcecodedescription,$sourcecode,$output,$file,$language,$username,$date,$hide) = mysql_fetch_row($rs)) {

?>
<p></p>
<u><a href="ivr_basic_tutorials.php?id=<?= htmlspecialchars($id) ?>&option=IVR Basic"><b><?= htmlspecialchars($title) ?></a> </u>

 <br>
       </b><?= htmlspecialchars($introduction) ?>
</p>   

  <?php
	}

mysql_close($sconnection);

?>
<br> <br>  <img src="../../../images/GoTo.gif" border="0" alt="Page" title="R4R CO IN IVR Tutorials">
<?php
    for ($i = 1; $i <= $total_pages; $i++) {
        $txt = $i;
        if ($page != $i) 
            $txt = "<a href=\"" ."index.php". "?page=$i\">$txt</a>";
?>

    <?= $txt ?>
<?php
    }
?>
<br>

<br>

<h2>IVR Basic Tutorials,IVR Basic Tutorials with Examples</h2>

<a href="/">R4R </a><img src="../../../images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN  IVR Tutorials"><a href="/java/ivr">IVR</a><img src="../../../images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN IVR Tutorials"> <a href="#">Core IVR Basic</a><img src="../../../images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN IVR Tutorials"><a href="#">Core IVR Basic Tutorial</a> <img src="../../../images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN IVR Tutorials"><a href="#">IVR Basic Tutorial Index</a>

<hr><?php include("../../../php/postcomment.php"); ?><hr/>
	    <A 

      href="http:/r4r.co.in/public-shtml/contactus.shtml"><FONT 

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
