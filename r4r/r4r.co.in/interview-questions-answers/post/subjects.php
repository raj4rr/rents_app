<?php include "db.php"; ?>

<!DOCTYPE html>
<html>
<head>
    <title>Subjects CRUD</title>
</head>
<body>
	 <ul>
        <li><a href="questions.php">Manage Questions</a></li>
        <li><a href="subjects.php">Manage Subjects</a></li>
    </ul>

<h2>Add Subject</h2>
<form method="post" action="add-subjects.php">
    Name: <input type="text" name="name" required><br>
    Hide: <select name="hide">
        <option value="1">Yes</option>
        <option value="0">No</option>
    </select><br>
    <button type="submit">Insert</button>
</form>

<hr>

<h2>All Subjects</h2>
<table border="1" cellpadding="5" cellspacing="0">
<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Hide</th>
    <th>Actions</th>
</tr>

<?php
$result = $conn->query("SELECT * FROM subjects ORDER BY id DESC");
while($row = $result->fetch_assoc()) {
    echo "<tr>
        <td>{$row['id']}</td>
        <td>{$row['name']}</td>
        <td>" . ($row['hide'] ? "Yes" : "No") . "</td>
        <td>
            <a href='update-subject.php?id={$row['id']}'>Edit</a> |
            <a href='delete-subject.php?id={$row['id']}' onclick=\"return confirm('Delete this record?');\">Delete</a>
        </td>
    </tr>";
}
?>
</table>
</body>
</html>
