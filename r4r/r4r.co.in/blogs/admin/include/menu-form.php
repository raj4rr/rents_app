<?php if (!empty($menu->errors)): ?>
	<ul>
		<?php foreach ($category->errors as $error): ?>
			<li>
				<?= $error ?>
			</li>
		<?php endforeach; ?>
	</ul>
<?php endif; ?>
<p><a href="new-article.php">Add New Article</a> || <a href="new-category.php">Add New Categories</a> || <a href="category.php">All Categories</a> || <a href="menu.php">All Menu</a> || <a href="new-menu.php">Add New Menu</a></p>

<form method="post" id="formMenus">

	<div class="form-group">
		<label for="categories">Menus</label>
		<input class="form-control" type="text" name="menu_name" id="menu_name" placeholder="Insert Menu Name" value="<?= htmlspecialchars($menu->name); ?>">
	</div>

	<button class="btn">Save Menus</button>

</form>
