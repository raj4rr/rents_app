<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

$userID=$_POST["userID"];
$userName=$_POST["userName"];

$password=$_POST["password"];

$sex=$_POST["sex"];

$emailID=$_POST["userID"];

$hideEmailID=$_POST["hideEmailID"];

$currentLocation=$_POST["currentLocation"];

$homeTown=$_POST["homeTown"];

$Branch=$_POST["Branch"];

$currentCompany=$_POST["currentCompany"];

$designation=$_POST["designation"];

$currentTechnology=$_POST["currentTechnology"];
$contactNumber=$_POST["contactNumber"];
$hideContactNumber=$_POST["hideContactNumber"];

$uploadPhoto='s'.$_POST["uploadPhoto"];

$uploadCV='s'.$_POST["uploadCV"];

if (!$connection)
  {
  die('Could not connect: ' . mysql_error());
  }

  $result1 = mysql_query("SELECT * FROM `profile` WHERE `userID`='$userID'");
$row = mysql_fetch_array($result1);
  if($row['userID']==$userID){
mysql_close($connection);
die(header("Location:/openchat/?chatwith=all"));
exit();
}else{
mysql_query("INSERT INTO profile(userID,username,password,fathername,sex,occupation,yearofpassout,emailID,hideemailID,currentlocation,hometown,branch,currentcompany,designation,currenttechnology,contactnumber,hidecontactnumber,uploadphoto,uploadCV)
VALUES('$userID','$userName','$password','$fatherName','$sex','$occupation','$yearOFPassOut','$emailID','$hideEmailID','$currentLocation','$homeTown','$Branch','$currentCompany','$designation','$currentTechnology','$contactNumber','$hideContactNumber','$uploadPhoto','$uploadCV')");
die(header("Location:/openchat/?chatwith=all"));
}

mysql_close($connection);

?>
