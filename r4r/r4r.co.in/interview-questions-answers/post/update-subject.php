<?php
include "db.php";

$id = (int) $_GET['id'];
$result = $conn->query("SELECT * FROM subjects WHERE id=$id");
$row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head><title>Edit Subject</title></head>
<body>
<h2>Edit Subject</h2>
<form method="post" action="update-subjects.php">
    <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
    Name: <input type="text" name="name" value="<?php echo $row['name']; ?>" required><br>
    Hide: <select name="hide">
        <option value="1" <?php if($row['hide']==1) echo "selected"; ?>>Yes</option>
        <option value="0" <?php if($row['hide']==0) echo "selected"; ?>>No</option>
    </select><br>
    <button type="submit">Update</button>
</form>
</body>
</html>
