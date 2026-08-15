<?php 	
				include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
				extract($_GET);

			$rs=mysql_query("select test.test_id as test_id ,test.sub_id as sub_id,test.test_name AS test_name ,subj.sub_name AS sub_name from mst_test test,mst_subject subj where test.status=2 and test.sub_id=subj.sub_id;");
			while($row=mysql_fetch_row($rs))
				{
					?>

                  !! <a href="/mcqs/?testid=<?php echo $row[0]; ?>&subid=<?php echo $row[1]; ?>&subcat=<?php echo $row[3]; ?>&test=<?php echo $row[2]; ?>"><font size=4><?php echo $row[2]; ?></font></a>

                  !! <a href="/mcqs/learn.php?test_id=<?php echo $row[0]; ?>&subid=<?php echo $row[1]; ?>&subcat=<?php echo $row[3]; ?>&test=<?php echo $row[2]; ?>"><font size=4>Learn <?php echo $row[2]; ?> </font></a>

                  <?php 

				}?>

                <?php
				$rs=mysql_query("select * from mst_subject where status=2 order by `sub_name` ASC");
				while($rows=mysql_fetch_row($rs))
					{
					?>

                   !!  <a href="/mcqs/?subid=<?php echo $rows[0]; ?>&subcat=<?php echo $rows[1]; ?>"> <?php echo $rows[1]; ?> </a>

               <?php 
				}
				?>

