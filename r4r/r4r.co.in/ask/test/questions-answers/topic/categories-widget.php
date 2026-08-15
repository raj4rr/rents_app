<div class="card my-4">
          <h5 class="card-header">Categories</h5>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">

				   <ul class="list-unstyled mb-0">

                 		<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 foreach($subcategory_list as $subcategorylist)
						{
						 if(isset($subcategorylist['subcategory_id']) && isset($subcategorylist['subcategory_name']) && isset($subcategorylist['category_id']))
						 {?>
							 <li><a<?php if($_REQUEST['subct']==$subcategorylist['subcategory_id']){echo ' class="active"';$sub_category=$subcategorylist['subcategory_name'];}?> href="../topic/?ct=<?php echo $subcategorylist['category_id'];?>&subct=<?php echo $subcategorylist['subcategory_id'];?>" title="<?php echo $subcategorylist['subcategory_name'];?>">
									<?php echo $subcategorylist['subcategory_name'];?>
							</a></li>
						<?php }
						}?>

                </ul>

              </div>
              <div class="col-lg-6">
               <ul class="list-unstyled mb-0">

			<?php $sql_category=mysql_query("select * from category where publish='Y'");
				while($row_category=mysql_fetch_array($sql_category))
					{
				?>
                  <li>
                    <a href="/<?php echo $row_category['category'];?>/?ct=<?php echo $row_category['category_id'];?>"><?php echo $row_category['category_name'];?></a>
                  </li>
                   <li>
                    <a href="../../<?php echo $row_category['category'];?>/interview-question/?request_id=<?php echo $row_category['category_id'];?>"><?php echo $row_category['category_name'];?> Interview Question Answers</a>
                  </li>
                  <?php 

				}?>

                </ul>
              </div>
            </div>
          </div>

<!-- r4rin -->

        </div>
