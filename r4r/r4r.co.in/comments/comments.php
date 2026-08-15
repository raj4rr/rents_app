<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<HTML>
	<HEAD>

		<TITLE>Post Your Comments</TITLE>
		<META name="description" CONTENT="Post Your Comments">
		<META name="keywords"	CONTENT="Post Your Comments">
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

									   <td width="84%" valign="top"><p>
<a href="/comments/">Show All Comments</a></p>

													<script>
function  checkAuthorized()
{
if(checkNotNullFields()==true){
var a=document.commentForm.a.value;
var b=document.commentForm.b.value;
var sum=document.commentForm.sum.value;
if(sum!=a+b)alert("Wrong SuM Try Again.........");
else document.commentForm.submit();
}
}

function  checkNotNullFields(){
{
if (document.commentForm.username.value == "")
{
alert("Please enter a value for the \" Your Name\" field.");
document.commentForm.username.focus();
return false;
}
if (document.commentForm.email.value == "")
{
alert("Please enter a value for the \" Email\" field.");
document.commentForm.email.focus();
return false;
}
if (document.commentForm.comment.value == "")
{
alert("Please enter a value for the \"Comment\" field.");
document.commentForm.comment.focus();
return false;
}
if (document.commentForm.sum.value == "")
{
alert("Please enter a value for the \"SUM\" field.");
document.commentForm.sum.focus();
return false;
}
else

return true;
}
}</script>
<?php
  	$pageURL = 'http';
 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
    $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
if($_POST['comment']!=""){
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";   
    if (!$connection)

  {

  die('Could not connect: ' . mysql_error());

  }

echo "Posted Successfully...";

$sql1="select * from comment where comment='$_POST['comment']'";

$obj1=mysql_query($sql1);

if(mysql_num_rows($obj1)==0){ 

$sql="INSERT INTO comment(username, emailid,comment,url)

VALUES('$_POST['username']','$_POST['email']','$_POST['comment']','$_POST['url']')";
}
mysql_query($sql);

mysql_close($connection); 

}
?>

<form name="commentForm" action = "" method = "post">
<table border="1" align="left" width="100%">
	<tr>
      <td width="578" colspan="2" bordercolorlight="#000000" bordercolordark="#000000">
      <p align="center"><b>Post Your Comments</b></td>
		</tr>
	<tr><td width="148" bordercolorlight="#000000" bordercolordark="#000000">

      <p dir="ltr">Your Name:</td>
		<td width="430"><Input type="text" name="username" size="20"></td></tr>
	<tr><td width="148" bordercolorlight="#000000" bordercolordark="#000000">Your Email ID :</td>
		<td width="430"><Input type="text" name="email" size="20"></td></tr>	
	<tr><td width="148" bordercolorlight="#000000" bordercolordark="#000000">Comments :</td>
		<td width="430">
        <textarea rows="15" cols="68" name="comment" id="comment" ></textarea></td></tr>

    <tr><td bordercolorlight="#000000" bordercolordark="#000000">URL</td><td>
      <input type="text" name="url" value="<?php echo $pageURL ;?>" size="20"></td></tr>
       <tr> 
    <td width="50%"> 

      <script> 
var a= Math.floor(Math.random()*10);
var b= Math.floor(Math.random()*10);
document.write("<input type='text' name='a'size='3' readonly='true' value='"+a+"' /><font size='1'>X10</font>+<input type='text' size='3' name='b' readonly='true' value='"+b+"' />");

</script>&nbsp;</td> 
    <td width="50%">=<input type="text" name="sum" size="4" value=""><font color="#FF0000">*</font> 
    <font size="2" color="#FF0000">Enter SUM</font></td> 

	<tr><td  colspan="2" bordercolorlight="#000000" bordercolordark="#000000">
      <p align="center"><input type="button" value="SUBMIT" name="s1" onclick="checkAuthorized()">

      <input type="reset" value="Reset" name="reset"></td></tr>

</table>
</form>
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
