<!DOCTYPE HTML PUBLIC "-/W3C/DTD HTML 4.01 Transitional/EN" "http:/www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">

<HTML><HEAD><TITLE>Ajax Basic Tutorials,Ajax Basic Tutorials with Examples</TITLE>

<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META content="Rajesh Kumar" name="author">
<META http-equiv="expires" content="0">
<META content="r4r.co.in" name="owner">
<META name="description" CONTENT="Ajax Basic Tutorials,Ajax Basic Tutorials with Examples" >
<META name="keywords" CONTENT="Ajax Basic Tutorials,Ajax Basic Tutorials with Examples">

<LINK href="/css/new_css.css" type="text/css" rel="stylesheet">
<script type="text/Ajaxscript" src="/js/directlinks.js"></script>
<LINK href="/images/logo.gif" type="image/gif" rel="SHORTCUT ICON">

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

<a href="/">R4R </a><img src="/images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN Ajax Tutorials"><a href="/ajax">Ajax</a><img src="/images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN Ajax Tutorials"> <a href="#">Core Ajax Basic</a><img src="/images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN Ajax Tutorials"><a href="#">Core Ajax Basic Tutorial</a> <img src="/images/rightarrow.gif" border="0" alt="Right Arrow" title="R4R CO IN Ajax Tutorials"><a href="#">Ajax Basic Tutorial Index</a>
<h2>Ajax Basic Tutorials,Ajax Basic Tutorials with Examples</h2>

<?php  require_once dirname(__FILE__) . '/../../../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../../../db/sdbconnection.php";

  define('MAX_REC_PER_PAGE', 25);

if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }

$rs = mysql_query("SELECT  COUNT(*)  FROM `sourcecode` WHERE  language='Ajax Basic' AND hide='NO' ") or die("Count query error!");
    list($total) = mysql_fetch_row($rs);
    $total_pages = ceil($total / MAX_REC_PER_PAGE);
    $page = intval(@$_GET["page"]); 

    if (0 == $page)
        $page = 1; # 1-based

    $start = MAX_REC_PER_PAGE * ($page - 1); 
    $max = MAX_REC_PER_PAGE; 

?>          

 <img src="/images/total.gif" border="0" alt="Total" title="R4R CO IN Ajax Tutorials"><?php echo $total; ?>  <img src="/images/GoTo.gif" border="0" alt="GoTO Page" title="R4R CO IN Ajax Tutorials">

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

    $rs = mysql_query("SELECT  *  FROM `sourcecode` WHERE  language='Ajax Basic'  ORDER BY  id  ASC LIMIT $start, $max ") or die("State query error!");

?>
    <h3><img src="/images/page.jpg" border="0" alt="Page" title="R4R CO IN Ajax Tutorials"><?= $page ?></h3>

<?php

    while (list($id,$title,$keywords,$descriptions,$introduction,$classdescription,$methoddescription,$sourcecodedescription,$sourcecode,$output,$file,$language,