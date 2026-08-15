
<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">

			<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

				extract($_GET);
				$stm = $pdo->prepare("select * from mst_question_ans where test_id=:test_id order by test_id desc");
			$stm->bindParam(":test_id", $testid, PDO::PARAM_INT);
			$stm->execute();

			$rows = $stm->fetchAll(PDO::FETCH_NUM);
					foreach($rows as $row_test) {

			//$rs_test=mysql_query("select * from mst_test where sub_id=$subid and status=2 order by test_name desc");
				//while($row_test=mysql_fetch_array($rs_test))
					//{
				?>
		<div class="card mb-4">

          <div class="card-body">
			  <h2 class="card-title"><a href="?testid=<?php echo $row_test[1]; ?>&que_id=<?php echo $row_test[0]; ?>&subid=<?php echo $subid; ?>&subcat=<?php echo urlencode($subcat); ?>&test=<?php echo urlencode($test); ?>&ques=<?php echo urlencode($row_test[2]); ?>" ><?php echo nl2br($row_test[2],true	); ?></a></h2>
			  <p class="card-text"><?php echo nl2br($row_test[3],true); ?></p>

		</div>

        </div>
		<?php 
		}?>

        <!-- Pagination -->

      </div>
