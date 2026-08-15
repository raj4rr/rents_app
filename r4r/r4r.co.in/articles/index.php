<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   <meta name="description" content="Articles-Guest post,Guest Articles">
  <meta name="keyword" content="Post Articles,Articles-Guest post,Guest Articles">
  <meta name="author" content="Rajesh Kumar">
  <!-- Bootstrap core CSS -->
  <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="../css/modern-business.css" rel="stylesheet">
<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
include("header.shtml");
$category='';
if(isset($_GET['ct'])){
$category=$_GET['ct'];
}
if(isset($_REQUEST['title'])){
$title=str_replace('-', ' ', $_REQUEST['title']);

$key_word='';
$description='';
$page_title="";
$subcategory_list[]=array();
$topic_list[]=array();

$topic_description='';

$stm = $pdo->prepare("select * from topic_p where publish='P' and topic_name=:title");
			$stm->bindParam(":title", $title, PDO::PARAM_STR);
			$stm->execute();

  	$rows = $stm->fetchAll(PDO::FETCH_ASSOC);
					foreach($rows as $row_topic) {

		$topic_des = array ('topic_id' => $row_topic['topic_id'] , 'topic_name' => $row_topic['topic_name']);
		array_push($topic_list, $topic_des);

			$description=$row_topic['topic_short_desc'];
			$page_title=$row_topic['topic_name'];
			$key_word=$row_topic['keyword'];
				$topic_description=$row_topic['topic_description'];
				//	$key_word=$row_topic['keyword'];

	}	

			?>
			 <title><?php echo $page_title; ?> </title>
			</head>

        <body>

        <h2><?php echo stripslashes($page_title); ?></h2>
       <?php echo stripslashes($topic_description);?>

<!-- r4rcoin -->

			<?php

	//@include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/footer.shtml');		
}
else {
			?>

<!DOCTYPE html>
<html lang="en">

  <title>Top Articles </title>

</head>

<body>

<?php 

//include("../header-article.php");
//include("header.php");

?>
  <!-- Page Content -->
  <div class="container">

    <!-- Page Heading/Breadcrumbs -->
    <h1 class="mt-4 mb-3">Top Articles
      <small></small>
    </h1>

<div class="tableContent" style="font-size:13px;">
    <table width="100%">
<?php  

$stm = $pdo->prepare("select * from topic_p where publish='P' and category_id=1 ORDER BY `topic_id` DESC");
		//	$stm->bindParam(":title", $title, PDO::PARAM_STR);
			$stm->execute();

  	$rows = $stm->fetchAll(PDO::FETCH_ASSOC);
					foreach($rows as $row_show_topic) {
//	$sql_show_topic = mysql_query("select * from topic_p where publish='P'");
//	while ($row_show_topic = mysql_fetch_array($sql_show_topic))
//	{
?>

		<tr>
        	<td class="alternate2" style="width:70%;">
           	<a href="/<?php echo str_replace(' ', '-', $row_show_topic['topic_name']);?>">	<?php echo $row_show_topic['topic_name'];?></a>
           	<p>	<?php echo $row_show_topic['topic_short_desc'];?></a>
			 	<p>	Posted Date :- <?php echo $row_show_topic['insert_date'];?></a>
           	</td>

        </tr>

<?php	}	?>     
	</table>
</div>
    <?php 
//include("../ads1.php");
//include("main-page.php");
//include("header.php");
	//@include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/footer.shtml');	
	}
?>

</body>

</html>
