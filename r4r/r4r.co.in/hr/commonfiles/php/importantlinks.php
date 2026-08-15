    <?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

function i_links($id1){

  $rslinks = mysql_query("SELECT url,description,title FROM `links` WHERE  sourcecode_id='$id1' AND hide='NO'") or die("State query error!");
if(!mysql_numrows($rslinks)>0)
    {
   	}
   	else {
   		 	while(list($url,$description,$title) = mysql_fetch_row($rslinks)) {
    		echo '<p><strong><a href="'.$url.'" title="'.$title.'">'.$title.'</a></strong><br>'.$description.'</p>';

 }    	
}   

  }
?>
