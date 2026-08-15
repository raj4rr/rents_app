<?php
	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Quiz Dashboard..</title>
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="datatable/dataTable.bootstrap.min.css">
	<style>
		.height10{
			height:10px;
		}
		.mtop10{
			margin-top:10px;
		}
		.modal-label{
			position:relative;
			top:7px
		}
	</style>
</head>
<body>
<div class="container">
	<h1 class="page-header text-center">MCQs SEO Dashboard</h1>
	<div class="row">
		<div class="col-sm-8 col-sm-offset-2">
			<div class="row">

			</div>
			<div class="row">
				<a href="subject.php" class="btn btn-success pull-right"><span class="glyphicon glyphicon-plus"></span> Subject</a>

			</div>
			<div class="height10">
			</div>
			<div class="row">

			</div>
		</div>
	</div>
</div>
<?php include('add_modal.php') ?>

<script src="jquery/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="datatable/jquery.dataTables.min.js"></script>
<script src="datatable/dataTable.bootstrap.min.js"></script>
<!-- generate datatable on our table -->
<script>
$(document).ready(function(){
	//inialize datatable
    $('#myTable').DataTable();

    //hide alert
    $(document).on('click', '.close', function(){
    	$('.alert').hide();
    })
});
</script>
</body>
<<footer><div class="PP"><p>By:<a href="#"> r4r.co.in</a></p></div></footer>
<<style>
.PP{
	text-align: center;
}
</style>
</html>
