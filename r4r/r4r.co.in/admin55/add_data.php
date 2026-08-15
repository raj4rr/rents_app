<?php
session_start();
 $examid=$_SESSION['examid'];
	 $examname=$_SESSION['examname'];
	 $exam_city='';
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
if(isset($_POST['btn-save']))
{
	// variables for input data
	$exam_city = $_POST['exam_city'];
	$college = $_POST['college'];
	$center_address = $_POST['center_address'];

	$exam_date = $_POST['exam_date'];

	$shift = $_POST['shift'];

	$code = $_POST['code'];

	$sql_query1="SELECT * FROM center_details where exam_city='$exam_city' and colloge='$college' and centeraddress='$center_address' and exam_date='$exam_date' and shift='$shift' and code='$code'";
	$result_set1=mysql_query($sql_query1);
	if(mysql_num_rows($result_set1)>0)
	{
		//echo "Data Already Inserted.";
		?>

		<script type="text/javascript">
		alert('Data Already Inserted.');
		//document.getElementById("exam_city").value = "My value";
		//window.location.href='dashboard.php';
		</script>
		<?php
	}else{
	// variables for input data

	// sql query for inserting data into database
	$sql_query = "INSERT INTO center_details(exam_city,exam_name,colloge,centeraddress,exam_date,shift,code) VALUES('$exam_city','$examid','$college','$center_address','$exam_date','$shift','$code')";
	// sql query for inserting data into database

	// sql query execution function
	if(mysql_query($sql_query))
	{
		?>

		<script type="text/javascript">
		alert('Data Are Inserted Successfully ');
		window.location.href='dashboard.php';
		</script>
		<?php
	}
	else
	{
		?>
		<script type="text/javascript">
		alert('error occured while inserting your data');
		</script>
		<?php
	}
	// sql query execution function
}}
?>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Add new Center</title>
<link rel="stylesheet" href="style.css" type="text/css" />
</head>
<body>
<center>

<div id="header">
	<div id="content">
   <label><?php echo $examname; ?> </label>
    </div>
</div>
<div id="body">
	<div id="content">
    <form method="post" action="#" name="centerlistform" id="centerlistform">
    <table align="center">
    <tr>
    <td align="center"><a href="dashboard.php">back to main page</a></td>
    </tr>
    <tr>

    <td><input type="text" name="exam_city" id="exam_city" class="exam_city" placeholder="Exam city"  required /></td>
    </tr>
    <tr>
    <td><input type="text" name="college" id="college" class="college" placeholder="College" required /></td>
    </tr>
    <tr>
    <td><input type="text" name="center_address" id="center_address" class="center_address" placeholder="Center address" required /></td>
    </tr>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

    <tr>
    <td>    
    <select name="exam_date" id="exam_date" class="exam_date" required >

			<option value="">Select Date </option>

			<?php 

				for($i=0;$i<50;$i++){
				$c_date = date("d-M-y", strtotime("+$i day"));
			?>
			<option value="<?php echo $c_date; ?>"><?php echo $c_date; ?></option>
			<?php }
			?>

		</select>
	<table>
			<tr>
				<td>Shift-I<input type="checkbox" name="shift1" class="shift1" value"Shift-I" /></td>
				<td>Shift-II<input type="checkbox" name="shift2" class="shift2" value"Shift-II" /></td>
				<td>Shift-III<input type="checkbox" name="shift3" class="shift3" value"Shift-III" /></td>
			</tr>
		</table>
    <div align="right">

    </div>

    </td>

    </tr>

     <tr>
    <td><input type="text" name="code" placeholder="Code" required /></td>
    </tr>

    <tr>
    <td><button type="button" name="save" id="save" class="save" ><strong>SAVE</strong></button></td>
    </tr>
    </table>
    </form>
     <div id="inserted_item_data"></div>
    <script>
    $('#save').click(function(){
   //alert()
   var formData = $("#centerlistform").serialize();
 //  alert(formData);
  $.ajax({
   url:"insertCenterList.php",
   method:"POST",
   data:formData,
   success:function(data){
   // alert(data);
    fetch_item_data();
   }
  });
 });

	 function fetch_item_data()
 {
  $.ajax({
   url:"fetch.php",
   method:"POST",
   success:function(data)
   {
    $('#inserted_item_data').html(data);
   }
  })
 }

  $(document).ready(function(){
 fetch_item_data();

});

 </script>
    </div>
</div>

</center>
</body>
</html>
