
<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">

			<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

			if($subcategory_interview_id=='-1')
									  $sqlforquestion=mysql_query("SELECT * from interviewquestion WHERE  category_id='$category_id' and question_publish='Y'");
									 else

									 $sqlforquestion=mysql_query("SELECT * from interviewquestion WHERE interviewsubcategory_id='$subcategory_interview_id' and category_id='$category_id' and question_publish='Y'");

								while($rowforquestion=mysql_fetch_array($sqlforquestion))
					{
				?>
		<div class="card mb-4">

          <div class="card-body">
		<h2 class="card-title"><?php echo $rowforquestion['interviewquestion']; ?></h2>

		<a href="../interview-question-answers/?request_id=<?php echo $rowforquestion['category_id'].'-'.$rowforquestion['interviewsubcategory_id'] ?>&question_id=<?php echo $rowforquestion['interviewquestion_id']; ?>" class="btn btn-primary">Read More &rarr;</a>
		</div>
		   <div class="card-footer text-muted">
					Posted on Feb 2, 2019 by
            <a href="#">Rajesh Kumar</a>
          </div>
        </div>
		<?php 
		}?>

<!-- r4rcoin -->

        <!-- Pagination -->
        <ul class="pagination justify-content-center mb-4">
          <li class="page-item">
            <a class="page-link" href="#">&larr; Older</a>
          </li>
          <li class="page-item disabled">
            <a class="page-link" href="#">Newer &rarr;</a>
          </li>
        </ul>

      </div>
