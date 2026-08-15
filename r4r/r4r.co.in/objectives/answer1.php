
<br><br>
<br><br>
<br><br><br><br><br><br><br><br><br><br><br><br><br><br>
<form action="Answers1.php" method="post">
<B>Question:
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "db/dbconnection.php";

$question_id=$_REQUEST["id"];

if (!$connection)
  {
  die('Could not connect: ' . mysql_error());
  }

  $result = mysql_query("SELECT  *  FROM `question` WHERE `id`='$question_id' ");
$row = mysql_fetch_array($result);
   echo $row['question'];
?>

<input type="hidden" name="id" value="<?php echo $_REQUEST["id"] ; ?>">
<input type="hidden" name="option" value="<?php echo $_REQUEST["option"] ; ?>">

</B><br>User Name:<input type="text" name="username"><br>
Answers: <textarea name="answer" cols="50" rows="5">
</textarea><br>
<br>
<input type="submit" value="Save"> <input type="reset"
	value="Reset">

</form>

