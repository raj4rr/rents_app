<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../../db/dbconnection.php";

 $err = '';
$typeOfImage = array("1","2","3");
$imageExt = array(".gif",".jpg",".png");
$imageMethod = array('imagecreatefromgif','imagecreatefromjpeg','imagecreatefrompng');
$imageCreate = array('imagegif','imagejpeg','imagepng');
$image_folder = "../";
$image_folder_original = "/pics/";
$max_file_size = '200000';
 $imageName='';
$userId = rand(00000,99999);
if($_FILES["file"]){

	  foreach($typeOfImage as $typeImage => $typeImage1){
            	  	                $imageName = $userId.$imageExt[$typeImage];
                                    move_uploaded_file($_FILES["file"]["tmp_name"],$image_folder.$image_folder_original.$imageName);
                              }
   } 

$date = date("d.m.y"); 

$userName=$_POST["userName"];
$emailID=$_POST["emailID"];
$websiteName=$_POST["websiteName"];
$companyName=$_POST["companyName"];
$contactPersonName=$_POST["contactPersonName"];
$mobileNumber=$_POST["mobileNumber"];
$phoneNumber=$_POST["phoneNumber"];
$faxNumber=$_POST["faxNumber"];
$budget=$_POST["budget"];
$banner=$_POST["banner"];
$sizeBanner=$_POST["sizeBanner"];
$duration=$_POST["duration"];
$comments=$_POST["comments"];

if (!$connection)

  {

  die('Could not connect: ' . mysql_error());

  }

mysql_query("INSERT INTO advertisment(userName,emailID,websiteName,companyName,contactPersonName,mobileNumber,phoneNumber,faxNumber,budget,banner,sizeBanner,duration,comments,fileName,date) VALUES('$userName','$emailID','$websiteName','$companyName','$contactPersonName','$mobileNumber','$phoneNumber','$faxNumber','$budget','$banner','$sizeBanner','$duration','$comments','$imageName','$date')") or die("State query error!");

die(header("Location:../successful.shtml"));

mysql_close($connection);

?>

