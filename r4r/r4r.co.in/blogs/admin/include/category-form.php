<?php if (!empty($category->errors)): ?>
	<ul>
		<?php foreach ($category->errors as $error): ?>
			<li>
				<?= $error ?>
			</li>
		<?php endforeach; ?>
	</ul>
<?php endif; ?>
<p><a href="new-article.php">Add New Article</a> || <a href="new-category.php">Add New Categories</a> || <a href="category.php">All Categories</a> || <a href="menu.php">All Menu</a> || <a href="new-menu.php">Add New Menu</a></p>

<form method="post" id="formCategories">

	<div class="form-group">
		<label for="categories">Categories</label>
		<input class="form-control" type="text" name="categories" id="categories" placeholder="Insert category Name" value="<?= htmlspecialchars($category->name); ?>">
	</div>
	<div class="form-group">
		<label for="main_menu">Main Menu</label>
			<select id="main_menu" name="main_menu">
				<?php foreach ($menus as $menu): ?>

								<option value="<?= $menu['id']; ?>" <?php if ($menu['id']==$category->menu): ?>selected<?php endif; ?>><?= htmlspecialchars($menu['name']); ?></option>

							<?php endforeach; ?>

			</select>
	</div>

	<button class="btn">Save Categories</button>

</form>
