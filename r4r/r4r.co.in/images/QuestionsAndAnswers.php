
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once '../'.$CONFIG['CORE_PATH'] . "db/dbconnection.php";

if (!$connection)
  {
  die('Could not connect: ' . mysql_error());
  }

$id=$_GET["id"];

    $rs = mysql_query("SELECT  *  FROM `question` WHERE  id='$id'") or die("State query error!");
 $txt = "<a href=\"" ." /images/QuestionsAndAnswers.php". "?id=".($id-1)."\">Preview</a>";
echo $txt;
    while (list($id, $question,$language) = mysql_fetch_row($rs)) {
?>

           <font color="Red"><b>Question </font>:<?= htmlspecialchars($question) ?><a href="/answer1.php?id=<?= htmlspecialchars($id) ?>">Click Here For Answer</a>

 <?php 

 $result1 = mysql_query("SELECT  *  FROM `answer` WHERE question_id='$id ' and  hide='NO'")or die("<br>Answer query error!");
 while(list($answer_id,$question_id,$answer, $username,$date) = mysql_fetch_row($result1)) {
  ?> </b><br><font color="Red">Answer:</font><pre><?= htmlspecialchars($answer) ?></pre>
</pre> <br><font color="Red">User Name:</font><?= htmlspecialchars($username) ?>
 <br><font color="Red">Date:</font><?= htmlspecialchars($date) ?> 
 <hr><br>
<?php 
 }

    }
mysql_close($connection);

?>
