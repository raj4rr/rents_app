<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

 function displayContents($language,$defaultPageHeader,$navigationtourl){ 
	// @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/php/pagination.php');
 	$subject= trim(substr($language,0,strpos($language,"Examp")));
 	//echo $showurl;
 	?>

<div class="heading"><?=$defaultPageHeader ?></div>

<?php  //require_once dirname(__FILE__) . '/../../config/site_config.php';
// require_once $CONFIG['CORE_PATH'] . "/../../db/sdbconnection.php";
$rs = mysql_query("SELECT  COUNT(*)  FROM `sourcecode` WHERE  language='$language' AND hide='NO' ") or die("Count query error!");
    list($total) = mysql_fetch_row($rs);
    $total_pages = ceil($total / MAX_REC_PER_PAGE);
    $page = intval(@$_GET["page"]); 

    if (0 == $page)
        $page = 1; # 1-based

    $start = MAX_REC_PER_PAGE * ($page - 1); 
    $max = MAX_REC_PER_PAGE; 

?>          

 <img src="/images/total.gif" border="0" alt="Total" title="R4R <?=$language?>"></font><?= $total ?> 
  <img src="/images/GoTo.gif" border="0" alt="GoTO Page" title="R4R <?=$language?>">

<?php
    for ($i = 1; $i <= $total_pages; $i++) {
        $txt = $i;
        if ($page != $i) 
            $txt = "<a href=\"" ."index.php". "?page=$i\">$txt</a>";
?>

    <?= $txt ?>
<?php
    }
?>

<?php

    $rs = mysql_query("SELECT  id,title  FROM `sourcecode` WHERE  language='$language'  ORDER BY  id  ASC LIMIT $start, $max ") or die("State query error!");

?>

    	<div class="content_link">

<?php

    while (list($id,$title) = mysql_fetch_row($rs)) {

?>

<p class="no_border"> 
<a href='<?php echo $navigationtourl;?>?qid=<?= htmlspecialchars($id) ?>' class='topic'><?= $title ?></a> 

   </p>

  <?php
	}

//mysql_close($sconnection);

?>
</div>
<img src="/images/GoTo.gif" border="0" alt="GoTO Page" title="R4R <?=$language?>">

<?php
    for ($i = 1; $i <= $total_pages; $i++) {
        $txt = $i;
        if ($page != $i) 
            $txt = "<a href=\"" ."index.php". "?page=$i\">$txt</a>";
?>

    <?= $txt ?>
<?php
    }
?>

<?php //include("../../../php/postcomment.php"); 
?> 

	  <?php } ?>
