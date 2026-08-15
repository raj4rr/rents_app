<?php
session_start();

include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
if(isset($_POST['btn-save']))
{
	// variables for input data
	$question_id = $_POST['question_id'];
	$answer = $_POST['answer'];
	$username = $_POST['username'];
	$email = $_POST['email'];

	$date = $_POST['date'];

	$hide = $_POST['hide'];
	//echo "Data Already Inserted.";

	$sql_query1="SELECT * FROM answer where answer='$answer'and username='$username' and email='$email' and date='$date' and hide='$hide' and question_id=$question_id";
	$result_set1=mysql_query($sql_query1);
	if(mysql_num_rows($result_set1)>0)
	{
		echo "Data Already Inserted.";
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
	$sql_query = "INSERT INTO answer(question_id,answer,username,email,hide,userid) VALUES('$question_id','$answer','$username','$email','$hide','2')";
	// sql query for inserting data into database

	// sql query execution function
	if(mysql_query($sql_query))
	{
		?>

		<script type="text/javascript">
		alert('Data Are Inserted Successfully ');
		window.location.href='index.php';
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
<title>Add new Answer</title>
<link rel="stylesheet" href="../style.css" type="text/css" />
</head>
<body>
<center>

<div id="header">
	<div id="content">
   <label>Add New Answers</label>
    </div>
</div>
<div id="body">
	<div id="content">
    <form method="post" action="#" name="answerfname" id="answerfid">
    <table align="center">
    <tr>
    <td align="center"><a href="index.php">back to main page</a></td>
    </tr>
     <tr>
    <td>
		<?php $question_id=$fetched_row['question_id']; ?>
		<select name="question_id" placeholder="question_id" required >
			<option value=""></option>

			<?php 
	$sql_query_q="SELECT * FROM  question WHERE  userid='2' order by id desc";
	$result_set_q=mysql_query($sql_query_q);
	//$fetched_row_q=mysql_fetch_array($result_set_q);

	  while($rowq=mysql_fetch_row($result_set_q))
		{
		?>
              <option value="<?php echo $rowq[0]; ?>" <?php echo $question_id==$rowq[0]?"selected":"" ?> ><?php echo substr(htmlspecialchars($rowq[1]),0,200); ?></option>

    <?php   
	} ?>

		</select>
		</td>
    </tr>

    <td>
		<textarea rows="20" cols="80" name="answer"   value="" required ><?php echo htmlspecialchars($fetched_row['answer']); ?></textarea>

	</td>
    </tr>
    <tr>
    <td><input type="text" name="username" placeholder="username"  value="Rajesh Kumar" required /></td>
    </tr>
    <tr>
    <td><input type="text" name="email" placeholder="email"  value="rajesh@r4r.co.in" required /></td>
    </tr>

  <tr>
    <td><input type="text" name="date" placeholder="date"  value="18-06-12" required /></td>
    </tr>
     <tr>
    <td>
		<?php $hide=$fetched_row['hide']; ?>
		Hide<select name="hide" placeholder="hide" required >
			<option value=""></option>
			<option value="YES" <?php echo $hide=='YES'?"selected":"" ?>>Yes</option>
			<option value="NO" <?php echo $hide=='NO'?"selected":"" ?> selected >No</option>

		</select>
		</td>
    </tr>

    <tr>

    <tr>
    <td><button type="submit" name="btn-save"><strong>Save</strong></button></td>
    </tr>
    </table>
    </form>
     <div id="inserted_item_data"></div>

    </div>
</div>

</center>
</body>
</html>
