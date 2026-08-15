<?php
 $pageURL = 'http';
 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
 $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
 }
 if($pageURL=="/common-files/comment.shtml")
 {
?>
  <p><font color="#FF0000"><b>Comments:</b></font>

<iframe src="/images/showcomments1.php" scrolling="YES"  width="728"  frameborder="0"> </iframe>

<p>  <font color="#FF0000"><b>Give Your Comments:</b></font>

<form name="commentscreen" action = "/insert.php" method = "post">
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
	<tr><td  colspan="2" bordercolorlight="#000000" bordercolordark="#000000">
      <p align="center"><input type="submit" value="SUBMIT" name="submit">
      <input type="reset" value="Reset" name="reset"></td></tr>

</table>
</form>

<script language="JavaScript" type="text/javascript">
        var frmvalidator = new Validator("commentscreen");
		frmvalidator.addValidation("username","req","Please enter your Name");
		frmvalidator.addValidation("username","alnumhyphen");
		frmvalidator.addValidation("email","req","Please enter your Email Address");
		frmvalidator.addValidation("email","email");
</script>

<?php } ?>
