<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../../../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../../../db/sdbconnection.php";

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

<LINK href="../../css/new_css.css" type="text/css" rel="stylesheet">
<script type="text/javascript" src="../../js/directlinks.js"></script>
<link href="/images/logo.gif" type="image/gif" rel="SHORTCUT ICON">
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

<?php @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/php/sourcecode.php'); 
 displayContents($id,$title,$keywords,$descriptions,$introduction,$classdescription,$methoddescription,$sourcecodedescription,$sourcecode,$output,$file,$language,$username,$date);

?>
    <TD width="120" id=LeftMNavR align="left" vAlign="top" >

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
