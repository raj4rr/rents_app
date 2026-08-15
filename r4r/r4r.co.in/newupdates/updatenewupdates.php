<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
 $id=$_GET['id'];
require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$result = mysql_query("SELECT * FROM `newupdates` where `newupdates`.`id` =$id");
while (list($id, $title,$updates,$url,$name,$cdate,$status) = mysql_fetch_row($result)) {
?>

<form action="updatenews.php" method="post"><B>New Updates:</p><br>
        <input type="hidden" name="id" value="<?=$id ?>">
        <table><tr><td>
Title: </td><td><input type="text" name="title" value="<?=$title ?>"/></td></tr>
<tr><td>
Updates:</td><td><textarea name="updates" rows="4" cols="80"><?=$updates ?>

</textarea> </td></tr><tr><td>
URL: </td><td><input type="text" name="url" value="<?=$url ?>" /></td></tr><tr><td>

	 <br>

         Name: </td><td><input type="text" name="name" value="<?=$name ?>"/></td></tr>

<tr><td>

         Status: </td><td><input type="text" name="status" value="<?=$status ?>"/></td></tr>
 <tr><td>
<input type="submit" value="Save"> </td><td>
<input type="reset" value="Reset"></td></tr></table>

</form>
</p>

<?php
}

mysql_close($connection);  
?>
