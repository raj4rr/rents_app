
<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">
        <div class="row animate-on-scroll">

			<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

				extract($_GET);
				$stm = $pdo->prepare("select * from mst_test where sub_id=:subid and status=2 order by `sub_id` DESC");
			$stm->bindParam(":subid", $subid, PDO::PARAM_INT);
			$stm->execute();

			$rows = $stm->fetchAll(PDO::FETCH_NUM);
					foreach($rows as $row_test) {
				?>
        <div class="col-md-6 mb-4">
            <div class="card h-100 glass-card">
              <div class="card-body">
                <h2 class="card-title"><?php echo $row_test[2]; ?></h2>
                <p class="card-text text-muted"><?php echo $row_test[2]; ?> Mock Tests | Practice Papers | MCQs questions and answers</p>
                <div class="mt-3">
                  <a href="?testid=<?php echo $row_test[0]; ?>&subid=<?php echo $subid; ?>&subcat=<?php echo $subcat; ?>&test=<?php echo $row_test[2]; ?>" class="btn btn-primary btn-sm">Start Exam &rarr;</a>
                  <a href="learn.php?test_id=<?php echo $row_test[0]; ?>&subid=<?php echo $subid; ?>&subcat=<?php echo $subcat; ?>&test=<?php echo $row_test[2]; ?>" class="btn btn-secondary btn-sm ml-2">Learn</a>
                </div>
              </div>
            </div>
        </div>
		<?php 
		}?>

        </div>
      </div>
