<?php 
session_start();
error_reporting(0);
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
//include("header.php");
extract($_GET);
$title='Java, C ,C++, ASP, ASP.net C# ,Struts ,Questions & Answer, Struts2, Ajax, Hibernate, Swing ,JSP , Servlet, J2EE ,Core Java ,Stping, VC++, HTML, DHTML, JAVASCRIPT, VB ,CSS, interview ,questions, and answers, for,experienced, and fresher';
if(isset($subcat))
{
$_SESSION['subcat']=$subcat;
$title=$subcat." ".$title;
}
if(isset($test))
$title=$test." || ".$title;

if(isset($ques))
$title=$ques." || ".$title;
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title><?php echo $title; ?> </title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   <meta name="description" content=" Python,General knowledge(GK),Computer,PHP,SQL,Java,JSP,Android,CSS,Hibernate,Servlets,Spring,<?php if(isset($test)) echo ','.$test; ?>,<?php if(isset($ques)) echo ','.$ques; ?>,<?php echo $subcat;  ?> Interview Questions and Answers for Freshers & Experienced,<?php echo $subcat;  ?> Interview Questions and Answers for Freshers & Experienced ,Interview, Questions , Answers , Freshers , Experienced,Jobs,Private Jobs ">
  <meta name="keyword" content="Python,General knowledge(GK),Computer,PHP,SQL,Java,JSP,Android,CSS,Hibernate,Servlets,Spring,<?php if(isset($test)) echo ','.$test; ?>,<?php if(isset($ques)) echo ','.$ques; ?>,<?php echo $subcat;  ?> Interview Questions and Answers for Freshers & Experienced,<?php echo $subcat;  ?> Interview Questions and Answers for Freshers & Experienced ,Interview, Questions , Answers , Freshers , Experienced,Jobs,Private Jobs ">
  <meta name="author" content="Rajesh Kumar">

  <!-- Custom styles for this template -->
  <link href="/answer/css/modern-business.css" rel="stylesheet">

</head>
<body oncopy="return false" oncut="return false" onpaste="return false">
<?php 

include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php");
//include("header.php");

?>
  <!-- Page Content -->
  <div class="container">

    <!-- Page Heading/Breadcrumbs -->
    <h1 class="mt-4 mb-3"><?php if(isset($ques)) echo $ques; ?><?php if(isset($test)) echo $test.'/'; ?><?php echo $subcat;  ?> Interview Questions and Answers for Freshers & Experienced<br/>
      <small></small>
    </h1>

<!-- r4rin-new -->

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
       <a href="../answer">Home</a>
      </li>

    </ol>

    <?php 
if(isset($subid) && isset($testid)&& isset($que_id))
	{
	$_SESSION['sid']=$subid;
	$_SESSION['tid']=$testid;
	$_SESSION['que_id']=$que_id;

	include("questions-main-page.php");
	}
	else
		if(isset($subid) && isset($testid))
			{
			$_SESSION['sid']=$subid;
			$_SESSION['tid']=$testid;
			include("interview-main-page.php");
			}
				else
					if(isset($subid))
					{
					$_SESSION['sid']=$subid;
					include("sublist-main-page.php");
					}
						else 
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

//include("categories-widget.php");
//include("header.php");

?>

        <!-- Side Widget -->
        <div class="card my-4">
          <h5 class="card-header">R4R Team </h5>
          <div class="card-body">
            R4R provides <?php echo $subcat; ?> Freshers questions and answers (<?php echo $subcat; ?> Interview Questions and Answers) .The questions on R4R.in website is done by expert team!
             Mock Tests and  Practice Papers for prepare yourself..
             Mock Tests,  Practice Papers,<?php echo $test; ?>,<?php echo $subcat; ?> Freshers & Experienced Interview Questions and Answers,<?php echo $subcat; ?> Objetive choice questions and answers,<?php echo $subcat; ?> Multiple choice questions and answers,<?php echo $subcat; ?>  objective, <?php echo $subcat; ?> questions , <?php echo $subcat; ?> answers,<?php echo $subcat; ?> MCQs questions and answers
			 Java, C ,C++, ASP, ASP.net C# ,Struts ,Questions & Answer, Struts2, Ajax, Hibernate, Swing ,JSP , Servlet, J2EE ,Core Java ,Stping, VC++, HTML, DHTML, JAVASCRIPT, VB ,CSS, interview ,questions, and answers, for,experienced, and fresher
			 R4r provides Python,General knowledge(GK),Computer,PHP,SQL,Java,JSP,Android,CSS,Hibernate,Servlets,Spring etc Interview tips for Freshers and Experienced for  <?php echo $subcat;  ?> fresher interview questions ,<?php echo $subcat;  ?> Experienced interview questions,<?php echo $subcat;  ?> fresher interview questions and answers ,<?php echo $subcat;  ?> Experienced interview questions and answers,tricky <?php echo $subcat;  ?> queries for interview pdf,complex <?php echo $subcat;  ?> for practice with answers,<?php echo $subcat;  ?> for practice with answers 
			 You can search job and get offer latters by studing r4r.in .learn in easy ways .
          </div>
        </div>

      </div>

    </div>
    <!-- /.row -->
 <!-- /.row -->

  </div>
  </div>
  <!-- /.container -->
  <!-- Footer -->
     <?php 

include($_SERVER['DOCUMENT_ROOT'] . "/template/footer.php");
//include("header.php");

?>

  <!-- Bootstrap core JavaScript -->
  <script src="/answer/vendor/jquery/jquery.min.js"></script>
  <script src="/answer/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

</body>

</html>
