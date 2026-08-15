<?php
include "db.php";

$id = (int) $_GET['id'];
$conn->query("DELETE FROM subjects WHERE id=$id");
header("Location: subjects.php");
?>
