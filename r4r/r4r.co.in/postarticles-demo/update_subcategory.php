<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');include("lock.php");
if(isset($_SESSION['employee_id']))
{
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$update_id = $_POST['update_id'];
		if(isset($_POST['publish'.$update_id])) $publish='P'; else $publish='N';
		$subcategory_name = addslashes($_POST['subcategory_name'.$update_id]);
		$subcategory_description = addslashes($_POST['subcategory_description'.$update_id]);
		if(trim($subcategory_name)=="" || trim($subcategory_description)=="")
		{
			$_SESSION['update_subcategory_message'.$update_id]="<font style='color:red;'>Null field(s) are not allowed!</font>";
			$url=$_SERVER['HTTP_REFERER'];
			header("Location:$url");
		}
		else
		{
			$sql_update_category="update subcategory_p set subcategory_name='$subcategory_name',subcategory_description='$subcategory_description',ispublice='$publish',subcategory_update_date='$date_now' where subcategory_id='$update_id'";
			if (!mysql_query($sql_update_category,$conn))
			{
				$_SESSION['update_subcategory_message'.$update_id]="<font style='color:red;'>Error: " . mysql_error()."</font>";
				$url=$_SERVER['HTTP_REFERER'];
				header("Location:$url");
			}
			else
			{
				$_SESSION['update_subcategory_message'.$update_id]="<font style='color:red;'>Sub Category updated successfully.</font>";
				$url=$_SERVER['HTTP_REFERER'];
				header("Location:$url");
			}
		}
	}
	else
	{
		$_SESSION['update_subcategory_message']="<font style='color:red;'>Form post in Invalid</font><br>";
		$url=$_SERVER['HTTP_REFERER'];
		header("Location:$url");
	}
}
else
{
	$url="../";
	header("location:$url");
}
?>  
	