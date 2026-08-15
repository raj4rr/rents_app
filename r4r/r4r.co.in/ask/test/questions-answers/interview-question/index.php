<?php 

include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
include("../../functions.php");
//include("header.php");

 $request_id=$_REQUEST['request_id'];
 $request_id=explode("-",$request_id);
 $category_id=$request_id[0];
 $subcategory_interview_id='-1';
 if (isset($request_id[1]))
 $subcategory_interview_id=$request_id[1];
 $categoryname=getcategoryname($category_id);
 $subcategoryname=getintersubcategoryname($subcategory_interview_id);
 $metakeys=$categoryname." Interview Question and Answer, ".$categoryname." Interview Questions and Answers";

 ?>

<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title><?php echo $subcategoryname;?> <?php echo $categoryname;?> interview questions and answers,<?php echo $categoryname;?> interview questions,<?php echo $categoryname;?> questions and answers,<?php echo $categoryname;?> questions</title>
<META name="description" CONTENT="<?php echo $subcategoryname;?> ,<?php echo $categoryname;?> interview questions and answers,<?php echo $categoryname;?> interview questions,<?php echo $categoryname;?> questions and answers,<?php echo $categoryname;?> questions">
<META name="keywords" CONTENT="<?php echo $subcategoryname;?> ,<?php echo $categoryname;?> interview questions and answers,<?php echo $categoryname;?> interview questions,<?php echo $categoryname;?> questions and answers,<?php echo $categoryname;?> questions">

  <!-- Bootstrap core CSS -->
  <link href="../../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="../../css/modern-business.css" rel="stylesheet">

</head>

<body>

<?php 

include("../../header.php");
//include("header.php");

?>

  <!-- Page Content -->
  <div class="container">

    <!-- Page Heading/Breadcrumbs -->
    <h1 class="mt-4 mb-3">Example & Tutorial understanding programming in easy ways.
      <small></small>
    </h1>

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="/">Home</a>
      </li>

    </ol>

    <?php 
include("../../ads1.php");
include("main-page.php");
//include("header.php");

?>

      <!-- Sidebar Widgets Column -->
      <div class="col-md-4">

        <!-- Search Widget -->
        <div class="card mb-4">
          <h5 class="card-header">Search</h5>
          <div class="card-body">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for...">
              <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div>

        <!-- Categories Widget -->
        <?php 

include("categories-widget.php");
//include("header.php");

?>

        <!-- Side Widget -->
        <div class="card my-4">
          <h5 class="card-header"> R4R Team </h5>
          <div class="card-body">
            R4Rin Top Tutorials are Core Java,Hibernate ,Spring,Sturts.The content on R4R.in website is done by expert team not only with the help of books but along with the strong professional knowledge in all context like coding,designing, marketing,etc!
          </div>
        </div>

      </div>

    </div>
    <!-- /.row -->

  </div>
  <!-- /.container -->

<?php 

include("../../footer.php");
//include("header.php");

?>

  <!-- Bootstrap core JavaScript -->
  <script src="../../vendor/jquery/jquery.min.js"></script>
  <script src="../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

</body>

</html>
