<table style="width:100%;">
<tr>
<td style="width:30%; padding:5px; vertical-align:top;">
	<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 $sql_category = mysql_query("select DISTINCT language from question",$r4r_con);?>
	<h1>Category (<?php echo mysql_num_rows($sql_category);?>)</h1>
	<div class="tableContent">
		<table style="width:100%;font-size:13px;">
		<tr><td class="alternateHead"style="text-align:center; width:50%;" >Category</td>
		<td class="alternateHead" style="text-align:center; width:25%;">Number of Questions</td>
		<td class="alternateHead" style="text-align:center;width:25%;">Delete</td>
         <?php $e=1;
			   while ($row_category = mysql_fetch_array($sql_category))
               { ?> 
				<tr id="category<?php echo $e;?>">
					<td class="alternate1"><?php echo $row_category['language']; ?></td>
					<td class="alternate1" style="text-align:center;"><a href="?r_category=<?php echo $row_category['language']; ?>"><?php echo mysql_num_rows(mysql_query("select * from question where language='$row_category[language]'"));?></a></td>
					<td class="alternate1" style="text-align:center;" id="category_image<?php echo $e;?>">
					<?php if($_SESSION['employee_id']==1 || $_SESSION['employee_id']==2){?>
					<a style="cursor:pointer;" onClick="delete_category('<?php echo $row_category['language']; ?>','<?php echo $e;?>');"><img style="padding:0px; background:none;" src="../images/close.png"></a>
					<?php } else {?>
						<img style="padding:0px; background:none;opacity:0.4;" src="../images/close.png">
					<?php }?>
					</td>
				</tr>
		<?php $e++;} ?>      
	</table>
	</div>
</td>
<td style="width:70%; padding:5px; vertical-align:top;">
	<?php 
	if(isset($_GET['r_category']))$r_category=$_GET['r_category']; else $r_category='Java SUB';
	$sql_question = mysql_query("select * from question where language='$r_category'",$r4r_con);?>
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
	<table style="font-size:13px; width:100%;">
	<tr><td class="alternateHead"style="text-align:center; width:70%;">QUESTION</td>
		<td class="alternateHead" style="text-align:center; width:10%;">EDIT</td>
		<td class="alternateHead" style="text-align:center;width:20%;">STATUS</td></tr>
         <?php while ($row_question = mysql_fetch_array($sql_question))
               { ?> 
				<tr>
					<td class="alternate1"><?php echo htmlspecialchars(stripslashes($row_question['question'])); ?></td>
					<td class="alternate1" style="text-align:center;"><a style=" cursor:pointer;" onClick="question_box('<?php echo $row_question['id']; ?>')"><img src="../images/edit.png" style="padding:5px;"></a></td>
					<td class="alternate1" style="text-align:center;" id="<?php echo $row_question['id'];?>"><?php if($row_question['hide']=='N'){?><img src="../images/check.png" style="padding:0px; background:none;"><?php }?></td>
				</tr>
		<?php } ?>      
	</table>
	</div>
</td>
</tr>
</table>            

