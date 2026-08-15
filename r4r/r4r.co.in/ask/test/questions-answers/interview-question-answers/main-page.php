
<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">

		<div class="card mb-4">

          <div class="card-body">
		<h2 class="card-title"><?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 echo $rowforquestion['interviewquestion']; ?></h2>
	 <p class="card-text"><?php echo stripslashes($rowforquestion['interviewquestion_description']); ?></p>

		<a href="?request_id=<?php echo $_REQUEST['request_id'] ?>&question_id=<?php echo $rowforquestion['interviewquestion_id']; ?>" class="btn btn-primary">Read More &rarr;</a>
		</div>
		   <div class="card-footer text-muted">
					Posted on Feb 2, 2019 by
            <a href="#">Rajesh Kumar</a>
          </div>

<!-- r4rcoin -->

        </div>
			<?php 	$sqlforquestion1=mysql_query("SELECT * from interviewquestion WHERE interviewsubcategory_id='$subcategory_interview_id' and category_id='$category_id' and question_publish='Y'");
								while($rowforquestion1=mysql_fetch_array($sqlforquestion1))
								{?>	
									 <div class="card-title">
									<p>
											<a href="?request_id=<?php echo $_REQUEST['request_id'] ?>&question_id=<?php echo $rowforquestion1['interviewquestion_id']; ?>">
											<?php echo $rowforquestion1['interviewquestion']; ?></a>
											</p>

									</div>
								<?php }?>

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
