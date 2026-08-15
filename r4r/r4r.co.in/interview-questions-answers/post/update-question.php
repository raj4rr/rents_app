<?php
include "db.php";
$id = (int) $_GET['id'];
$result = $conn->query("SELECT * FROM question WHERE id=$id");
$row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head><title>Edit Question</title></head>
  <script src="https://cdn.ckeditor.com/ckeditor5/41.4.2/classic/ckeditor.js"></script>
<body>
<h2>Edit Question</h2>
<form method="post" action="update-questions.php">
    <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
    Subject: 
    <select name="subject_id" required>
        <?php
        $subj = $conn->query("SELECT * FROM subjects ORDER BY name ASC");
        while($s = $subj->fetch_assoc()) {
            $sel = ($row['subject_id']==$s['id']) ? "selected" : "";
            echo "<option value='{$s['id']}' $sel>{$s['name']}</option>";
        }
        ?>
    </select><br>
    Question: <textarea name="question" id="question"  rows="5" cols="120" ><?php echo $row['question']; ?></textarea><br>
    Answer: <textarea name="answer" id="answer"><?php echo $row['answer']; ?></textarea><br>
    Level: <input type="text" name="question_level" value="<?php echo $row['question_level']; ?>"><br>
    Language: <input type="text" name="language" value="<?php echo $row['language']; ?>"><br>
    Hide: <select name="hide">
        <option value="YES" <?php if($row['hide']=="YES") echo "selected"; ?>>YES</option>
        <option value="NO" <?php if($row['hide']=="NO") echo "selected"; ?>>NO</option>
    </select><br>
    UserID: <input type="number" name="userid" value="<?php echo $row['userid']; ?>"><br>
    <button type="submit">Update</button>
</form>

 <script>
//ClassicEditor
//    .create( document.querySelector( '#question' ) )
//    .catch( error => { console.error( error ); } );

ClassicEditor
    .create( document.querySelector( '#answer' ) )
    .catch( error => { console.error( error ); } );
</script>
</script>
</body>
</html>
