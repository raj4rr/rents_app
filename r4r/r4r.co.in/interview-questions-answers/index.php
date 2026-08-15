<?php 

$sub=str_replace("SUB","",str_replace("INTER","",$_GET["categoryFilter"])) ;
?>
<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/analytics.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>R4R Answers | <?php echo $sub; ?> Programming Questions</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/prismjs/themes/prism.css" rel="stylesheet" />

  <!-- SEO Meta Tags -->
  <meta name="description" content="Explore categorized programming questions and answers on <?php echo $sub; ?>, HTML, DBMS, and more. Ideal for students and interview prep.">
  <meta name="keywords" content="<?php echo $sub; ?> questions and answers, programming Q&A, R4R answers, interview preparation, educational resource">
  <meta name="author" content="Rajesh | R4R Knowledge Hub">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="R4R Answers – Programming Interview Prep">
  <meta property="og:description" content="Categorized coding questions and model answers for students and developers.">
  <meta property="og:url" content="/answer/">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
<script src="jquery.min.js"></script>

  <script>
	  $(document).ready(function() {
  $('select').on('change', function() {
    var selectedValue = $(this).val(); // Get the selected value
     window.location.href = "?categoryFilter="+selectedValue;
   // console.log('Selected value:', selectedValue);
    // Add your desired actions here
  });
});

</script>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9; }
    .hero { background-color: #007bff; color: white; padding: 50px 20px; text-align: center; }
    .question-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 8px rgba(0,0,0,0.05); margin-bottom: 20px; }
    footer { background-color: #212529; color: #ccc; padding: 20px; text-align: center; }

  </style>

   <?php 

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "u978544338_r4rcoin";
    $footer='';

?>

</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid"><a class="navbar-brand" href="#">R4R Answers</a></div>
</nav>

<!-- Hero -->
<section class="hero">
  <div class="container">
    <h1><?php echo $sub; ?> Programming Questions & Answers</h1>
    <p class="lead">Explore model answers categorized by subjects like Java, HTML, DBMS, and more.</p>
  </div>
</section>

<!-- Filter Dropdown -->
<div class="container mt-4">
  <div class="row mb-3">
    <div class="col-md-4">
      <select id="categoryFilter"  class="form-select">
        <option value="">Select Subjects</option>
 <?php //include "header.php";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $tableName = "subjects"; // Replace with your actual table name
		$sql = "SELECT id,name FROM " . $tableName;
		$stmt = $conn->prepare($sql);
		$stmt->execute();

		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		    $path=str_replace("SUB","",str_replace("INTER","",$row['name']));
		    $footer=$footer."<a href='?categoryFilter=".$row['name']."'>".$path."</a> | ";
       ?>
       <option <?php $s=$_GET['categoryFilter']==$row['name']?'Selected':''; echo $s; ?> value="<?php echo htmlspecialchars($row['name']); ?>"><?php echo str_replace("SUB","",str_replace("INTER","",$row['name'])); ?></option>
       <?php } ?>

   </select>
    </div>

  </div>
</div>

  <?php 
  /*
   $tableName = "subjects"; // Replace with your actual table name
		$sql = "SELECT id,name FROM " . $tableName;
		$stmt = $conn->prepare($sql);
		$stmt->execute();
  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	*/  

	 echo '<h1>'.$sub.' Programming Questions & Answers</h1>';
	   $tableNameQusetions = "question WHERE `language` LIKE '%".$_GET['categoryFilter']."%' ORDER BY `language` ASC "; // Replace with your actual table name
		$sql_q = "SELECT id,question,answer FROM " . $tableNameQusetions;
		$stmt_q = $conn->prepare($sql_q);
		$stmt_q->execute();

		while ($row_q = $stmt_q->fetch(PDO::FETCH_ASSOC)) {
       ?>

<!-- DBMS Q&A -->
<div class="container mt-3 question-block <?php echo htmlspecialchars($row['name']); ?>">
  <div class="question-card">
    <h4><?php echo htmlspecialchars($row_q['question']); ?></h4>
    <strong>Answer:</strong> 
    <pre><?php echo ($row_q['answer']); ?></pre>

  </div>
</div>

 <?php //}
 } ?>

 <?php  

    $conn = null; // Close the connection
    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
        die();
    }
    ?>

  <!-- Add more .question-card blocks as needed -->
</div>

<!-- Footer -->
<footer>
    <?php echo $footer; ?>
  <p>&copy; 2025 R4R Knowledge Hub | Educational Templates by Rajesh</p>
</footer>

<!-- Script for Filter and Theme Toggle -->
<script>
  // Filter Function
  document.getElementById("categoryFilter").addEventListener("change", function() {
    const selected = this.value;
    document.querySelectorAll(".question-block").forEach(block => {
      block.style.display = selected === "all" || block.classList.contains(selected) ? "block" : "none";
    });
  });

  // Dark Mode Toggle
  const toggleBtn = document.getElementById("themeToggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-light");
  });
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs/prism.js"></script>
</body>
</html>
