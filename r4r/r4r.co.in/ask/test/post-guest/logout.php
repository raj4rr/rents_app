<?php
session_start(); 
session_destroy();
$url="login/";
header("location:$url");
?>