<div class="card my-4">
          <h5 class="card-header">Categories</h5>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">

				   <ul class="list-unstyled mb-0">

			<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

			$sqlsub_category=mysql_query("SELECT * from interviewsubcategory where category_id='$category_id' and publish='Y'");
								while($rowsub_category=mysql_fetch_array($sqlsub_category))
								{
				?>
                  <li>
                   	<a href="../interview-question/?request_id=<?php echo $rowsub_category['category_id'];?>-<?php echo $rowsub_category['interviewsubcategory_id'];?>">
											<?php if($category_id==$rowsub_category['category_id']){?>
											<p class="activetopic"><?php echo $rowsub_category['interviewsubcategory_name'];?></p><?php } else {?>
											<p class="inactivetopic"><?php echo $rowsub_category['interviewsubcategory_name'];?></p><?php }?>
										</a>											
                  </li>
                  <?php 

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
                  <?php 

				}?>

                </ul>
              </div>
            </div>
          </div>

<!-- r4rin -->

        </div>
