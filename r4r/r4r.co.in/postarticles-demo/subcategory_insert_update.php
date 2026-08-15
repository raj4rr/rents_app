<h1>Sub Category</h1>
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

if(isset($_REQUEST['category_id']))
	$category_id=$_REQUEST['category_id'];
else
{
	//$category=mysql_fetch_assoc(mysql_query("select category_id from subcategory_p where publish='Y' "));	
	$category_id=19;
}
?>
			<p><form id="subcategory_form" name="subcategory_form" action="">
					<input type="hidden" name="r" value="subcategory">
						<select name="category_id" id="category_id" onChange="this.form.submit();" style="width:300px;">
                            <?php $sql_category = mysql_query("select * from category_p where publish='Y'");
                            while ($row_category = mysql_fetch_array($sql_category))
                            { 
							if($category_id==$row_category['category_id']){?>
                                <option value="<?php echo $row_category['category_id']; ?>" selected>
									<?php echo $row_category['category_name']; ?></option>	
							<?php }
							else {?>
							<option value="<?php echo $row_category['category_id']; ?>">
									<?php echo $row_category['category_name']; ?></option>
                       <?php	}

					   		}
					   ?>
                        </select>
			</form></p>
<div class="tableContent" style="font-size:13px;">
    <table width="100%">
<?php  
	$sql_show_category = mysql_query("select * from subcategory_p where category_id=$category_id and ispublic='Y'");
	//echo "select * from subcategory where category_id=$_REQUEST['category_id']";
	if(mysql_num_rows($sql_show_category)==0)
	{?>
		<a href="?addcat=<?php echo $category_id;?>">Add new Subcategory</a>
<?php }else
{	while ($row_show_category = mysql_fetch_array($sql_show_category))
	{
?>
<script>
	<?php if($row_show_category['publish']=='P'){?>
		$(document).ready(function () {$("#publish<?php echo $row_show_category['subcategory_id'];?>").attr("checked", true);});
	<?php }else {?>
		$(document).ready(function () {$("#publish<?php echo $row_show_category['subcategory_id'];?>").attr("checked", false);});
	<?php }?>
</script>
	<form name="form<?php echo $row_show_category['subcategory_id'];?>" action="update_subcategory.php" method="post">
    	<tr>
        	<td class="alternate2" style="width:20%;">
           		<input type="hidden" name="update_id" value="<?php echo $row_show_category['subcategory_id'];?>" />
                <p>Category name:</p>
				<input type="text" value="<?php echo $row_show_category['subcategory_name'];?>" name="subcategory_name<?php echo $row_show_category['subcategory_id'];?>"  id="subcategory_name<?php echo $row_show_category['subcategory_id'];?>" style="width:92%;" />
           		<input type="checkbox" name="publish<?php echo $row_show_category['subcategory_id'];?>" id="publish<?php echo $row_show_category['subcategory_id'];?>" />Publish

		    </td>
            <td class="alternate2" style="width:60%;">

            	 <p>Category description:&nbsp;&nbsp;<?php if(isset($_SESSION['update_subcategory_message'.$row_show_category['subcategory_id']])) {?>
				 <script type="text/javascript">
						$(document).ready( function() {$("#subcategory_description<?php echo $row_show_category['subcategory_id'];?>").focus();});
				</script>

				 <?php echo $_SESSION['update_subcategory_message'.$row_show_category['subcategory_id']];} unset($_SESSION['update_subcategory_message'.$row_show_category['subcategory_id']]);?>
				 <font style="font-size:12px; float:right;">Limit &nbsp;150 characters&nbsp;&nbsp;|&nbsp;&nbsp;<font id="subcategory_description_text<?php echo $row_show_category['subcategory_id'];?>"></font> characters remaining.</font></p>
				<textarea name="subcategory_description<?php echo $row_show_category['subcategory_id'];?>"  id="subcategory_description<?php echo $row_show_category['subcategory_id'];?>" placeholder="Category description..."><?php echo $row_show_category['subcategory_description'];?></textarea>
   				<script>
						$(document).ready( function() {
							var elem = $("#subcategory_description_text<?php echo $row_show_category['subcategory_id'];?>");
							$("#subcategory_description<?php echo $row_show_category['subcategory_id'];?>").limiter(150, elem);
						});
						</script>
            </td>

            <td class="alternate2" style="width:10%; text-align:center;">
				<input type="submit" value="Update" />
            </td> 
		</form>  
			<td class="alternate2" style="width:10%; text-align:center;">
			<?php
			$no_of_topic= mysql_num_rows(mysql_query("select * from topic_p where subcategory_id=$row_show_category[subcategory_id]"));
			if($no_of_topic==0)
			{?>
				<a href="?addcat=<?php echo $row_show_category['category_id'];?>&addsub=<?php echo $row_show_category['subcategory_id'];?>">Add new topic</a>

			<?php }
			else
			{?>
			<form action="">
				<input type="hidden" name="r" value="topic">
				<input type="hidden" name="categoryid" value="<?php echo $row_show_category['category_id'];?>">
				<input type="hidden" name="subcategory_id" value="<?php echo $row_show_category['subcategory_id'];?>">
		   		<input type="submit" value="View all Topic [<?php echo $no_of_topic;?>]" style=" padding:0px;width: 125px; background:none;color:#C10000; text-decoration:underline; " />
			</form>
			<?php 
			}?>
			</td>      
        </tr>

<?php	}	
}?>     
	</table>
</div>
