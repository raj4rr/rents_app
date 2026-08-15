<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

if($_GET['name']){
    $name = addslashes($_GET['name']);
    $nameColor = "#".addslashes($_GET['name_color']);
    $text = $_GET['text'];
    $textColor = "#".addslashes($_GET['text_color']);

    $sql = "INSERT INTO voicebox(name,text,nameColor,textColor,time) VALUES('$name','$text','$nameColor','$textColor',now())";
    mysql_query($sql,$connection);
}

$sql = "SELECT * FROM voicebox";
$result = mysql_query($sql,$connection);

$totalRecords = mysql_num_rows($result);

if($totalRecords > 1000){
   $lastRecords = $totalRecords-1000;
   $sql = "SELECT * FROM voicebox ORDER BY id ASC LIMIT $lastRecords,$totalRecords";
   //echo $sql;
   $result = mysql_query($sql,$connection);
}

while($row = mysql_fetch_array($result)){
	$name = $row['name'];
        $namecolor = $row['nameColor'];

        $text = $row['text'];
        $textcolor = $row['textColor'];
        $date = date('h:i:s A',strtotime($row['time']));

	echo htmlspecialchars($name)."%".$namecolor."%"."<pre>".htmlspecialchars($text)."</pre>"."%".$textcolor."%".$date."-";

}
mysql_close($connection); 
?>
