<?php 
session_start();
error_reporting(0);
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
//include("header.php");
extract($_GET);
$title='MCQs: multiple choice questions and answers,NEET Mock Tests and  NEET Practice Papers';
if(isset($subcat))
{
$_SESSION['subcat']=$subcat;
$title=$subcat." ".$title;
}
if(isset($test))
$title=$test." ".$title;
?>

<!DOCTYPE html>
<html lang="en">

<head>
<title><?php echo $title; ?> </title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   <meta name="description" content="NEET Mock Tests and  NEET Practice Papers,<?php echo $test; ?>,<?php echo $subcat; ?>  MCQs: multiple choice questions and answers">
  <meta name="keyword" content="NEET Mock Tests, NEET Practice Papers,<?php echo $test; ?>,<?php echo $subcat; ?> Objetive choice questions and answers,<?php echo $subcat; ?> Multiple choice questions and answers,<?php echo $subcat; ?>  objective, <?php echo $subcat; ?> questions , <?php echo $subcat; ?> answers,<?php echo $subcat; ?> MCQs questions and answers">
  <meta name="author" content="Rajesh Kumar">

<script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
</script>
  <!-- Bootstrap core CSS -->
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="css/modern-business.css" rel="stylesheet">

</head>

<body>

  <!-- Navigation -->

     <?php 

include("header.php");
//include("header.php");

?>
  <!-- Page Content -->
  <div class="container">

    <!-- Page Heading/Breadcrumbs -->
    <h1 class="mt-4 mb-3"><?php echo $subcat; if(isset($test)) echo '/'.$test; ?> MCQs: multiple choice questions and answers. e.g Mock Tests , Practice Papers ,Sample Test,Sample questions
      <small></small>
    </h1>

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="/mcqs/">Home</a>
      </li>

    </ol>

    <?php 

$_SESSION['sid']=$subid;
$_SESSION['tid']=$testid;
include("sample-exams-main-page.php");

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
          <h5 class="card-header">R4R Team </h5>
          <div class="card-body">
            R4R provides <?php echo $subcat; ?> Multiple choice questions and answers (<?php echo $subcat; ?> MCQs) .The questions on R4R.co.in website is done by expert team!!
            NEET Mock Tests and  NEET Practice Papers for prepare yourself for the NEET medical exam.
          </div>
        </div>

      </div>

    </div>
    <!-- /.row -->

  </div>
  <!-- /.container -->
  <!-- Footer -->
     <?php 

include("footer.php");
//include("header.php");

?>

  <!-- Bootstrap core JavaScript -->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

</body>

</html>
