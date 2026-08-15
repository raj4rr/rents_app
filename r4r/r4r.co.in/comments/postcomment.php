<?php session_start(); $pageURL = 'http';
 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
    $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
?>
<style>
input[type="text"], input[type="password"], textarea {
    background: none repeat scroll 0% 0% #FDFDFD;
	color:#FDFDFD;
    border: 1px solid #CFCFCF;
    padding: 7px 10px 7px 7px;
    width: 100%;
    box-sizing: border-box;
    resize: none;
    border-radius: 3px;
    box-shadow: 0px 0px 5px #CFCFCF inset;
    outline: medium none;
    color: #878787;
}
input[type="submit"], input[type="reset"] {
	position: relative;
	display: inline-block;
	padding: 0px 20px 0px 20px;
	height: 30px;
	font-size: 13px;
	line-height: 29px;
	color: #fff;
	border-radius: 3px;
	text-decoration: none;
	background: #373737;
	border: none;
	cursor: pointer;
	margin-right: 7px;
	-webkit-transition: all 0.5s ease;
	-moz-transition: all 0.5s ease;
	-o-transition: all 0.5s ease;
	transition: all 0.5s ease;
}
input[type="submit"]:hover
{
	background:#4683ea;
}
</style>
<p style=" font-size:13px; "><a href="/comments">Show All Comments</a></p>											

<?php if(isset($_SESSION['message']))
{?>
	<script type="text/javascript">
		$(document).ready(function() {$("#comment").focus();
		});

	</script>
	<p style=" font-size:13px; color:#00A400; background:#FFFF9B; padding:3px;"><?php echo $_SESSION['message']; unset($_SESSION['message']);?></p>
<?php }?>													

<form name="commentForm" action = "/comments/postinsert.php" method = "post">
<div class="table_content">
<table style="width:100%;" cellpadding="0" cellspacing="0">
<tr><td colspan="2"  style="width:100%;background:#28C1A3; color:#ffffff;font-weight:bold; font-size:14px;">Did not find what you were looking for leave your name and message. We will revert within 24 hours</td></tr>
<tr>
<td style="width:50%; font-size:13px;background:#C7EEE6;">Name:<br>
<input type="hidden" name="sessionid" id="username" value="123" size="40">
<input type="text" name="username" id="username" size="40">
</td>
<td style=" width:50%;font-size:13px; background:#C7EEE6;" >eMail:<br>
<input type="text" name="email" size="40">
<input type="hidden" name="url" value="<?php echo $pageURL ;?>">
</td>
<tr>
<td style="width:100%;font-size:13px;background:#C7EEE6;" colspan="2">
Comment / Feedback:<br>
<textarea name="comment" id="comment"></textarea>
</td>
</tr>
<tr>
	<td style="width:100%;background:#C7EEE6;" colspan="2" ><input type="submit" value="Submit" name="s1" onClick="checkAuthorized()">
	<input type="reset" value="Reset" name="reset" style="background:#EC0000;"></td>
</tr>
</table>
</div>
</form>

