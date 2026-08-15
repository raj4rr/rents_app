<?php
require '../include/init.php';

Auth::requireLogin();

$conn = require '../include/db.php';

// $paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 5); // by using ternary operator
$paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 500, Article::getTotal($conn));	 // php Null coalescing operator [if $_GET['page'] exist then it will show else other] + Total number of content

$menus = Menu::getPage($conn, $paginator->limit, $paginator->offset);		// Show articles with page containing 5 article limit and 0 offset value

?>

<?php require '../header.php'; ?>
<h2>Administrator</h2>

<p><a href="new-article.php">Add New Article</a> || <a href="new-category.php">Add New Categories</a> || <a href="category.php">All Categories</a> || <a href="menu.php">All Menu</a> || <a href="new-menu.php">Add New Menu</a></p>

			<?php if (empty($menus)): ?>
				<p>Oops!.No Menus are there.</p>
			<?php else: ?>
				<table class="table">
					<thead>
						<th>Menu ID</th>
						<th>Title</th>
						<th>Action</th>
					</thead>
						<tbody>
							<?php foreach ($menus as $menu): ?>
								<tr>
									<td>

										<?= htmlspecialchars($menu['id']); ?>
										</td>
									<td>

										<?= htmlspecialchars($menu['name']); ?>
										</td>
										<td>
										<a href="edit-menu.php?id=<?= $menu['id']; ?>">Edit</a>
									</td>

								</tr>
							<?php endforeach; ?>
						</tbody>
				</table>

				<?php //require '../include/pagination.php'; ?>

			<?php endif; ?>
<?php require '../footer.php' ?>
