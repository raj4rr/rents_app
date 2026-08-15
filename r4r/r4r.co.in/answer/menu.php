<?php 	
				include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
				extract($_GET);

				$stm = $pdo->prepare("select subj.sub_id as sub_id,subj.sub_name AS sub_name  from mst_subject subj where subj.interview_status=2  order by subj.sub_id;");
			//$stm->bindParam(":test_id", $test_id, PDO::PARAM_INT);
			$stm->execute();

			$rows = $stm->fetchAll(PDO::FETCH_NUM);
		$sub_ids=0;
					foreach($rows as $row) {
		//	$rs=mysql_query("");
		//	while($row=mysql_fetch_row($rs))
	//			{
	if($row[1]!==$sub_ids){
	    $sub_ids=$row[1];
					?><a class="dropdown-item"  href="<?php echo (("https://r4r.in/interview-questions-answers/?subid=".$row[0]."&subcat=". urlencode($row[1])));?>"><?php echo $row[1];?> Interview Questions Answers</a>
					<?php }} ?>

           