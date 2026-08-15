<?php 
$ncols=-1;
$arrayData=[];
extract($_POST);
extract($_GET);
extract($_SESSION);
$submit = $submit ?? '';
$ans = $ans ?? '';

if(!isset($_SESSION['login']))
{
$_SESSION['login']='Guest'.rand(100000,9999999);

//$query="select * from mst_question";
//$rs=$con->mysqli_query("") or die(mysqli_error());
//$_SESSION['qn']=0;
$stm = $pdo->prepare("select * from mst_question where test_id= ?");
//echo $_SESSION['qn'];
//echo '<br>Test ID:-'.$testid;
$stm->bindValue(1, $testid);
$stm->execute();
$ncols = $stm->rowCount();
$_SESSION['testid']=$testid;
$_SESSION['$ncols']=$ncols;
//echo "Number Of Rwos:-".$ncols;
$stm->setFetchMode(PDO::FETCH_NUM);
//$stm->setFetchMode(PDO::FETCH_ASSOC);
$arrayData = $stm->fetchAll();
$_SESSION['$arrayData']=$arrayData;
} 

$arrayData=$_SESSION['$arrayData'];
$ncols=$_SESSION['$ncols'];
//$con=mysqli_connect("localhost","root","","r4rin_onlineexams") or die('Database not connected');

// echo "Your Session ID :-".$_SESSION['login'];
?>
<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">
<div class="card mb-4">

          <div class="card-body">

<?php 

$countQ=count($arrayData);
//echo $_SESSION['login'];
//echo 'aaaaaaaaaaaaaaaaaaaaaa';
if(!isset($_SESSION['qn']))
{
	$_SESSION['qn']=0;
	$_SESSION['trueans']=0;
	$nrows = $pdo->exec("delete from mst_useranswer where sess_id='".session_id()."'");
	//$nrows->bindValue(1, session_id());
	//$nrows->execute();
	//mysqli_query("delete from mst_useranswer where sess_id='" . session_id() ."'",$con) or die(mysqli_error());

}
if($submit=='Restart Test')
		{

	$nrows = $pdo->exec("delete from mst_useranswer where sess_id='".session_id()."'");
	//$nrows->bindValue(1, session_id());
	//$nrows->execute();
	$_SESSION['qn']=0;
	$_SESSION['trueans']=0;
		}
if($submit=='Next Question' && isset($ans))
		{
				$row = $arrayData[$_SESSION['qn']];
				$stmt_inst = $pdo->prepare("insert into mst_useranswer(sess_id, test_id, que_des, ans1,ans2,ans3,ans4,true_ans,your_ans) values (?,?,?,?,?,?,?,?,?)");
				$stmt_inst->bindValue(1, session_id());
				$stmt_inst->bindValue(2, $tid);
				$stmt_inst->bindValue(3, $row[2]);
				$stmt_inst->bindValue(4, $row[3]);
				$stmt_inst->bindValue(5, $row[4]);
				$stmt_inst->bindValue(6, $row[5]);
				$stmt_inst->bindValue(7, $row[6]);
				$stmt_inst->bindValue(8, $row[8]);
				$stmt_inst->bindValue(9, $ans);
				$stmt_inst->execute();
				//$row= mysqli_fetch_row($rs);	
				//mysqli_query("insert into mst_useranswer(sess_id, test_id, que_des, ans1,ans2,ans3,ans4,true_ans,your_ans) values 
				//('".session_id()."', $tid,'$row[2]','$row[3]','$row[4]','$row[5]', '$row[6]','$row[8]','$ans')") or die(mysqli_error());
				if($ans==$row[8])
				{
							$_SESSION['trueans']=$_SESSION['trueans']+1;
				}
				$_SESSION['qn']=$_SESSION['qn']+1;
		}
		else if($submit=='Get Result' && isset($ans))
		{

			$row = $arrayData[$_SESSION['qn']];
				$stmt_inst = $pdo->prepare("insert into mst_useranswer(sess_id, test_id, que_des, ans1,ans2,ans3,ans4,true_ans,your_ans) values (?,?,?,?,?,?,?,?,?)");
				$stmt_inst->bindValue(1, session_id());
				$stmt_inst->bindValue(2, $tid);
				$stmt_inst->bindValue(3, $row[2]);
				$stmt_inst->bindValue(4, $row[3]);
				$stmt_inst->bindValue(5, $row[4]);
				$stmt_inst->bindValue(6, $row[5]);
				$stmt_inst->bindValue(7, $row[6]);
				$stmt_inst->bindValue(8, $row[8]);
				$stmt_inst->bindValue(9, $ans);
				$stmt_inst->execute();
				//$row= mysqli_fetch_row($rs);	
				//mysqli_query("insert into mst_useranswer(sess_id, test_id, que_des, ans1,ans2,ans3,ans4,true_ans,your_ans) values 
				//('".session_id()."', $tid,'$row[2]','$row[3]','$row[4]','$row[5]', '$row[6]','$row[8]','$ans')") or die(mysqli_error());
				if($ans==$row[8])
				{
							$_SESSION['trueans']=$_SESSION['trueans']+1;
				}
				$_SESSION['qn']=$_SESSION['qn']+1;

				echo "<h2 class='card-title'> Result</h2>";
				//$_SESSION['qn']=$_SESSION['qn']+1;
				echo "<p class='card-text'>Total Question {$_SESSION['qn']} </p>";
				echo "<p class='card-text'>True Answer".$_SESSION['trueans'];
				$w=$_SESSION['qn']-$_SESSION['trueans'];
				echo "</p><p class='card-text'>Wrong Answer ". $w;
				echo "</p>";

				echo "<a href='review.php' class='btn btn-primary'> Review Question</a>";

				$stmt_rinst = $pdo->prepare("insert into mst_result(login,test_id,score) values(?,?,?)");
				$stmt_rinst->bindValue(1, $login);
				$stmt_rinst->bindValue(2,  $tid);
				$stmt_rinst->bindValue(3, $_SESSION['trueans']);
				$stmt_rinst->execute();

				//mysqli_query("insert into mst_result(login,test_id,score) values('$login',$tid,$_SESSION['trueans'])") or die(mysqli_error());
				$stm_rank = $pdo->prepare("select bestscore from rank where testid=? and userid=?");
				$stm_rank->bindValue(1, $tid);
				$stm_rank->bindValue(2, $login);
				$stm_rank->execute();
				$nrcols = $stm_rank->rowCount();
				//echo $nrcols;
				//$rank_rs=mysqli_query("select bestscore from rank where testid=$tid and userid='$login'") or die(mysqli_error());

				if(($nrcols)<=0)
					{

				$stmt_inst_r = $pdo->prepare("insert into rank(userid,testid,score,bestscore) values(?,?,?,?)");
				$stmt_inst_r->bindValue(1, $login);
				$stmt_inst_r->bindValue(2, $tid);
				//echo 
				$stmt_inst_r->bindValue(3, $_SESSION['trueans']);
				$stmt_inst_r->bindValue(4, $_SESSION['trueans']);
				$stmt_inst_r->execute();

				//mysqli_query("insert into rank(userid,testid,score,bestscore) values('$login',$tid,$_SESSION['trueans'],$_SESSION['trueans'])") or die(mysqli_error());
				}

				else 
				{
					//$rowbest = mysqli_fetch_array($stm_rank);
					$stm_rank->setFetchMode(PDO::FETCH_NUM);

					$rowbest = $stm_rank->fetch();
						$bestscore=$rowbest[0];
						if($_SESSION['trueans']>$bestscore)
						$bestscore=$_SESSION['trueans'];
						$sql = "UPDATE `rank` SET  score=?,bestscore=? WHERE userid=? and testid=?";
						$stmt_score_u= $pdo->prepare($sql);
						$stmt_score_u->bindValue(1, $_SESSION['trueans']);
						$stmt_score_u->bindValue(2, $bestscore);
						$stmt_score_u->bindValue(3, $login);
						$stmt_score_u->bindValue(4, $tid);

						$stmt_score_u->execute();
				//mysqli_query("UPDATE `rank` SET  score=$_SESSION['trueans'],bestscore=$bestscore WHERE userid='$login' and testid=$tid") or die(mysqli_error());

			    }

		echo "<form name=myfm method=post action='#'>";
		echo "<p class='card-text'><input type=submit name=submit value='Restart Test' class='btn btn-primary'></p>";

		exit;
		}

/*
else
{	
		if($submit=='Next Question' && isset($ans))
		{
				mysqli_data_seek($rs,$_SESSION['qn']);
				$row= mysqli_fetch_row($rs);	
				mysqli_query("insert into mst_useranswer(sess_id, test_id, que_des, ans1,ans2,ans3,ans4,true_ans,your_ans) values ('".session_id()."', $tid,'$row[2]','$row[3]','$row[4]','$row[5]', '$row[6]','$row[8]','$ans')") or die(mysqli_error());
				if($ans==$row[8])
				{
							$_SESSION['trueans']=$_SESSION['trueans']+1;
				}
				$_SESSION['qn']=$_SESSION['qn']+1;
		}
		else if($submit=='Get Result' && isset($ans))
		{
				mysqli_data_seek($rs,$_SESSION['qn']);
				$row= mysqli_fetch_row($rs);	
				mysqli_query("insert into mst_useranswer(sess_id, test_id, que_des, ans1,ans2,ans3,ans4,true_ans,your_ans) values ('".session_id()."', $tid,'$row[2]','$row[3]','$row[4]','$row[5]', '$row[6]','$row[8]','$ans')") or die(mysqli_error());
				if($ans==$row[8])
				{
							$_SESSION['trueans']=$_SESSION['trueans']+1;
				}
				echo "<h2 class='card-title'> Result</h2>";
				$_SESSION['qn']=$_SESSION['qn']+1;
				echo "<p class='card-text'>Total Question $_SESSION['qn'] </p>";
				echo "<p class='card-text'>True Answer".$_SESSION['trueans'];
				$w=$_SESSION['qn']-$_SESSION['trueans'];
				echo "</p><p class='card-text'>Wrong Answer ". $w;
				echo "</p>";
				mysqli_query("insert into mst_result(login,test_id,score) values('$login',$tid,$_SESSION['trueans'])") or die(mysqli_error());

				$rank_rs=mysqli_query("select bestscore from rank where testid=$tid and userid='$login'") or die(mysqli_error());

				if((mysqli_num_rows($rank_rs))<=0)
					{

				mysqli_query("insert into rank(userid,testid,score,bestscore) values('$login',$tid,$_SESSION['trueans'],$_SESSION['trueans'])") or die(mysqli_error());
				}
				else 
				{
					$rowbest = mysqli_fetch_array($rank_rs);
						$bestscore=$rowbest[0];
						if($_SESSION['trueans']>$bestscore)
						$bestscore=$_SESSION['trueans'];
				mysqli_query("UPDATE `rank` SET  score=$_SESSION['trueans'],bestscore=$bestscore WHERE userid='$login' and testid=$tid") or die(mysqli_error());

			    }
				echo "<a href='review.php' class='btn btn-primary'> Review Question</a>";
				unset($_SESSION['qn']);
				unset($_SESSION['sid']);
				unset($_SESSION['tid']);
				unset($_SESSION['trueans']);

				?>

		</div>		
<div class="card-footer text-muted">
					Posted on <?php echo $row_test[7]; ?> by
            <a href="#">R4R Team</a>
          </div>
        </div>
<ul class="pagination justify-content-center mb-4">
          <li class="page-item">
            <a class="page-link" href="#">&larr; Older</a>
          </li>
          <li class="page-item disabled">
            <a class="page-link" href="#">Newer &rarr;</a>
          </li>
        </ul>

      </div>

				<?php
				exit;
		}
} */

$row = $arrayData[$_SESSION['qn']];
//$row = $stm->fetch(PDO::FETCH_NUM,PDO::FETCH_ORI_NEXT, $_SESSION['qn']);

//$_SESSION['qn']=0;

if($_SESSION['qn']>$ncols-1)
{
unset($_SESSION['qn']);
echo "<h2 class='card-title'>Some Error  Occured</h2>";
session_destroy();
echo "<h2 class='card-title'>Please <a href=index.php> Start Again</a></p>";

exit;
}  
//mysqli_data_seek($rs,$_SESSION['qn']);
//$row= mysqli_fetch_row($rs);
?>

<?php
echo "<form name=myfm method=post action='#'>";

echo "<h2 class='card-title'>";
$n=$_SESSION['qn']+1;

echo "Question ".  $n .": $row[2]</h2>";
echo "<label class='mcq-option'><input type=radio name=ans value=1> $row[3]</label>";
echo "<label class='mcq-option'><input type=radio name=ans value=2> $row[4]</label>";
echo "<label class='mcq-option'><input type=radio name=ans value=3> $row[5]</label>";
echo "<label class='mcq-option'><input type=radio name=ans value=4> $row[6]</label>";

if($_SESSION['qn']<$ncols-1)
    echo "<input type=submit name=submit value='Next Question' class='mcq-submit-btn'>";
else
    echo "<input type=submit name=submit value='Get Result' class='mcq-submit-btn'>";

echo "</form>";
echo "<hr>";
echo "<p class='text-muted'>Total MCQS Questions are ".$countQ." in this paper <b>".$test."</b></p>";
echo "</div>"; // Close card-body

?>

<div class="card-footer text-muted">
					@by R4R.CO.IN
         <a href="/mcqs/?subid=<?php echo $subid; ?>&subcat=<?php echo $subcat; ?>"> Back to <?php echo $subcat; ?> </a>
          </div>
        </div>

      </div>
