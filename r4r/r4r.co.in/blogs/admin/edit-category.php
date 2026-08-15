<?php
require '../include/init.php';
Auth::requireLogin();
// PDO check PDO comments and look back earlier codes in project
$conn = require '../include/db.php';

// $paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 5); // by using ternary operator
$paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 50, Article::getTotal($conn));	 // php Null coalescing operator [if $_GET['page'] exist then it will show else other] + Total number of content

$menus = Menu::getPage($conn, $paginator->limit, $paginator->offset);		// Show articles with page containing 5 article limit and 0 offset value

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
	$category->menu = $_POST['main_menu'];
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
<?php require '../header.php' ?>

<h2>Edit category</h2>

<?php require 'include/category-form.php'; ?>

<?php require '../footer.php' ?>
<script src="/admin/admin_js/jquery.min.js"></script>
<script src="/admin/admin_js/text_limit.js"></script>  
