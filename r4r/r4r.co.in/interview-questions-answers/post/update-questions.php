<?php
include "db.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $id         = (int) $_POST['id'];
    $subject_id = (int) $_POST['subject_id'];
    $question   = $conn->real_escape_string($_POST['question']);
    $answer     = $conn->real_escape_string($_POST['answer']);
    $level      = $conn->real_escape_string($_POST['question_level']);
    $language   = $conn->real_escape_string($_POST['language']);
    $hide       = $conn->real_escape_string($_POST['hide']);
    $userid     = (int) $_POST['userid'];

    $sql = "UPDATE question SET 
                subject_id=$subject_id,
                question='$question',
                answer='$answer',
                question_level='$level',
                language='$language',
                hide='$hide',
                userid=$userid
            WHERE id=$id";

    if ($conn->query($sql)) {
        header("Location: add-question.php?subject_id=".$subject_id."&subject_name=".$language);
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
