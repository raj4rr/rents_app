<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php'); 
include("lock.php");
if(isset($_SESSION['employee_id']))
{  
	if($_SERVER['REQUEST_METHOD']=='POST')
	{
			$login_username=addslashes(trim($_REQUEST['login_username']));
			$loginpassword=addslashes(trim($_REQUEST['loginpassword']));
			$employee_name=addslashes(trim($_REQUEST['employee_name']));
			$employee_contact=addslashes(trim($_REQUEST['employee_contact']));
			$address_optional=addslashes(trim($_REQUEST['address_optional']));
			$address_permanent=addslashes(trim($_REQUEST['address_permanent']));

			if($login_username=="" || $loginpassword=="" || $employee_name=="" || $employee_contact=="" || $address_optional=="" || $address_permanent=="")
			{
				$_SESSION['seller_form']="Fill all information";
				$url_se=$_SERVER['HTTP_REFERER'];
				header("Location:$url_se");
			}
			else
			{		
				$sql_update="update employee_information set employee_name='$employee_name',employee_email='$login_username',employee_contact='$employee_contact',employee_password='$loginpassword',employee_permanent_address='$address_permanent',employee_optional_address='$address_optional' where employee_id='$_SESSION['employee_id']'";
				if (!mysql_query($sql_update,$conn))
				{
					$_SESSION['seller_form']='Error: ' . mysql_error();
					$url_se=$_SERVER['HTTP_REFERER'];
					header("Location:$url_se");

				}
				else
				{					
					$url_se=$_SERVER['HTTP_REFERER'];
					header("Location:$url_se");
				}
			}
	}
 }
else
{
				$url_se=$_SERVER['HTTP_REFERER'];
				header("Location:$url_se");
}?>
