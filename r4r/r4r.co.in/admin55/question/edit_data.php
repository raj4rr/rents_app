<?php
session_start();

include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
if(isset($_GET['edit_id']))
{
	$sql_query="SELECT * FROM question WHERE id=".$_GET['edit_id'];
	$result_set=mysql_query($sql_query);
	$fetched_row=mysql_fetch_array($result_set);

}

if(isset($_POST['btn-update']))
{
	// variables for input data
	$question = $_POST['question'];
	$question_level = $_POST['question_level'];
	$language = $_POST['language'];

	$hide = $_POST['hide'];

	// variables for input data

	// sql query for update data into database
	$sql_query = "UPDATE question SET question='$question', question_level='$question_level' , language='$language'  , hide='$hide' WHERE id=".$_GET['edit_id'];
	// sql query for update data into database

	// sql query execution function
	if(mysql_query($sql_query))
	{
		?>
		<script type="text/javascript">
		alert('Data Are Updated Successfully');
		window.location.href='index.php';
		</script>
		<?php
	}
	else
	{
		?>
		<script type="text/javascript">
		alert('error occured while updating data');
		</script>
		<?php
	}
	// sql query execution function
}
if(isset($_POST['btn-cancel']))
{
	header("Location: index.php");
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Edit Center Details</title>
<link rel="stylesheet" href="../style.css" type="text/css" />
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
    <form method="post">
    <table align="center">

	<tr>

    <td>

			<textarea rows="10" cols="80" name="question"    required ><?php echo $fetched_row['question']; ?></textarea>

		</td>
    </tr>

        <tr>
			<?php $question_level= $fetched_row['question_level']; ?>
    <td>Question level

		<select name="question_level" placeholder="question_level" required >
			<option value="H"  <?php echo $question_level=='H'?"selected":"" ?>>High</option>
			<option value="M" <?php echo $question_level=='M'?"selected":"" ?>>Medium</option>
			<option value="L" <?php echo $question_level=='L'?"selected":"" ?>>Low</option>

			</select>
		</td>
    </tr>

     <tr>
    <td>
		Language
		<select name="language" placeholder="language" required >
			<option value=""></option>

			<?php 
			$language=$fetched_row['language']; 
	$sql_query_q="SELECT DISTINCT language as language  FROM  question";
	$result_set_q=mysql_query($sql_query_q);
	//$fetched_row_q=mysql_fetch_array($result_set_q);

	  while($rowq=mysql_fetch_row($result_set_q))
		{
		?>
            <option  <?php echo $language==$rowq[0]?"selected":"" ?> ><?php echo $rowq[0]; ?></option>

    <?php   
	} ?>

		</select>
		</td>
     </tr>

     <tr>
    <td>
		<?php $hide=$fetched_row['hide']; ?>
		<select name="hide" placeholder="hide" required >
			<option value=""></option>
			<option value="YES" <?php echo $hide=='YES'?"selected":"" ?>>Yes</option>
			<option value="NO" <?php echo $hide=='NO'?"selected":"" ?>>No</option>

		</select>
		</td>
    </tr>

    <tr>
    <td>
    <button type="submit" name="btn-update"><strong>UPDATE</strong></button>
    <button type="submit" name="btn-cancel"><strong>Cancel</strong></button>
    </td>
    </tr>
    </table>
    </form>
    </div>
</div>

</center>
</body>
</html>
