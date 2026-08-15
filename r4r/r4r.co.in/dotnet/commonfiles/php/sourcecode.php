<?php function displayContents($id,$title,$keywords,$descriptions,$introduction,$classdescription,$methoddescription,$sourcecodedescription,$sourcecode,$output,$file,$language,$username,$date){
   	 require_once "pagination.php";
  ?>
<div class="heading"><?= htmlspecialchars($title) ?></div>

<p>
   <div id="contentpre"><?= ($introduction) ?></div></p><p>

 <div id="contentpre"><?= ($classdescription) ?></div>

<div id="contentpre"> <?= ($methoddescription) ?></div></p><p> 
 <div id="contentpre"> <?= ($sourcecodedescription) ?></div></p><p>
 <?php if(trim($sourcecode," ")!="") { ?>  

<div class="code"><pre> <?= ($sourcecode) ?></pre></div>
  <?php } 

?>
<?php if(trim($output," ")!="") { ?>

   <div id="output"><h3> Output<h3><pre><?= ($output) ?></pre></div>

   <?php } ?>

<?php }
?>
