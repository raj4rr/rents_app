<?php session_start();include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
if(isset($_SESSION['employee_id']))
{
    $sql_employee_full_information=mysql_query("select * from employee_information where employee_id='$_SESSION['employee_id']'",$conn);
    $row_employee_full_information=mysql_fetch_array($sql_employee_full_information);
}
?>