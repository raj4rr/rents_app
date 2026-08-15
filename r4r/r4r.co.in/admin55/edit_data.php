<?php
session_start();
 $examid=$_SESSION['examid'];

include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
if(isset($_GET['edit_id']))
{
	$sql_query="SELECT * FROM comment WHERE id=".$_GET['edit_id'];
	$result_set=mysql_query($sql_query);
	$fetched_row=mysql_fetch_array($result_set);

}
if(isset($_POST['btn-update']))
{
	// variables for input data
		$username = $_POST['username'];
	$emailid = $_POST['emailid'];
	$comment = $_POST['comment'];

	$url = $_POST['url'];

	$hide = $_POST['hide'];

	// variables for input data

	// sql query for update data into database
	$sql_query = "UPDATE comment SET username='$username',emailid='$emailid',comment='$comment',url='$url',hide='$hide' WHERE id=".$_GET['edit_id'];
	// sql query for update data into database

	// sql query execution function
	if(mysql_query($sql_query))
	{
		?>
		<script type="text/javascript">
		alert('Data Are Updated Successfully');
		window.location.href='dashboard.php';
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
	header("Location: dashboard.php");
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Edit Center Details</title>
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
    <form method="post">
    <table align="center">

    <td><input type="text" name="username" placeholder="Examusernamecity"  value="<?php echo $fetched_row['username']; ?>" required /></td>
    </tr>
    <tr>
    <td><input type="text" name="emailid" placeholder="emailid"  value="<?php echo $fetched_row['emailid']; ?>" required /></td>
    </tr>
    <tr>
    <td><input type="text" name="comment" placeholder="comment"  value="<?php echo $fetched_row['comment']; ?>" required /></td>
    </tr>

  <tr>
    <td><input type="text" name="url" placeholder="url"  value="<?php echo $fetched_row['url']; ?>" required /></td>
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
