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
        $pageURL=substr($pageURL,0,strpos($pageURL,"?")-1);

 require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php"; 

$MAX_REC_PER_PAGE=50;

  $rs = mysql_query("SELECT COUNT(*) FROM comment WHERE hide='NO' ") or die("Count query error!");
	list($total) = mysql_fetch_row($rs);
	$total_pages = ceil($total / $MAX_REC_PER_PAGE);

	if (0 == $pageNo){
		$page = 1; # 1-based
}else $page=$pageNo;
	$start = $MAX_REC_PER_PAGE * ($page - 1);  
	$max = $MAX_REC_PER_PAGE; 
?>
<h2>Showing <font color="red"><?php echo $total; ?></font> Out of <?php echo $total; ?></h2>
<?php
		for ($i = 1; $i <= $total_pages; $i++) {
		$txt = $i;
		if ($page != $i) 
			$txt = "<a href=\"" ."  $pageURL". "?page=$i\">$txt</a>";
?>
	<?= $txt ?>
<div class="table_content">
<table style="width:100%; font-size:13px;">
<tr><td style="width:20%;" class="heading">Name</td>
<td style="width:80%;" class="heading">Comment/Feedback</td></tr>
<?php }
$result = mysql_query("SELECT * FROM comment WHERE hide='NO' order by id desc LIMIT $start, $max ");
while (list($id, $username,$emailid,$comment,$url,$hide) = mysql_fetch_row($result)) {
?>
<tr>
<td class="heading"><?= htmlspecialchars($username);  ?></td>
<td class="alternate_heading1"><?= htmlspecialchars($comment);  ?></td>
</tr>

<?php
}?>
</table>
</div>

<?php mysql_close($connection); 
?>

<?php
		for ($i = 1; $i <= $total_pages; $i++) {
		$txt = $i;
		if ($page != $i) 
			$txt = "<a href=\"" ."  $pageURL". "?page=$i\">$txt</a>";
 ?>
	<?= $txt ?>
<?php }?>
