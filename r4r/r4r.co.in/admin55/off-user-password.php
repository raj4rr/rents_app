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

       $exam = $_POST['exam'];

          $_SESSION['examid'] = $exam;

         header("location: dashboard-UserName-Password.php");

      }

?>
<html>

   <head>
      <title>Login Page</title>
      <link rel="stylesheet" href="style.css" type="text/css" />
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

  <div id="header">
	<div id="content">
    <label>Generate User Name and Password</label>
    </div>
</div>

<div id="body">
	<div id="content">

<div id="content">
    <table align="center">
    <tr>
    <th colspan="2"><a href="loadexam.php">Back to Main Page</a></th>
           <th colspan="3"><a href="dashboard-UserName-Password.php">User name & Password  List</a></th>
        <th colspan="3"><a href="logout.php">Logout</a></th>
    </tr>
    </table>
      <div align = "center">
         <div style = "width:850px; border: solid 1px #333333; " align = "left">
            <div style = "background-color:#333333; color:#FFFFFF; padding:3px;"><b>Select Exam</b></div>

            <div style = "margin:30px">

               <form action = "generateUserNamePassword.php" method = "post">

                  <select class="form-control" id="exam" name="exam" required >

							<?php $sql = "SELECT * FROM examevent WHERE islive = 'Y'";
     $retval = mysql_query( $sql, $con);

   if(! $retval ) {
      die('Could not get data: ' . mysql_error());
   }

   $name='';

while($row = mysql_fetch_array($retval, MYSQL_ASSOC)) {
 //  $_SESSION['islive'] = $islive;
    $name=$row['name'];
	$examid=	$row['id'];					

                      		echo '<option value="'.$examid.'">'.$name.'</option>';  

                       } ?>	

                    	</select>
                  <input type = "submit" value = " Generate "/><br />
               </form>

               <div style = "font-size:11px; color:#cc0000; margin-top:10px"><?php echo $error; ?></div>

            </div>

         </div>

      </div>

   </body>
</html>
