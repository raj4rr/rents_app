<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');include("lock.php");
if(isset($_SESSION['employee_id']))
{
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$interviewquestion_id=$_POST['interviewquestion_id'];
		$question=addslashes($_POST['question']);
		$category_id=$_POST['category_id'];
		if($_POST['hide']=='Y')$hide=$_POST['hide']; else $hide='N';
		$interviewsubcategory_id=$_POST['interviewsubcategory_id'];
		$answer=addslashes($_POST['answer']);

		if($interviewquestion_id=="" || $question=="" || $category_id=="" || $interviewsubcategory_id=="" || $answer=="")
		{
			$_SESSION['message'][]="Null Fields are not allowed !";
			$_SESSION['message'][]=$interviewquestion_id;
			$url=$_SERVER['HTTP_REFERER'];
			header("Location:$url");
		}
		else
		{
			$sql_update_question="UPDATE interviewquestion set category_id='$category_id',interviewsubcategory_id='$interviewsubcategory_id',question_publish='$hide',interviewquestion='$question',interviewquestion_description='$answer' where interviewquestion_id='$interviewquestion_id'";
			if (!mysql_query($sql_update_question,$r4r_con))
			{
				$_SESSION['message'][]="Error in Question update : " . mysql_error();
				$_SESSION['message'][]=$question_id;
				$url=$_SERVER['HTTP_REFERER'];
				header("Location:$url");
			}
			else
			{
				if(mysql_num_rows(mysql_query("select * from interviewquestion where interviewquestion_id='$interviewquestion_id'",$r4r_con))==0)
					$sql_update_answer="INSERT INTO `interviewquestion` (`interviewquestion_id`, `category_id`, `interviewsubcategory_id`, `interviewquestion`, `interviewquestion_description`, `interviewquestion_keyword`, `question_publish`, `admin_id`) VALUES (NULL, '$category_id', '$interviewsubcategory_id', '$question', '$answer', '$question', '$hide', '$_SESSION['employee_id']');";
				//else
				//	$sql_update_answer="UPDATE answer set answer='$answer' where question_id='$question_id'";
				if (!mysql_query($sql_update_answer,$r4r_con))
				{
					$_SESSION['message'][]="Error in answer update : " . mysql_error();
					$_SESSION['message'][]=$question_id;
					$url=$_SERVER['HTTP_REFERER'];
					header("Location:$url");
				}
				else
				{
					$sql_insert_history="insert into content_update_history (content_id,content_id_label,operation,admin_id,operation_date,operation_time) 
					values ('$question_id','interview_question_r4rcoin','update','$_SESSION['employee_id']','$date_now','$time_now')";
					if (!mysql_query($sql_insert_history,$conn))
					{
						$_SESSION['message'][]="Error in admin insert : " . mysql_error();
						$_SESSION['message'][]=$question_id;
						$url=$_SERVER['HTTP_REFERER'];
						header("Location:$url");
					}
					else
					{				
						$_SESSION['message'][]="Successfully update !";
						$_SESSION['message'][]=$question_id;
						$url=$_SERVER['HTTP_REFERER'];
						header("Location:$url");
					}
				}
			}	
		}
	}
	else
	{
		$_SESSION['message'][]="Form post in Invalid !";
		$_SESSION['message'][]=$question_id;
		$url=$_SERVER['HTTP_REFERER'];
		header("Location:$url");
	}
}
else
{
	$url="../../";
	header("location:$url");
}?>  
