<form method="GET" action="ShowAnswers1.php">
Enter Key<input type="text" name="option">
 <p><input type="submit" value="Submit" name="B1"><input type="reset" value="Reset" name="B2"></p>
</form>
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/sdbconnection.php";
  define('MAX_REC_PER_PAGE', 1);

if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }
$option=$_GET["option"];

$rs = mysql_query("SELECT  COUNT(*)  FROM `sourcecode` WHERE  language='$option' AND hide='NO' ") or die("Count query error!");
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
            $txt = "<a href=\"" ." ShowAnswers1.php". "?page=$i&option=$option\">$txt</a>";
?>
    <?= $txt ?>
<?php
    }
    $rs = mysql_query("SELECT  *  FROM `sourcecode` WHERE  language='$option'  ORDER BY  id  ASC LIMIT $start, $max ") or die("State query error!");

?>
    <h3>Page <?= $page ?></h3>

<?php

    while (list($id,$title,$keywords,$descriptions,$introduction,$classdescription,$methoddescription,$sourcecodedescription,$sourcecode,$output,$file,$language,$username,$date,$hide) = mysql_fetch_row($rs)) {
?>

<a href="DELETE.php?id=<?= htmlspecialchars($id) ?>&option=<?=$option ?>">Delete</a> <a href="UPDATE.php?id=<?= htmlspecialchars($id) ?>&option=<?=$option ?>">Update</a><hr>

    <font color="Red"><b>Title </font>:<pre><?= htmlspecialchars($title) ?></pre>
     <font color="Red"><b>Keywords </font>:<pre><?= htmlspecialchars($keywords) ?></pre>
      <font color="Red"><b>Descriptions </font>:<pre><?= htmlspecialchars($descriptions) ?></pre>
       <font color="Red"><b>Introduction </font>:<pre><?= htmlspecialchars($introduction) ?></pre>
        <font color="Red"><b>Class Description </font>:<pre><?= htmlspecialchars($classdescription) ?></pre>
         <font color="Red"><b>Method Description </font>:<pre><?= htmlspecialchars($methoddescription) ?></pre>
          <font color="Red"><b>Class Description </font>:<pre><?= htmlspecialchars($classdescription) ?></pre>
           <font color="Red"><b>Source Code Description </font>:<pre><?= htmlspecialchars($sourcecodedescription) ?></pre>
            <font color="Red"><b>Source Code </font>:<pre><?= htmlspecialchars($sourcecode) ?></pre>
             <font color="Red"><b>Output </font>:<pre><?= htmlspecialchars($output) ?></pre>
              <font color="Red"><b>Language </font>:<pre><?= htmlspecialchars($language) ?></pre> 
              <font color="Red"><b>User Name </font>:<pre><?= htmlspecialchars($username) ?></pre>
             <font color="Red"><b>Date </font>:<pre><?= htmlspecialchars($date) ?></pre>

  <?php
	}

mysql_close($sconnection);

?>

