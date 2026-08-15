<?php
set_time_limit(1000); 
$db =   new mysqli('localhost','root','','domain');
if ($db->connect_errno) {
  echo "Failed to connect to MySQL: " . $db->connect_error;
  exit();
}
require('php-excel-reader/excel_reader2.php');

	require('SpreadsheetReader.php');

	$Reader = new SpreadsheetReader('1 APRIL.xlsx');
	foreach ($Reader as $row)
	{
		//print_r($Row);

		$sql="INSERT INTO `india_30_april__1` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`, `COL 6`, `COL 7`, `COL 8`, `COL 9`, `COL 10`, `COL 11`, `COL 12`, `COL 13`, `COL 14`, `COL 15`, `COL 16`, `COL 17`, `COL 18`, `COL 19`, `COL 20`, `COL 21`, `COL 22`, `COL 23`, `COL 24`, `COL 25`, `COL 26`, `COL 27`, `COL 28`, `COL 29`, `COL 30`, `COL 31`, `COL 32`, `COL 33`, `COL 34`, `COL 35`, `COL 36`, `COL 37`, `COL 38`, `COL 39`, `COL 40`, `COL 41`, `COL 42`, `COL 43`, `COL 44`, `COL 45`, `COL 46`, `COL 47`, `COL 48`, `COL 49`, `COL 50`, `COL 51`, `COL 52`, `COL 53`, `COL 54`, `COL 55`, `COL 56`, `COL 57`, `COL 58`) VALUES ('".$row[0]."','".$row[1]."','".$row[2]."','".$row[3]."','".$row[4]."','".$row[5]."','".$row[6]."','".$row[7]."','".$row[8]."','".$row[9]."','".$row[10]."','".$row[11]."','".$row[12]."','".$row[13]."','".$row[14]."','".$row[15]."','".$row[16]."','".$row[17]."','".$row[18]."','".$row[19]."','".$row[20]."','".$row[21]."','".$row[22]."','".$row[23]."','".$row[24]."','".$row[25]."','".$row[26]."','".$row[27]."','".$row[28]."','".$row[29]."','".$row[30]."','".$row[31]."','".$row[32]."','".$row[33]."','".$row[34]."','".$row[35]."','".$row[36]."','".$row[37]."','".$row[38]."','".$row[39]."','".$row[40]."','".$row[41]."','".$row[42]."','".$row[43]."','".$row[44]."','".$row[45]."','".$row[46]."','".$row[47]."','".$row[48]."','".$row[49]."',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);";
        $db->query($sql);
    //echo '<br/>'.$sql."<br/>".$row[1];
	 echo "<br/>".$row[0];
	}
    //fclose($handle);

?>