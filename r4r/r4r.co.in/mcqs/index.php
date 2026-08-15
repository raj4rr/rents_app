<?php 
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
//include("header.php");
extract($_GET);
$title='MCQs : multiple choice questions and answers, Mock Tests and   Practice Papers';
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
   <meta name="description" content=" Mock Tests and   Practice Papers<?php if(isset($test)) echo ','.$test; ?>,<?php echo $subcat;  ?> MCQS,<?php echo $subcat;  ?> Mock Tests , <?php echo $subcat;  ?> Practice Papers ,<?php echo $subcat;  ?> Sample Test,<?php echo $subcat;  ?> Sample questions,<?php echo $subcat; ?>  MCQs: multiple choice questions and answers">
  <meta name="keyword" content=" Mock Tests,  Practice Papers,<?php if(isset($test)) echo $test.','; ?><?php echo $subcat;  ?> MCQS,<?php echo $subcat;  ?> Mock Tests , <?php echo $subcat;  ?> Practice Papers ,<?php echo $subcat;  ?> Sample Test,<?php echo $subcat;  ?> Sample questions,<?php echo $subcat; ?> Objetive choice questions and answers,<?php echo $subcat; ?> Multiple choice questions and answers,<?php echo $subcat; ?>  objective, <?php echo $subcat; ?> questions , <?php echo $subcat; ?> answers,<?php echo $subcat; ?> MCQs questions and answers">
  <meta name="author" content="Rajesh Kumar">

  <link href="/mcqs/css/modern-business.css" rel="stylesheet">
</head>
<body oncopy="return false" oncut="return false" onpaste="return false">
<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>
  <!-- Page Content -->
  <div class="container" style="margin-top: 80px;">

    <h1 class="mt-4 mb-3"><?php if(isset($ques)) echo $ques; ?><?php if(isset($test)) echo $test.'/'; ?><?php echo $subcat;  ?> MCQs<br/>
      <small></small>
    </h1>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
       <a href="../mcqs">Home</a>
      </li>
    </ol>

    <?php 
    if(isset($subid) && isset($testid)&& isset($que_id)) {
        $_SESSION['sid']=$subid;
        $_SESSION['tid']=$testid;
        $_SESSION['que_id']=$que_id;
        include("questions-main-page.php");
    } else if(isset($subid) && isset($testid)) {
        $_SESSION['sid']=$subid;
        $_SESSION['tid']=$testid;
        include("exams-main-page.php");
    } else if(isset($subid)) {
        $_SESSION['sid']=$subid;
        include("sublist-main-page.php");
    } else {
        include("main-page.php");
    }
    ?>

      <!-- Sidebar Widgets Column -->
      <div class="col-md-4">
        <!-- Search Widget -->
        <div class="card mb-4 glass-card">
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
      </div>
    </div>
  </div>
  <!-- Footer -->
  <?php include("footer.php"); ?>
  <script src="/mcqs/vendor/jquery/jquery.min.js"></script>
  <script src="/mcqs/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>
</html>
