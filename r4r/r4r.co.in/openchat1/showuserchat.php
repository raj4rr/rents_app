<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';

 require_once $CONFIG['CORE_PATH'] . "../db/dbconnection.php";

 echo '<table border="1" width="728px"><tr><td  width="50%" valign="top"><b> Your Chat.....</b><Br>';

 if($chatwith=='gst' || $chatwith=='frd'||$chatwith=='all')
 {

if($chatwith=='frd')

$sql = "SELECT * FROM `voicebox` WHERE `userid`=$userID ;";

else  if($chatwith=='gst') 
$sql = "SELECT * FROM `voicebox` WHERE `userid`=$userID and chatwith='0';";
else if($chatwith=='all')
$sql = "SELECT * FROM voicebox ORDER BY id DESC";
else
$sql = "SELECT * FROM `voicebox` WHERE `userid`=$userID;";
//echo $sql;
$result = mysql_query($sql,$connection);

$totalRecords = mysql_num_rows($result);

if($totalRecords > 1000){

   $lastRecords = $totalRecords-1000;
if($chatwith=='frd')

$sql = "SELECT * FROM voicebox where  userid=$userID ORDER BY id DESC LIMIT $lastRecords,$totalRecords";

else if($userID!='0' && $chatwith=='gst')

$sql = "SELECT * FROM voicebox where  userid='$userID' and chatwith='0' ORDER BY id DESC LIMIT $lastRecords,$totalRecords";

else if($userID!='0' && $chatwith=='all')
   $sql = "SELECT * FROM voicebox ORDER BY id DESC LIMIT $lastRecords,$totalRecords";
   else
    $sql = "SELECT * FROM voicebox where  userid='$userID' ORDER BY id DESC LIMIT $lastRecords,$totalRecords";

   //echo $sql;

   $result = mysql_query($sql,$connection);

}

while($row = mysql_fetch_array($result)){

	$usser_id = $row['userid'];
	$userChatID=$row['id'];

        $namecolor = $row['nameColor'];
          $sqlusername = "SELECT username FROM profile where id=$usser_id";
         $resultname = mysql_query($sqlusername,$connection);
         $username ='';
while($rowname = mysql_fetch_array($resultname)){

	$username = $rowname['username'];
	}  

        $text = $row['text'];

        $textcolor = $row['textColor'];

        $date = date('h:i:s A',strtotime($row['time']));        

	echo '<hr><a href=?chatwith='.htmlspecialchars($usser_id).'><font color='.$namecolor.'><b>'.htmlspecialchars($username).'</b></font> </a>  '.$date.'<br><font color='.$textcolor.'/>'.htmlspecialchars($text).'</font>';
  }
  echo '</td><td valign="top"> <b>Your frds Relpy..</b><hr>';
	$sqlchatwith = "SELECT * FROM voicebox where  chatwith='$userID' and userid='$chatwith' ORDER BY id DESC";
	$resultcahwith = mysql_query($sqlchatwith,$connection);

while($rowchatwith = mysql_fetch_array($resultcahwith)){

	$usser_id = $rowchatwith['userid'];
	$userChatID=$rowchatwith['id'];

        $namecolor = $rowchatwith['nameColor'];
          $sqlusername = "SELECT username FROM profile where id=$usser_id";
         $resultname = mysql_query($sqlusername,$connection);
         $chatwithname ='';
while($rowname = mysql_fetch_array($resultname)){

	$chatwithname = $rowname['username'];
	}  

        $text = $rowchatwith['text'];

        $textcolor = $rowchatwith['textColor'];

        $date = date('h:i:s A',strtotime($rowchatwith['time']));        

	echo '<hr><a href=?chatwith='.htmlspecialchars($usser_id).'><font color='.$namecolor.'><b>'.htmlspecialchars($chatwithname).'</b></font> </a>  '.$date.'<br><font color='.$textcolor.'/>'.($text).'</font>';

}

 }
 else {
	   $sql = "SELECT * FROM voicebox where  userid='$userID' and chatwith='$chatwith'";

   //echo $sql;

   $result = mysql_query($sql,$connection);

while($row = mysql_fetch_array($result)){

	$usser_id = $row['userid'];
	$userChatID=$row['id'];

        $namecolor = $row['nameColor'];
          $sqlusername = "SELECT username FROM profile where id=$usser_id";
         $resultname = mysql_query($sqlusername,$connection);
         $username ='';
while($rowname = mysql_fetch_array($resultname)){

	$username = $rowname['username'];
	}  

        $text = $row['text'];

        $textcolor = $row['textColor'];

        $date = date('h:i:s A',strtotime($row['time']));        

	echo '<hr><a href=?chatwith='.htmlspecialchars($usser_id).'><font color='.$namecolor.'><b>'.htmlspecialchars($username).'</b></font> </a>  '.$date.'<br><pre><font color='.$textcolor.'/>'.($text).'</font></pre>';
  }
  echo '</td><td valign="top"> <b>Your frds Relpy..</b><hr>';
	$sqlchatwith = "SELECT * FROM voicebox where  chatwith='$userID' and userid='$chatwith'ORDER BY id DESC";
	$resultcahwith = mysql_query($sqlchatwith,$connection);

while($rowchatwith = mysql_fetch_array($resultcahwith)){

	$usser_id = $rowchatwith['userid'];
	$userChatID=$rowchatwith['id'];

        $namecolor = $rowchatwith['nameColor'];
          $sqlusername = "SELECT username FROM profile where id=$usser_id";
         $resultname = mysql_query($sqlusername,$connection);
         $chatwithname ='';
while($rowname = mysql_fetch_array($resultname)){

	$chatwithname = $rowname['username'];
	}  

        $text = $rowchatwith['text'];

        $textcolor = $rowchatwith['textColor'];

        $date = date('h:i:s A',strtotime($rowchatwith['time']));        

	echo '<hr><a href=?chatwith='.htmlspecialchars($usser_id).'><font color='.$namecolor.'><b>'.htmlspecialchars($chatwithname).'</b></font> </a>  '.$date.'<br><pre><font color='.$textcolor.'/>'.($text).'</font></pre>';

}

       }

echo '</td></tr></table>';
mysql_close($connection); 

?>

  </div>

