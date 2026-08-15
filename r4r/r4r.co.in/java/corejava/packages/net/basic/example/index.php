<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">

<?php  require_once dirname(__FILE__) . '/../../../../../../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../../../../../../db/sdbconnection.php"; 
@include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/php/sourcecodeindex.php');

 define('MAX_REC_PER_PAGE', 20);
if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }

 @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/php/title.php');
 $defaultTitle="Net Basic Example,Net Basic Examples,Net Basic examples,example, Examples";
  $defaultPageHeader="Net Basic Example,Net Basic Examples,Net Basic examples,example, Examples";
 $pagetitle="";
 $title=titleForTutorialExampleIndex($defaultTitle);
?>

<HTML><HEAD><TITLE><?=htmlspecialchars($title) ?></TITLE>

<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META content="Rajesh Kumar" name="author">
<META http-equiv="expires" content="0">
<META content="r4r.co.in" name="owner">

<meta name="description" CONTENT="<?=htmlspecialchars($title) ?>" >

<meta name="keywords" CONTENT="<?=htmlspecialchars($title) ?>"><LINK href="../../css/new_css.css" type="text/css" rel="stylesheet">
<script type="text/javascript" src="../../js/directlinks.js"></script>
<link href="/images/logo.gif" type="image/gif" rel="SHORTCUT ICON"> 
</HEAD>

<BODY leftMargin="0" topMargin="0">

<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>

<DIV id="LeftMNav">

<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/new_menu.shtml'); ?></DIV>

<TABLE cellSpacing="0" cellPadding="0" width="100%" border="0">

  <TBODY>

  <TR>

    <TD width="120" vAlign="top" class="nav">

      <DIV id="LeftMNav" align="left">

<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/new_left_menu.shtml'); ?>

      </DIV>

	  </TD>

<?php

   displayContents("net Example",$defaultPageHeader,"net_basic_examples.php"); 
mysql_close($sconnection);
?>

   <TD width="120" id="LeftMNavR" align="left" vAlign="top" dir="ltr" >

	<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/project_list.shtml'); ?>

      </TD></TR>

  <TR>

    <TD vAlign="top"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/contact_us.shtml'); ?> </TD>

    <TD align="left" vAlign="top"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/comment.shtml'); ?></TD>

    <TD vAlign="top" align="left"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/news.shtml'); ?></TD>

    <TD align="left" vAlign="top" ><?php include($_SERVER['DOCUMENT_ROOT'] . "/template/footer.php"); ?></TD>

  </TR>

  </TBODY></TABLE>

</DIV>

<DIV></DIV>

</BODY></HTML>

