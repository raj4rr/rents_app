<?php
include "db.php";

$id = (int) $_GET['id'];
$conn->query("DELETE FROM question WHERE id=$id");
header("Location: questions.php");
?>
