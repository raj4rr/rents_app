<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
$sql_question_answer = mysql_query("select * from interviewquestion where interviewquestion_id='$_GET['interviewquestion_id']'",$r4r_con);
$row_question_answer=mysql_fetch_array($sql_question_answer);
?>
<form action="r4r_interview_insert_q.php" method="post">
	<table style="width:100%;">
		<tr>
		<td style="width:35%;">
			<input type="hidden" name="interviewquestion_id" id="interviewquestion_id" value="<?php echo $_GET['interviewquestion_id'];?>">
			<select name="category_id" id="category_id">
				<?php $sqlcategory = mysql_query("select DISTINCT category_name, category_id from category where userid=2",$r4r_con);
				while($rowcategory=mysql_fetch_array($sqlcategory))
				{
					if($row_question_answer['category_id']==$rowcategory['category_id']){?>
						<option value="<?php echo $rowcategory['category_id'];?>" selected><?php echo htmlspecialchars($rowcategory['category_name']);?></option>
					<?php } else {?><option value="<?php echo $rowcategory['category_id'];?>"><?php echo htmlspecialchars($rowcategory['category_name']);?></option>
				<?php }
				}?>
			</select>
		</td>
		<td style="width:35%;">
			<select name="interviewsubcategory_id" id="interviewsubcategory_id">
				<?php $sqlsubcategory = mysql_query("select DISTINCT interviewsubcategory_name, interviewsubcategory_id from interviewsubcategory",$r4r_con);
				while($rowsubcategory=mysql_fetch_array($sqlsubcategory))
				{
					if($row_question_answer['interviewsubcategory_id']==$rowsubcategory['interviewsubcategory_id']){?>
						<option value="<?php echo $rowsubcategory['interviewsubcategory_id'];?>" selected><?php echo htmlspecialchars($rowsubcategory['interviewsubcategory_name']);?></option>
					<?php } else {?><option value="<?php echo $rowsubcategory['interviewsubcategory_id'];?>"><?php echo htmlspecialchars($rowsubcategory['interviewsubcategory_name']);?></option>
				<?php }
				}?>
			</select>
		</td>
		<td style="width:30%;"><input type="checkbox" name="hide" id="hide"  value="Y" <?php if($row_question_answer['question_publish']=='Y') echo 'checked';?>/>Publish</td>
		</tr>

		<tr><td colspan="3"><p>Question:</p><textarea name="question" id="question" placeholder="Question.."><?php echo stripslashes($row_question_answer['interviewquestion']);?></textarea></td></tr>
		<tr><td colspan="3"><p>Answer:</p><script type="text/javascript" src="../admin_js/jquery-te-1.4.0.min.js" charset="utf-8"></script>
		<textarea name="answer" id="answer" class="jqte-test" placeholder="Answer.."><?php echo htmlentities(stripslashes($row_question_answer['interviewquestion_description']));?></textarea>
		<script>$('.jqte-test').jqte();</script></td></tr>
		<tr><td colspan="2"><input type="submit" name="submit" value="Submit"></td></tr>
	</table>
</form>
