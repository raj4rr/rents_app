<?php $title='R4R Blog -Free e-Learning site by expert Team across world.';
 $page_title=(isset($_GET['page']) ? 'Page-'.$_GET['page'] .' ': '').$title;
	$meta_desc=$page_title;
		$keyword=$page_title;
if (isset($_GET['title']))
{
	$page_title= $article[0]['title'];
	$keyword=$article[0]['keyword'];
	$meta_desc=$article[0]['meta_desc'];
		$page_title=str_replace('-',' ',$page_title);
	//$article = Article::getWithCategories($conn, $_GET['id'], true);	// PDO (function calling from Article class)
} else {

	if (isset($_GET['category']))
{
	//$page_title= $categories[0]['category'];
	$keyword=$page_title;
	$meta_desc=$page_title;
	//$article = Article::getWithCategories($conn, $_GET['id'], true);	// PDO (function calling from Article class)
}

	//$article = null;

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title><?php echo $page_title; ?></title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width , initial-scale=1 , shrink-to-fit=no">
<meta name="description" content="<?php echo $meta_desc; ?>">
<meta name="keyword" content="<?php echo $keyword.' ,'.$page_title; ?> ">
		<link rel="stylesheet" href="/blogs/css/bootstrap.min.css">
		<link rel="stylesheet"  href="/blogs/css/jquery.datetimepicker.min.css">
		<link rel="stylesheet"  href="/blogs/css/styles.css">

	</head>
	<body>
	<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/analytics.php'); ?>

	<nav class="navbar fixed-top navbar-expand-lg glass-nav">

      <div class="container-fluid">      

      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
	  <form class="form-inline my-2 my-lg-0">
     <div id="google_translate_element"></div>

    </form>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
		<li class="nav-item ">
          <a class="nav-link "  href="/blogs/" >      Home
        </a>

          </li>

				<?php if (Auth::isLoggedIn()): ?>

					<li class="nav-item"><a  href="/blogs/admin/" class="nav-link">Admin</a></li>

					<li class="nav-item"><a  href="/blogs/logout.php" class="nav-link">Logout</a></li>

				<?php else: ?>

						<li class="nav-item"><a  href="/blogs/login.php" class="nav-link">Login</a></li>

				<?php endif; ?>

					<!--<li class="nav-item"><a  href="/blogs/contact.php" class="nav-link">Contact</a></li> -->

        </ul>
      </div>
    </div>
  </nav>
		<div class="container">

		<hr/>
		<br/>

		<main>

<!-- Note that these links are for temporary purpose using relative links when placing project in htdocs -->
<!--In Production Use Relative paths. Not valid Here because no root directory specified (These Links might not work correctly)
Use These:
'/' for home
'/logout' for logout
'/login' for login
'/admin/' for admin
 -->
