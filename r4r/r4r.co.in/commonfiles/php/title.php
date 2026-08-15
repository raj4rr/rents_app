<?php  

function title($tablename,$defaultTitle,$pdo){
//	$questionsID=intval(@$_GET["qid"]);
$pagetitle=$defaultTitle;
	//	$comments=$_GET["comments"];
		$questionsID1=intval(@$_GET["qid"]);
	if($questionsID1==0){
		$pagetitle= $defaultTitle;
	        return $pagetitle;
		}else{

			$stm = $pdo->prepare("SELECT  * FROM question  WHERE  id=:question_id");
			$stm->bindParam(":question_id",$questionsID1, PDO::PARAM_INT);
			$stm->execute();			
			$rows = $stm->fetchAll(PDO::FETCH_ASSOC);
					foreach($rows as $row) {

$pagetitle=$row['question'];
return $pagetitle;

}

 return $pagetitle;
}}

function titleForTutorialExampleIndex($defaultTitle){
    return $defaultTitle;
}

?>
