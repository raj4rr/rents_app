<?php
require '../include/init.php';

//Auth::requireLogin();

	$article =  new Article();

	$category_ids = [];  // as there is no category initially so we initialise it with empty array

	$conn = require '../include/db.php';

$paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 50, Article::getTotal($conn));	 // php Null coalescing operator [if $_GET['page'] exist then it will show else other] + Total number of content

$menus = Menu::getPage($conn, $paginator->limit, $paginator->offset);

	$categories = Category::getAll($conn);

	if ($_SERVER["REQUEST_METHOD"] == "POST") {

					$article->title = trim($_POST['title']);
			$article->url = trim($_POST['url']);
			$article->main_menu = $_POST['main_menu'];

			$article->keyword = trim($_POST['keyword']);
			$article->meta_desc = $_POST['meta_desc'];
		$article->content = $_POST['content'];
		$article->published_at = $_POST['published_at'];

		$category_ids = $_POST['category'];

		if($article->create($conn)){
			$article->setCategories($conn, $category_ids);
			Url::redirect("/blogs/admin/article.php?id={$article->id}"); // relative path
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

<h2>New Article</h2>

<?php require 'include/article-form.php'; ?>

<?php require '../footer.php' ?>
<script src="/admin/admin_js/jquery.min.js"></script>
<script src="/admin/admin_js/text_limit.js"></script>  
