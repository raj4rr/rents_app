
<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">

			<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

				extract($_GET);

				// 1. Fetch the specific question independently to ensure it displays even if the URL testid is mismatched
				$stm_q = $pdo->prepare("select * from mst_question_ans where que_id=:que_id");
				$stm_q->bindParam(":que_id", $que_id, PDO::PARAM_INT);
				$stm_q->execute();
				$specific_question = $stm_q->fetch(PDO::FETCH_NUM);

				if ($specific_question) {
				?>
		<div class="card mb-4">
           <div class="card-body">
			  <h2 class="card-title"><a href="?testid=<?php echo $specific_question[1]; ?>&que_id=<?php echo $specific_question[0]; ?>&subid=<?php echo $subid; ?>&subcat=<?php echo ($subcat); ?>&test=<?php echo ($test); ?>&ques=<?php echo ($specific_question[2]); ?>" ><?php echo nl2br($specific_question[2],true); ?></a></h2>
			  <p class="card-text"><?php echo nl2br($specific_question[3],true); ?></p>
		        <p class="card-text"><b>Posted Date</b>:- <?php echo $specific_question[4]; ?></p>
		   </div>
        </div>
		<?php 
				}

				// 2. Fetch all other questions in the test list
				$stm = $pdo->prepare("select * from mst_question_ans where test_id=:test_id order by que_id desc");
				$stm->bindParam(":test_id", $testid, PDO::PARAM_INT);
				$stm->execute();
				$rows = $stm->fetchAll(PDO::FETCH_NUM);

				foreach($rows as $row_test) {					
				?>
<p>					
<a href="?testid=<?php echo $row_test[1]; ?>&que_id=<?php echo $row_test[0]; ?>&subid=<?php echo $subid; ?>&subcat=<?php echo ($subcat); ?>&test=<?php echo ($test); ?>&ques=<?php echo ($row_test[2]); ?>" ><?php echo nl2br($row_test[2],true); ?></a></p>
<?php 				} ?>

        <!-- Pagination -->

      </div>
