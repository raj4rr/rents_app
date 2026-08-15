<?php if (!empty($category->errors)): ?>
	<ul>
		<?php foreach ($category->errors as $error): ?>
			<li>
				<?= $error ?>
			</li>
		<?php endforeach; ?>
	</ul>
<?php endif; ?>

<form method="post" id="formCategories">

	<div class="form-group">
		<label for="categories">Categories</label>
		<input class="form-control" type="text" name="categories" id="categories" placeholder="Insert category Name" value="<?= htmlspecialchars($category->name); ?>">
	</div>

	<button class="btn">Save Categories</button>

</form>
