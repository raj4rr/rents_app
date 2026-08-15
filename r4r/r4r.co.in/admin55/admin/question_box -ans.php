<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
$sql_question_answer = mysql_query("select * from question where id='$_GET['question_id']'",$r4r_con);
$row_question_answer=mysql_fetch_array($sql_question_answer);
?>
<form action="r4r_interview_insert_q_ans.php" method="post">
	<table style="width:100%;">
		<tr>
		<td style="width:35%;">
			<input type="hidden" name="question_id" id="question_id" value="<?php echo $_GET['question_id'];?>">
			<input type="hidden" name="ans_id" id="ans_id" value="<?php echo $_GET['ans'];?>">
			<select name="language" id="language">
				<?php $sqlcategory = mysql_query("select DISTINCT language from question",$r4r_con);
				while($rowcategory=mysql_fetch_array($sqlcategory))
				{
					if($row_question_answer['language']==$rowcategory['language']){?>
						<option value="<?php echo $rowcategory['language'];?>" selected><?php echo htmlspecialchars($rowcategory['language']);?></option>
					<?php } else {?><option value="<?php echo $rowcategory['language'];?>"><?php echo htmlspecialchars($rowcategory['language']);?></option>
				<?php }
				}?>
			</select>
		</td>
		<td style="width:35%;">
			<select name="question_level" id="question_level">
				<option value="experience" <?php if($row_question_answer['question_level']=='experience') echo 'selected';?>>Experience</option>
				<option value="fresher" <?php if($row_question_answer['question_level']=='fresher') echo 'selected';?>>Fresher</option>
				<option value="both" <?php if($row_question_answer['question_level']=='both') echo 'selected';?>>Both</option>
			</select>
		</td>
		<td style="width:30%;"><input type="checkbox" name="hide" value="Y" <?php if($row_question_answer['hide']=='Y') echo 'checked';?>/>Hide</td>
		</tr>
		<?php $sql_answer = mysql_query("select * from answer where question_id='$_GET['question_id']' and answer_id='$_GET['ans']'",$r4r_con);$row_answer=mysql_fetch_array($sql_answer);?>

		<tr><td colspan="3"><p>Question:</p><textarea name="question" id="question" placeholder="Question.."><?php echo stripslashes($row_question_answer['question']);?></textarea></td></tr>
		<tr><td colspan="3"><p>Answer:</p><script type="text/javascript" src="../admin_js/jquery-te-1.4.0.min.js" charset="utf-8"></script>
		<textarea name="answer" id="answer" class="jqte-test" placeholder="Answer.."><?php echo htmlentities(stripslashes($row_answer['answer']));?></textarea>
		<script>$('.jqte-test').jqte();</script></td></tr>
		<tr><td colspan="2"><input type="submit" name="submit" value="Submit"></td></tr>
	</table>
</form>
