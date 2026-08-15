<?php
require '../include/init.php';

Auth::requireLogin();

$conn = require '../include/db.php';

// $paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 5); // by using ternary operator
$paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 40, Article::getTotal($conn));	 // php Null coalescing operator [if $_GET['page'] exist then it will show else other] + Total number of content

$articles = Article::getPage($conn, $paginator->limit, $paginator->offset);		// Show articles with page containing 5 article limit and 0 offset value

?>
<link rel="stylesheet" type="text/css" href="/articles/admin/admin_css/grid.css"/>
<link rel="stylesheet" type="text/css" href="/articles/admin/admin_css/content.css"/>

<?php require '../header.php'; ?>
<h2>Administrator</h2>
<a href="/sitemaps/" target="_new">Sitemap</a> ||
<a href="/articles/showallimg.php" target="_new">Show all images</a> ||
<a href="/articles/admin/upload.html" target="_new">Upload images</a> ||
<br/>Create html source code using any website - 
1. https://wordtohtml.net/  & 2.https://wordhtml.com/
<hr>
<p><a  href="/interview-questions-answers/post/">POST INTERVIEW QUESTION AND ANSWERS</a>
<p><a  href="workstatus.php">Daily Work</a>
<p><a href="new-article.php">Add New Article</a> || <a href="new-category.php">Add New Categories</a> || <a href="category.php">All Categories</a> || <a href="menu.php">All Menu</a> || <a href="new-menu.php">Add New Menu</a></p>

			<?php if (empty($articles)): ?>
				<p>Oops!.No articles are there.</p>
			<?php else: ?>
				<table class="table">
					<thead>
						<th>Title</th>
						<th>Published at</th>
					</thead>
						<tbody>
							<?php foreach ($articles as $article): ?>
								<tr>
									<td>
										<a href="article.php?id=<?= $article['id']; ?>"><?= htmlspecialchars($article['title']); ?></a>
									</td>
									<td>
										<?php if ($article['published_at']): ?>
											<time><?= $article['published_at'] ?></time>
										<?php else: ?>
												Unpublished
												<button class="btn publish" data-id="<?= $article['id'] ?>">Publish</button>
										<?php endif; ?>
									</td>
								</tr>
							<?php endforeach; ?>
						</tbody>
				</table>

				<?php require '../include/pagination.php'; ?>

			<?php endif; ?>
<?php //require '../footer.php' ?>
