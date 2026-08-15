<!DOCTYPE HTML PUBLIC "-/W3C/DTD HTML 4.01 Transitional/EN" "http:/www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">

<HTML><HEAD><TITLE>WCF Basic Tutorials,WCF Basic Tutorials with Examples</TITLE>

<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META content="Rajesh Kumar" name="author">
<META http-equiv="expires" content="0">
<META content="r4r.co.in" name="owner">
<meta name="description" CONTENT="WCF Basic Tutorials,WCF Basic Tutorials with Examples" >
<meta name="keywords" CONTENT="WCF Basic Tutorials,WCF Basic Tutorials with Examples">
<LINK href="../../css/new_css.css" type="text/css" rel="stylesheet">
<script type="text/javascript" src="/js/main.js"></script>
		<link rel="stylesheet" type="text/css" href="/css/style.css" />
	    <link href="/images/logo.gif" type="image/gif" rel="SHORTCUT ICON"> 
</HEAD>

<BODY leftMargin="0" topMargin="0">

		<table class="wrap" align="center"  cellpadding="0" cellspacing="0">
			<tr>
				<td class="m" align="left" valign="top">
					<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>
				</td>
						</tr>
						<tr class="headerTR1">
							<td>
							<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>
							</td>
						</tr>
						<tr>
							<td class="headerTR2">
								<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>
							</td>
						</tr>

						<tr>
							<td class="headerTR3">
								<?php include("/common-files/menu.shtml"); ?>
							</td>
							</td>

						</tr>
						<tr>
							<td>
								<?php include("/common-files/gaps.shtml"); ?>
							</td>
						</tr>

						<tr>

			               <td class="content">
								<table>
									<tr>

								  <?php include("/common-files/tdgaps.shtml"); ?>
								<td class="td1"   valign="top" >
							    <DIV style="margin-left:15px;">

			<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse"  width="100%">
  <tr>
    <td width="100%">

<a href="/">R4R </a><img src="/images/left_menu_bullet.gif" border="0" alt="Right Arrow" title="R4R CO IN WCF Example"><a href="/WCF">WCF</a><img src="/images/left_menu_bullet.gif" border="0" alt="Right Arrow" title="R4R CO IN WCF Example"> <a href="/WCF/02/tutorial/">WCF Tutorial</a>
</tr>
</table>
<center><p><font face="Verdana" color="#0066FF"><h3>WCF Basic Tutorials,WCF Basic Tutorials with Examples</h3></font></p></center>

<?php  require_once dirname(__FILE__) . '/../../../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../../../db/sdbconnection.php";

  define('MAX_REC_PER_PAGE', 25);

if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }

$rs = mysql_query("SELECT  COUNT(*)  FROM `sourcecode` WHERE  language='WCF  basic' AND hide='NO' ") or die("Count query error!");
    list($total) = mysql_fetch_row($rs);
    $total_pages = ceil($total / MAX_REC_PER_PAGE);
    $page = intval(@$_GET["page"]); 

    if (0 == $page)
        $page = 1; # 1-based

    $start = MAX_REC_PER_PAGE * ($page - 1); 
    $max = MAX_REC_PER_PAGE; 

?>          
   <?php include("/common-files/ads2.shtml"); ?>
 <img src="/images/total.gif" border="0" alt="Total" title="R4R CO IN WCF Example"><?php echo $total; ?>  <img src="/images/GoTo.gif" border="0" alt="GoTO Page" title="R4R CO IN WCF Example">

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

    $rs = mysql_query("SELECT  *  FROM `sourcecode` WHERE  language='WCF  basic'  ORDER BY  id  ASC LIMIT $start, $max ") or die("State query error!");

?>
    <h3><img src="/images/page.jpg" border="0" alt="Page" title="R4R CO IN WCF Example"><?= $page ?></h3>

<?php

    while (list($id,$title,$keywords,$descriptions,$introduction,$classdescription,$methoddescription,$sourcecodedescription,$sourcecode,$output,$file,$language,$username,$date,$hide) = mysql_fetch_row($rs)) {

?>
<p></p>
<u><a href="WCF_basic_tutorials.php?qid=<?= htmlspecialchars($id) ?>&option=WCF  basic"><b><?= htmlspecialchars($title) ?></a> </u>

 <br>
       </b><?= ($introduction) ?>
</p>   

  <?php
	}

mysql_close($sconnection);

?>
<br> <br>  <img src="/images/GoTo.gif" border="0" alt="Page" title="R4R CO IN WCF Example">
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
<br><?php include("/common-files/ads2.shtml"); ?>

<br>

<center><p><font face="Verdana" color="#0066FF"><h3>WCF Basic Tutorials,WCF Basic Tutorials with Examples</h3></font></p></center>

<a href="/">R4R </a><img src="/images/left_menu_bullet.gif" border="0" alt="Right Arrow" title="R4R CO IN WCF Example"><a href="/WCF">WCF</a><img src="/images/left_menu_bullet.gif" border="0" alt="Right Arrow" title="R4R CO IN WCF Example"> <a href="/WCF/02/tutorial/">WCF Tutorial</a>

</TD>

   <td class="td2"  valign="top">

											<table>
											<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/news1.shtml'); ?>	
												<tr>
													<td class="colorChange">
													<?php include("/common-files/ads3.shtml"); ?>	

													</td>
												</tr>

												<?php include("/common-files/adsnewsgaps.shtml"); ?>												

												<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/news2.shtml'); ?>	

												<tr>
													<td class="colorChange">
													<?php include("/common-files/ads4.shtml"); ?>	

													</td>
												</tr>
												<?php include("/common-files/adsnewsgaps.shtml"); ?>	

												<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/news3.shtml'); ?>	

												<tr>
													<td class="colorChange">
													<?php include("/common-files/ads5.shtml"); ?>	

													</td>
												</tr>
												<?php include("/common-files/adsnewsgaps.shtml"); ?>

												<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/news4.shtml'); ?>	

		</table>

										</td>
										<?php include("/common-files/tdgaps.shtml"); ?>
									</tr>
								 </table>
							</td>
						</tr>
						<tr>
							<td>
								<?php include("/common-files/gaps.shtml"); ?>
							</td>
						</tr>		
						<tr>
							<td>
								<?php include("/common-files/row.shtml"); ?>
							</td>
						</tr>

						<tr>
							<td>
								<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/mainlinks.shtml'); ?>

							</td>
						</tr>
						<tr>
							<td>
								<?php include("/common-files/gaps.shtml"); ?>
							</td>
						</tr>

								<tr>
							<td>
								<?php include("/common-files/row.shtml"); ?>
							</td>
						</tr>

						<tr >
							<td>
								<?php include("/common-files/hotlinks.shtml"); ?>
							</td>
						</tr>
						<tr>
							<td>
								<?php include("/common-files/gaps.shtml"); ?>
							</td>
						</tr>

						<tr>
							<td>
								<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/footer.php"); ?>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>

	</BODY>
</HTML>
