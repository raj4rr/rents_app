<?php
require '../include/init.php';

Auth::requireLogin();

$conn = require '../include/db.php';

// $paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 5); // by using ternary operator
$paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 5, Article::getTotal($conn));	 // php Null coalescing operator [if $_GET['page'] exist then it will show else other] + Total number of content

$articles = Article::getPage($conn, $paginator->limit, $paginator->offset);	

$countByDate = Article::getAllCountByDate($conn);	// Show articles with page containing 5 article limit and 0 offset value

?>

<?php require '../header.php'; ?>
<h2>Work Reports Daily</h2>

<p><a href="new-article.php">Add New Article</a> || <a href="new-category.php">Add New Categories</a> || <a href="category.php">All Categories</a> </p>

			<?php if (empty($articles)): ?>
				<p>Oops!.No articles are there.</p>
			<?php else: ?>
				<table class="table">

						<thead>
						<th>Date</th>
						<th>Count</th>
					</thead>
						<tbody>
							<?php foreach ($countByDate as $count): ?>
								<tr>

									<td>

											<time><?= $count['published_at'] ?></time>

									</td>
									<td>

											<?= $count['count'] ?>

									</td>
								</tr>
							<?php endforeach; ?>
						</tbody>
				</table>

				<?php //require '../include/pagination.php'; ?>

			<?php endif; ?>
<?php require '../include/footer.php' ?>
