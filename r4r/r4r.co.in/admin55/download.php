<?php  
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php'); 
session_start(); 
 $examid=$_SESSION['examid'];

$columnHeader = '';  
$columnHeader = "UserName" . "," . "Password" . "," . "CenterCode". ",". "Exam_City". ",". "College_Name". ",". "College_Address";  
$rowData = ''; 

$sql_query="SELECT DISTINCT l.username,l.passcode,c.code,c.exam_city,c.colloge,c.centeraddress FROM off_login l,center_details c  where l.examid='$examid' and c.exam_name = '$examid' and c.code=l.centercode";
	$result_set=mysql_query($sql_query);
	if(mysql_num_rows($result_set)>0)
	{
        while($row=mysql_fetch_row($result_set))
		{

            $rowData.= $row[0]. ","; 
            $rowData.= $row[1]. ","; 
            $rowData.= $row[2]. ","; 
             $rowData.= "\"".$row[3]."\"".","; 
              $rowData.= "\"".$row[4]."\"".","; 
            $rowData.= "\"".$row[5]."\""; 
            $rowData.="\r\n";
		}
	}
	else
	{
		?>
        <tr>
        <td colspan="3">No Data Found !</td>
        </tr>
        <?php
	}

header("Content-type: application/octet-stream");  
header("Content-Disposition: attachment; filename = User_Detail_Reoprt.csv");  
header("Pragma: no-cache");  
header("Expires: 0");  
echo ucwords($columnHeader) . "\n" . $rowData . "\n"; 

?>
