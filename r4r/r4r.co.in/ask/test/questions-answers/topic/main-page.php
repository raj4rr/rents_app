
<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">

			<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

			$sql_topic=mysql_query("select * from  topic where publish='Y' and subcategory_id='$_REQUEST['subct']' order by update_date DESC");
						while($row_topic=mysql_fetch_array($sql_topic))
					{
				?>
		<div class="card mb-4">

          <div class="card-body">
		<h2 class="card-title"><?php echo $row_topic['topic_name'];?></h2>
		<p class="card-text"><?php echo $row_topic['topic_short_desc'];?></p>
				<a id="tpoic_sub" href="post.php?ct=<?php echo $_REQUEST['ct'];?>&subct=<?php echo $_REQUEST['subct'];?>&tp=<?php echo $row_topic['topic_id'];?>" title="<?php echo $row_topic['topic_name'];?>" class="btn btn-primary">Read More &rarr;</a>

		</div>
		   <div class="card-footer text-muted">
					Posted on <?php echo $row_topic['insert_date'];?> by
            <a href="#">R4R  Team</a>
          </div>
        </div>
		<?php 

			$description=$description.','.$row_topic['topic_short_desc'];
			$page_title=$page_title.','.$row_topic['topic_name'];

		$key_word=$key_word.','.$row_topic['topic_name'];

	//$key_word=substr($key_word,1);
		}?>
		 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="<?php echo $description; ?>">
  <meta name="keyword" content="<?php echo $key_word; ?>">

  <meta name="author" content="Rajesh Kumar">

  <title><?php echo $page_title; ?></title>

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
