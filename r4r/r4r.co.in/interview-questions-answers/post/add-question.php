<?php include "db.php"; ?>

<!DOCTYPE html>
<html>
<head>
    <title>Questions with Subjects</title>

    <script src="ckeditor.js"></script>

</head>
<body>
	 <ul>
        <li><a href="questions.php">Manage Questions</a></li>
        <li><a href="subjects.php">Manage Subjects</a></li>
    </ul>
<h2>Add Question</h2>

<form method="post" action="add-questions.php">
    Subject: 
    <select name="subject_id" id="subject_id" required>
        <option value="">--Select Subject--</option>
        <?php
        $language ='';
        $isSelected='';
        if (isset($_GET['subject_name'])) {
			$language = $_GET['subject_name'];
			$isSelected=$s['id']==$_GET['subject_id']?'Selected' : '';
		}

        $subj = $conn->query("SELECT * FROM subjects WHERE hide=0 ORDER BY name ASC");
        while($s = $subj->fetch_assoc()) {

            echo "<option value='{$s['id']}'".$isSelected." data-lang='{$s['name']}' >{$s['name']}</option>";
        }
        ?>
    </select><br>

   <label>Question:</label><br>
    <textarea name="question" id="question"  rows="5" cols="120"></textarea><br><br>

    <label>Answer:</label><br>
    <textarea name="answer" id="answer" ></textarea><br><br>

    <label>Level:</label><br>
    <input type="text" name="question_level" value='H' required><br><br>

    <label>Language:</label><br>
    <input type="text" name="language" id= "language" value="<?php echo $language ?>" required><br><br>

    <label>Hide:</label>
    <select name="hide">

        <option value="NO" >NO</option>
    </select><br><br>

    <label>UserID:</label><br>
    <input type="number" name="userid" value='1' required><br><br>
    <button type="submit">Insert</button>
</form>

<hr>

<h2>All Questions</h2>
<table border="1" cellpadding="5" cellspacing="0">
<tr>
    <th>ID</th>
    <th>Subject</th>
    <th>Question</th>
    <th>Answer</th>
    <th>Level</th>
    <th>Language</th>
    <th>Hide</th>
    <th>UserID</th>
    <th>Actions</th>
</tr>

<?php
$sql = "SELECT q.*, s.name as subject_name 
        FROM question q 
        JOIN subjects s ON q.subject_id = s.id
        ORDER BY q.id DESC limit 100";
$result = $conn->query($sql);

while($row = $result->fetch_assoc()) {
    echo "<tr>
        <td>{$row['id']}</td>
        <td>{$row['subject_name']}</td>
        <td>{$row['question']}</td>
        <td>{$row['answer']}</td>
        <td>{$row['question_level']}</td>
        <td>{$row['language']}</td>
        <td>{$row['hide']}</td>
        <td>{$row['userid']}</td>
        <td>
            <a href='update-question.php?id={$row['id']}'>Edit</a> |
            <a href='delete-question.php?id={$row['id']}' onclick=\"return confirm('Delete this record?');\">Delete</a>
        </td>
    </tr>";
}
?>

<script src="jquery-3.6.0.min.js"></script>

 <script>

    $("#subject_id").change(function(){
    var subjectId = $(this).val();
        var lang = $("#subject_id option:selected").data("lang");  // get language text

  // alert(subjectId);
   // $("#subject_id").val(subjectId); // set hidden subject_id
    $("#language").val(lang);        // auto-fill language
	});

</script>

 <script>
//ClassicEditor
//    .create( document.querySelector( '#question_1' ) )
 //   .catch( error => { console.error( error ); } );

ClassicEditor
    .create( document.querySelector( '#answer' ) )
    .catch( error => { console.error( error ); } );
</script>
</table>
</body>
</html>
