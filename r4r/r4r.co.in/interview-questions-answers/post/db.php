<?php
session_start();

// Check if user is logged in
if(!isset($_SESSION['is_logged_in'])) {
    header("Location: /blogs/login.php"); // redirect to login
    exit();
}
?>
<?php

// db.php - Database Connection
$host = "localhost";
$user = "u978544338_r4rcoin";
$pass = "2rI=*O?0V?Zj";
$db   = "u978544338_r4rcoin";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$servername = "localhost";
    $username = "u978544338_r4rcoin";
    $password = "2rI=*O?0V?Zj";
    $dbname = "u978544338_r4rcoin";
?>
