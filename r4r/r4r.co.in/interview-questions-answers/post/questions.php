<?php include "db.php"; ?>

<!DOCTYPE html>
<html>
<head>
    <title>Questions with Subjects</title>

</head>
<body>
	 <ul>
        <li><a href="questions.php">Manage Questions</a></li>
        <li><a href="subjects.php">Manage Subjects</a></li>
          <li><a href="add-question.php">Add Questions</a></li>
    </ul>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<hr/>
<select id="subject" name="subject">
    <option value="">-- Select Subject --</option>
    <?php
    $subj = $conn->query("SELECT * FROM subjects ORDER BY name ASC");
    while($s = $subj->fetch_assoc()) {
        echo "<option value='{$s['name']}'>{$s['name']}</option>";
    }
    ?>
</select>

<hr>
<div id="questions">
    <p><i>Please select a subject to load questions...</i></p>
</div>

<script>
$("#subject").change(function(){
    var language = $(this).val();
  //s  alert(language);
   // $("#subject_id").val(subjectId); // set hidden field for insert form
    if(language !== ""){
        $.ajax({
            url: "get_questions.php?language="+language,
            type: "GET",
           //data: {language : language},
            success: function(response){
                $("#questions").html(response);
            }
        });
    } else {
        $("#questions").html("<p><i>Please select a subject.</i></p>");
    }
});

</script>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</body>
</html>

