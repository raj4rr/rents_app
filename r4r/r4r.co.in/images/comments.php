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

      $protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') 

                      === FALSE ? 'http' : 'https';

      $host     = $_SERVER['HTTP_HOST'];

      $script   = $_SERVER['SCRIPT_NAME'];

      $params   = $_SERVER['QUERY_STRING'];

      $currentUrl = $protocol . '://' . $host . $script . '?' . $params;

      echo $currentUrl;

?>

<form name="commentForm" action = "/common-files/insert.php" method = "post">
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
      <input type="reset" value="Reset" name="reset"><a href='<?=$_SERVER["HTTP_REFERER"] ?>'>Go Back</a></td></tr>

</table>
</form>

<script language="JavaScript" type="text/javascript">
        var frmvalidator = new Validator("commentscreen");
		frmvalidator.addValidation("username","req","Please enter your Name");
		frmvalidator.addValidation("username","alnumhyphen");
		frmvalidator.addValidation("email","req","Please enter your Email Address");
		frmvalidator.addValidation("email","email");
</script>
