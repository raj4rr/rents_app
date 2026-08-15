<?php
require '../include/init.php';
Auth::requireLogin();
// PDO check PDO comments and look back earlier codes in project
$conn = require '../include/db.php';

if (isset($_GET['id']))  // validate the query_string
{

	$category = Category::getByID($conn, $_GET['id']);	// PDO (function calling from Article class)

	if(!$category)
	{
		die("Category not found.");
	}

} else {
	die("id not supplied, article not found.");
}

//$category_ids = array_column($article->getCategories($conn), 'id');
//$categories = Category::getAll($conn);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$category->name = $_POST['categories'];
	//$article->content = $_POST['content'];
	//$article->published_at = $_POST['published_at'];

	//$category_ids = $_POST['category'];

		if($category->update($conn)){
				//$article->setCategories($conn, $category_ids);
				Url::redirect("/blogs/admin/category.php");
			}
		}
?>
<link rel="stylesheet" type="text/css" href="admin_css/grid.css"/>
<link rel="stylesheet" type="text/css" href="admin_css/content.css"/>
<link type="text/css" rel="stylesheet" href="admin_js/jquery-te-1.4.0.css">
<script type="text/javascript" src="admin_js/jquery 1.6.4.js"></script>
<script type="text/javascript" src="admin_js/popup.js"></script>
<script src="admin_js/jquery.min.js"></script>
<script type="text/javascript" src="admin_js/jquery-te-1.4.0.min.js" charset="utf-8"></script>
<?php require '../include/header.php' ?>

<h2>Edit Article</h2>

<?php require 'include/category-form.php'; ?>

<?php require '../include/footer.php' ?>
<script src="/admin/admin_js/jquery.min.js"></script>
<script src="/admin/admin_js/text_limit.js"></script>  