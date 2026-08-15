<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

session_start();
if(isset($_SESSION['employee_id']))
{
    $sql_employee_full_information=mysql_query("select * from employee_information where employee_id='$_SESSION['employee_id']'");
    $row_employee_full_information=mysql_fetch_array($sql_employee_full_information);
}
else
{
}
?>