<?php
session_start();
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

// delete condition
if(isset($_GET['delete_id']))
{
	$sql_query="DELETE FROM examevent WHERE id=".$_GET['delete_id'];
	mysql_query($sql_query);
	header("Location: $_SERVER['PHP_SELF']");
}
// delete condition

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Exams List</title>
<link rel="stylesheet" href="style.css" type="text/css" />
<script type="text/javascript">
function edt_id(id)
{
	if(confirm('Sure to edit ?'))
	{
		window.location.href='edit_data-exams.php?edit_id='+id;
	}
}
function delete_id(id)
{
	if(confirm('Sure to Delete ?'))
	{
		window.location.href='examslist.php?delete_id='+id;
	}
}
</script>
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
    <table align="center">
    <tr>
		<th ><a href="loadexam.php">Back to Main Page.</a></th>
    <th ><a href="add_data-exams.php">Add New Exam.</a></th>
           <th colspan="3"><a href="logout.php">Logout</a></th>
    </tr>

    <th>Exam ID</th>
    <th>Exam Name</th>
        <th>Shif1 Timing</th>
           <th>Shif2 Timing</th>
           <th>Shif3 Timing</th>
    <th>iLive</th>
    <th>Status</th>

    <th colspan="2">Operations</th>
    </tr>
    <?php
	$sql_query="SELECT * FROM examevent";
	$result_set=mysql_query($sql_query);
	if(mysql_num_rows($result_set)>0)
	{
        while($row=mysql_fetch_row($result_set))
		{
		?>
            <tr>

            <td><?php echo $row[0]; ?></td>
            <td><?php echo $row[1]; ?></td>
            <td><?php echo $row[2]; ?></td>
            <td><?php echo $row[3]; ?></td>
            <td><?php echo $row[4]; ?></td>
            <td><?php echo $row[5]; ?></td>
            <td><?php echo $row[6]; ?></td>

            <td align="center"><a href="javascript:edt_id('<?php echo $row[0]; ?>')"><img src="b_edit.png" align="EDIT" /></a></td>
            <td align="center"><?php if($row[5]=="Y"){ ?> <a href="javascript:delete_id('<?php echo $row[0]; ?>')"><img src="b_drop.png" align="DELETE" /></a><?php }else echo '-------'; ?></td>
            </tr>
        <?php
		}
	}
	else
	{
		?>
        <tr>
        <td colspan="5">No Data Found !</td>
        </tr>
        <?php
	}
	?>
    </table>
    </div>
</div>

</center>
</body>
</html>
