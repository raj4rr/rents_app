
<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">

			<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

				extract($_GET);
				$stm = $pdo->prepare("select * from mst_test where sub_id=:subid and status=2 order by test_id desc");
			$stm->bindParam(":subid", $subid, PDO::PARAM_INT);
			$stm->execute();

			$rows = $stm->fetchAll(PDO::FETCH_NUM);
					foreach($rows as $row_test) {

			//$rs_test=mysql_query("select * from mst_test where sub_id=$subid and status=2 order by test_name desc");
				//while($row_test=mysql_fetch_array($rs_test))
					//{
				?>
		<div class="card mb-4">

          <div class="card-body">
			  <h2 class="card-title"><?php echo $row_test[2]; ?></h2>
			  <p class="card-text"><?php echo $row_test[3]; ?></p>
			  <p class="card-text">Learn Experienced and freshers interview questions  <?php echo $row_test[2]; ?> Experienced and freshers interview questions for exams </p>

			<p> <strong>Total number of questions in this Interview Questions and Answers for Freshers & Experienced:-</strong><?php echo $row_test[4]; ?></p>
			<a href="?testid=<?php echo $row_test[0]; ?>&subid=<?php echo $subid; ?>&subcat=<?php echo ($subcat); ?>&test=<?php echo ($row_test[2]); ?>" class="btn btn-primary">Start Learning</a>

		</div>

        </div>
		<?php 
		}?>
		</div>

        <!-- Pagination -->
    <!-- Blog Entries Column -->
      <div class="col-md-8">

			<?php 
				extract($_GET);
				$stm = $pdo->prepare("select * from mst_test where sub_id=:subid and status=2 order by test_id desc");
			$stm->bindParam(":subid", $subid, PDO::PARAM_INT);
			$stm->execute();

			$rows = $stm->fetchAll(PDO::FETCH_NUM);
					foreach($rows as $row_test) {

			//$rs_test=mysql_query("select * from mst_test where sub_id=$subid and status=2 order by test_name desc");
				//while($row_test=mysql_fetch_array($rs_test))
					//{
				?>
		<div class="card mb-4">

          <div class="card-body">
			  <h2 class="card-title"><?php echo $row_test[2]; ?></h2>
			  <p class="card-text"><?php echo $row_test[3]; ?></p>
			  <p class="card-text">Learn parctice MCQS set for any exams <?php echo $row_test[2]; ?> MCQS PAPER SET Sample Test,Sample questions</p>
			  <p> <strong>Total number of questions in this MCQS Test Smaple Papers:-</strong><?php echo $row_test[4]; ?></p>
			<a href="/mcqs/?testid=<?php echo $row_test[0]; ?>&subid=<?php echo $subid; ?>&subcat=<?php echo ($subcat); ?>&test=<?php echo ($row_test[2]); ?>" class="btn btn-primary">Start Exam &rarr;</a>
		    <a href="/mcqs/learn.php?test_id=<?php echo $row_test[0]; ?>&subid=<?php echo $subid; ?>&subcat=<?php echo ($subcat); ?>&test=<?php echo ($row_test[2]); ?>" class="btn btn-primary">Learn</a>

		</div>

        </div>
		<?php 
		}?>

      </div>
