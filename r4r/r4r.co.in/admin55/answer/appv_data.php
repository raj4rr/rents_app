<?php
session_start();

include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

	// variables for input data

	// sql query for update data into database
	$sql_query = "UPDATE answer SET userid='3' and `hide` = 'NO' WHERE answer_id=".$_GET['edit_id'];
	// sql query for update data into database

	// sql query execution function
	if(mysql_query($sql_query))
	{
		?>
		<script type="text/javascript">
		//alert('Data Are Updated Successfully');
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
		<?php	header("Location: index.php");
	}
	// sql query execution function

?>
