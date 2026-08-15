<!DOCTYPE HTML PUBLIC "-/W3C/DTD HTML 4.01 Transitional/EN" "http:/www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">

<?php  require_once dirname(__FILE__) . '/../../../../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../../../../db/dbconnection.php"; 
  @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/php/interviewQuestionsAndAnswers.php');

 define('MAX_REC_PER_PAGE', 20);
if (!$connection)
  {
  die('Could not connect: ' . mysql_error());
  }

 @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/php/title.php');
 $defaultTitle="Itext Objective Questions And Answers";
 $pagetitle="";
 $title=title("question",$defaultTitle);
?>

<HTML><HEAD><TITLE><?=htmlspecialchars($title) ?></TITLE>

<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META content="Rajesh Kumar" name="author">
<META http-equiv="expires" content="0">
<META content="r4r.co.in" name="owner">

<meta name="description" CONTENT="<?=htmlspecialchars($title) ?>" >

<meta name="keywords" CONTENT="<?=htmlspecialchars($title) ?>">

<link href="http:/r4r.co.in/images/logo.gif" type="image/gif" rel="SHORTCUT ICON">
<link href="/css/main.css" rel="stylesheet" type="text/css" />
</HEAD>
<BODY>
<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>
<div class="page_wrapper" style=" padding-top:10px;">
  <table cellpadding="3">
    <tr>
      <td style="width:83%;" valign="top"><h1>iTeaxt</h1>
       <div class="link_menu"><a href="/">R4R<sup>&reg;</sup></a><img src="/images/left_menu_bullet.gif"/> 
             <a href="/java/">Java</a><img src="/images/left_menu_bullet.gif"/> <a href="/java/apis/iText/">iText</a>
              <img src="/images/left_menu_bullet.gif"/> <a href="/java/apis/iText/itext_Interview_Questions_And_Answers/">FAQS</a></div>
        <table>
          <tr>
            <td style="width:20%" valign="top"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/leftmenu.shtml'); ?></td>
            <td style="80%" valign="top">
            <!-- Footer Start-->		

<div class="main_content">
              <div class="heading">Itext Objective Questions And Answers</div>

<?php

displayContents1("itext OBJ");
mysql_close($connection);
?>

									              <!--Footer  --></td>
          </tr>
        </table></td>
      <td style="width:17%" valign="top"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/rightmenu.shtml');?></td>
    </tr>
  </table>
</div>
<?php include_once($_SERVER["DOCUMENT_ROOT"] . "/template/footer.php"); ?>

</BODY>
</HTML>
