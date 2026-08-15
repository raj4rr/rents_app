<form method="GET" action="ShowAnswers.php">
Enter Key<input type="text" name="option">
 <p><input type="submit" value="Submit" name="B1"><input type="reset" value="Reset" name="B2"></p>
</form>
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";
  define('MAX_REC_PER_PAGE', 5);

if (!$connection)
  {
  die('Could not connect: ' . mysql_error());
  }
$option=$_GET["option"];

$rs = mysql_query("SELECT  COUNT(*)  FROM `question` WHERE  language='$option' AND hide='NO' ") or die("Count query error!");
    list($total) = mysql_fetch_row($rs);
    $total_pages = ceil($total / MAX_REC_PER_PAGE);
    $page = intval(@$_GET["page"]); 

    if (0 == $page)
        $page = 1; # 1-based

    $start = MAX_REC_PER_PAGE * ($page - 1); 
    $max = MAX_REC_PER_PAGE; 

?>          
    <br>Goto Page:</br>
<?php
    for ($i = 1; $i <= $total_pages; $i++) {
        $txt = $i;
        if ($page != $i) 
            $txt = "<a href=\"" ." ShowAnswers.php". "?page=$i&option=$option\">$txt</a>";
?>
    <?= $txt ?>
<?php
    }
    $rs = mysql_query("SELECT  *  FROM `question` WHERE  language='$option'  ORDER BY  id  ASC LIMIT $start, $max ") or die("State query error!");

?>
    <h3>Page <?= $page ?></h3>

<?php
$Q_ID;
$Q_Option=$option;
    while (list($id, $question,$language) = mysql_fetch_row($rs)) {
    	 $Q_ID=$id;
?>

           <font color="Red"><b>Question 
           </font>:<?= htmlspecialchars($question) ?>
          <a href="DELETE.php?id=<?= htmlspecialchars($id) ?>&option=<?=$Q_Option ?>">Delete</a> <a href="UPDATE.php?id=<?= htmlspecialchars($id) ?>&option=<?=$Q_Option ?>">Update</a><hr>

<?php
$optionNumber=0;
 $result1 = mysql_query("SELECT  *  FROM `o_answer` WHERE q_ID='$id ' and  hide='NO'")or die("<br>Answer query error!");
while(list($id,$q_ID,$answer,$option,$date,$name,$hide) = mysql_fetch_row($result1)) {
	$optionNumber=$optionNumber+1;
?> 

  Option:</b> <?= $optionNumber ?> </font>
<pre><?=$answer ?></pre> <?=$option ?>
      <br>
<?php 
 }

 $rs1 = mysql_query("SELECT  *  FROM `o_comments` WHERE q_ID='$Q_ID' ") or die("State query error!");
while(list($id,$q_ID,$comments) = mysql_fetch_row($rs1))
{
	?>
	Comments: <?= htmlspecialchars($comments) ?>
	<br>
	<?php
	}

    }
mysql_close($connection);

?>

