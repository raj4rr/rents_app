<?php
   include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
   session_start();
   $error='';
   $con=mysql_connect($hostname,$username,$password);
   mysql_select_db($database,$con);
if(! $con)
{
die('Connection Failed'.mysql_error());
}

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 

      $myusername = $_POST['username'];
      $mypassword = $_POST['password']; 
       $exam = $_POST['exam'];

    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';

 // echo $ipaddress;
      $sql = "SELECT * FROM admin WHERE username = '$myusername' and passcode = '$mypassword'";
     $retval = mysql_query( $sql, $con);

   if(! $retval ) {
      die('Could not get data: ' . mysql_error());
   }
   $count=0;
   $userrole='';
while($row = mysql_fetch_array($retval, MYSQL_ASSOC)) {

    $userrole=$row['userrole'];
    //$checkip = "SELECT * FROM ip_allowed WHERE ip = '$ipaddress' and userrole = '$userrole' and  allowed='Y'";
     //$iprest = mysql_query( $checkip, $con);
     //while($rowip = mysql_fetch_array($iprest, MYSQL_ASSOC)) {
		  $count=1;
	 //}
}

      // If result matched $myusername and $mypassword, table row must be 1 row

      if($count == 1) {
        // session_register("myusername");
         $_SESSION['auserid'] = $myusername;

          $_SESSION['userrole'] = $userrole;

          if($userrole=='S')
         header("location: dashboard.php");
         else
          header("location: index.php");
      }else {
         $error = "Your Login Name or Password is invalid";
      }
   }
?>
<html>

   <head>
      <title>Login Page</title>

      <style type = "text/css">
         body {
            font-family:Arial, Helvetica, sans-serif;
            font-size:14px;
         }

         label {
            font-weight:bold;
            width:90px;
            font-size:14px;
         }

         .box {
            border:#666666 solid 1px;
         }
      </style>

   </head>

   <body bgcolor = "#FFFFFF">

      <div align = "center">
         <div style = "width:300px; border: solid 1px #333333; " align = "left">
            <div style = "background-color:#333333; color:#FFFFFF; padding:3px;"><b>Login</b></div>

            <div style = "margin:30px">

               <form action = "" method = "post">
                  <label>UserName  :</label><input type = "text" name = "username" class = "box"/><br /><br />
                  <label>Password  :</label><input type = "password" name = "password" class = "box" /><br/><br />

                  <input type = "submit" value = " Submit "/><br />
               </form>

               <div style = "font-size:11px; color:#cc0000; margin-top:10px"><?php echo $error; ?></div>

            </div>

         </div>

      </div>

   </body>
</html>
