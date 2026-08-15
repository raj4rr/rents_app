<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

   	$pageURL = 'http';
 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
    $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
$pageNo = substr($pageURL,strpos($pageURL,"=")+1); 
        $pageURL=substr($pageURL,0,strpos($pageURL,"?"));

 require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php"; 

$MAX_REC_PER_PAGE=30;

  $rs = mysql_query("SELECT COUNT(*) FROM comment WHERE hide='YES' ") or die("Count query error!");
	list($total) = mysql_fetch_row($rs);
	$total_pages = ceil($total / $MAX_REC_PER_PAGE);

	if (0 == $pageNo){
		$page = 1; # 1-based
}else $page=$pageNo;
	$start = $MAX_REC_PER_PAGE * ($page - 1);  
	$max = $MAX_REC_PER_PAGE; 
?>
<b><font color="red">Tolal:</font><?php echo $total; ?> <font color="red">Click:</font></b>
<?php
		for ($i = 1; $i <= $total_pages; $i++) {
		$txt = $i;
		if ($page != $i) 
			$txt = "<a href=\"" ."  $pageURL". "?page=$i\">$txt</a>";
?>
	<?= $txt ?>

<?php }
echo '<br/>';
$result = mysql_query("SELECT * FROM comment WHERE hide='YES' order by id desc LIMIT $start, $max ");
while (list($id, $username,$emailid,$comment,$url,$hide) = mysql_fetch_row($result)) {
?>
<a href="publish.php?id=<?=$id ?>">Publish</a> ||| <a href="delete.php?id=<?=$id ?>">delete</a>
<b>Username :</b><?= htmlspecialchars($username);  ?><br>
<b>Comments :</b><?= htmlspecialchars($comment);  ?><br>
<b>URL :</b><?= htmlspecialchars($url);  ?><br>

<hr>

<?php
}

mysql_close($connection); 

?>
<?php
		for ($i = 1; $i <= $total_pages; $i++) {
		$txt = $i;
		if ($page != $i) 
			$txt = "<a href=\"" ."  $pageURL". "?page=$i\">$txt</a>";
 ?>
	<?= $txt ?>
<?php }?>
