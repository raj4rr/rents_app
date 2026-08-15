<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../../../../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../../../../db/sdbconnection.php";

if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }
$option=$_GET["option"];
$id=$_GET["qid"];
    $rs = mysql_query("SELECT  *  FROM `sourcecode` WHERE  id='$id' AND hide='NO'") or die("State query error!");
if(!mysql_numrows($rs)>0){
	//die(header("Location:index.php"));
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

<link href="/images/logo.gif" type="image/gif" rel="SHORTCUT ICON">
<link href="/css/main.css" rel="stylesheet" type="text/css" />
</HEAD>
<BODY>
<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>
<div class="page_wrapper" style=" padding-top:10px;">
  <table cellpadding="3">
    <tr>
           <td style="width:83%;" valign="top"><h1>JMS</h1>
        <div class="link_menu"><a href="/">R4R<sup>&reg;</sup></a><img src="/images/left_menu_bullet.gif"/> 
        <a href="/java/">Java</a><img src="/images/left_menu_bullet.gif"/>
         <a href="/java/jms/">JMS</a></div>

        <table>
          <tr>
            <td style="width:20%" valign="top"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/leftmenu.shtml'); ?></td>
            <td style="80%" valign="top">
            <!-- Header End-->

<div class="main_content">

<?php @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/php/sourcecode.php'); 
 displayContents($id,$title,$keywords,$descriptions,$introduction,$classdescription,$methoddescription,$sourcecodedescription,$sourcecode,$output,$file,$language,$username,$date);

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

<?php
}
mysql_close($sconnection);
}
?>
