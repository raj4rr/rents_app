<h1>Sub Category</h1>
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

if(isset($_REQUEST['categoryid']))
	$categoryid=$_REQUEST['categoryid'];
if(isset($_REQUEST['subcategory_id']))
	$subcategory_id=$_REQUEST['subcategory_id'];                           
?>
			<p><form id="subcategory_form" name="subcategory_form" action="">
					<input type="hidden" name="r" value="topic">
					<input type="hidden" name="categoryid" value="<?php echo $categoryid;?>">
						<select name="subcategory_id" id="subcategory_id" onChange="this.form.submit();" style="width:300px;">
                            <?php $sql_category = mysql_query("select * from subcategory where category_id='$categoryid' and publish='Y'");
							while ($row_category = mysql_fetch_array($sql_category))
                            { 
							if($subcategory_id==$row_category['subcategory_id']){?>
                                <option value="<?php echo $row_category['subcategory_id']; ?>" selected>
									<?php echo $row_category['subcategory_name']; ?></option>	
							<?php }
							else {?>
							<option value="<?php echo $row_category['subcategory_id']; ?>">
									<?php echo $row_category['subcategory_name']; ?></option>
                       <?php	}

					   		}
					   ?>
                        </select>
			</form></p>
<div class="tableContent" style="font-size:13px;">
    <table width="100%">
<?php  
	$sql_show_topic = mysql_query("select * from topic where subcategory_id=$subcategory_id");
	while ($row_show_topic = mysql_fetch_array($sql_show_topic))
	{
?>
<script>
	<?php if($row_show_topic['publish']=='Y'){?>
		$(document).ready(function () {$("#publish<?php echo $row_show_topic['topic_id'];?>").attr("checked", true);});
	<?php }else {?>
		$(document).ready(function () {$("#publish<?php echo $row_show_topic['topic_id'];?>").attr("checked", false);});
	<?php }?>
</script>
		<tr>
        	<td class="alternate2" style="width:70%;">
           		<?php echo $row_show_topic['topic_name'];?>
           	</td>
            <td class="alternate2" style="width:10%;">
			<input type="checkbox" name="publish<?php echo $row_show_topic['topic_id'];?>" id="publish<?php echo $row_show_topic['topic_id'];?>" />Publish
            </td>

            <td class="alternate2" style="width:10%; text-align:center;">
				<a href="?r=update&update_topic_id=<?php echo $row_show_topic['topic_id'];?>">Update</a>
            </td> 

			<td class="alternate2" style="width:10%;text-align:center;">
				<a>View</a>
			</td>      
        </tr>

<?php	}	?>     
	</table>
</div>