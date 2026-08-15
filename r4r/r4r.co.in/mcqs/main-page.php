
<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">
        <div class="row animate-on-scroll">

			<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

					$stm = $pdo->prepare("select * from mst_subject where status=2 order by `start_date` DESC");
			$stm->execute();

			$rows = $stm->fetchAll(PDO::FETCH_NUM);
					foreach($rows as $row) {
				?>
        <div class="col-md-6 mb-4">
            <div class="card h-100 glass-card">
              <div class="card-body">
                <h2 class="card-title"><a href="?subid=<?php echo $row[0]; ?>&subcat=<?php echo $row[1]; ?>"><?php echo $row[1]; ?></a></h2>
                <p class="card-text text-muted"><?php echo $row[1]; ?> Mock Tests | Practice Papers | Sample Test</p>
                <a href="?subid=<?php echo $row[0]; ?>&subcat=<?php echo $row[1]; ?>" class="btn btn-primary mt-2">More &rarr;</a>
              </div>
            </div>
        </div>
		<?php 
		}?>

        </div>
      </div>
