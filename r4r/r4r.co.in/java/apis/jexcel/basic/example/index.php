<?php  
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
@include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/php/sourcecodeindex.php');
$title="Jexcel  examples in easy ways";
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
        <td style="width:83%;" valign="top"><h1><?php echo $title; ?></h1>

        <table>
          <tr>
            <td style="width:20%" valign="top"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/leftmenu.shtml'); ?></td>
            <td style="80%" valign="top">
            <!-- Header End-->

<div class="main_content">
<?php

    displayContents("Jexcel Example",$title,"jexcel_basic_examples.php",$pdo); 

    echo '<h2>'.$title.'</h2>';

?> </div>
</td>
          </tr>
        </table></td>
      <td style="width:17%" valign="top"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/rightmenu.shtml');?></td>
    </tr>
  </table>
</div>
<?php include_once($_SERVER["DOCUMENT_ROOT"] . "/template/footer.php"); ?>

</BODY>
</HTML>

