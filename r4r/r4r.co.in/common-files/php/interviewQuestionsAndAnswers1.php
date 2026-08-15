
<!-- r4r new layout -->

<!-- r4r new layout -->

<!-- r4r new layout -->

<!-- r4r new layout -->

<?php
$subject=str_replace("C++","CPP",$subject);
$subject=str_replace("VC++","VCPP",$subject);
//echo strpos($language,"OBJ");
if(!strpos($language,"OBJ")>0){
?>

<div class="heading"><?=$subject ?> Objective  Questions And Answers</div>

	<a href="<?=strpos($subject,"#")>0?str_replace("C#","c1",$subject):$subject ?>_Objective_Questions_And_Answers.php"><h3><?=$subject ?> Objective Questions And Answers</h3></a>
<?php 

}
if(!strpos($language,"INTER")>0){

 ?>

<div class="heading"><?=$subject ?> Interview Questions And Answers</div>
 <a href="<?=strpos($subject,"#")>0?str_replace("C#","c1",$subject):$subject ?>_Interview_Questions_And_Answers.php"><h3><?=$subject ?> Interview Questions And Answers</h3></a><br>
 <?php }
if(!strpos($language,"SUB")>0){

 ?>
<div class="heading"><?=$subject ?> Interview Questions And Answers</div>
 <a href="<?=strpos($subject,"#")>0?str_replace("C#","c1",$subject):$subject ?>_Subjective_Questions_And_Answers.php"><h3><?=$subject ?> Subjective Questions And Answers</h3></a><br>
 <?php }
 ?>

   R4R,<b><?=$subject ?> Objective  fresher and experienced, <?=$subject ?> Subjective  fresher and experienced ,<?=$subject ?> Interview Questions And Answers,<?=$subject ?>  fresher and experienced,<?=$subject ?> Interview  fresher and experienced ,<?=$subject ?> Questions   fresher and experienced,<?=$subject ?> Answers  fresher and experienced

</b>

</TD>
<?php 
}

?>
