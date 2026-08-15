<html>

<head>

<title>Update Objective Questions And answers</title>

<script language=javascript>
function profileValidation()
{

		if (document.QForm.question.value.length ==0) {

			alert("*Question  Fields Can Not be NULL");
			document.QForm.question.focus();
			return ;

		}
		if (document.QForm.option1.value.length ==0) {

			alert("*Option 1 Fields Can Not be NULL");
			document.QForm.option1.focus();
			return ;

		}
		if (document.QForm.option2.value.length ==0) {

			alert("*Option 2 Fields Can Not be NULL");
			document.QForm.option2.focus();
			return ;

		}
		if (!document.QForm.optionCheck1.checked && !document.QForm.optionCheck2.checked && !document.QForm.optionCheck3.checked && !document.QForm.optionCheck4.checked && !document.QForm.optionCheck5.checked && !document.QForm.optionCheck6.checked) {

			alert("* Choose At Least One Options");
			document.QForm.optionCheck1.focus();
			return ;

		}
		if (document.QForm.comment.value.length ==0) {

			alert("*comment1 Fields Can Not be NULL");
			document.QForm.comment.focus();
			return ;

		}
		if (document.QForm.language.value.length ==0) {

			alert("*language Fields Can Not be NULL");
			document.QForm.language.focus();
			return ;

		}

document.QForm.action="Update_Q.php";
document.QForm.submit();

}
</script>
</head>

<body>

  <p align="center">&nbsp;<a href="ShowAnswers.php">Questions &amp; Answers </a></p>
  <p align="center">&nbsp; <b><font size="5">Update Objective Questions And answers</font></b></p>

  <table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="100%" id="AutoNumber1">

<form  method="POST"  name="QForm"><B>Update Question:
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$id=$_GET["id"];

if (!$connection)
  {
  die('Could not connect: ' . mysql_error());
  }

  $rs = mysql_query("SELECT  *  FROM `question` WHERE  id='$id' ") or die("State query error!");

$Q_ID;
$Q_Option=$_GET["option"];

    while (list($id, $question,$language) = mysql_fetch_row($rs)) {
    	 $Q_ID=$id;
    	  $language=$language;
    	  $question=$question;

$optionNumber=0;
 $result1 = mysql_query("SELECT  *  FROM `o_answer` WHERE q_ID='$id ' and  hide='NO'")or die("<br>Answer query error!");
while(list($id,$q_ID,$answer,$option,$date,$name,$hide) = mysql_fetch_row($result1)) {
	$optionNumber=$optionNumber+1;

	?>
	 <tr>
      <td width="50%">Options<?php echo $optionNumber; ?></b></td>
      <td width="50%">
  <input type="text" name="option<?php echo $optionNumber; ?>" size="45" tabindex="2" value="<?php echo $answer; ?>">&nbsp;&nbsp;&nbsp;&nbsp;
  <input type="checkbox" name="optionCheck<?php  echo $optionNumber; ?>" <?php if($option=='ON'||$option=='on') echo 'checked value="ON"';  ?>  ></td>
    </tr>

    <?php

 }

 $rs1 = mysql_query("SELECT  *  FROM `o_comments` WHERE q_ID='$Q_ID' ") or die("State query error!");
while(list($id,$q_ID,$comments) = mysql_fetch_row($rs1))
{

	?>

 <td width="50%" >
 <input type="hidden" value="<?php echo $q_ID; ?>" name="q_ID">
 <input type="hidden" value="<?php echo $Q_Option; ?>" name="option">
      <p align="left">
  Comment</td>
  <td width="50%" >
      <p align="left">
  <textarea rows="6" name="comment" cols="34" tabindex="14"><?php echo $comments; ?></textarea></td>
    </tr>	
	<?php

	}

	?>
	 <tr>
      <td width="50%">Objective Question</td>
      <td width="50%"><textarea rows="6" name="question" cols="34" tabindex="1"><?php echo $question; ?></textarea></td>
    </tr>

    <tr>
      <td width="50%" >
      <p align="left">
  Question Language</td>
  <td width="50%" >
      <p align="left">
  <input type="text" name="language" size="45" tabindex="15" value="<?php echo $language; ?>"></td>
    </tr>

    <tr>
      <td width="100%" colspan="2">
      <p align="center">
  <input type="button" value="Update"  onclick="profileValidation();" name="B1" tabindex="17"><input type="reset" value="Reset" name="B2" tabindex="18"></td>
    </tr>
  </table>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
</form>
<?php 
} 
?>
</body>

</html>

