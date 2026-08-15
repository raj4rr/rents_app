<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');include("lock.php");
if(isset($_SESSION['employee_id']))
{
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$update_id = $_POST['update_id'];
		if(isset($_POST['publish'.$update_id])) $publish='Y'; else $publish='N';
		$category_name = addslashes($_POST['category_name'.$update_id]);
		$category_description = addslashes($_POST['category_description'.$update_id]);
		$category_keyword = addslashes($_POST['category_keyword'.$update_id]);
		if(trim($category_name)=="" || trim($category_description)=="" || trim($category_keyword)=="")
		{
			$_SESSION['update_category_message'.$update_id]="<font style='color:red;'>Null field(s) are not allowed!</font>";
			$url=$_SERVER['HTTP_REFERER'];
			header("Location:$url");
		}
		else
		{
			$sql_update_category="update category set category_name='$category_name',category_description='$category_description',category_keyword='$category_keyword',publish='$publish',category_update_date='$date_now' where category_id='$update_id'";
			if (!mysql_query($sql_update_category,$conn))
			{
				$_SESSION['update_category_message'.$update_id]="<font style='color:red;'>Error: " . mysql_error()."</font>";
				$url=$_SERVER['HTTP_REFERER'];
				header("Location:$url");
			}
			else
			{
				$_SESSION['update_category_message'.$update_id]="<font style='color:red;'>Category updated successfully.</font>";
				$url=$_SERVER['HTTP_REFERER'];
				header("Location:$url");
			}
		}
	}
	else
	{
		$_SESSION['update_category_message']="<font style='color:red;'>Form post in Invalid</font><br>";
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
	