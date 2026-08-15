<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

function getcategoryname($category_id)
{
$sqlcategoryname=mysql_query("select * from category where category_id='$category_id'");
$rowcategoryname=mysql_fetch_array($sqlcategoryname);
return $rowcategoryname['category_name'];
}
function getsubcategoryname($subcategory_id)
{
$sqlsubcategoryname=mysql_query("select * from subcategory where subcategory_id='$subcategory_id'");
$rowsubcategoryname=mysql_fetch_array($sqlsubcategoryname);
return $rowsubcategoryname['subcategory_name'];
}
function gettopicname($topic_id)
{
$sqltopicname=mysql_query("select * from topic where topic_id='$topic_id'");
$rowtopicname=mysql_fetch_array($sqltopicname);
return $rowtopicname['topic_name'];
}
function gettopicnext($topic_id,$category_id,$subcategory_id)
{
$sqlnexttopicname=mysql_query("select * from topic where topic_id > '$topic_id' and category_id='$category_id' and subcategory_id='$subcategory_id' and publish='Y' order by topic_id");
$rownexttopicname=mysql_fetch_array($sqlnexttopicname);
return $rownexttopicname['topic_id'];
}
function gettopicprevious($topic_id,$category_id,$subcategory_id)
{
	$previoustopicname=0;
$sqlprevioustopicname=mysql_query("select * from topic where topic_id < '$topic_id' and category_id='$category_id' and subcategory_id='$subcategory_id' and publish='Y' order by topic_id");
	while($rowprevioustopicname=mysql_fetch_array($sqlprevioustopicname))
	{
		$previoustopicname=$rowprevioustopicname['topic_id'];
	}
return $previoustopicname;
}
function getintersubcategoryname($subcategory_interview_id)
{
$sqlinter_subcategoryname=mysql_query("select * from interviewsubcategory where interviewsubcategory_id='$subcategory_interview_id'");
$rowinter_subcategoryname=mysql_fetch_array($sqlinter_subcategoryname);
return $rowinter_subcategoryname['interviewsubcategory_name'];
}
function gettopicmetacontent($topic_id)
{
$sql_gettopicmetacontent=mysql_query("select * from topic where topic_id='$topic_id'");
$row_gettopicmetacontent=mysql_fetch_array($sql_gettopicmetacontent);
return $row_gettopicmetacontent['topic_name'].", ".$row_gettopicmetacontent['keyword'];
}
?>
