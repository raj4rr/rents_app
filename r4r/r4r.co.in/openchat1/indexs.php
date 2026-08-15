<?php session_start(); 
$userName=isset($_SESSION['userName']);
$userID=isset($_SESSION['userID']);
$chatwith=isset($_GET['chatwith']);
if(isset($_SESSION['userID'])=='')
{
	$_SESSION['userName']='Guest';
	$_SESSION['userID']='0';
	$chatwith='gst';
}

//$_SESSION['userID']='0';
//$_SESSION['userName']='Guest';

//$_SESSION['commonChatID']='0';
//$_SESSION['chatwithName']='Guest';
//$_SESSION['chatwithID']='0'; 

  	$pageURL = 'http';

// if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}

  //  $pageURL .= "://";

/* if ($_SERVER["SERVER_PORT"] != "80") {

  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];

 } else {

  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];

	}

	$idp=strpos($pageURL,"=");

	$id=substr($pageURL,$idp+1);
*/

?>
<HEAD><TITLE>Open Chat</TITLE>

<script type="text/javascript" src="/js/main.js"></script>

		<link rel="stylesheet" type="text/css" href="/css/style.css" />

	    <link href="/images/logo.gif" type="image/gif" rel="SHORTCUT ICON">

	</HEAD>

	<BODY>

<script type="text/javascript">

function validateComment() {

    if(document.getElementById('fromtxt').value == ''){  

	alert("Please enter a valid name");

        return false;

    }

    if(document.getElementById('comment').value == '') {

	alert("Please enter a valid comment");

        return false;

    }

    if(document.getElementById('security_code').value == ''){

        alert("Please enter image security code");

        return false;

    }

    return true;

}

</script>

<style>

pre {

	width: 500px;                          /* specify width  */

	white-space: pre-wrap;                 /* CSS3 browsers  */

	white-space: -moz-pre-wrap !important; /* 1999+ Mozilla  */

	white-space: -pre-wrap;                /* Opera 4 thru 6 */

	white-space: -o-pre-wrap;              /* Opera 7 and up */

	word-wrap: break-word;                 /* IE 5.5+ and up */

	/* overflow-x: auto; */                /* Firefox 2 only */

	/* width: 99%; */		       /* only if needed */

	}

</style>

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

								<?php include("common-files/menu.shtml"); ?>

							</td>

							</td>

						</tr>

						<tr>

							<td>

								<?php include("common-files/gaps.shtml"); ?>

							</td>

						</tr>

</table>

   <table width="728"><tr><td>  <div style="overflow-y:scroll;max-height:600px;width:728">
<?php include("userpage.php"); ?>
  <?php include("showuserchat.php"); ?>

   </td><td>

<form action='post.php?chatwith=<?php echo $chatwith; ?>' method="get">

<TABLE cellSpacing=0 cellPadding=0 border=0>

  <TR>

    <TD class=text>Message:</TD>

    <TD>

    <TEXTAREA  style="WIDTH: 300px; COLOR: #ff0000; HEIGHT: 200px" name='msg' rows="1" cols="20"></TEXTAREA></TD>

    <TD>

     </TD></TR>

  <TR>

    <TD colSpan=3>

    <input type="submit" style="FONT-WEIGHT: bold; FONT-SIZE: 10px; WIDTH: 100%; COLOR: #ffffff; BACKGROUND-COLOR: red" onclick="validateComment();" >

   </TD>

   </TR>

 </form>

	</TABLE>

   </td></tr></table><table>

   <tr>

							<td>

								<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/footer.php"); ?>

							</td>

						</tr>

					</table>

   </BODY>

