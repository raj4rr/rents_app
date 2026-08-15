<h1>Category</h1>
<div class="tableContent" style="font-size:13px;">
    <table width="100%">
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

	$sql_show_category = mysql_query("select * from category_p where userid='$_SESSION['employee_id']'");
	while ($row_show_category = mysql_fetch_array($sql_show_category))
	{
?>
<script>
	<?php if($row_show_category['publish']=='Y'){?>
		$(document).ready(function () {$("#publish<?php echo $row_show_category['category_id'];?>").attr("checked", true);});
	<?php }else {?>
		$(document).ready(function () {$("#publish<?php echo $row_show_category['category_id'];?>").attr("checked", false);});
	<?php }?>
</script>
	<form name="form<?php echo $row_show_category['category_id'];?>" action="update_category.php" method="post">
    	<tr>
        	<td class="alternate2" style="width:20%;">
           		<input type="hidden" name="update_id" value="<?php echo $row_show_category['category_id'];?>" />
                <p>Category name:</p>
				<input type="text" value="<?php echo $row_show_category['category_name'];?>" name="category_name<?php echo $row_show_category['category_id'];?>"  id="category_name<?php echo $row_show_category['category_id'];?>" style="width:92%;" />
            </td>
            <td class="alternate2" style="width:60%;">

            	 <p>Category description:&nbsp;&nbsp;<?php if(isset($_SESSION['update_category_message'.$row_show_category['category_id']])) {?>
				 <script type="text/javascript">
						$(document).ready( function() {$("#category_description<?php echo $row_show_category['category_id'];?>").focus();});
				</script>

				 <?php echo $_SESSION['update_category_message'.$row_show_category['category_id']];} unset($_SESSION['update_category_message'.$row_show_category['category_id']]);?>
				<font style="font-size:12px; float:right;">Limit &nbsp;150 characters&nbsp;&nbsp;|&nbsp;&nbsp;<font id="category_description_text<?php echo $row_show_category['category_id'];?>"></font> characters remaining.</font></p>
				<input type="text" name="category_description<?php echo $row_show_category['category_id'];?>"  id="category_description<?php echo $row_show_category['category_id'];?>" placeholder="Category description..." value="<?php echo $row_show_category['category_description'];?>" />
   				<script>
						$(document).ready( function() {
							var elem = $("#category_description_text<?php echo $row_show_category['category_id'];?>");
							$("#category_description<?php echo $row_show_category['category_id'];?>").limiter(150, elem);
						});
						</script>
				</p>
				<p>Category keyword:
				<font style="font-size:12px; float:right;">Limit &nbsp;100 characters&nbsp;&nbsp;|&nbsp;&nbsp;<font id="category_keyword_text<?php echo $row_show_category['category_id'];?>"></font> characters remaining.</font></p>
				<input type="text" name="category_keyword<?php echo $row_show_category['category_id'];?>"  id="category_keyword<?php echo $row_show_category['category_id'];?>" placeholder="Category keywords..." value="<?php echo $row_show_category['category_keyword'];?>" />
   				<script>
						$(document).ready( function() {
							var elem = $("#category_keyword_text<?php echo $row_show_category['category_id'];?>");
							$("#category_keyword<?php echo $row_show_category['category_id'];?>").limiter(100, elem);
						});
						</script>
				</p>

            </td>
           <td class="alternate2" style="width:10%;">
				<input type="checkbox" name="publish<?php echo $row_show_category['category_id'];?>" id="publish<?php echo $row_show_category['category_id'];?>" />Publish
            </td>
            <td class="alternate2" style="width:10%;">
				<input type="submit" value="Update" />
            </td>         
        </tr>
    </form>

<?php	}	?>     
	</table>
</div>
