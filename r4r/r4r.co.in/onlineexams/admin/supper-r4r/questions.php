<?php
	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>questions List</title>
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
	<h1 class="page-header text-center">questions List</h1>
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

				$test_id = $_GET['test_id'];
				$sub_id = $_GET['sub_id'];

			?>
			</div>
			<div class="row">

				<a href="tests.php?sub_id=<?php echo $sub_id; ?>" class="btn btn-success pull-right"><span class="glyphicon glyphicon-back"></span> Back</a>

				<a href='#addnew' class='btn btn-danger btn-sm' data-toggle='modal'><span class='glyphicon glyphicon-add'></span> add</a>
			</div>
			<div class="height10">
			</div>
			<div class="row">
				<table id="myTable" class="table table-bordered table-striped">
					<thead>
						<th>ID</th>
						<th>Questions</th>
						<th>Answer-1</th>
						<th>Answer-2</th>
						<th>Answer-3</th>
						<th>Answer-4</th>
						<th>true_ans</th>

						<th>Action</th>
					</thead>
					<tbody>
						<?php
							include_once('connection.php');

							$sql = "SELECT * FROM mst_question where test_id='$test_id'";

							//use for MySQLi-OOP
							$query = $conn->query($sql);
							$count=0;
							while($row = $query->fetch_assoc()){
								$count++;
								echo 
								"<tr>
									<td>".$count."</td>
									<td>".$row['que_desc']."</td>
									<td>".$row['ans1']."</td>
									<td>".$row['ans2']."</td>
									<td>".$row['ans3']."</td>
									<td>".$row['ans4']."</td>
									<td>".$row['true_ans']."</td>

									<td>
									<a href='#edit_".$row['que_id']."' class='btn btn-danger btn-sm' data-toggle='modal'><span class='glyphicon glyphicon-edit'></span> Edit</a>

										<a href='#delete_".$row['que_id']."' class='btn btn-danger btn-sm' data-toggle='modal'><span class='glyphicon glyphicon-trash'></span> Delete</a>
									</td>
								</tr>";
								include('questions_edit_delete_modal.php');
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
<?php include('questions_add_modal.php') ?>

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
