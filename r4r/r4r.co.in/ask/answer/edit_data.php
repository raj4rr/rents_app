<?php
session_start();

include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
if(isset($_GET['edit_id']))
{
	$sql_query="SELECT * FROM answer WHERE answer_id=".$_GET['edit_id'];
	$result_set=mysql_query($sql_query);
	$fetched_row=mysql_fetch_array($result_set);

}

if(isset($_POST['btn-update']))
{
	// variables for input data
	$question_id = $_POST['question_id'];
		$answer = $_POST['answer'];
	$username = $_POST['username'];
	$email = $_POST['email'];

	$date = $_POST['date'];

	$hide = $_POST['hide'];

	// variables for input data

	// sql query for update data into database
	$sql_query = "UPDATE answer SET answer='$answer',username='$username',email='$email',date='$date',hide='$hide' ,question_id='$question_id' WHERE answer_id=".$_GET['edit_id'];
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
		<?php $question_id=$fetched_row['question_id']; ?>
		<select name="question_id" placeholder="question_id" required width="200px">
			<option value=""></option>

			<?php 
	$sql_query_q="SELECT * FROM  question WHERE hide='NO'";
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
	<textarea rows="10" cols="80" name="answer"   value="" required ><?php echo htmlspecialchars($fetched_row['answer']); ?></textarea>

	</td>
    </tr>
    <tr>
    <td><input type="text" name="username" placeholder="username"  value="<?php echo $fetched_row['username']; ?>" required /></td>
    </tr>
    <tr>
    <td><input type="text" name="email" placeholder="email"  value="<?php echo $fetched_row['email']; ?>" required /></td>
    </tr>

  <tr>
    <td><input type="text" name="date" placeholder="date"  value="<?php echo $fetched_row['date']; ?>" required /></td>
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
