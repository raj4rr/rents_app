<table style="width:100%;">
	<tr>
    	<td style=" width:60%; padding:5px;">
        <h1>Insert new Topic</h1>
        <?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 if(isset($_SESSION['validate_message']))
                   { ?>
                    <p style="font-size:13px; margin:3px; color:red; background:#FFFF93; padding:6px;">
                    <?php   foreach($_SESSION['validate_message'] as $validate_message)
                       echo $validate_message;
                       unset($_SESSION['validate_message']);?>
                     </p>
                  <?php }?>
        	 <FORM name="topic_submit_form" method="POST" action="insert_new_topic.php">
            <div class="tableContent" style="border-bottom:none;">
            	<table width="100%">

				<tr>
                    <td class="alternate1">
                        <select name="category_id" id="category_id">
                            <option value="0">--Select Category--</option>
                            <?php $sql_category = mysql_query("select * from category where publish='Y' and userid='$_SESSION['employee_id']'");
                            while ($row_category = mysql_fetch_array($sql_category))
                            { 
								if($row_category['category_id']==$_REQUEST['addcat']){?>
                                <option value="<?php echo $row_category['category_id']; ?>" selected>
									<?php echo $row_category['category_name']; ?></option>	
                            <?php }else
							{?> 
							<option value="<?php echo $row_category['category_id']; ?>">
									<?php echo $row_category['category_name']; ?></option>
					<?php	}
						}?>
                        </select>
                        <script>
						<?php if(isset($_REQUEST['addcat']) && !isset($_REQUEST['addsub']))
						{?>
							load_subcategory(<?php echo $_REQUEST['addcat'];?>);
						<?php
						}?>
						$( "#category_id" ).change(function() {
							load_subcategory(this.value);
							$('#new_subcategory_element').hide();
						});
						</script>
                    </td>
                    <td class="alternate1">

                        <select name="subcategory_id" id="subcategory_id" style="float:right;">
							<?php if(isset($_REQUEST['addsub']))
							{
								$row_subcategory = mysql_fetch_array(mysql_query("select * from subcategory where subcategory_id='$_REQUEST['addsub']'"));?>
								<option value="<?php echo $row_subcategory['subcategory_id']; ?>" selected><?php echo $row_subcategory['subcategory_name']; ?>
								</option>
							<?php }
							else {?>
                            <option value="0">--Select subcategory--</option>
                        <?php }?>
						</select>
                        <script>
						$( "#subcategory_id" ).change(function() {
							if(this.value=='other')
							{	$('#new_subcategory_element').fadeIn();
								$('#new_subcategory').removeAttr('disabled');
								$('#subcategorydescription').removeAttr('disabled');
							}else{
								$('#new_subcategory_element').hide();
							}
						});
						</script>
                    </td>
                </tr>
                <tr id="new_subcategory_element" style="display:none;">
                <td colspan="2" class="alternate1" style="background:#FFE6D9;">
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
                <tr>
                	<td colspan="2" class="alternate1">
                     <p>Topic:</p>

                    <input type="text" name="topic" id="topic" placeholder="Topic...">

                    </td>
                </tr>
                <tr>
                	<td colspan="2" class="alternate1">
                     <p>Topic short description:<font style="font-size:12px; float:right;">Between 130 to 150 characters&nbsp;&nbsp;|&nbsp;&nbsp;<font id="topic_short_description_text"></font> characters remaining.</font></p>
                    <textarea name="topic_short_description" id="topic_short_description" placeholder="Topic short description..."></textarea>
                    </td>
                    <script>
						$(document).ready( function() {
							var elem = $("#topic_short_description_text");
							$("#topic_short_description").limiter(150, elem);
						});
						</script>
                </tr>
                <tr>
                	<td colspan="2" class="alternate1">
           <p>Meta data keywords:<font style="font-size:12px; float:right;">Between 220 to 250 characters&nbsp;&nbsp;|&nbsp;&nbsp;<font id="metakeys_description_text"></font> characters remaining.</font></p>
                    	<textarea name="metakeys" id="metakeys" placeholder="Meta data keywords..."></textarea>

                        <script>
						$(document).ready( function() {
							var elem = $("#metakeys_description_text");
							$("#metakeys").limiter(250, elem);
						});
						</script>
                    </td>
                </tr>
            </table>
           </div>

           <table width="100%" style="background:#EAEAEA;">
                <tr>
                	<td colspan="2" style="width:100%;">

<script type="text/javascript" src="admin_js/jquery-te-1.4.0.min.js" charset="utf-8"></script>
<textarea name="topic_full_description" id="topic_full_description" class="jqte-test" placeholder="Topic full description..."></textarea>
<script>
	$('.jqte-test').jqte();
</script>

         </td>

                </tr>
            </table>
                <table style="margin-top:15px;">
                     <tr>
                        <td colspan="2" style="width:100%; text-align:right;"><input type="reset" title="Reset"  />&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" value="Submit" title="Submit"  /></td>
                    </tr>
            	</table>
          </FORM>	

        </td>
        <td style="width:40%; vertical-align:top;padding:5px;">

            <h1>upload Image</h1>
            <div style="height:70px;">
            <table style="width:100%;">
            	<tr>
                	<td style="width:30%;">
                        <div class="upload"><input type="file" name="upload_image" id="upload_image" /></div>
                        <script type="text/javascript">
                        $("#upload_image").change(function() {
                                var input = document.getElementById("upload_image"), 
                                formdata = false
                                formdata = new FormData();
                                input.addEventListener("change", function (evt) 
                                {

                                    document.getElementById("upload_image_validation").innerHTML = "Uploading . . ."
                                    var i = 0, len = this.files.length, img, reader, file;

                                    for ( ; i < len; i++ ) {
                                        file = this.files[i];
                                        if (!!file.type.match(/image.*/)) {
                                            if ( window.FileReader ) {
                                                reader = new FileReader();
                                                reader.readAsDataURL(file);
                                            }
                                            if (formdata) {
                                                formdata.append("upload_image", file);
                                            }
                                        }	
                                    }
                                    if (formdata) {
                                        var folder_name= $("select[name='category_id'] option:selected").text();
                                        $.ajax({
                                            url: "upload_image.php?folder_name="+folder_name,
                                            type: "POST",
                                            data: formdata,
                                            processData: false,
                                            contentType: false,
                                            success: function (res) {
                                                document.getElementById("upload_image_validation").innerHTML = res; 
                                                $("#upload_image").val('');
                                            }
                                        });
                                    }
                                }, false);
                            }());

                        </script>
                     </div>
                    </td>
                    <td style="width:70%; vertical-align:middle;">
                    	<p id="upload_image_validation">
                        <font style='color:red;'>Upload only .png extension. Only Width: 550px allowed</font>
                        </p>
                    </td>
                </tr>
            </table>

             <p>&nbsp;</p>
             <h1>Today topic</h1>
              <div id="newtopic">
            <?php 
			$sqlfortopic=mysql_query("SELECT * from topic WHERE publish='N' and admin_id='$_SESSION['employee_id']' order by topic_id DESC");
			while($rowfortopic=mysql_fetch_array($sqlfortopic))
			{?>
            <p style="padding:5px 5px 5px 10px; border-radius:3px; background:#FDF0B0; line-height:18px; font-size:13px;"><?php echo $rowfortopic['topic_name'];?><font style="float:right;"><a href="?r=update&update_topic_id=<?php echo $rowfortopic['topic_id'];?>">edit</a>&nbsp;&nbsp;<a href="">view</a></font></p>
			<?php }?>
           </div>
           <script>
			$(document).ready( function() {
				if($('#newtopic').height() >  '250')
				$("#newtopic").css('overflow','scroll').css('overflow-x','hidden');
			});
			</script>
            <p>&nbsp;</p>
           <p><b>Tips</b>

		<ol>
			<li>
		The 500 to 2000 word articles.
		</li><li>
		Articles description shloud be heading wise and Only main points in bullet.
		</li>
		</ol>
		</p>
        </td>
	</tr>

</table>

