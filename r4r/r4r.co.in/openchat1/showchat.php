<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$sql = "SELECT * FROM voicebox where hide='Yes' ORDER BY id DESC";
$result = mysql_query($sql,$connection);

$totalRecords = mysql_num_rows($result);

if($totalRecords > 1000){
   $lastRecords = $totalRecords-1000;
   $sql = "SELECT * FROM voicebox where hide='Yes' ORDER BY id DESC LIMIT $lastRecords,$totalRecords";
   //echo $sql;
   $result = mysql_query($sql,$connection);
}

while($row = mysql_fetch_array($result)){
	$name = $row['name'];
        $namecolor = $row['nameColor'];

        $text = $row['text'];
        $textcolor = $row['textColor'];
        $date = date('h:i:s A',strtotime($row['time']));

	echo '<font color='.$namecolor.'><b>'.htmlspecialchars($name).'</b></font>   '.$date.'<br><pre><font color='.$textcolor.'/>'.($text).'</font></pre>';

}
mysql_close($connection); 
?>
