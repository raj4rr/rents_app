<?php
session_start(); 
?>
<!DOCTYPE html>
<html>
<head>
  <title>Upload SiteMaps</title>
</head>
<body>
	  <h1>Upload SiteMaps</h1>

	<ul>
	<li> <a href="https://www.xml-sitemaps.com/">generate sitemap</a></li>
	  <li> Upload  <a href="/upload-sitemap/">sitemap</a>.</li>
	  <li> After upload verify <a href="../sitemaps/">sitemap</a>.</li>
	  <li>Submit to google webmaster </li>
	</ul>
	<hr/>
  <?php
    if (isset($_SESSION['message']) && $_SESSION['message'])
    {
      printf('<b>%s</b>', $_SESSION['message']);
      unset($_SESSION['message']);
    }
  ?>
  <form method="POST" action="upload.php" enctype="multipart/form-data">
    <div>
      <span>Upload a File:</span>
      <input type="file" name="uploadedFile" />
    </div>

    <input type="submit" name="uploadBtn" value="Upload" />
  </form>
</body>
</html>
