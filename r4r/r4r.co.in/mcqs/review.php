<?php
session_start();
extract($_POST);
extract($_SESSION);
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
if($submit=='Finish')
{

	$nrows = $pdo->exec("delete from mst_useranswer where sess_id='".session_id()."'");
	//$nrows->bindValue(1, session_id());
	//$nrows->execute();
	$_SESSION['qnr']=0;
	$_SESSION['trueans']=0;
	//mysql_query("delete from mst_useranswer where sess_id='" . session_id() ."'") or die(mysql_error());
	unset($_SESSION['qnr']);
	header("Location: index.php?subid=".$sid);
	exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   <meta name="description" content="MCQs: multiple choice questions and answers">
  <meta name="keyword" content="MCQs: multiple choice questions and answers">
  <meta name="author" content="Rajesh Kumar">

  <title>MCQs: multiple choice questions and answers</title>
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
    <h1 class="mt-4 mb-3">MCQs: multiple choice questions and answers.
      <small></small>
    </h1>

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="index.html">Home</a>
      </li>

    </ol>

<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">
<div class="card mb-4">

          <div class="card-body">

<?php

//echo "<h2 class='card-title'>Review Test Question</h2>";

if(!isset($_SESSION['qnr']))
{
		$_SESSION['qnr']=0;
}
else if($submit=='Next Question' )
{
	$_SESSION['qnr']=$_SESSION['qnr']+1;

}
if(!isset($_SESSION['login']) )
{
	header("location: index.php");
}

//$rs=mysql_query("select * from mst_useranswer where sess_id='" . session_id() ."'") or die(mysql_error());
//mysql_data_seek($rs,$_SESSION['qnr']);
//$row= mysql_fetch_row($rs);
$stm = $pdo->prepare("select * from mst_useranswer where sess_id= ?");
//echo $_SESSION['qn'];
//echo '<br>Test ID:-'.$testid;
$stm->bindValue(1, session_id());
$stm->execute();
$ncols = $stm->rowCount();
//echo "Number Of Rwos:-".$ncols;
$stm->setFetchMode(PDO::FETCH_NUM);
//$stm->setFetchMode(PDO::FETCH_ASSOC);
$arrayData = $stm->fetchAll();
//echo $arrayData[0][7];
$row = $arrayData[$_SESSION['qnr']];

echo "<form name=myfm method=post action=review.php>";

$n=$_SESSION['qnr']+1;
echo "<h2 class='card-title'>Question :-".  $n .": $row[2]</h2>";
echo "<p class='card-text'><input type=button name=button value='Correct' class='btn btn-success'>";
echo "<input type=button name=button value='Wrong Options' class='btn btn-default'></p>";
echo '<p class="btn btn-'.($row[7]==1?'success':'default').'" >'.$row[3].'</p>';
echo '<p class="btn btn-'.($row[7]==2?'success':'default').'" >'.$row[4].'</p>';
echo '<p class="btn btn-'.($row[7]==3?'success':'default').' ">'.$row[5].'</p>';
echo '<p class="btn btn-'.($row[7]==4?'success':'default').'" >'.$row[6].'</p>';

echo "<p class='card-text'><input type=button name=button value='Your choice' class='btn btn-danger'>";
echo '<p class="btn btn-'.($row[8]==1?'danger':'warning').'" >'.$row[3].'</p>';
echo '<p class="btn btn-'.($row[8]==2?'danger':'warning').'" >'.$row[4].'</p>';
echo '<p class="btn btn-'.($row[8]==3?'danger':'warning').' ">'.$row[5].'</p>';
echo '<p class="btn btn-'.($row[8]==4?'danger':'warning').'" >'.$row[6].'</p>';

if($_SESSION['qnr']<$ncols-1)
echo "<p class='card-text'><input type=submit name=submit value='Next Question' class='btn btn-primary'></form></p>";
else
echo "<p class='card-text'><input type=submit name=submit value='Finish' class='btn btn-primary'></form></p>";

//echo "</table></table>";
//include("footer.php");
?>

</div>
<div class="card-footer text-muted">
					Posted on <?php echo $row_test[7]; ?> by
            <a href="#">R4R Team</a>
          </div>
        </div>
<ul class="pagination justify-content-center mb-4">
          <li class="page-item">
            <a class="page-link" href="#">&larr; Older</a>
          </li>
          <li class="page-item disabled">
            <a class="page-link" href="#">Newer &rarr;</a>
          </li>
        </ul>

      </div>

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
            R4Rin Top Tutorials are Core Java,Hibernate ,Spring,Sturts.The content on R4R.in website is done by expert team not only with the help of books but along with the strong professional knowledge in all context like coding,designing, marketing,etc!
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
