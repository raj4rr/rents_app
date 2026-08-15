<?php

       $pageURL = 'http';
 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
 $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"].$_SERVER['QUERY_STRING'];
;
 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["SCRIPT_NAME"].$_SERVER["QUERY_STRING"];
;
 }
 ?>
<form  action = "/images/postinsert.php" method = "post">
<table border="0" width="100%" align="left">
	<tr><td>Your Name:</td>
		<td><Input type="text" name="username"></td></tr>
	<tr><td>Your Email ID :</td>
		<td><Input type="text" name="email"></td></tr>	
	<tr><td>Comments :</td>
		<td><textarea rows="7" cols="21" name="comment" id="comment" ></textarea></td></tr>
    <tr><td><input type="text" name="url1" value="<?php echo $pageURL ;?>"></td></tr>
    <input type="hidden" name="url" value="<?php echo $pageURL ;?>">
	<tr><th><input type="submit" value="SUBMIT" name="submit"></th></tr>
</table>
</form>

<script language="JavaScript" type="text/javascript">
        var frmvalidator = new Validator("commentscreen");
		frmvalidator.addValidation("username","req","Please enter your Name");
		frmvalidator.addValidation("username","alnumhyphen");
		frmvalidator.addValidation("email","req","Please enter your Email Address");
		frmvalidator.addValidation("email","email");
</script>
