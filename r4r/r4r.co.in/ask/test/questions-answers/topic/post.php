<?php 

include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
//include("header.php");
$category=$_GET['ct'];

$key_word='';
$description='';
$page_title="";
$subcategory_list[]=array();
$topic_list[]=array();
if(isset($_REQUEST['tp']))
{

	$sql_topic=mysql_query("select * from topic where publish='Y' and category_id='$_REQUEST['ct']' and subcategory_id='$_REQUEST['subct']'");
	while($row_topic=mysql_fetch_array($sql_topic))
	{
		$topic_des = array ('topic_id' => $row_topic['topic_id'] , 'topic_name' => $row_topic['topic_name']);
		array_push($topic_list, $topic_des);
		if($_REQUEST['tp']==$row_topic['topic_id'])
		{
			$description=$row_topic['topic_short_desc'];
			$page_title=$row_topic['topic_name'];
			$key_word=$row_topic['keyword'];
		}
	}	
}
else
{

	$sql_subcategory=mysql_query("select * from subcategory where publish='Y' and category_id=$_REQUEST['ct']");
	while($row_subcategory=mysql_fetch_array($sql_subcategory))
	{
		$subcategory_des = array ('subcategory_id' => $row_subcategory['subcategory_id'] , 'subcategory_name' => $row_subcategory['subcategory_name'], 'category_id' => $row_subcategory['category_id']);
		array_push($subcategory_list, $subcategory_des);
		if($_REQUEST['subct']==$row_subcategory['subcategory_id'])
		{
			$description=$row_subcategory['subcategory_description'];
			$page_title=$row_subcategory['subcategory_name'];
		}
		$key_word=$key_word.','.$row_subcategory['subcategory_name'];
	}	
	$key_word=substr($key_word,1);
}
?>
 <?php 
			$sql_topic_deatail=mysql_query("select * from topic where publish='Y' and topic_id='$_REQUEST['tp']'");
			$row_topic_deatail=mysql_fetch_array($sql_topic_deatail);?>
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title><?php echo $page_title;?></title>

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

<?php include("../../ads1.php"); ?>
    <!-- Page Heading/Breadcrumbs -->
    <h1 class="mt-4 mb-3"><?php echo $page_title;?>
      <small>by
        <a href="#">R4R Team</a>
      </small>
    </h1>

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="/">Home</a>
      </li>

    </ol>

    <div class="row">

      <!-- Post Content Column -->
      <div class="col-lg-8">

       <?php echo stripslashes($row_topic_deatail['topic_description']);?>

<!-- r4rcoin -->

        <!-- Comments Form -->
        <div class="card my-4">
          <h5 class="card-header">Leave a Comment:</h5>
          <div class="card-body">
            <form>
              <div class="form-group">
                <textarea class="form-control" rows="3"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

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

include("topic-categories-widget.php");
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
