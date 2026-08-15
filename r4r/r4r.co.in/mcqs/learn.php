<?php
session_start();
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
extract($_GET);

if(isset($subid))
$subid=$subid;
if(isset($test))
$test=$test;
if(isset($subcat))
$subcat=$subcat;

$title='MCQs | Multiple choice questions and answers | Mock Tests | Practice Papers | Practice Test | ';
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
  <meta name="description" content="Mock Tests ,Learn <?php if(isset($test)) echo $test; ?>,Learn <?php if(isset($subcat)) echo $subcat; ?>  MCQs: multiple choice questions and answers">
  <meta name="keyword" content="Learn <?php if(isset($test)) echo $test; ?>,Learn <?php if(isset($subcat)) echo $subcat; ?> Objetive choice questions and answers,<?php echo $subcat; ?> Multiple choice questions and answers,<?php echo $subcat; ?>  objective, <?php echo $subcat; ?> questions , <?php echo $subcat; ?> answers,<?php echo $subcat; ?> MCQs questions and answers">
  <meta name="author" content="Rajesh Kumar">

  <title>MCQs: multiple choice questions and answers</title>

</head>

<body oncopy="return false" oncut="return false" onpaste="return false">

  <!-- Navigation -->

     <?php 

include("header.php");
//include("header.php");

?>

  <!-- Page Content -->
  <div class="container">

    <!-- Page Heading/Breadcrumbs -->
      <h1 class="mt-4 mb-3">
		<?php if(isset($subcat)) echo $subcat; if(isset($test)) echo '/'.$test; ?> Sample Test,Sample questions
      <small></small>
    </h1>

<!-- r4rin-new -->

  </div>
  <!-- /.container -->
  <!-- Footer -->
     <?php 

include("footer.php");
//include("header.php");

?>

  <!-- Bootstrap core JavaScript -->

  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

</body>

</html>
