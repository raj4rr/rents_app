<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php'); include("../lock.php");
if(isset($_SESSION['employee_id']))
{
	$url="../";
	header("location:$url");
}
else 
{
	if(isset($_REQUEST['login_username']) && isset($_REQUEST['login_password']))
    {
    	if($_REQUEST['login_username']=="" || $_REQUEST['login_password']=="")
		{
        	$_SESSION['login_message']="<font style='color:red;'>Your login id or password is incorrect.</font>";
			$url=$_SERVER['HTTP_REFERER'];
            header("location:$url");
        }
        else
        {
        	$sql_login=mysql_query("SELECT * FROM employee_information WHERE employee_email='$_REQUEST['login_username']' and employee_password='$_REQUEST['login_password']'");
            $row_login=mysql_fetch_array($sql_login);
            if(mysql_num_rows($sql_login)==1)
            {
           		$_SESSION['employee_id']=$row_login['employee_id'];
                $url=$_SERVER['HTTP_REFERER'];
                header("location:$url"); 
            }
           	else
            {
            	$_SESSION['login_message']="<font style='color:red;'>Your login id or password is incorrect.</font>";
				$url=$_SERVER['HTTP_REFERER'];
                header("location:$url");
            }
         }
    }
	else
	{
		$_SESSION['login_message']="<font style='color:red;'>Invalid login credentials.</font>";
		$url=$_SERVER['HTTP_REFERER'];
        header("location:$url");
	}
}
?>

				