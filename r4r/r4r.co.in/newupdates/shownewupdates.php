<div style="height:600px;overflow:scroll;width:300px;">
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$result = mysql_query("SELECT * FROM `newupdates` where status='Yes' ORDER BY `newupdates`.`id` DESC LIMIT 0 , 100");
while (list($id, $title,$updates,$url,$name,$cdate) = mysql_fetch_row($result)) {
?>
<p>
<?=$id ?>:<a href="<?=$url ?>"><b><?= htmlspecialchars($title);  ?></b></a><br/>

<?= htmlspecialchars($updates);  ?><br/>
<font size='2'>Posted By: <?= htmlspecialchars($name);  ?> &nbsp;&nbsp;&nbsp;
Posted Date:<?= htmlspecialchars($cdate);  ?>
</font>
</p>
<?php
}

mysql_close($connection); 

?>
</div>
