<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
$sql_question_answer = mysql_query("select * from interviewquestion where interviewquestion_id='$_GET['interviewquestion_id']'",$r4r_con);
$row_question_answer=mysql_fetch_array($sql_question_answer);
?>
<form action="r4r_interview_insert_q.php" method="post">
	<table style="width:90%;overflow: scroll;">
		<tr>
		<td style="width:35%;">
			<input type="hidden" name="interviewquestion_id" id="interviewquestion_id" value="<?php echo $_GET['interviewquestion_id'];?>">
			<select name="category_id" id="category_id">
                            <option value="0">--Select Category--</option>
                            <?php $sql_category = mysql_query("select * from category where publish='Y'  and userid='4'  ");
                            while ($row_category = mysql_fetch_array($sql_category))
                            { 

							?> 
							<option <?php if($row_question_answer['category_id']== $row_category['category_id']) echo 'selected' ;?> value="<?php echo $row_category['category_id']; ?>">
									<?php echo $row_category['category_name']; ?></option>
					<?php	//}
						}?>
                        </select>

		</td>
		 <script>

						$( "#category_id" ).change(function() {
							load_subcategory(this.value,<?php echo $row_question_answer['interviewsubcategory_id']; ?>);
							$('#new_subcategory_element').hide();
						});
						</script>
		<td style="width:35%;">
			<select name="interviewsubcategory_id" id="interviewsubcategory_id">
				<?php 
				$sql_subcategory = mysql_query("select * from interviewsubcategory where interviewsubcategory_id='$row_question_answer[interviewsubcategory_id]' ");
				while ($row_subcategory = mysql_fetch_array($sql_subcategory))
					{ ?>
                        <option  'selected' value="<?php echo $row_subcategory['interviewsubcategory_id']; ?>">
                            <?php echo $row_subcategory['interviewsubcategory_name']; ?>
                        </option>	
					<?php }?>
						</select>
		</td>
		<script>
						$( "#interviewsubcategory_id" ).change(function() {
							if(this.value=='other')
							{	$('#new_subcategory_element').fadeIn();
								$('#new_subcategory').removeAttr('disabled');
								$('#subcategorydescription').removeAttr('disabled');
							}else{
								$('#new_subcategory_element').hide();
							}
						});
						</script>
		<td style="width:30%;"><input type="checkbox" name="hide" id="hide"  value="Y" <?php if($row_question_answer['question_publish']=='Y') echo 'checked';?>/>Publish</td>
		</tr>
		 <tr id="new_subcategory_element" style="display:none;">
                <td colspan="3" class="alternate1" style="background:#FFE6D9;">
                    <input type="text" name="new_subcategory" id="new_subcategory" placeholder="New subcategory..." disabled="disabled"/>
                    <br /><br />
                    <p>Subcategory description:<font style="font-size:12px; float:right;">Between 130 to 150 characters&nbsp;&nbsp;|&nbsp;&nbsp;<font id="subcat_description_text"></font> characters remaining.</font></p>
                    <textarea name="subcategorydescription" id="subcategorydescription" disabled="disabled" placeholder="Subcategory description..."></textarea>
                </td>
                <script>
						$(document).ready( function() {
							var elem = $("#subcat_description_text");
							$("#subcategorydescription").limiter(150, elem);
						});
						</script>
                </tr>

		<tr><td colspan="3"><p>Question:</p><textarea name="question" id="question" placeholder="Question.."><?php echo stripslashes($row_question_answer['interviewquestion']);?></textarea></td></tr>
		<tr><td colspan="3"><p>Answer:</p><script type="text/javascript" src="../admin_js/jquery-te-1.4.0.min.js" charset="utf-8"></script>
		<textarea name="answer" id="answer" class="jqte-test" placeholder="Answer.."><?php echo htmlentities(stripslashes($row_question_answer['interviewquestion_description']));?></textarea>
		<script>$('.jqte-test').jqte();</script></td></tr>
		<tr><td colspan="2"><input type="submit" name="submit" value="Submit"></td></tr>
	</table>
</form>
