<?php
include "db.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $subject_id = (int) $_POST['subject_id'];
    $question   = $conn->real_escape_string($_POST['question']);
    $answer     = $conn->real_escape_string($_POST['answer']);
    $level      = $conn->real_escape_string($_POST['question_level']);
    $language   = $conn->real_escape_string($_POST['language']);
    $hide       = $conn->real_escape_string($_POST['hide']);
    $userid     = (int) $_POST['userid'];

    $sql = "INSERT INTO question (subject_id, question, answer, question_level, language, hide, userid) 
            VALUES ($subject_id, '$question', '$answer', '$level', '$language', '$hide', $userid)";

    if ($conn->query($sql)) {
        header("Location: add-question.php?subject_id=".$subject_id."&subject_name=".$language);
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
