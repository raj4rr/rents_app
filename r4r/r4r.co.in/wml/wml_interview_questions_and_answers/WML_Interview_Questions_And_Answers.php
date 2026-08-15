<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<?php  include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/php/interviewQuestionsAndAnswers.php');
  @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/php/title.php');
 $defaultTitle="WML Interview Questions And Answers";
 $pagetitle="";
 $title=title("question",$defaultTitle,$pdo);
?>

<HTML><HEAD><TITLE><?=htmlspecialchars($title) ?></TITLE>

<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META content="Rajesh Kumar" name="author">
<META http-equiv="expires" content="0">
<META content="r4r.co.in" name="owner">

<meta name="description" CONTENT="<?=htmlspecialchars($title) ?>" >

<meta name="keywords" CONTENT="<?=htmlspecialchars($title) ?>">

<link href="/images/logo.gif" type="image/gif" rel="SHORTCUT ICON">
<link href="/css/new/main.css" rel="stylesheet" type="text/css" />
</HEAD>
<BODY>
<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>
<div class="page_wrapper" style=" padding-top:10px;">
  <table cellpadding="3">
    <tr>
      <td style="width:83%;" valign="top"><h1>WML</h1>
        <div class="link_menu"><a href="/">R4R<sup>&reg;</sup></a><img src="/images/left_menu_bullet.gif"/> 
        <a href="/wml/">WML</a><img src="/images/left_menu_bullet.gif"/>
         <a href="/wml/wml_interview_questions_and_answers/">FAQS</a></div>
        <table>
          <tr>
            <td style="width:20%" valign="top"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/leftmenu.shtml'); ?></td>
            <td style="80%">
            <!-- Header End-->

<div class="main_content">

<h2><?php echo $title; ?></h2>

<?php

displayContents1("WML SUB",$pdo);

?>			<h2><?php echo $title; ?></h2>

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
