<?php
// Creating connection test is our database name
$conn = new mysqli('localhost', 'db_shashir4r', 'Hello@123','r4rcoin');
// Checking connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
