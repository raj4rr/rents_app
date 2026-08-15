<?php
session_start();
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
extract($_GET);
//$rs=mysql_query("select * from mst_question where que_id='" . $que_id ."'  ORDER BY 3 LIMIT 300") or die(mysql_error());
//mysql_data_seek($rs,$_SESSION['qn']);
//while($row= mysql_fetch_row($rs)){
$stm = $pdo->prepare("select * from mst_question where que_id=:que_id ORDER BY 3 LIMIT 300");
			$stm->bindParam(":que_id", $que_id, PDO::PARAM_INT);
			$stm->execute();

			$rows = $stm->fetchAll(PDO::FETCH_NUM);
					foreach($rows as $row) {
$title=$row[2];

?>

<!DOCTYPE html>
<html lang="en">

<head>
<title><?php echo $title; ?> </title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="<?php echo $title; ?>">
  <meta name="keyword" content="<?php echo $title; ?>">
  <meta name="author" content="Rajesh Kumar">

<script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
</script>
  <!-- Bootstrap core CSS -->
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="css/modern-business.css" rel="stylesheet">
<script src="vendor/jquery/jquery.min.js"></script>
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
      <h1 class="mt-4 mb-3">
		<?php echo $title; ?>
      <small></small>
    </h1>

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
          <a href="/mcqs/">Home</a>
      </li>

    </ol>

<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">
<div class="card mb-4">

          <div class="card-body">

<?php

//echo "<h2 class='card-title'>Review Test Question</h2>";

echo "<h2>Question:". ($row[2])."</h2>";
echo "<p class='card-text'>1.".($row[3])."</p>";
echo "<p class='card-text'>2.".($row[4])."</p>";
if($row[5]!="")
echo "<p class='card-text'>3.".($row[5])."</p>";
if($row[6]!="")
echo "<p class='card-text'>4.".($row[6])."</p>";
echo "<button class='card-text' id='show$row[0]'>Show Answer</button>";
echo "<p  id='ans$row[0]' style='display: none;' >Answer:". ($row[8])."</p>";
?>
<hr/>
<script language="javascript">
$("#show<?php echo $row[0]; ?>").click(function(){
	//alert('ss');
  $("#ans<?php echo $row[0]; ?>").show();
}); 

</script>

</div>
<div class="card-footer text-muted">
					Posted by
            <a href="#">R4R Team</a>
          </div>
        </div>
<ul class="pagination justify-content-center mb-4">
          <li class="page-item">
            <a class="page-link" href="?que_id=<?php echo $row[0]-1; ?>&test_id=<?php echo $row[1]; ?>">&larr; Older</a>
          </li>
          <li class="page-item ">
            <a class="page-link" href="?que_id=<?php echo $row[0]+1; ?>&test_id=<?php echo $row[1]; ?>">Newer &rarr;</a>
          </li>
        </ul>

      </div>
<?php }
//echo "</table></table>";
//include("footer.php");
?>
<div class="card-footer text-muted">

	<?php
echo "<ol>";

$stm = $pdo->prepare("select * from mst_question where que_id=:que_id ORDER BY 3 LIMIT 300");
			$stm->bindParam(":que_id", $que_id, PDO::PARAM_INT);
			$stm->execute();

			$rows = $stm->fetchAll(PDO::FETCH_NUM);
					foreach($rows as $row2) {

echo "<li><a href='mcqs-questions-answers.php?que_id=$row2[0]&test_id=$test_id'>".($row2[2])."</a></li>";

}
echo "</ol> </div>";
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

//include("learn-categories-widget.php");
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

  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

</body>

</html>
