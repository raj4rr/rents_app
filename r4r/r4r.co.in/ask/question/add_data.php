<?php
session_start();

include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
if(isset($_POST['btn-save']))
{
	// variables for input data

	$question = $_POST['question'];
	$question_level = $_POST['question_level'];
	$language = $_POST['language'];

	$hide = $_POST['hide'];
	//echo "Data Already Inserted.";

	$sql_query1="SELECT * FROM question where question='$question'and question_level='$question_level' and language='$language'  and hide='$hide'";
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
	$sql_query = "INSERT INTO question(question,question_level,language,hide,userid) VALUES('$question','$question_level','$language','$hide','2')";
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
    <form method="post" action="#" name="questionfname" id="questionfid">
    <table align="center">
    <tr>
    <td align="center"><a href="index.php">back to main page</a></td>
    </tr>

    <td>

		<textarea rows="10" cols="80" name="question"    required ><?php echo $fetched_row['question']; ?></textarea>

    </tr>
    <tr>
    <td>Question level

		<select name="question_level" placeholder="question_level" required >
			<option value="H">High</option>
			<option value="M">Medium</option>
			<option value="L">Low</option>

			</select>
		</td>
    </tr>
     <tr>
    <td>
		Language
		<select name="language" placeholder="language" required >
			<option value=""></option>

			<?php 
	$sql_query_q="SELECT DISTINCT language as language  FROM  question where language  like '%sub%' ";
	$result_set_q=mysql_query($sql_query_q);
	//$fetched_row_q=mysql_fetch_array($result_set_q);

	  while($rowq=mysql_fetch_row($result_set_q))
		{
		?>
            <option value="<?php echo $rowq[0]; ?>" ><?php echo $rowq[0]; ?></option>

    <?php   
	} ?>

		</select>
		</td>
    </tr>

     <tr>
    <td>Hide
		<?php $hide=$fetched_row['hide']; ?>
		<select name="hide" placeholder="hide" required >
			<option value=""></option>
			<option value="YES" <?php echo $hide=='YES'?"selected":"" ?>>Yes</option>
			<option value="NO" <?php echo $hide=='NO'?"selected":"" ?>>No</option>

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
