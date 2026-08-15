<?php
require '../include/init.php';

Auth::requireLogin();

$conn = require '../include/db.php';

// $paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 5); // by using ternary operator
$paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 5, Article::getTotal($conn));	 // php Null coalescing operator [if $_GET['page'] exist then it will show else other] + Total number of content

$categories = Category::getPage($conn, $paginator->limit, $paginator->offset);		// Show articles with page containing 5 article limit and 0 offset value

?>

<?php require '../include/header.php'; ?>
<h2>Administrator</h2>

<p><a href="new-category.php">Add New Categories</a></p>

			<?php if (empty($categories)): ?>
				<p>Oops!.No categories are there.</p>
			<?php else: ?>
				<table class="table">
					<thead>
						<th>Title</th>
						<th>Action</th>
					</thead>
						<tbody>
							<?php foreach ($categories as $category): ?>
								<tr>
									<td>

										<?= htmlspecialchars($category['name']); ?>
										</td>
										<td>
										<a href="edit-category.php?id=<?= $category['id']; ?>">Edit</a>
									</td>

								</tr>
							<?php endforeach; ?>
						</tbody>
				</table>

				<?php require '../include/pagination.php'; ?>

			<?php endif; ?>
<?php require '../include/footer.php' ?>
