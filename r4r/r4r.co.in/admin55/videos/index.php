<?php
include("connect.php");
?>
<link rel="stylesheet" href="style.css" type="text/css"/>
<div id="content">
 <?php
 include('upload.php');
$result=mysqli_query($conn,"SELECT*FROM videos ");
 while($row=$result->fetch_array()){?>
	<table><tr><td colspan="2"><h3><?php echo $row['title'];?></h3></td></tr>
	<tr><td>
<div id="video_player_box"> 

  <video id="video" width="300" height="200" controls>
  <source src="<?php echo 'videos/'.$row['name'];?>" type="video/<?php echo $row['type'];?>">
    Your browser does not support the video tag.
</video>

</div>
</td>
<td><h4><?php echo $row['categoryname'];?></h4>
<h4><?php echo $row['vdesc'];?></h4>
</td>
</tr>
 </table>
  <?php }?>
  </div>
