<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../../../../../config/site_config.php';
 require_once $CONFIG['_PATH'] . "../../../../../db/sdbconnection.php";

if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }

$nextID;
$prevID;

$option=$_GET["option"];
$currentpageID=$_GET["qid"];

$rsprev = mysql_query("SELECT id FROM `sourcecode` WHERE  id<'$currentpageID' and language='itext basic' AND hide='NO' ORDER BY id DESC limit 1") or die("Pgination1::-State query error!". mysql_error());
if(!mysql_numrows($rsprev)>0)
    {
    	$prevID=$currentpageID;
   	}
   	else {
   		 	while(list($id) = mysql_fetch_row($rsprev)) {
    		$prevID=$id;
 }    	
	}
$rsnext = mysql_query("SELECT  id  FROM `sourcecode` WHERE  id>'$currentpageID' and language='itext basic' AND hide='NO' ORDER BY id asc limit 1 ") or die("Pgination2::-State query error!");
if(!mysql_numrows($rsnext)>0)
     {
     	$nextID=$currentpageID;
    	}
    	else{

     	while(list($id) = mysql_fetch_row($rsnext)) {
    		$nextID=$id;
	}
  	 }

    $rs = mysql_query("SELECT  *  FROM `sourcecode` WHERE  id='$currentpageID' and language='itext basic' AND hide='NO'") or die("State query error!");

	if(!mysql_numrows($rs)>0){
mysql_close($sconnection);die(header("Location:index.php"));
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
<meta name="description" CONTENT="<?php echo $descriptions; ?>" >
<meta name="keywords" CONTENT="<?php echo $keywords; ?>">
<LINK href="../../css/new_css.css" type="text/css" rel="stylesheet">
<script type="text/javascript" src="/js/main.js"></script>
		<link rel="stylesheet" type="text/css" href="/css/style.css" />
	    <link href="/images/logo.gif" type="image/gif" rel="SHORTCUT ICON"> 
</HEAD>

<BODY leftMargin="0" topMargin="0">

		<table class="wrap" align="center"  cellpadding="0" cellspacing="0">
			<tr>
				<td class="m" align="left" valign="top">
					<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>
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
							    <?php include("/common-files/ads1.shtml"); ?>
			<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse"  width="100%">
  <tr>
    <td width="100%">
<a href="/">R4R </a><img src="/images/left_menu_bullet.gif" border="0" alt="Right Arrow" title="R4R CO IN itext Example"><a href="/java">Java</a><img src="/images/left_menu_bullet.gif" border="0" alt="Right Arrow" title="R4R CO IN itext Example"> <a href="/java/apis/itext/basic/tutorial/">iText Tutorial</a>
 </tr>
</table>
<table width="728"><tr><td align="left">
<a href="itext_basic_tutorials.php?qid=<?php echo $prevID; ?>">

<img src="/images/previous.gif" border="0" alt="Previous" title="Previous"></a>
</td><td align="center">

<a href="index.php"><img src="/images/home.gif" border="0" alt="Home" title="Home"></a></td><td align="right">

<a href="itext_basic_tutorials.php?qid=<?php echo $nextID; ?>"><img src="/images/next.gif" border="0" alt="Next" title="Next"></a>
</td></tr></table><font face="Verdana">
<center><p><font face="Verdana" color="#0066FF"><h3><?= htmlspecialchars($title) ?></h3></font></p></center>

<br><b><font face="Verdana" color="#0066FF" size="3">Introduction:</font></b><br>
<p>
   <pre><?= ($introduction) ?></pre></p>
 <pre><?= ($classdescription) ?></pre></p><p> 
 <?php include("/common-files/ads6.shtml"); ?>
   <br><b><font face="Verdana" color="#0066FF" size="3">Descriptions:</font></b><br>

<pre> <?= ($methoddescription) ?></pre></p><p> 
 <pre> <?= ($sourcecodedescription) ?></pre></p><p>  
<?php if(trim($sourcecode," ")!="") { ?>
   <br><b><font face="Verdana" color="#0066FF" size="3">SourceCode:</font></b><br>
  <table border="2"><tr><td width="728" id="sourcecodedescription">
  <pre> <?= ($sourcecode) ?></pre></p></td></tr></table><br/>
<?php } 

?><br> <?php include("/common-files/ads6.shtml"); ?>
<?php if(trim($output," ")!="") { ?>
   <br><b><font face="Verdana" color="#0066FF" size="3">Output of SourceCode:</font></b><br>
   <table border="1" bgcolor="#000000" color="white"><tr><td width="728" id="output">
   <pre><font color="#FFFFFF"> <?= ($output) ?></font></pre></td></tr></table>
<br>
   <?php } ?>

<center><p><font face="Verdana" color="#0066FF"><h3><?= htmlspecialchars($title) ?></h2></font></p></center><?php
}
mysql_close($sconnection);

}
?></font>
<table width="728"><tr><td align="left">
<a href="itext_basic_tutorials.php?qid=<?php echo $prevID; ?>">

<img src="/images/previous.gif" border="0" alt="Previous" title="Previous"></a>
</td><td align="center">

<a href="index.php"><img src="/images/home.gif" border="0" alt="Home" title="Home"></a></td><td align="right">

<a href="itext_basic_tutorials.php?qid=<?php echo $nextID; ?>"><img src="/images/next.gif" border="0" alt="Next" title="Next"></a>
</td></tr></table>

<a href="/">R4R </a><img src="/images/left_menu_bullet.gif" border="0" alt="Right Arrow" title="R4R CO IN itext Example"><a href="/java">Java</a><img src="/images/left_menu_bullet.gif" border="0" alt="Right Arrow" title="R4R CO IN itext Example"> <a href="/java/apis/itext/basic/tutorial/">iText Tutorial</a> 

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

