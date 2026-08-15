<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php'); include("../lock.php");
if(isset($_SESSION['employee_id']))
{
	$url="../";
	header("location:$url");
}
else 
{?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>r4r&nbsp;|&nbsp;Admin</title>
<link rel="stylesheet" type="text/css" href="../admin_css/grid.css"/>
<link rel="stylesheet" type="text/css" href="../admin_css/content.css"/>
</head>
<body style="overflow:hidden;">
	<img src="../images/back_new.png" style="min-height: 100%;min-width: 1024px;width: 100%;height: auto;position: fixed;top: 0;left: 0; background:#515151;"/>
    <div style="position:absolute; margin:auto 0; width:100%;">
        <div class="header">
            <div class="grid_3 logo" style="font-size:47px; color:#EA7500; padding:6px 0px 0px 150px;"></div>
        </div>
        <div class="wrapper" style="background:none; height:520px; padding-top:70px;" align="center">
        <h3 style="font-size:xx-large;text-align:center; color:#fff; margin-bottom:30px; font-weight:normal;">Admin log in here</h3>
                    <form action="check_login.php" method="post">
                        <table width="100%" cellspacing="1" cellpadding="7" border="0" style="width:350px;">
                        	 <tr>
                                <td align="center">
                                    <img src="../images/photo.png" />
                                </td>
                            </tr>
                            <tr><td>&nbsp;</td></tr> 
                            <tr>
                                <td align="center">
                                    <input title="Username" type='text' name='login_username' id='login_username' style="width:80%;height:19px;" placeholder='Enter username..'/>
                                </td>
                            </tr>
                            <tr><td>&nbsp;</td></tr> 
                            <tr>
                                <td align="center">
                                    <input title="Enter your password" type='password' name='login_password' style="width:80%; height:19px;" id='login_password' placeholder='Enter password..'/>
                                </td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>  
                            <tr>
                                <td align="center">
                                    <input type="submit" value="LOG IN !" style=" background:#EA7500; width:85%; padding:10px;"/>
                                </td> 
                             </tr>
                             <tr><td>&nbsp;</td></tr> 
                             <tr>
                             	<td align="center">
                                	<?php if(isset($_SESSION['login_message'])){?>
									<div style="background:#FFFF00; padding:5px; font-size:13px;width:80%;">
                                    	<?php echo $_SESSION['login_message'];?>
                                    </div>
									<?php } unset($_SESSION['login_message']);?>
                                </td>
                             </tr> 
                        </table>
                   </form>
     	</div>

        <p style="color:#FFF; padding:0px 20px 0px 0px; float:right;">Copyright&nbsp;&nbsp;&copy;&nbsp;2012-14&nbsp; r4r.in </p>                  

</div>
</body>
</html>
<?php }?>

        