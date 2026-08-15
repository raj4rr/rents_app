
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

					include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
				$sql_category=mysql_query("select * from category where publish='Y' order by category_id desc");
				while($row_category=mysql_fetch_array($sql_category))
				{
					?>	
					 !!	<a href="/<?php echo $row_category['category'];?>/?ct=<?php echo $row_category['category_id'];?>" ><?php echo $row_category['category_name'];?></a>
				  <?php 

				 $category=$row_category['category_id'];
				 $sql_subcategory=mysql_query("select * from subcategory where publish='Y' and category_id='$category'");
				while($row_subcategory=mysql_fetch_array($sql_subcategory))
					{
						?>
				!! <a href="/<?php echo $row_category['category'];?>/topic/?ct=<?php echo $row_subcategory['category_id'];?>&subct=<?php echo $row_subcategory['subcategory_id'];?>" ><?php echo $row_subcategory['subcategory_name'];?></a>
				 <?php 

				$subcategory_id=$row_subcategory['subcategory_id'];
			$sql_topic=mysql_query("select * from  topic where publish='Y' and subcategory_id='$subcategory_id' order by update_date DESC");
						while($row_topic=mysql_fetch_array($sql_topic))
					{
						?>
						!! <a  href="/<?php echo $row_category['category'];?>/topic/post.php?ct=<?php echo $category;?>&subct=<?php echo $subcategory_id;?>&tp=<?php echo $row_topic['topic_id'];?>" title="<?php echo $row_topic['topic_name'];?>" ><?php echo $row_topic['topic_name'];?></a>
			 <?php }
				}

			 }
				?>

