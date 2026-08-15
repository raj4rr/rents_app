<?php
require '../include/init.php';

Auth::requireLogin();
// PDO check PDO comments and look back earlier codes in project
$conn = require '../include/db.php';

if (isset($_GET['id']))
{
	$article = Article::getWithCategories($conn, $_GET['id']);	// PDO (function calling from Article class)
} else {
	$article = null;
}
?>

<?php require '../header.php'; ?>
			<?php if ($article): ?>

				<article class="">
					<h2><?= htmlspecialchars($article[0]['title']); ?></h2>

					<?php if ($article[0]['published_at']): ?>
						<time><?= $article[0]['published_at'] ?></time>
					<?php else: ?>
						Unpublished
					<?php endif; ?>

					<?php if ($article[0]['category_name']): ?>
						<p>Categories:
							<?php foreach ($article as $a): ?>
								<?= htmlspecialchars($a['category_name']); ?>
							<?php endforeach; ?>
						</p>
					<?php endif; ?>

					<?php if ($article[0]['image_file']): ?>
						<img src="/articles/uploads/<?= $article[0]['image_file']; ?>" alt="Content Image" height="240" width="360">
					<?php endif; ?>
					<p><?= ($article[0]['content']); ?></p>
				</article>

				<a href="edit-article.php?id=<?= $article[0]['id']; ?>">Edit</a>

		    <a href="edit-article-image.php?id=<?= $article[0]['id']; ?>">Edit image</a>

			<?php else: ?>
				<p>No Article found.</p>
			<?php endif; ?>
<?php require '../footer.php'; ?>

