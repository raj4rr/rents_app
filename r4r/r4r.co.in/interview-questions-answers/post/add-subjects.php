<?php
include "db.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $name = $conn->real_escape_string($_POST['name']);
    $hide = (int) $_POST['hide'];

    $sql = "INSERT INTO subjects (name, hide) VALUES ('$name', $hide)";

    if ($conn->query($sql)) {
        header("Location: subjects.php");
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
