<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

if(!isset($_SESSION['login']))
$_SESSION['login']='Guest'.rand(100000,9999999);

extract($_POST);
extract($_GET);
extract($_SESSION);
?>

<div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">
<div class="card mb-4">

          <div class="card-body">

<?php
$query="select * from mst_question";
$rs=mysql_query("select * from mst_question where test_id=$tid") or die(mysql_error());
//echo $_SESSION['login'];
if(!isset($_SESSION['qn']))
{
	$_SESSION['qn']=0;
	mysql_query("delete from mst_useranswer where sess_id='" . session_id() ."'") or die(mysql_error());
	$_SESSION['trueans']=0;

}
else
{	
		if($submit=='Next Question' && isset($ans))
		{
				mysql_data_seek($rs,$_SESSION['qn']);
				$row= mysql_fetch_row($rs);	
				mysql_query("insert into mst_useranswer(sess_id, test_id, que_des, ans1,ans2,ans3,ans4,true_ans,your_ans) values ('".session_id()."', $tid,'$row[2]','$row[3]','$row[4]','$row[5]', '$row[6]','$row[8]','$ans')") or die(mysql_error());
				if($ans==$row[8])
				{
							$_SESSION['trueans']=$_SESSION['trueans']+1;
				}
				$_SESSION['qn']=$_SESSION['qn']+1;
		}
		else if($submit=='Get Result' && isset($ans))
		{
				mysql_data_seek($rs,$_SESSION['qn']);
				$row= mysql_fetch_row($rs);	
				mysql_query("insert into mst_useranswer(sess_id, test_id, que_des, ans1,ans2,ans3,ans4,true_ans,your_ans) values ('".session_id()."', $tid,'$row[2]','$row[3]','$row[4]','$row[5]', '$row[6]','$row[8]','$ans')") or die(mysql_error());
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
				mysql_query("insert into mst_result(login,test_id,score) values('$login',$tid,$_SESSION['trueans'])") or die(mysql_error());

				$rank_rs=mysql_query("select bestscore from rank where testid=$tid and userid='$login'") or die(mysql_error());

				if((mysql_num_rows($rank_rs))<=0)
					{

				mysql_query("insert into rank(userid,testid,score,bestscore) values('$login',$tid,$_SESSION['trueans'],$_SESSION['trueans'])") or die(mysql_error());
				}
				else 
				{
					$rowbest = mysql_fetch_array($rank_rs);
						$bestscore=$rowbest[0];
						if($_SESSION['trueans']>$bestscore)
						$bestscore=$_SESSION['trueans'];
				mysql_query("UPDATE `rank` SET  score=$_SESSION['trueans'],bestscore=$bestscore WHERE userid='$login' and testid=$tid") or die(mysql_error());

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
}
$rs=mysql_query("select * from mst_question where test_id=$tid") or die(mysql_error());
if($_SESSION['qn']>mysql_num_rows($rs)-1)
{
unset($_SESSION['qn']);
echo "<h2 class='card-title'>Some Error  Occured</h2>";
session_destroy();
echo "<h2 class='card-title'>Please <a href=index.php> Start Again</a></p>";

exit;
}
mysql_data_seek($rs,$_SESSION['qn']);
$row= mysql_fetch_row($rs);
echo "<form name=myfm method=post action='#'>";
echo "<h2 class='card-title'>";
$n=$_SESSION['qn']+1;
echo "Que ".  $n .": $row[2]</h2>";
echo "<p class='card-text'><input type=radio name=ans value=1>$row[3]</p>";
echo "<p class='card-text'><input type=radio name=ans value=2>$row[4]</p>";
echo "<p class='card-text'><input type=radio name=ans value=3>$row[5]</p>";
echo "<p class='card-text'><input type=radio name=ans value=4>$row[6]</p>";

if($_SESSION['qn']<mysql_num_rows($rs)-1)
echo "<p class='card-text'><input type=submit name=submit value='Next Question' class='btn btn-primary'></form></p>";
else
echo "<p class='card-text'><input type=submit name=submit value='Get Result' class='btn btn-primary'></form></p>";
echo "</div>";

 //echo "<a href='?testid=$testid&subid=subid&q_id=$row[0]'>$row[2]</a></h2>";

?>
<div class="card-footer text-muted">
					Exam <?php echo $row[7]; ?> by
             <a href="http://olete.in/" rel="nofollow">oLete Team</a>
          </div>
        </div>

      </div>
