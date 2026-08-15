<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');include("lock.php");

	if($_SERVER['REQUEST_METHOD']=='POST')
	{
		if($_REQUEST['folder_name']=="--Select Category--")
		{
			echo "<font style='color:red;'>Please select category.</font>";
		}
		else
		{
			$path=strtolower(str_replace(' ','',$_REQUEST['folder_name'])."/".$_REQUEST['folder_name']."_image/");
			if($_FILES['upload_image']['name'])
			{
				if(!$_FILES['upload_image']['error'])
				{
					$image_name=$_FILES["upload_image"]["name"];
					$allowed_exts = array("png");
					$image_name=explode(".",$image_name);
					$extension=end($image_name);
					$image_size = getimagesize($_FILES['upload_image']['tmp_name']);
					if($image_size['0']> 550)
					{
						echo "<font style='color:red;'>Only Width: 550px allowed ! Try another one.</font>";
					}
					else if($_FILES["upload_image"]["size"]>(1024000))
					{
						echo "<font style='color:red;'>Large Image ! Try another one.</font>";
					}
					else
					{	
						if(in_array($extension, $allowed_exts))
						{	
							$new_img=strtolower(str_replace(' ','',$image_name[0]).uniqid()).".".$extension;
							if(file_exists("../".$path))
							{
								if(move_uploaded_file($_FILES["upload_image"]["tmp_name"],"../".$path.$new_img))
									echo "<p style='color:green;'>Image uploaded successfully.</p><input value='".$web_url.$path.$new_img."' style='width:300px;'/>";
								else
									echo "<font style='color:red;'>Unable to upload Image.</font>";
							}
							else
							{
								if (!mkdir("../".$path, 0777, true)) 
									echo "Failed to create folder.";
								else
								{
									if(move_uploaded_file($_FILES["upload_image"]["tmp_name"],"../".$path.$new_img))
										echo "<p style='color:green;'>Image uploaded successfully.</p><input value='".$web_url.$path.$new_img."' style='width:300px;'/>";
									else
										echo "<font style='color:red;'>Unable to move Image.</font>";
								}
							}
						}
						else
						{
							echo "<font style='color:red;'>Upload only .png extension.</font>";
						}
					}
				}
				else
				{
					echo "<font style='color:red;'>Your upload triggered the following error: ".$_FILES['upload_image']['error']."</font>";
				}
			}
		}
	}
	else
	{
		echo "<font style='color:red;'>Invalid request.</font>";
	}
?>