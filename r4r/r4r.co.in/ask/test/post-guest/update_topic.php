<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');include("lock.php");
if(isset($_SESSION['employee_id']))
{
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$category_id = addslashes($_POST['category_id']);
		if($_POST['subcategory_id']=="other")
		{
			$new_subcategory = addslashes($_POST['new_subcategory']);
			$subcategorydescription = addslashes($_POST['subcategorydescription']);
			if(trim($new_subcategory)=="" || trim($subcategorydescription)=="")
			{
				$_SESSION['update_message'][]="<font style='color:red;'>Null field(s) during insert new category!</font><br>";
				$url=$_SERVER['HTTP_REFERER'];
				header("Location:$url");
			}
			else
			{
				$sqlinsert_newsubcat="INSERT INTO subcategory (category_id,subcategory_name,subcategory_description,subcategory_update_date,publish) values ('$category_id','$new_subcategory','$subcategorydescription','$date_now','Y')";
				if (!mysql_query($sqlinsert_newsubcat,$conn))
				{
				$_SESSION['update_message'][]="<font style='color:red;'>Error in insert new Subcategory: " . mysql_error()."</font><br>";
					$url=$_SERVER['HTTP_REFERER'];
					header("Location:$url");
				}
				else
				{
					$subcategory_id=mysql_insert_id();
					$_SESSION['update_message'][]="<font style='color:green;'>New subcategory inserted successfully.</font><br>";

				}
			}
		}
		else
		{
			$subcategory_id = $_POST['subcategory_id'];
		}

		$topic_id=$_POST['topic_id'];
		if(isset($_POST['publish'])) $publish='Y'; else $publish='N';

		$topic_name = addslashes($_POST['topic']);
		$topic_short_description = addslashes($_POST['topic_short_description']);
		$metakeys = addslashes($_POST['metakeys']);
		$topic_full_description = addslashes($_POST['topic_full_description']);

		if(trim($topic_name)=="" || trim($topic_short_description)=="" || trim($metakeys)=="" || trim($topic_full_description)=="")
		{
			$_SESSION['update_message'][]="<font style='color:red;'>Null field(s) are not allowed!</font><br>";
			$url=$_SERVER['HTTP_REFERER'];
			header("Location:$url");
		}
		else
		{
			$sql_updatetopic="update topic set category_id='$category_id',subcategory_id='$subcategory_id',publish='$publish',topic_name='$topic_name',topic_description='$topic_full_description',keyword='$metakeys',topic_short_desc='$topic_short_description',update_date='$date_now' where topic_id='$topic_id'";
			if (!mysql_query($sql_updatetopic,$conn))
			{
				$_SESSION['update_message'][]="<font style='color:red;'>Error: " . mysql_error()."</font><br>";
				$url=$_SERVER['HTTP_REFERER'];
				header("Location:$url");
			}
			else
			{
				$sql_insert_history="insert into content_update_history (content_id,content_id_label,operation,admin_id,operation_date,operation_time) values ('$topic_id','topic_id','update','$_SESSION['employee_id']','$date_now','$time_now')";
				if (!mysql_query($sql_insert_history,$conn))
				{
					$_SESSION['update_message'][]="<font style='color:red;'>Insert history error: " . mysql_error()."</font><br>";
					$url=$_SERVER['HTTP_REFERER'];
					header("Location:$url");
				}
				else
				{
					$_SESSION['update_message'][]="<font style='color:green;'>Topic updated successfully.</font><br>";
					$url=$_SERVER['HTTP_REFERER'];
					header("Location:$url");
				}
			}
		}
	}
	else
	{
		$_SESSION['update_message'][]="<font style='color:red;'>Form post in Invalid</font><br>";
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
	