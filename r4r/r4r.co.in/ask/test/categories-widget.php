<div class="card my-4">
          <h5 class="card-header">Categories</h5>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">
                <ul class="list-unstyled mb-0">

			<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 $sql_category=mysql_query("select * from category where publish='Y'");
				while($row_category=mysql_fetch_array($sql_category))
					{
				?>
                 <li>
                    <a href="/<?php echo $row_category['category'];?>/?ct=<?php echo $row_category['category_id'];?>"><?php echo $row_category['category_name'];?></a>
                  </li>
                   <li>
                    <a href="/<?php echo $row_category['category'];?>/interview-question/?request_id=<?php echo $row_category['category_id'];?>"><?php echo $row_category['category_name'];?> Interview Question Answers</a>
                  </li>
                  <?php 

				}?>

                </ul>
              </div>
              <div class="col-lg-6">
                <ul class="list-unstyled mb-0">
                  <li>
                    <a href="#">JavaScript</a>
                  </li>
                  <li>
                    <a href="#">CSS</a>
                  </li>
                  <li>
                    <a href="#">Tutorials</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

<!-- r4rin -->

        </div>
