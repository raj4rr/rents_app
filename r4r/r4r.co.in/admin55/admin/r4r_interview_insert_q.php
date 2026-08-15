<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');include("lock.php");
if(isset($_SESSION['employee_id']))
{
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$question_id=$_POST['question_id'];
		$ans_id=$_POST['ans_id'];
		$question=addslashes($_POST['question']);
		$question_level=$_POST['question_level'];
		if($_POST['hide']=='Y')$hide=$_POST['hide']; else $hide='N';
		$language=$_POST['language'];
		$answer=addslashes($_POST['answer']);

		if($question_id=="" || $question=="" || $question_level=="" || $language=="" || $answer=="")
		{
			$_SESSION['message'][]="Null Fields are not allowed !";
			$_SESSION['message'][]=$question_id;
			$url=$_SERVER['HTTP_REFERER'];
			header("Location:$url");
		}
		else
		{
			$sql_update_question="UPDATE question set question='$question',question_level='$question_level',hide='$hide',language='$language' where id='$question_id'";
			if (!mysql_query($sql_update_question,$r4r_con))
			{
				$_SESSION['message'][]="Error in Question update : " . mysql_error();
				$_SESSION['message'][]=$question_id;
				$url=$_SERVER['HTTP_REFERER'];
				header("Location:$url");
			}
			else
			{
				//if(mysql_num_rows(mysql_query("select * from answer where question_id='$question_id'",$r4r_con))==0)
					$sql_update_answer="INSERT INTO answer (question_id,answer,hide) values ('$question_id','$answer','NO')";
				//else
					//$sql_update_answer="UPDATE answer set answer='$answer',hide='NO' where question_id='$question_id'";
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
