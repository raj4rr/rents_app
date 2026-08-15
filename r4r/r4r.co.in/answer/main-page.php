
<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">

			<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

			$stm = $pdo->prepare("select * from mst_subject where status=2 order by `sub_name` DESC");
			$stm->execute();

			$rows = $stm->fetchAll(PDO::FETCH_NUM);
					foreach($rows as $row) {

			//$rs=mysql_query("select * from mst_subject where status=2 order by `sub_name` ASC");

				//while($rows=mysql_fetch_row($rs))
				//	{
				?>
		<div class="card mb-4">

          <div class="card-body">
		<h2 class="card-title"><?php echo $row[1]; ?></h2>
		<p class="card-text"><?php echo $row[2]; ?></p>
		<p class="card-text">All types of <?php echo $row[1]; ?> Experienced and fresher interview questions.This section covers <?php echo $row[1]; ?> interview questions and answers for freshers and experienced.It helps job seekers who are about to attend <?php echo $row[1]; ?> interview round.We provides <?php echo $row[1]; ?> interview questions and answers pdf for freshers and experienced.The pdf provided for users on special request.</p>

		<a href="?subid=<?php echo $row[0]; ?>&subcat=<?php echo urlencode($row[1]); ?>" class="btn btn-primary">More &rarr;</a>
		</div>

        </div>
		<?php 
		}?>

      </div>
