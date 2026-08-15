<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

function title($tablename,$defaultTitle){
	$questionsID=intval(@$_GET["qid"]);
		$comments=intval(@$_GET["comments"]);
	if($questionsID==0){
		$pagetitle= $defaultTitle;
		}else{

	$titleRS = mysql_query("SELECT  $tablename  FROM `question` WHERE  id='$questionsID' AND hide='NO'") or die("`question`");
while(list($questions) = mysql_fetch_row($titleRS)) {

$pagetitle=$questions;

}
if($comments=='Yes')
$pagetitle="Post Your Answer :--".$pagetitle;

 }
 return $pagetitle;
}

function titleForTutorialExampleIndex($defaultTitle){
	/*$questionsID=intval(@$_GET["qid"]);
		$comments=$_GET["comments"];
	if($questionsID==0){
		* */
		$pagetitle= $defaultTitle;
		/*}else{

	$titleRS = mysql_query("SELECT  $tablename  FROM `question` WHERE  id='$questionsID' AND hide='NO'") or die("`question`");
while(list($questions) = mysql_fetch_row($titleRS)) {

$pagetitle=$questions;

}
if($comments=='Yes')
$pagetitle="Post Your Answer :--".$pagetitle;

 }*/
 return $pagetitle;
}
?>
