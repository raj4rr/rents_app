<?php
require 'include/init.php';

$conn = require 'include/db.php';

// $paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 5); // by using ternary operator
$paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 50, Article::getTotal($conn, true));	 // php Null coalescing operator [if $_GET['page'] exist then it will show else other] + Total number of content

$articles = Article::getPage($conn, $paginator->limit, $paginator->offset, true);		// Show articles with page containing 5 article limit and 0 offset value
$top_articles = Article::getPage($conn, 100, 0, true);	
?>

<?php require 'include/header.php'; ?>
<div class="row">
 <div class="col-md-8">
			<?php if (empty($articles)): ?>
				<p>Oops!.No articles are there.</p>
			<?php else: ?>
			<?php require 'include/pagination.php'; ?>
				<div class="row">
					<?php foreach ($articles as $article): ?>
						<div class="col-lg-6 col-md-12 mb-4">
							<article class="glass-card animate-on-scroll">
								<?php if ($article['image_file']): ?>
								<img src="/blogs/uploads/<?php echo  $article['image_file']; ?>" alt="Content Image">
								<?php endif; ?>

								<?php if ($article['category_names']): ?>
									<div>
										<?php foreach ($article['category_names'] as $name): ?>
											<span class="category-pill"><?php echo  htmlspecialchars($name); ?></span>
										<?php endforeach; ?>
									</div>
								<?php endif; ?>

								<h2><a href="/blogs/article/<?php echo  $article['id']; ?>/<?php echo  htmlspecialchars(str_replace(' ','-',str_replace('%','per',$article['url']))); ?>"><?php echo  htmlspecialchars($article['title']); ?></a></h2>

								<time class="meta-time" datetime="<?php echo  $article['published_at'] ?>">
									<?php
											$datetime = new DateTime($article['published_at']);
											echo $datetime->format("j F, Y");
									?>
								</time>

								<p><?php echo  substr(strip_tags($article['content']),0,120); ?>...</p>
							</article>
						</div>
					<?php endforeach; ?>
				</div>

				<?php require 'include/pagination.php'; ?>
			<?php endif; ?>
			<!-- Sidebar Widgets Column -->
			  </div>
   <div class="col-md-4">

    <!-- Search Widget -->

    <!-- Categories Widget -->

    <!-- Side Widget -->
	 <div class="card my-4">
     <h5 class="card-header"> Top Blogs </h5>

							<?php foreach ($top_articles as $article): ?>

										<a href="/blogs/article/<?php echo  $article['id']; ?>/<?php echo  htmlspecialchars(str_replace(' ','-',str_replace('%','per',$article['url']))); ?>"><?php echo  htmlspecialchars($article['title']); ?></a>
									<?php if ($article['published_at']): ?>
											Published at:- <time><?php echo  $article['published_at'] ?></time>

										<?php endif; ?>

							<?php endforeach; ?>

    </div>

  <div class="card my-4">
     <h5 class="card-header"> R4R Team </h5>

     <div class="card-body">
      The content on R4R.co.in website is created by expert teams.We have vistots from India, Afghanistan, Bahrain, Bhutan, Canada, France, Germany, Iraq, Japan, Kenya, Kuwait, Maldives, Nepal, Netherlands, Nigeria, Oman, Qatar, Russia, Rwanda, Seychelles, Tanzania, Ukraine, UAE, UK, USA etc
        </div>
    </div>

   </div>

  </div>
<?php require 'include/footer.php' ?>
