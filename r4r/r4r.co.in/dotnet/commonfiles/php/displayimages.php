 <?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

function images($id1)
{
$rsimages = mysql_query("SELECT images FROM `images` WHERE  sourcecode_id='$id1' AND hide='NO'") or die("State query error!");
if(!mysql_numrows($rsimages)>0)
    {

   	}
   	else {
   		 	while(list($images) = mysql_fetch_row($rsimages)) {
    	 echo'<img src="http://localhost/r4r/img/'.$images.'" width="728" alt="r4r struts exmaples">';

  }
 }    	
}   
?>
