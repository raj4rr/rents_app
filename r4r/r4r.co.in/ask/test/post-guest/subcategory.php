				<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
					$sql_subcategory = mysql_query("select * from subcategory where category_id='$_REQUEST['parameter_id']' and  publish='Y'");?>				<option value="0">--Select subcategory--</option>
                    <option value="other">--New subcategory--</option>
				<?php 	while ($row_subcategory = mysql_fetch_array($sql_subcategory))
					{ ?>
                        <option value="<?php echo $row_subcategory['subcategory_id']; ?>">
                            <?php echo $row_subcategory['subcategory_name']; ?>
                        </option>	
					<?php }?>
					