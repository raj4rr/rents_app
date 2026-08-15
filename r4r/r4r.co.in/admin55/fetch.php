<?php
session_start();
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 $examid=$_SESSION['examid'];
 $examname='';
// delete condition
if(isset($_GET['delete_id']))
{
	$sql_query="DELETE FROM center_details WHERE id=".$_GET['delete_id'];
	mysql_query($sql_query);
	header("Location: $_SERVER['PHP_SELF']");
}
// delete condition

			 $sqlexamname = "SELECT * FROM examevent WHERE id = $examid";
				$result_sete=mysql_query($sqlexamname);

	if(mysql_num_rows($result_sete)>0)
	{
        while($row1=mysql_fetch_row($result_sete))
		{
 //  
    //$name=$row1['name'];
    $examname= $row1[1];
    $_SESSION['examname'] = $row1[1];

                       }} 

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>DashBoard</title>
<link rel="stylesheet" href="style.css" type="text/css" />
<script type="text/javascript">
function edt_id(id)
{
	if(confirm('Sure to edit ?'))
	{
		window.location.href='edit_data.php?edit_id='+id;
	}
}
function delete_id(id)
{
	if(confirm('Sure to Delete ?'))
	{
		window.location.href='dashboard.php?delete_id='+id;
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
    <th colspan="2"><a href="add_data.php">Add New Center.</a></th>
        <th colspan="3"><a href="loadexam.php">Load Other Exam.</a></th>
        <th colspan="3"><a href="logout.php">Logout</a></th>
    </tr>

    <th>Exam city</th>
    <th>College</th>
    <th>Center address</th>
    <th>Exam date</th>
    <th>Shift</th>
    <th>Code</th>
    <th colspan="2">Operations</th>
    </tr>
    <?php
	$today=date("d-M-y");
	$sql_query="SELECT * FROM center_details where exam_name	='$examid' order by exam_city,exam_date desc";
	$result_set=mysql_query($sql_query);
	if(mysql_num_rows($result_set)>0)
	{
        while($row=mysql_fetch_row($result_set))
		{
		?>
            <tr>

            <td><?php echo $row[1]; ?></td>
            <td><?php echo $row[3]; ?></td>
            <td><?php echo $row[4]; ?></td>
            <td><?php echo $row[5]; ?></td>
            <td><?php echo $row[6]; ?></td>
            <td><?php echo $row[7]; ?></td>
            <td align="center"><a href="javascript:edt_id('<?php echo $row[0]; ?>')"><img src="b_edit.png" align="EDIT" /></a></td>
            <td align="center"><a href="javascript:delete_id('<?php echo $row[0]; ?>')"><img src="b_drop.png" align="DELETE" /></a></td>
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

