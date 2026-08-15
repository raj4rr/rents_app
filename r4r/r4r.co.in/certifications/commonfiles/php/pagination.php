<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

function displayPagination($language ,$tablename){
if(strpos($language,"INTER")>0){
	$option=str_replace("INTER","SUB",$language);
	//echo 'aaaa'.$language;
} else
$option=$language;

$currentpageID=$_GET["qid"];

$nextID;
$prevID;
$homePageURL = 'http';
 if ($_SERVER["HTTPS"] == "on") {$homePageURL .= "s";}
    $homePageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $homePageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 } else {
  $homePageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
 $homePageURL=substr($homePageURL,0,strpos($homePageURL,"?"));

 if(strpos($language,"Examp")>0||strpos($language,"Tutorial")>0){
	$homePageURL1="index.php";

	//echo 'aaaa'.$language;
}else 
	$homePageURL1=$homePageURL;
$rsprev = mysql_query("SELECT id FROM `$tablename` WHERE  id<'$currentpageID' and language='$option' AND hide='NO' ORDER BY id DESC limit 1") or die("Pgination1::-State query error!". mysql_error());
if(!mysql_numrows($rsprev)>0)
    {
    	$prevID=$currentpageID;
   	}
   	else {
   		 	while(list($id) = mysql_fetch_row($rsprev)) {
    		$prevID=$id;
 }    	
	}
$rsnext = mysql_query("SELECT  id  FROM `$tablename` WHERE  id>'$currentpageID' and language='$option' AND hide='NO' ORDER BY id asc limit 1 ") or die("Pgination2::-State query error!");
if(!mysql_numrows($rsnext)>0)
     {
     	$nextID=$currentpageID;
    	}
    	else{

     	while(list($id) = mysql_fetch_row($rsnext)) {
    		$nextID=$id;
	}
  	 }

    $rs = mysql_query("SELECT  *  FROM `$tablename` WHERE  id='$currentpageID' and language='$option' AND hide='NO'") or die("State query error!");
if(!mysql_numrows($rs)>0){
	// die(header("Location:".$homePageURL));
}

?>
<table width="100%">
<tr>
<td align="left" width="33%">

<a href="<?=$homePageURL?>?qid=<?php echo $prevID; ?>">
<img src="/images/previous.gif" border="0" alt="Previous" title="Previous"></a>
</td>
<td align="center" width="34%">

<a href="<?=$homePageURL1 ?>?"><img src="/images/home.gif" border="0" alt="Home" title="Home"></a>

</td>
<td align="right" width="33%">
<a href="<?=$homePageURL?>?qid=<?php echo $nextID; ?>"><img src="/images/next.gif" border="0" alt="Next" title="Next"></a>
</td>
</tr>
</table>

<?php }?>
