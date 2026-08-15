<?php
$handle = opendir(dirname(realpath(__FILE__)));

?>
<a ahref="https://ainfoera.com/upload-sitemap/index.php">Upload Sitemaps</a>
	<li> <a href="https://www.xml-sitemaps.com/" target="_new" >generate sitemap</a></li>
	  <li> Upload  <a href="/upload-sitemap/" target="_new">sitemap</a>.</li>
	  <li> After upload verify <a href="../sitemaps/" target="_new">sitemap</a>.</li>
	  <li>Submit to google webmaster </li>
	</ul>
	<hr/>
<table><tr><td>Sitemaps</td></tr>

<?php
while($file = readdir($handle)){
  if($file !== '.' && $file !== '..'){
	  if(str_contains($file, '.xml'))
    echo '<tr><td><a href="/sitemaps/'.$file.'">https://'.$_SERVER['HTTP_HOST'].'/sitemaps/'.$file.'</a></td></tr>';
  }
}
?>
</table>
