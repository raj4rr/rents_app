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
				$_SESSION['validate_message'][]="<font style='color:red;'>Null field(s) during insert new category!</font><br>";
				$url=$_SERVER['HTTP_REFERER'];
				header("Location:$url");
			}
			else
			{
				$sqlinsert_newsubcat="INSERT INTO subcategory_p (category_id,subcategory_name,subcategory_description,subcategory_insert_date,publish) values ('$category_id','$new_subcategory','$subcategorydescription','$date_now','P')";
				if (!mysql_query($sqlinsert_newsubcat,$conn))
				{
				$_SESSION['validate_message'][]="<font style='color:red;'>Error in insert new Subcategory: " . mysql_error()."</font><br>";
					$url=$_SERVER['HTTP_REFERER'];
					header("Location:$url");
				}
				else
				{
					$subcategory_id=mysql_insert_id();
					$_SESSION['validate_message'][]="<font style='color:green;'>New subcategory inserted successfully.</font><br>";

				}
			}
		}
		else
		{
			$subcategory_id = $_POST['subcategory_id'];
		}

		$topic_name = addslashes($_POST['topic']);
		$topic_short_description = addslashes($_POST['topic_short_description']);
		$metakeys = addslashes($_POST['metakeys']);
		$topic_full_description = addslashes($_POST['topic_full_description']);

		if(trim($topic_name)=="" || trim($topic_short_description)=="" || trim($metakeys)=="" || trim($topic_full_description)=="")
		{
			$_SESSION['validate_message'][]="<font style='color:red;'>Null field(s) are not allowed!</font><br>";
			$url=$_SERVER['HTTP_REFERER'];
			header("Location:$url");
		}
		else
		{
			$sql_inserttopic="INSERT INTO topic_p (category_id,subcategory_id,publish,topic_name,topic_description,keyword,topic_short_desc,admin_id,insert_date) values ('$category_id','$subcategory_id','P','$topic_name','$topic_full_description','$metakeys','$topic_short_description','$_SESSION['employee_id']','$date_now')";
			if (!mysql_query($sql_inserttopic,$conn))
			{
				$_SESSION['validate_message'][]="<font style='color:red;'>Error: " . mysql_error()."</font><br>";
				$url=$_SERVER['HTTP_REFERER'];
				header("Location:$url");
			}
			else
			{
			/*	$topic_id=mysql_insert_id();
				$sql_insert_history="insert into content_update_history (content_id,content_id_label,operation,admin_id,operation_date,operation_time) values ('$topic_id','topic_id','insert','$_SESSION['employee_id']','$date_now','$time_now')";
				if (!mysql_query($sql_insert_history,$conn))
				{
					$_SESSION['update_message'][]="<font style='color:red;'>Insert history error: " . mysql_error()."</font><br>";
					$url=$_SERVER['HTTP_REFERER'];
					header("Location:$url");
				}
				else
				{ */				
					$_SESSION['validate_message'][]="<font style='color:green;'>Topic inserted successfully.</font><br>";
					$url=$_SERVER['HTTP_REFERER'];
					header("Location:$url");
			//	}
			}
		}	
	}
	else
	{
		$_SESSION['validate_message'][]="<font style='color:red;'>Form post in Invalid</font><br>";
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

