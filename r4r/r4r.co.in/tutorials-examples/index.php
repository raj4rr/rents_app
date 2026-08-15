<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

/*

 * To change this template, choose Tools | Templates

 * and open the template in the editor.

 */

require_once dirname(__FILE__) . '/../config/site_config.php';

 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$rec_limit = 10;

$sql = "SELECT count(id) FROM `newupdates` ";
$retval = mysql_query( $sql, $connection );
if(! $retval )
{
  die('Could not get data: ' . mysql_error());
}
$row = mysql_fetch_array($retval, MYSQL_NUM );
$rec_count = $row[0];

if( isset($_GET{'page'} ) )
{
   $page = $_GET{'page'} + 1;
   $offset = $rec_limit * $page ;
}
else
{
   $page = 0;
   $offset = 0;
}
$left_rec = $rec_count - ($page * $rec_limit);

$resulttitle = mysql_query("SELECT * FROM `newupdates` where  status='TU' LIMIT $offset, $rec_limit");
$title1='';
if(!isset($_GET{'page'} ))
$title1='R4R tutorials examples:-tutorials with examples';
while (list($id, $titles) = mysql_fetch_row($resulttitle)){

 $title1=$title1." ".htmlspecialchars($titles); 
}
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<HTML>
	<HEAD>

		<TITLE><?php echo  $title1 ?></TITLE>

		<META content="Rajesh Kumar" name="author">
		<META http-equiv="expires" content="0">
		<META content="r4r.co.in" name="owner">
		<META http-equiv=content-type content="text/html; charset=iso-8859-1">
		<META http-equiv="Content-Language" content="en-us">

		<script type="text/javascript" src="/js/main.js"></script>
		<link rel="stylesheet" type="text/css" href="/css/style.css" />
	    <link href="/images/logo.gif" type="image/gif" rel="SHORTCUT ICON">

	</HEAD>
	<BODY>
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
								<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/menu.shtml'); ?>
							</td>
							</td>

						</tr>
						<tr>
							<td>
								<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/gaps.shtml'); ?>
							</td>
						</tr>

						<tr>

			               <td class="content">
								<table>
								<tr>

								  <?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/tdgaps.shtml'); ?>
								<td class="td1"   valign="top" >
							    <?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/ads1.shtml'); ?>
							    <DIV style="margin-left:15px;">

<?php

if( $page > 0 )
{
   $last = $page - 2;
   echo "<a href=\"$_PHP_SELF?page=$last\">Last 10 Records</a> |";
   echo "<a href=\"$_PHP_SELF?page=$page\">Next 10 Records</a>";
}
else if( $page == 0 )
{
   echo "<a href=\"$_PHP_SELF?page=$page\">Next 10 Records</a>";
}
else if( $left_rec < $rec_limit )
{
   $last = $page - 2;
   echo "<a href=\"$_PHP_SELF?page=$last\">Last 10 Records</a>";
}
$result = mysql_query("SELECT * FROM `newupdates` where status='TU' order by id desc LIMIT $offset, $rec_limit");

while (list($id, $title,$updates,$url,$name,$cdate) = mysql_fetch_row($result)){

?>

<p>

<?php echo $id ?>:<a href="<?php echo $url ?>"><b><?php echo  htmlspecialchars($title);  ?></b></a><br/>

<?php echo  $updates  ?><br/>

<font size='2'>Posted By: <?php echo  htmlspecialchars($name);  ?> &nbsp;&nbsp;&nbsp;

Posted Date:<?php echo  htmlspecialchars($cdate);  ?>

</font>

</p>

<?php

}

if( $page > 0 )
{
   $last = $page - 2;
   echo "<a href=\"$_PHP_SELF?page=$last\">Last 10 Records</a> |";
   echo "<a href=\"$_PHP_SELF?page=$page\">Next 10 Records</a>";
}
else if( $page == 0 )
{
   echo "<a href=\"$_PHP_SELF?page=$page\">Next 10 Records</a>";
}
else if( $left_rec < $rec_limit )
{
   $last = $page - 2;
   echo "<a href=\"$_PHP_SELF?page=$last\">Last 10 Records</a>";
}

mysql_close($connection); 

?>

													 <?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/ads1.shtml'); ?>
													</div>
										</td>
										</td>

								<!-- Footer Start-->	

									</td>

										<td class="td2"  valign="top">

											<table>
											<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/news1.shtml'); ?>	
												<tr>
													<td class="colorChange">
													<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/ads3.shtml'); ?>	

													</td>
												</tr>

												<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/adsnewsgaps.shtml'); ?>												

												<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/news2.shtml'); ?>	

												<tr>
													<td class="colorChange">
													<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/ads4.shtml'); ?>	

													</td>
												</tr>
												<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/adsnewsgaps.shtml'); ?>	

												<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/news3.shtml'); ?>	

												<tr>
													<td class="colorChange">
													<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/ads5.shtml'); ?>	

													</td>
												</tr>
												<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/adsnewsgaps.shtml'); ?>

												<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/news4.shtml'); ?>	

		</table>

										</td>

									</tr>
								 </table>
							</td>
						</tr>
						<tr>
							<td>
								<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/gaps.shtml'); ?>
							</td>
						</tr>		
						<tr>
							<td>
								<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/row.shtml'); ?>
							</td>
						</tr>

						<tr>
							<td>
								<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/mainlinks.shtml'); ?>

							</td>
						</tr>
						<tr>
							<td>
								<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/gaps.shtml'); ?>
							</td>
						</tr>

								<tr>
							<td>
								<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/row.shtml'); ?>
							</td>
						</tr>

						<tr >
							<td>
								<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/hotlinks.shtml'); ?>
							</td>
						</tr>
						<tr>
							<td>
								<?php @include($_SERVER['DOCUMENT_ROOT'] . '/common-files/gaps.shtml'); ?>
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
