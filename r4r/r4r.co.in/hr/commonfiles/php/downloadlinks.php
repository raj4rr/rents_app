    <?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

function d_links($id1){

  $rsdownloads = mysql_query("SELECT description,title,link FROM `downloads` WHERE  sourcecode_id='$id1' AND hide='NO'") or die("State query error!");
if(!mysql_numrows($rsdownloads)>0)
    {
   	}
   	else {
   		 	while(list($description,$title,$link) = mysql_fetch_row($rsdownloads)) {
    		echo '<p><strong><a href="'.$link.'" title="'.$title.'">'.$title.'</a></strong><br>'.$description.'</p>';

 }    	
}   }
?>