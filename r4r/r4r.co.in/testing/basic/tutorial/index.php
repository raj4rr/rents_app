<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">

<HTML><HEAD><TITLE>Testing Basic Tutorials ,Testing Basic Tutorial with Examples</TITLE>

<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META content="Rajesh Kumar" name="author">
<META http-equiv="expires" content="0">
<META content="r4r.co.in" name="owner">
<meta name="description" CONTENT="Testing Basic Tutorials ,Testing Basic Tutorial with Examples" >
<meta name="keywords" CONTENT="Testing Basic Tutorials ,Testing Basic Tutorial with Examples">
<LINK 
href="../../../images/new_css.css" type="text/css" rel="stylesheet">
</HEAD>

<BODY leftMargin=0 topMargin=0>
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>

<DIV id=LeftMNav>

<?php include("../../../images/new_menu.shtml"); ?></DIV>

<TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>

  <TBODY>

  <TR>

    <TD width="120" vAlign=top class=nav>

      <DIV id=LeftMNav align=left>

<?php include("../../../images/new_left_menu.shtml"); ?>

      </DIV>

	  </TD>

    <TD width="673" align=left vAlign=top>

<?php  require_once dirname(__FILE__) . '/../../../config/site_config.php';
 require_once $CONFIG['_PATH'] . "../../../db/sdbconnection.php";

  define('MAX_REC_PER_PAGE', 25);

if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }

$rs = mysql_query("SELECT  COUNT(*)  FROM `sourcecode` WHERE  language='testing Basic' AND hide='NO' ") or die("Count query error!");
    list($total) = mysql_fetch_row($rs);
    $total_pages = ceil($total / MAX_REC_PER_PAGE);
    $page = intval(@$_GET["page"]); 

    if (0 == $page)
        $page = 1; # 1-based

    $start = MAX_REC_PER_PAGE * ($page - 1); 
    $max = MAX_REC_PER_PAGE; 

?>          

 <b><font color="red">Total:-</font><?php echo $total; ?>  &nbsp;&nbsp;&nbsp; <font color="red">Goto Page:</font></b>

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
<a href="/">R4R </a>---><a href="/testing">Testing</a>-->> <a href="#">Testing Basic</a>--><a href="#">Testing Basic Tutorial</a> -->>Testing Basic Tutorial Index

<h2>Testing Basic Tutorials ,Testing Basic Tutorial with Examples</h2>

<?php

    $rs = mysql_query("SELECT  *  FROM `sourcecode` WHERE  language='testing Basic'  ORDER BY  id  ASC LIMIT $start, $max ") or die("State query error!");

?>
    <h3>Page <?= $page ?></h3>

<?php

    while (list($id,$title,$keywords,$descriptions,$introduction,$classdescription,$methoddescription,$sourcecodedescription,$sourcecode,$output,$file,$language,$username,$date,$hide) = mysql_fetch_row($rs)) {

?>
<p></p>
<u><a href="testing_basic_tutorials.php?id=<?= htmlspecialchars($id) ?>&option=testing Basic"><b><?= htmlspecialchars($title) ?>&nbsp;&nbsp;<font color="red">More</font></a> </u>

 <br>
       </b><?= htmlspecialchars($introduction) ?>
</p>   

  <?php
	}

mysql_close($sconnection);

?>
   <b>Go:</b>
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
<a href="/">R4R </a>---><a href="/testing">Testing</a>-->> <a href="#">Testing Basic</a>--><a href="#">Testing Basic Tutorial</a> -->>Testing Basic Tutorial Index

<h2>Testing Basic Tutorials ,Testing Basic Tutorial with Examples</h2>

<hr><?php include("../../../images/postcomment.php"); ?><hr/>
	    <A 

      href="/public-shtml/contactus.shtml"><FONT 

      color="#800000">Contact Us</FONT></A>

	  </TD><TD vAlign="top" align="left" width="120">

	  <?php include("../../../images/new_topicp.shtml"); ?>

	  </TD>

    <TD width="120" align="left" vAlign="top" >

	<?php include("../../../images/project_listp.shtml"); ?>

      </TD>
      </TR>

  <TR>

    <TD vAlign="top"><?php include("../../../images/contact_us.shtml"); ?> </TD>

    <TD align="left" vAlign="top"><?php include("../../../images/comment.php"); ?></TD>

    <TD vAlign="top" align="left"><?php include("../../../images/news.shtml"); ?></TD>

    <TD align="left" vAlign="top" ><?php include($_SERVER['DOCUMENT_ROOT'] . "/template/footer.php"); ?></TD>

  </TR>

  </TBODY>

  </TABLE>

</BODY>
</HTML>
