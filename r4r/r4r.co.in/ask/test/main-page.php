
<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">

			<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 $sql_category=mysql_query("select * from category where publish='Y' order by category_id desc");
				while($row_category=mysql_fetch_array($sql_category))
					{
				?>
		<div class="card mb-4">

          <div class="card-body">
		<h2 class="card-title"><?php echo $row_category['category_name'];?></h2>
		<p class="card-text"><?php echo $row_category['category_description'];?></p>

		<a href="questions-answers/?ct=<?php echo $row_category['category_id'];?>" class="btn btn-primary">Read More &rarr;</a>
		</div>
		   <div class="card-footer text-muted">
					Posted on <?php echo $row_category['category_update_date'];?> by
            <a href="#">R4R <?php echo $row_category['category'];?> Team</a>
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
