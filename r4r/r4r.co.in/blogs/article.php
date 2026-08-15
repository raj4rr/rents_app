<?php
require 'include/init.php';

// PDO check PDO comments and look back earlier codes in project
$conn = require 'include/db.php';

if (isset($_GET['id']))
{
	$article = Article::getWithCategories($conn, $_GET['id'], true);	// PDO (function calling from Article class)
} else {
	$article = null;
}
//$top_articles = Article::getPage($conn, 100, 0, true);
$category_id=$article[0]['category_id'];
?>

<?php require 'include/header.php'; ?>
<div class="row">
 <div class="col-md-8">
			<?php if ($article): ?>

				<article class="glass-card animate-on-scroll">
					<div class="article-hero">
						<h2><?= htmlspecialchars($article[0]['title']); ?></h2>

						<time class="meta-time" datetime="<?= $article[0]['published_at'] ?>">
							<?php
									$datetime = new DateTime($article[0]['published_at']);
									echo $datetime->format("j F, Y");
							?>
						</time>

						<?php if ($article[0]['category_name']): ?>
							<div>
								<?php foreach ($article as $a): ?>
									<span class="category-pill"><?= htmlspecialchars($a['category_name']); ?></span>
								<?php endforeach; ?>
							</div>
						<?php endif; ?>

						<?php if ($article[0]['image_file']): ?>
							<img src="/blogs/uploads/<?= $article[0]['image_file']; ?>" alt="Content Image" style="margin-top:20px; border-radius:12px;">
						<?php endif; ?>
					</div>
					<div class="article-content">
						<p><?= ($article[0]['content']); ?></p>
					</div>
				</article>

			<?php else: ?>
				<p>No Article found.</p>
			<?php endif; ?>
			 </div>
			<div class="col-md-4">

    <!-- Search Widget -->

    <!-- Categories Widget -->

    <!-- Side Widget -->
    <div class="card my-4">

		<h5 class="card-header"> Top Blogs </h5>

							<?php 
								$top_articles = Article::getCPage($conn, 20, 0, true,$category_id);	

							foreach ($top_articles as $article): ?>

										<a href="/blogs/article/<?= $article['id']; ?>/<?= htmlspecialchars(str_replace(' ','-',str_replace('%','per',$article['url']))); ?>"><?= htmlspecialchars($article['title']); ?></a>
									<?php if ($article['published_at']): ?>
											Published at:- <time><?= $article['published_at'] ?></time>

										<?php endif; ?>

							<?php endforeach; ?>

    </div>
    <div class="card my-4">
     <h5 class="card-header"> R4R.co.in Team </h5>

     <div class="card-body">
      The content on R4R is created by expert teams.
        </div>
    </div>

   </div>
<?php require 'include/footer.php'; ?>
