<?php
include "db.php";

if (isset($_GET['language'])) {
    $language = $_GET['language'];
 echo $language;
    $sql = "SELECT * FROM question WHERE language like'%".$language."%' ORDER BY id DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "<h3>Questions</h3>";
        echo "<table border='1' cellpadding='5' cellspacing='0'>
                <tr>

                    <th>Question</th>
                    <th>Answer</th>

                    <th>Action</th>
                </tr>";
        while($row = $result->fetch_assoc()) {
            echo "<tr>

                    <td>{$row['question']}</td>
                    <td>{$row['answer']}</td>

                     <td>
            <a href='update-question.php?id={$row['id']}'>Edit</a> |
            <a href='delete-question.php?id={$row['id']}' onclick=\"return confirm('Delete this record?');\">Delete</a>
        </td>
                 </tr>";
        }
        echo "</table>";
    } else {
        echo "<p>No questions found for this subject.</p>";
    }
}
?>
