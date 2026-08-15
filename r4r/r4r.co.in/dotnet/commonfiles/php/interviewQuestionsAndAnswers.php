<script>
function  checkAuthorized()
{
if(checkNotNullFields()==true){
var a=document.postAnswers.a.value;
var b=document.postAnswers.b.value;
var sum=document.postAnswers.sum.value;
if(sum!=a+b)alert("Wrong SuM Try Again.........");
else document.postAnswers.submit();
}
}

function  checkNotNullFields(){
{
if (document.postAnswers.username.value == "")
{
alert("Please enter a value for the \" Your Name\" field.");
document.postAnswers.username.focus();
return false;
}
if (document.postAnswers.email.value == "")
{
alert("Please enter a value for the \" Email\" field.");
document.postAnswers.email.focus();
return false;
}
if (document.postAnswers.answer.value == "")
{
alert("Please enter a value for the \"Answer\" field.");
document.postAnswers.answer.focus();
return false;
}
if (document.postAnswers.sum.value == "")
{
alert("Please enter a value for the \"SUM\" field.");
document.postAnswers.sum.focus();
return false;
}

return true;
}
}</script>

	<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

        // echo $_SERVER["HTTP_REFERER"]; Getting the Previous URL
function displayContents($language){
	 define('MAX_REC_PER_PAGE10', 5);
	if(strpos($language,"OBJ")>0){

        // echo $_SERVER["HTTP_REFERER"]; Getting the Previous URL

	$subject=substr($language,0,strpos($language, " "));
	$pageURL = 'http';
 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
    $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
	$pageURL1=$pageURL;
		$qid = intval(@$_GET["qid"]);
		$comments = $_GET["comments"];
 $pageURL=substr($pageURL,0,strpos($pageURL,"?"));
 //echo $pageURL;
	?>

<?php 

  ?>

<?php if(!$qid==0 && !$comments=="Yes") {

	 include("pagination.php"); 
	 displayPagination($language,"question");
$rs = mysql_query("SELECT  question  FROM abes.`question` WHERE  id='$qid' AND hide='NO'") or die("State query error!");
while (list($question) = mysql_fetch_row($rs)) {

?>

<font size="2"><pre><?= htmlspecialchars($question) ?></b></pre></font>
	<table width="100%" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111">
			 <tr bgcolor="#000080" style="color: #D7D8FD">
				   <th width="30%"><font size="2">Questions</font></th>
				   <th width="60%"><font size="2">Answers</font></th>
				   <th width="5%"><font size="2">Post Answers</font></th>  
				   <th width="5%"><font size="2">Posted By</font></th>   

			</tr>

<?php

		 $answers = mysql_query("SELECT  username,date,answer FROM abes.`answer` WHERE question_id='$qid' and  hide='NO' ORDER BY `answer`.`answer_id` ASC")or die("<br>Answer query error!");
		 $flag=1;
		 $flagforanswer=0;
			 $flagforowner=0;

while (list($username,$date,$answer) = mysql_fetch_row($answers)) {
	$flagforowner=1;
if($flagforanswer==0){

	$flagforanswer=1;
		}

  if($flag==0){
			$flag=1;
if($username=='Rajesh Kumar'||$username=='Vivek kr. Agarwal'||(strpos($username,'Vivek')>-1)||(strpos($username,'vivek')>-1)){?>	 <tr bgcolor="#fffaa">
	<?php } else {?> <tr bgcolor="#D8D8D8"> <?php } ?>

				   <td width="30%"><pre><?= htmlspecialchars($question) ?></pre></td>
				   <td width="60%"><pre><?= htmlspecialchars($answer) ?></pre></td>
				  <td><a href="<?=$pageURL ?>?qid=<?= $qid ?>&comments=Yes">Post Your Answer</a></td>    

			<?php if($username=='Rajesh Kumar'||$username=='Vivek kr. Agarwal'){?>	 <td width="5%"><font size="2"><?= htmlspecialchars($username) ?><br/><?= htmlspecialchars($date) ?><br>[R4R Team]</font></td>   
	<?php } else {?> <td width="5%"><font size="2"><?= htmlspecialchars($username) ?><br/><?= htmlspecialchars($date) ?></font></td>    <?php } ?>

			  </tr>
	 <?php
	}else
	{

			$flag=0;
	if($username=='Rajesh Kumar'||$username=='Vivek kr. Agarwal'||(strpos($username,'vivek')>-1)||(strpos($username,'vivek')>-1)){?>	 <tr bgcolor="#fffaa">
	<?php } else {?><tr> <?php }?>
				  <td width="20%"><pre><?= htmlspecialchars($question) ?></pre></td>
				   <td width="60%"><pre><?= htmlspecialchars($answer) ?></pre></td>
				   <td><a href="<?=$pageURL ?>?qid=<?= $qid ?>&comments=Yes">Post Your Answer</a></td>  
				  <?php if($username=='Rajesh Kumar'){?>	 <td width="5%"><font size="2"><?= htmlspecialchars($username) ?><br/><?= htmlspecialchars($date) ?><br>[R4R Team]</font></td>   
	<?php } else {?> <td width="5%"><font size="2"><?= htmlspecialchars($username) ?><br/><?= htmlspecialchars($date) ?></font></td>    <?php } ?>

			  </tr>

<?php }
}
if($flagforanswer==0){?>
<tr><td colspan='5'><a href="<?=$pageURL ?>?qid=<?= $qid ?>&comments=Yes">Post Your Answers</a></td>  </tr>
<?php }}
?>
</table>
<?php 			
// mysql_close($connection);
}else{
		if($comments=="Yes"){
		 include("pagination.php");  
	 displayPagination($language,"question");
			?>

			<form name="postAnswers" action = "/commonfiles/php/insertInterviewAnswers.php" method = "post">
<table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#0000FF" width="100%" id="AutoNumber1" bgcolor="#FFFFFF">
	<tr>
      <td width="578" colspan="2" >
      <p align="center"><b>Post Your Answer</b></td>
		</tr>

		<?php	

			$rs = mysql_query("SELECT  question  FROM abes.`question` WHERE  id='$qid' AND hide='NO'") or die("State query error!");
while (list($question) = mysql_fetch_row($rs)) {
?>
	<tr>
	<td ><p align="left"><b>Question:</pre></b></td>
    <td><pre><?= htmlspecialchars($question) ?> <Input type="hidden" name="qid" size="20" value="<?= $qid ?>"></pre></td>
    </tr>
<?php }

?>

	<tr><td width="148" >
      <p dir="ltr">Your Name<font color="#FF0000">*</font></td>
		<td width="430"><Input type="text" name="username" size="20"></td></tr>
	<tr><td width="148">Your Email ID <font color="#FF0000">*</font></td>
		<td width="430"><Input type="text" name="email" size="20"></td></tr>	
	<tr><td width="148">Answer <font color="#FF0000">*</font></td>
		<td width="430">
        <textarea rows="15" cols="68" name="answer" id="answer" ></textarea></td></tr>
    <tr> 
    <td width="50%"> 
<script> 
var a= Math.floor(Math.random()*10);
var b= Math.floor(Math.random()*10);
document.write("<input type='text' name='a'size='3' readonly='true' value='"+a+"' /><font size='1'>X10</font>+<input type='text' size='3' name='b' readonly='true' value='"+b+"' />");

</script>&nbsp;</td> 
    <td width="50%">=<input type="text" name="sum" size="4" value=""><font color="#FF0000">*</font> 
    <font size="2" color="#FF0000">Enter SUM</font></td> 
  </tr> 
  <tr> 
    <td width="100%" colspan="2"> 
<p align="center"> 
<input type="button" value="   Submit  " name="Submit" onclick="checkAuthorized()"> 

<input type="reset"	value="Reset"><a href='<?=$_SERVER["HTTP_REFERER"] ?>'>Go Back</a></td> 
  </tr> 

</table>
</form>

<?php
 //mysql_close($connection);
		}else{

if(strpos($language,"INTER")>0){
	$language1=str_replace("INTER","SUB",$language);
	//echo 'aaaa'.$language;
} else
$language1=$language;
$rs = mysql_query("SELECT  COUNT(*)  FROM abes.`question` WHERE  language='$language1' AND hide='NO' ") or die("Count 1query error!");
	list($total) = mysql_fetch_row($rs);
	$total_pages = ceil($total / MAX_REC_PER_PAGE10);
	$page = intval(@$_GET["page"]); 

	if (0 == $page)
		$page = 1; # 1-based

	$start = MAX_REC_PER_PAGE10 * ($page - 1);  
	$max = MAX_REC_PER_PAGE10; 
?>

<b><font color="red">Totel:</font><?php echo $total; ?> <font color="red">Click:</font></b>
<?php
		for ($i = 1; $i <= $total_pages; $i++) {
		$txt = $i;
		if ($page != $i) 
			$txt = "<a href=\"" ."  $pageURL". "?page=$i\">$txt</a>";
?>
	<?= $txt ?>
<?php
	}
?>
   <?php //@include($_SERVER['DOCUMENT_ROOT'] . '/common-files/ads2.shtml');
   ?><br/>

	<p class="style5"><font color="#FF0000"><h3><?=$subject ?> Interview Questions And Answers</h3></font></p>
	<h3>Page <?= $page ?></h3>

   <table width="100%" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111">
			 <tr bgcolor="#000080" style="color: #D7D8FD">
				   <th width="45%">Questions</th>
				   <th width="15%">Show Answers</th>
				   <th width="5%">Total Posts</th>  
				   <th width="15%">Post Your Answers</th>   
				   <th width="20%">Last Post</th>   
			</tr>
<?php
$flag=1;
if(!strpos($language,"INTER")>0){
 $rs = mysql_query("SELECT  *  FROM abes.`question` WHERE  language='$language1' AND hide='NO' ORDER BY  id  ASC   LIMIT $start, $max ") or die("State query error!");
	//echo 'aaaa'.$language;
}else{
	 $rs = mysql_query("SELECT  *  FROM abes.`question` WHERE  language='$language1' AND hide='NO' ORDER BY  id  DESC    LIMIT $start, $max ") or die("State query error!");
	}
	while (list($id, $question) = mysql_fetch_row($rs)) {
		  $countPost = mysql_query("SELECT  COUNT(*)  FROM `answer` WHERE question_id='$id ' and  hide='NO'")or die("<br>Answer query error!");
		 list($totalPost) = mysql_fetch_row($countPost);
		 $lastPostedUserDetails = mysql_query("SELECT  username,date FROM abes.`answer` WHERE question_id='$id ' and  hide='NO' order by answer_id desc limit 1")or die("<br>Answer query error!");
		 list($userName,$lastDate) = mysql_fetch_row($lastPostedUserDetails);
		   if($flag==0){
			$flag=1;
?>
			  <tr bgcolor="#D8D8D8">
				   <td ><pre><?= htmlspecialchars($question) ?></pre></td>
				  <td><?php if($totalPost==0){ echo 'NA'; } else {?><a href="<?=$pageURL ?>?qid=<?= htmlspecialchars($id) ?>">Show Answers</a><?php }?>
				   <td><?= $totalPost ?></td>    
				 <td><a href="<?=$pageURL ?>?qid=<?= $id ?>&comments=Yes">Post Your Answers</a></td> 
					 <td><font size="2"><?= $lastDate ?><br/><?= htmlspecialchars($userName) ?></font></td> 
			  </tr>
	 <?php
	}else
	{
			$flag=0;
	?>	 <tr>
				  <td ><pre><?= htmlspecialchars($question) ?></pre></td>
					<td><?php if($totalPost==0){ echo 'NA'; } else {?><a href="<?=$pageURL ?>?qid=<?= htmlspecialchars($id) ?>">Show Answers</a><?php }?>
					<td><?= $totalPost ?></td>    
					<td><a href="<?=$pageURL ?>?qid=<?= $id ?>&comments=Yes">Post Your Answers</a></td> 
					<td><font size="2"><?= $lastDate ?><br/><?= htmlspecialchars($userName) ?></font></td> 
			  </tr>
 <?php
}
}
	 //mysql_close($connection);
?>
 </table>
	<br>Goto Page:</br>

	<?php } }}else {	

	$subject=substr($language,0,strpos($language, " "));

	if(strpos($language,"INTER")>0){
	$language1=str_replace("INTER","SUB",$language);
	//echo 'aaaa'.$language;
} else
$language1=$language;
$rs = mysql_query("SELECT  COUNT(*)  FROM abes.`question` WHERE  language='$language1' AND hide='NO' ") or die("Count2 query error!");
	list($total) = mysql_fetch_row($rs);
	$total_pages = ceil($total / MAX_REC_PER_PAGE10);
	$page = intval(@$_GET["page"]); 

	if (0 == $page)
		$page = 1; # 1-based

	$start = MAX_REC_PER_PAGE10 * ($page - 1);  
	$max = MAX_REC_PER_PAGE10; 
?>

<b><font color="red">Totel:</font><?php echo $total; ?> <font color="red">Click:</font></b>
<?php
		for ($i = 1; $i <= $total_pages; $i++) {
		$txt = $i;
		if ($page != $i) 
			$txt = "<a href=\"" ."  $pageURL". "?page=$i\"> $txt </a>";
?>
	<?= $txt ?>
<?php
	}

	?>

<?php 

	// include("pagination.php"); 
//displayPagination($language,"question");

  ?>

	<p class="style5"><font color="#FF0000"><h3><?=$subject ?> Interview Questions And Answers</h3></font></p>
	<h3>Page <?= $page ?></h3>

<?php

if(!strpos($language,"INTER")>0){
 $rs = mysql_query("SELECT  *  FROM abes.`question` WHERE  language='$language1' AND hide='NO' ORDER BY  id  ASC   LIMIT $start, $max ") or die("State query error!");
	//echo 'aaaa'.$language;
}else{
		//echo 'aaaa'.$language1;
	 $rs = mysql_query("SELECT  *  FROM abes.`question` WHERE  language='$language1' AND hide='NO' ORDER BY  id  DESC    LIMIT $start, $max ") or die("State tquery error!");
	}
	$qcount= $start;
	while (list($id, $question) = mysql_fetch_row($rs)) {
	$qcount=$qcount+1;
?>

	<pre><font color="#0000FF" face="Verdana" size="2"><a href="/answer/index.php?id=<?= htmlspecialchars($id) ?>&option=<?= $language1 ?>"><b> <?= htmlspecialchars($question) ?></b></a></font></pre>

 <?php
  $answers = mysql_query("SELECT  username,date,answer FROM `answer` WHERE question_id='$id' and  hide='NO' ORDER BY `answer`.`answer_id` ASC")or die("<br>Answer query error!");
 while (list($username,$date,$answer) = mysql_fetch_row($answers)) {

  echo '<p><pre><font color="#0000FF" face="Verdana" size="2"></font><font color="#000000">'.htmlspecialchars($answer).'</font></pre></p>';

  ?>

<?php
}
	}
	 //mysql_close($connection);
?>
<?php //@include($_SERVER['DOCUMENT_ROOT'] . '/common-files/ads2.shtml');
?><br/>

	<br>Goto Page:</br>
<?php
	for ($i = 1; $i <= $total_pages; $i++) {
		$txt = $i;
		if ($page != $i) 
			$txt = "<a href=\"" ."  $pageURL". "?page=$i\">$txt</a>";
?>
	<?= $txt ?>
<?php
	}

?>

<?php }
$subject=str_replace("C++","CPP",$subject);
$subject=str_replace("VC++","VCPP",$subject);
//echo strpos($language,"OBJ");
if(!strpos($language,"OBJ")>0){
?><p class="style5"><font color="#FF0000"><?=$subject ?> Objective</font></p>

	<a href="<?=strpos($subject,"#")>0?str_replace("C#","C1",$subject):$subject ?>_Objective_Questions_And_Answers.php"><?=$subject ?> Objective Questions And Answers</a>
<?php 

}
if(!strpos($language,"INTER")>0){

 ?>

<p class="style5"><font color="#FF0000"><h3><?=$subject ?> Interview Questions And Answers</h3></font></p>
 <a href="<?=strpos($subject,"#")>0?str_replace("C#","C1",$subject):$subject ?>_Interview_Questions_And_Answers.php"><h3><?=$subject ?> Interview Questions And Answers</h3></a><br>
 <?php }
if(!strpos($language,"SUB")>0){

 ?>
<p class="style5"><font color="#FF0000"><?=$subject ?> Subjective Questions And Answers</font></p>
 <a href="<?=strpos($subject,"#")>0?str_replace("C#","C1",$subject):$subject ?>_Subjective_Questions_And_Answers.php"><?=$subject ?> Subjective Questions And Answers</a><br>
 <?php }
 ?>

   R4R,<b><?=$subject ?> Objective  fresher and experienced, <?=$subject ?> Subjective  fresher and experienced ,<?=$subject ?> Interview Questions And Answers,<?=$subject ?>  fresher and experienced,<?=$subject ?> Interview  fresher and experienced ,<?=$subject ?> Questions   fresher and experienced,<?=$subject ?> Answers  fresher and experienced

</b>

   <p>This section covers <b><?=$subject ?>  interview questions and answers for fresher and experienced </b>. In this section we covers <b><?=$subject ?> interview questions for experienced </b>,<?=$subject ?> interview questions for freshers .
   </p>
   <p>This section covers <b><?=$subject ?>  Objective interview questions and answers for fresher and experienced</b>. In this section we covers <b><?=$subject ?> Objective  interview questions for experienced </b>,<?=$subject ?> Objective interview questions for freshers
   </p>
   <p>This section covers <b><?=$subject ?> Subjective interview questions and answers for fresher and experienced</b>. In this section we covers <b><?=$subject ?> Subjective interview questions for experienced </b>,<?=$subject ?> Subjective interview questions for freshers
   </p>

</TD>
<?php 
}

?>

<?php       
        // echo $_SERVER["HTTP_REFERER"]; Getting the Previous URL
function displayContents1($language){
	$countq=0;
 define('MAX_REC_PER_PAGE10', 5);

	echo "<br/>";
	//$file_menu=strtolower(str_replace(' ','_',$language));

	if(strpos($language,"OBJ")>0){

        // echo $_SERVER["HTTP_REFERER"]; Getting the Previous URL

	$subject=substr($language,0,strpos($language, " "));
	$pageURL = 'http';
 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
    $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
	$pageURL1=$pageURL;
		$qid = intval(@$_GET["qid"]);
		$comments = $_GET["comments"];
 $pageURL=substr($pageURL,0,strpos($pageURL,"?"));
 //echo $pageURL;
	?>

<?php 

  ?>

<?php if(!$qid==0 && !$comments=="Yes") {

	 include("pagination.php"); 
	 displayPagination($language,"question");
$rs = mysql_query("SELECT  question  FROM abes.`question` WHERE  id='$qid' AND hide='NO'") or die("State query error!". mysql_error());
while (list($question) = mysql_fetch_row($rs)) {
	$countq++;
	if($countq==5)
	//include("/common-files/ads6.shtml");

?>

<font size="2"><pre><?= htmlspecialchars($question) ?></b></pre></font>
	<table width="100%" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111">
			 <tr bgcolor="#000080" style="color: #D7D8FD">
				   <th width="30%"><font size="2">Questions</font></th>
				   <th width="60%"><font size="2">Answers</font></th>
				   <th width="5%"><font size="2">Post Answers</font></th>  
				   <th width="5%"><font size="2">Posted By</font></th>   

			</tr>

<?php

		 $answers = mysql_query("SELECT  username,date,answer FROM abes.`answer` WHERE question_id='$qid' and  hide='NO' ORDER BY `answer`.`answer_id` ASC")or die("<br>Answer query error!");
		 $flag=1;
		 $flagforanswer=0;
			 $flagforowner=0;

while (list($username,$date,$answer) = mysql_fetch_row($answers)) {

	$flagforowner=1;
if($flagforanswer==0){

	$flagforanswer=1;
		}

  if($flag==0){
			$flag=1;
if($username=='Rajesh Kumar'||$username=='Vivek kr. Agarwal'||(strpos($username,'Vivek')>-1)||(strpos($username,'vivek')>-1)){?>	 <tr bgcolor="#fffaa">
	<?php } else {?> <tr bgcolor="#D8D8D8"> <?php } ?>

				   <td width="30%"><pre><?= htmlspecialchars($question) ?></pre></td>
				   <td width="60%"><pre><?= htmlspecialchars($answer) ?></pre></td>
				  <td><a href="<?=$pageURL ?>?qid=<?= $qid ?>&comments=Yes">Post Your Answer</a></td>    

			<?php if($username=='Rajesh Kumar'||$username=='Vivek kr. Agarwal'){?>	 <td width="5%"><font size="2"><?= htmlspecialchars($username) ?><br/><?= htmlspecialchars($date) ?><br>[R4R Team]</font></td>   
	<?php } else {?> <td width="5%"><font size="2"><?= htmlspecialchars($username) ?><br/><?= htmlspecialchars($date) ?></font></td>    <?php } ?>

			  </tr>
	 <?php
	}else
	{

			$flag=0;
	if($username=='Rajesh Kumar'||$username=='Vivek kr. Agarwal'||(strpos($username,'vivek')>-1)||(strpos($username,'vivek')>-1)){?>	 <tr bgcolor="#fffaa">
	<?php } else {?><tr> <?php }?>
				  <td width="20%"><pre><?= htmlspecialchars($question) ?></pre></td>
				   <td width="60%"><pre><?= htmlspecialchars($answer) ?></pre></td>
				   <td><a href="<?=$pageURL ?>?qid=<?= $qid ?>&comments=Yes">Post Your Answer</a></td>  
				  <?php if($username=='Rajesh Kumar'){?>	 <td width="5%"><font size="2"><?= htmlspecialchars($username) ?><br/><?= htmlspecialchars($date) ?><br>[R4R Team]</font></td>   
	<?php } else {?> <td width="5%"><font size="2"><?= htmlspecialchars($username) ?><br/><?= htmlspecialchars($date) ?></font></td>    <?php } ?>

			  </tr>

<?php }
}
if($flagforanswer==0){?>
<tr><td colspan='5'><a href="<?=$pageURL ?>?qid=<?= $qid ?>&comments=Yes">Post Your Answers</a></td>  </tr>
<?php }}
?>
</table>
<?php 			
// mysql_close($connection);
}else{
		if($comments=="Yes"){
		 include("pagination.php");  
	 displayPagination($language,"question");
			?>

			<form name="postAnswers" action = "/commonfiles/php/insertInterviewAnswers.php" method = "post">
<table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#0000FF" width="100%" id="AutoNumber1" bgcolor="#FFFFFF">
	<tr>
      <td width="578" colspan="2" >
      <p align="center"><b>Post Your Answer</b></td>
		</tr>

		<?php	

			$rs = mysql_query("SELECT  question  FROM abes.`question` WHERE  id='$qid' AND hide='NO'") or die("State query error!". mysql_error());
while (list($question) = mysql_fetch_row($rs)) {
	$countq++;
	if($countq==5)
	//include("/common-files/ads6.shtml");
?>
	<tr>
	<td ><p align="left"><b>Question:</pre></b></td>
    <td><pre><?= htmlspecialchars($question) ?> <Input type="hidden" name="qid" size="20" value="<?= $qid ?>"></pre></td>
    </tr>
<?php }

?>

	<tr><td width="148" >
      <p dir="ltr">Your Name<font color="#FF0000">*</font></td>
		<td width="430"><Input type="text" name="username" size="20"></td></tr>
	<tr><td width="148">Your Email ID <font color="#FF0000">*</font></td>
		<td width="430"><Input type="text" name="email" size="20"></td></tr>	
	<tr><td width="148">Answer <font color="#FF0000">*</font></td>
		<td width="430">
        <textarea rows="15" cols="68" name="answer" id="answer" ></textarea></td></tr>
    <tr> 
    <td width="50%"> 
<script> 
var a= Math.floor(Math.random()*10);
var b= Math.floor(Math.random()*10);
document.write("<input type='text' name='a'size='3' readonly='true' value='"+a+"' /><font size='1'>X10</font>+<input type='text' size='3' name='b' readonly='true' value='"+b+"' />");

</script>&nbsp;</td> 
    <td width="50%">=<input type="text" name="sum" size="4" value=""><font color="#FF0000">*</font> 
    <font size="2" color="#FF0000">Enter SUM</font></td> 
  </tr> 
  <tr> 
    <td width="100%" colspan="2"> 
<p align="center"> 
<input type="button" value="   Submit  " name="Submit" onclick="checkAuthorized()"> 

<input type="reset"	value="Reset"><a href='<?=$_SERVER["HTTP_REFERER"] ?>'>Go Back</a></td> 
  </tr> 

</table>
</form>

<?php
 //mysql_close($connection);
		}else{

if(strpos($language,"INTER")>0){
	$language1=str_replace("INTER","SUB",$language);
	//echo 'aaaa'.$language;
} else
$language1=$language;
$rs = mysql_query("SELECT  COUNT(*)  FROM abes.`question` WHERE  language='$language1' AND hide='NO' ") or die("Count 3query error!");
	list($total) = mysql_fetch_row($rs);
	$total_pages = ceil($total / MAX_REC_PER_PAGE10);
	$page = intval(@$_GET["page"]); 

	if (0 == $page)
		$page = 1; # 1-based

	$start = MAX_REC_PER_PAGE10 * ($page - 1);  
	$max = MAX_REC_PER_PAGE10; 
?>

<b><font color="red">Totel:</font><?php echo $total; ?> <font color="red">Click:</font></b>
<?php
		for ($i = 1; $i <= $total_pages; $i++) {
		$txt = $i;
		if ($page != $i) 
			$txt = "<a href=\"" ."  $pageURL". "?page=$i\">$txt</a>";
?>
	<?= $txt ?>
<?php
	}
?>

	<p class="style5"><font color="#FF0000"><h3><?=$subject ?> Interview Questions And Answers</h3></font></p>
	<h3>Page <?= $page ?></h3>

   <table width="100%" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111">
			 <tr bgcolor="#000080" style="color: #D7D8FD">
				   <th width="45%">Questions</th>
				   <th width="15%">Show Answers</th>
				   <th width="5%">Total Posts</th>  
				   <th width="15%">Post Your Answers</th>   
				   <th width="20%">Last Post</th>   
			</tr>
<?php
$flag=1;
if(!strpos($language,"INTER")>0){
 $rs = mysql_query("SELECT  *  FROM abes.`question` WHERE  language='$language1' AND hide='NO' ORDER BY  id  ASC   LIMIT $start, $max ") or die("State query error!");
	//echo 'aaaa'.$language;
}else{
	 $rs = mysql_query("SELECT  *  FROM abes.`question` WHERE  language='$language1' AND hide='NO' ORDER BY  id  DESC    LIMIT $start, $max ") or die("State query error!");
	}
	while (list($id, $question) = mysql_fetch_row($rs)) {
		  $countPost = mysql_query("SELECT  COUNT(*)  FROM abes.`answer` WHERE question_id='$id ' and  hide='NO'")or die("<br>Answer query error!");
		 list($totalPost) = mysql_fetch_row($countPost);
		 $lastPostedUserDetails = mysql_query("SELECT  username,date FROM abes.`answer` WHERE question_id='$id ' and  hide='NO' order by answer_id desc limit 1")or die("<br>Answer query error!");
		 list($userName,$lastDate) = mysql_fetch_row($lastPostedUserDetails);
		   if($flag==0){
			$flag=1;
?>
			  <tr bgcolor="#D8D8D8">
				   <td ><pre><?= htmlspecialchars($question) ?></pre></td>
				  <td><?php if($totalPost==0){ echo 'NA'; } else {?><a href="<?=$pageURL ?>?qid=<?= htmlspecialchars($id) ?>">Show Answers</a><?php }?>
				   <td><?= $totalPost ?></td>    
				 <td><a href="<?=$pageURL ?>?qid=<?= $id ?>&comments=Yes">Post Your Answers</a></td> 
					 <td><font size="2"><?= $lastDate ?><br/><?= htmlspecialchars($userName) ?></font></td> 
			  </tr>
	 <?php
	}else
	{
			$flag=0;
	?>	 <tr>
				  <td ><pre><?= htmlspecialchars($question) ?></pre></td>
					<td><?php if($totalPost==0){ echo 'NA'; } else {?><a href="<?=$pageURL ?>?qid=<?= htmlspecialchars($id) ?>">Show Answers</a><?php }?>
					<td><?= $totalPost ?></td>    
					<td><a href="<?=$pageURL ?>?qid=<?= $id ?>&comments=Yes">Post Your Answers</a></td> 
					<td><font size="2"><?= $lastDate ?><br/><?= htmlspecialchars($userName) ?></font></td> 
			  </tr>
 <?php
}
}
	 //mysql_close($connection);
?>
 </table>
	<br>Goto Page:</br>
	<?php } }}else {	

	$subject=substr($language,0,strpos($language, " "));

	if(strpos($language,"INTER")>0){
	$language1=str_replace("INTER","SUB",$language);
	//echo 'aaaa'.$language;
} else
$language1=$language;
$rs = mysql_query("SELECT  COUNT(*)  FROM abes.`question` WHERE  language='$language1' AND hide='NO' ") or die("Count 4query error!");
	list($total) = mysql_fetch_row($rs);
	$total_pages = ceil($total / MAX_REC_PER_PAGE10);
	$page = intval(@$_GET["page"]); 

	if (0 == $page)
		$page = 1; # 1-based

	$start = MAX_REC_PER_PAGE10 * ($page - 1);  
	$max = MAX_REC_PER_PAGE10; 
?>

<b><font color="red">Totel:</font><?php echo $total; ?> <font color="red">Click:</font></b>
<?php
		for ($i = 1; $i <= $total_pages; $i++) {
		$txt = $i;
		if ($page != $i) 
			$txt = "<a href=\"" ."  $pageURL". "?page=$i\"> $txt </a>";
?>
	<?= $txt ?>
<?php
	}

	?>

<?php 
//@include($_SERVER['DOCUMENT_ROOT'] . '/common-files/ads2.shtml');
echo "<br/>"; 
	// include("pagination.php"); 

	// displayPagination($language,"question");

  ?>

	<p class="style5"><font color="#FF0000"><h3><?=$subject ?> Interview Questions And Answers</h3></font></p>
	<h3>Page <?= $page ?></h3>

<?php

if(!strpos($language,"INTER")>0){
 $rs = mysql_query("SELECT  *  FROM abes.`question` WHERE  language='$language1' AND hide='NO' ORDER BY  id  ASC   LIMIT $start, $max ") or die("State query error!");
	//echo 'aaaa'.$language;
}else{
		//echo 'aaaa'.$language1;
	 $rs = mysql_query("SELECT  *  FROM abes.`question` WHERE  language='$language1' AND hide='NO' ORDER BY  id  DESC    LIMIT $start, $max ") or die("State tquery error!");
	}
	$qcount= $start;
	while (list($id, $question) = mysql_fetch_row($rs)) {
	$qcount=$qcount+1;
?>

	<pre><font color="#0000FF" face="Verdana" size="2"><a href="/answer/index.php?id=<?= htmlspecialchars($id) ?>&option=<?= $language1 ?>"><b> <?= htmlspecialchars($question) ?></b></a></font></pre>

 <?php
  $answers = mysql_query("SELECT  username,date,answer FROM abes.`answer` WHERE question_id='$id' and  hide='NO' ORDER BY `answer`.`answer_id` ASC")or die("<br>Answer query error!");
 while (list($username,$date,$answer) = mysql_fetch_row($answers)) {

  echo '<p><pre><font color="#0000FF" face="Verdana" size="2"></font><font color="#000000">'.htmlspecialchars($answer).'</font></pre></p>';

  ?>

<?php
}
	}
	 //mysql_close($connection);
?>

	<br>Goto Page:</br>
	<?php //@include($_SERVER['DOCUMENT_ROOT'] . '/common-files/ads2.shtml');
	?><br/>
<?php
	for ($i = 1; $i <= $total_pages; $i++) {
		$txt = $i;
		if ($page != $i) 
			$txt = "<a href=\"" ."  $pageURL". "?page=$i\">$txt</a>";
?>
	<?= $txt ?>
<?php
	}

?>

<br>

<?php }
$subject=str_replace("C++","CPP",$subject);
$subject=str_replace("VC++","VCPP",$subject);
//echo strpos($language,"OBJ");
if(!strpos($language,"OBJ")>0){
?><p class="style5"><font color="#FF0000"></font><h3><?=$subject ?> Objective  Questions And Answers</h3></font></p>

	<a href="<?=strpos($subject,"#")>0?str_replace("C#","C1",$subject):$subject ?>_Objective_Questions_And_Answers.php"><h3><?=$subject ?> Objective Questions And Answers</h3></a>
<?php 

}
if(!strpos($language,"INTER")>0){

 ?>

<p class="style5"><font color="#FF0000"><h3><?=$subject ?> Interview Questions And Answers</h3></font></p>
 <a href="<?=strpos($subject,"#")>0?str_replace("C#","C1",$subject):$subject ?>_Interview_Questions_And_Answers.php"><h3><?=$subject ?> Interview Questions And Answers</h3></a><br>
 <?php }
if(!strpos($language,"SUB")>0){

 ?>
<p class="style5"><font color="#FF0000"><h3><?=$subject ?> Interview Questions And Answers</h3></font></p>
 <a href="<?=strpos($subject,"#")>0?str_replace("C#","C1",$subject):$subject ?>_Subjective_Questions_And_Answers.php"><h3><?=$subject ?> Subjective Questions And Answers</h3></a><br>
 <?php }
 ?>

   R4R,<b><?=$subject ?> Objective  fresher and experienced, <?=$subject ?> Subjective  fresher and experienced ,<?=$subject ?> Interview Questions And Answers,<?=$subject ?>  fresher and experienced,<?=$subject ?> Interview  fresher and experienced ,<?=$subject ?> Questions   fresher and experienced,<?=$subject ?> Answers  fresher and experienced

</b>

   <p>This section covers <b><?=$subject ?>  interview questions and answers for fresher and experienced </b>. In this section we covers <b><?=$subject ?> interview questions for experienced </b>,<?=$subject ?> interview questions for freshers .
   </p>
   <p>This section covers <b><?=$subject ?>  Objective interview questions and answers for fresher and experienced</b>. In this section we covers <b><?=$subject ?> Objective  interview questions for experienced </b>,<?=$subject ?> Objective interview questions for freshers
   </p>
   <p>This section covers <b><?=$subject ?> Subjective interview questions and answers for fresher and experienced</b>. In this section we covers <b><?=$subject ?> Subjective interview questions for experienced </b>,<?=$subject ?> Subjective interview questions for freshers
   </p>

</TD>
<?php 
}

?>
