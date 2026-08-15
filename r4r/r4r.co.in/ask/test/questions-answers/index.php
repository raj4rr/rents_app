<?php 

include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
//include("header.php");
$category='';
if(isset($_GET['ct'])){
$category=$_GET['ct'];
}
?>

<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   <meta name="description" content="Python,tutorials,tutorial,programming,example,MCQs,Topics,Interview questions and answers">
  <meta name="keyword" content="Python,tutorials,tutorial,programming,spring,hibernate,example,MCQs,Interview questions and answers">
  <meta name="author" content="Rajesh Kumar">

  <title>Python,tutorials,tutorial,programming,example,MCQs,Topics,Interview questions and answers</title>

  <!-- Bootstrap core CSS -->
  <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="../css/modern-business.css" rel="stylesheet">

</head>

<body>

<?php 

include("../header.php");
//include("header.php");

?>
  <!-- Page Content -->
  <div class="container">

    <!-- Page Heading/Breadcrumbs -->
    <h1 class="mt-4 mb-3">Python Example & Tutorial understanding programming in easy ways.
      <small></small>
    </h1>

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="/">Home</a>
      </li>

    </ol>

    <?php 
include("../ads1.php");
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
            R4Rin Top Tutorials are Python,Hibernate ,Spring,Sturts.The content on R4R.in website is done by expert team not only with the help of books but along with the strong professional knowledge in all context like coding,designing, marketing,etc!
          </div>
        </div>

      </div>

    </div>
    <!-- /.row -->

  </div>
  <!-- /.container -->

<?php 

include("../footer.php");
//include("header.php");

?>

  <!-- Bootstrap PythonScript -->
  <script src="../vendor/jquery/jquery.min.js"></script>
  <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

</body>

</html>
