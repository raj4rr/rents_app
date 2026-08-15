<div class="card my-4">
          <h5 class="card-header">Categories</h5>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">
                <ul class="list-unstyled mb-0">

				<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

				extract($_GET);

				$stm = $pdo->prepare("select * from mst_test where sub_id=:subid and status=2");
			$stm->bindParam(":subid", $subid, PDO::PARAM_INT);
			$stm->execute();

			$rows = $stm->fetchAll(PDO::FETCH_NUM);
					foreach($rows as $row) {	
			//$rs=mysql_query("");
			//while($row=mysql_fetch_row($rs))
				//{
					?>

                  	<li>
                  <a href="/mcqs/?testid=<?php echo $row[0]; ?>&subid=<?php echo $subid; ?>&subcat=<?php echo $subcat; ?>&test=<?php echo $row[2]; ?>"><font size=4><?php echo $row[2]; ?></font></a>
                  </li>

                  <?php 

				}?>

                </ul>
              </div>
              <div class="col-lg-6">
                <ul class="list-unstyled mb-0">
                <?php
				//$rs=mysql_query("select * from mst_subject where status=2 order by `sub_name` ASC");
				//while($rows=mysql_fetch_row($rs))
				//	{

				$stm = $pdo->prepare("select * from mst_subject where status=2 order by `sub_name` ASC");
			//$stm->bindParam(":subid", $subid, PDO::PARAM_INT);
			$stm->execute();

			$rows = $stm->fetchAll(PDO::FETCH_NUM);
					foreach($rows as $row) {			
					?>

					<li>
                    <a href="/mcqs/?subid=<?php echo $row[0]; ?>&subcat=<?php echo $row[1]; ?>"> <?php echo $row[1]; ?> </a>
                  </li>

               <?php 
				}
				?>
                </ul>
              </div>
            </div>
          </div>
        </div>
