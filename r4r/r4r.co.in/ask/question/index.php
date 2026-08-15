<?php
session_start();
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 $examid=$_SESSION['examid'];
 $examname='';
// delete condition
if(isset($_GET['delete_id']))
{
	$sql_query="DELETE FROM question WHERE id=".$_GET['delete_id'];
	mysql_query($sql_query);
	header("Location: $_SERVER['PHP_SELF']");
}
// delete condition

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Answer DashBoard</title>
<link rel="stylesheet" href="../style.css" type="text/css" />
<script type="text/javascript">

function appr_id(id)

{

	//if(confirm('Sure to edit ?'))

	{

		window.location.href='appv_data.php?edit_id='+id;

	}

}

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
		window.location.href='index.php?delete_id='+id;
	}
}
</script>
</head>
<body>
<center>

<div id="header">
	<div id="content">
    <label>Question DashBoard</label>
    </div>
</div>

<div id="body">
	<div id="content">
    <table align="center">
    <tr>
    <th colspan="2"><a href="add_data.php">Add New Question</a></th>
    <th colspan="3"><a href="../answer">Add New Answer.</a></th>

    </tr>

    <th>question</th>
    <th>question_level</th>
    <th>language</th>

    <th>Hide</th>

    <th colspan="2">Operations</th>
    </tr>
    <?php
	$today=date("d-M-y");
	$sql_query="SELECT * FROM question where userid='2' order by id desc limit 0,100";
	$result_set=mysql_query($sql_query);
	if(mysql_num_rows($result_set)>0)
	{
        while($row=mysql_fetch_row($result_set))
		{
		?>
            <tr>

            <td><?php echo $row[1]; ?></td>
            <td><?php echo $row[2]; ?></td>
            <td><?php echo $row[3]; ?></td>
            <td><?php echo $row[4]; ?></td>

            <td align="center"><a href="javascript:edt_id('<?php echo $row[0]; ?>')"><img src="b_edit.png" align="EDIT" /></a></td>
             <td align="center"><a href="/answer/index.php?id=<?php echo $row[0]; ?>&option=<?php echo $row[3]; ?>">Preview</a></td>
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
	 mysql_close($con);
	?>
    </table>
    </div>
</div>

</center>
</body>
</html>
