<form action="#" method="GET">
<select name="r_category" id="r_category">

                            <?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 $sql_category = mysql_query("select * from category where publish='Y'  and userid='4'  ");
                            while ($row_category = mysql_fetch_array($sql_category))
                            { 

							?> 
							<option <?php if($_REQUEST['r_category']== $row_category['category_id']) echo 'selected' ;?> value="<?php echo $row_category['category_id']; ?>">
									<?php echo $row_category['category_name']; ?></option>
					<?php	//}
						}?>
                        </select>
                        <br/>
                        <input type="Submit" value="Load..">
                        </form>
<table style="width:100%;">
<tr>

<td style=" padding:5px; vertical-align:top;">
	<?php 
	if(isset($_GET['r_category']))$r_category=$_GET['r_category']; else $r_category='17';
	$sql_question = mysql_query("select * from interviewquestion where category_id='$r_category' order by interviewquestion_id desc",$r4r_con);?>
	<h1><?php echo $r_category." (".mysql_num_rows($sql_question).")";?></h1>
	<div class="tableContent">
	<?php 
		if(isset($_SESSION['message']))
		{ ?>
		<script type="text/javascript">
			$(document).ready(function(){ $("#<?php echo $_SESSION['message'][1];?>").html("<?php echo $_SESSION['message'][0];?>").css('background-color','#FFFF93').css('color','red').focus();});
		</script>
  	<?php 
  		}unset($_SESSION['message']);?>

  		<a style=" cursor:pointer;" onClick="adddquestion_box()"><img src="../images/add.png" style="padding:5px;"></a>
	<table style="font-size:13px; ;">
	<tr><td class="alternateHead"style="text-align:center; width:70%;">QUESTION</td>
		<td class="alternateHead" style="text-align:center; width:10%;">EDIT</td>
		<td class="alternateHead" style="text-align:center;width:20%;">Publish</td></tr>
         <?php while ($row_question = mysql_fetch_array($sql_question))
               { ?> 
				<tr>
					<td class="alternate1"><?php echo (stripslashes($row_question['interviewquestion'])); ?></td>
					<td class="alternate1" style="text-align:center;"><a style=" cursor:pointer;" onClick="question_box('<?php echo $row_question['interviewquestion_id']; ?>')"><img src="../images/edit.png" style="padding:5px;"></a></td>
					<td class="alternate1" style="text-align:center;" id="<?php echo $row_question['interviewquestion_id'];?>"><?php if($row_question['question_publish']=='Y'){?><img src="../images/check.png" style="padding:0px; background:none;"><?php }?></td>
				</tr>
		<?php } ?>      
	</table>
	</div>
</td>
</tr>
</table>            

