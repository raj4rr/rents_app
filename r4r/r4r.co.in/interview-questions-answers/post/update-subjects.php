<?php
include "db.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $id   = (int) $_POST['id'];
    $name = $conn->real_escape_string($_POST['name']);
    $hide = (int) $_POST['hide'];

    $sql = "UPDATE subjects SET name='$name', hide=$hide WHERE id=$id";

    if ($conn->query($sql)) {
        header("Location: subjects.php");
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
