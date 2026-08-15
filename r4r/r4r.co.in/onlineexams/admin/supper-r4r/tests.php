<?php
	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Test List</title>
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
	<h1 class="page-header text-center">Test List</h1>
	<div class="row">
		<div class="col-sm-8 col-sm-offset-2">
			<div class="row">
			<?php
				if(isset($_SESSION['error'])){
					echo
					"
					<div class='alert alert-danger text-center'>
						<button class='close'>&times;</button>
						".$_SESSION['error']."
					</div>
					";
					unset($_SESSION['error']);
				}
				if(isset($_SESSION['success'])){
					echo
					"
					<div class='alert alert-success text-center'>
						<button class='close'>&times;</button>
						".$_SESSION['success']."
					</div>
					";
					unset($_SESSION['success']);
				}
			?>
			</div>
			<div class="row">

				<a href="subject.php" class="btn btn-success pull-right"><span class="glyphicon glyphicon-back"></span> Back</a>

				<a href='#addnew' class='btn btn-danger btn-sm' data-toggle='modal'><span class='glyphicon glyphicon-add'></span> add</a>
			</div>
			<div class="height10">
			</div>
			<div class="row">
				<table id="myTable" class="table table-bordered table-striped">
					<thead>

						<th>test_name</th>
						<th>sub_name</th>
						<th>total_que</th>
						<th>Date</th>
						<th>Action</th>
					</thead>
					<tbody>
						<?php
							include_once('connection.php');
							$sub_id = $_GET['sub_id'];
							$sql = "SELECT test.test_id as test_id,test.test_name as test_name,test.start_date as start_date ,test.status as status,test.total_que as total_que, s.sub_name as sub_name,s.sub_id as sub_id FROM mst_test test inner join mst_subject s on test.sub_id= s.sub_id where test.sub_id=".$sub_id;

							//use for MySQLi-OOP
							$query = $conn->query($sql);
							while($row = $query->fetch_assoc()){
								$published ="";

								if($row['status']!=2) {
									$published="<a href='test_pulbish.php?test_id=".$row['test_id']."&ip=2&sub_id=".$row['sub_id']."' class='btn btn-danger btn-sm' data-toggle='modal'><span class='glyphicon glyphicon-remove'></span> Pulish</a>";

									 } else { 
										$published="<a href='test_pulbish.php?test_id=".$row['test_id']."&ip=1&sub_id=".$row['sub_id']."' class='btn btn-danger btn-sm' data-toggle='modal'><span class='glyphicon glyphicon-ok'></span> UnPulish</a>";
									} 

								echo 
								"<tr>
									<td>".$row['test_name']."</td>
									<td>".$row['sub_name']."</td>
									<td>".$row['total_que']."</td>
									<td>".$row['start_date']."</td>

									<td>
									<a href='#edit_".$row['test_id']."' class='btn btn-danger btn-sm' data-toggle='modal'><span class='glyphicon glyphicon-edit'></span> Edit</a>
									<a href='#delete_".$row['test_id']."' class='btn btn-danger btn-sm' data-toggle='modal'><span class='glyphicon glyphicon-trash'></span> Delete</a>

									<a href='questions.php?test_id=".$row['test_id']."&sub_id=".$row['sub_id']."' class='btn btn-danger btn-sm' data-toggle='modal'><span class='glyphicon glyphicon-edit'></span> Questions</a>"
									." ".$published

									."</td>
								</tr>";
								include('tests_edit_delete_modal.php');
							}
							/////////////////

							//use for MySQLi Procedural
							// $query = mysqli_query($conn, $sql);
							// while($row = mysqli_fetch_assoc($query)){
							// 	echo
							// 	"<tr>
							// 		<td>".$row['user_id']."</td>
							// 		<td>".$row['firstname']."</td>
							// 		<td>".$row['lastname']."</td>
							// 		<td>".$row['address']."</td>
							// 		<td>
							// 			<a href='#edit_".$row['user_id']."' class='btn btn-success btn-sm' data-toggle='modal'><span class='glyphicon glyphicon-edit'></span> Edit</a>
							// 			<a href='#delete_".$row['user_id']."' class='btn btn-danger btn-sm' data-toggle='modal'><span class='glyphicon glyphicon-trash'></span> Delete</a>
							// 		</td>
							// 	</tr>";
							// 	include('edit_delete_modal.php');
							// }
							/////////////////

						?>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<?php include('test_add_modal.php') ?>

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
<<footer><div class="PP"><p>Brought To You By:<a href="#"> </a></p></div></footer>
<<style>
.PP{
	text-align: center;
}
</style>
</html>
