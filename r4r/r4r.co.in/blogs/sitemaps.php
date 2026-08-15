<?php
require 'include/init.php';

$conn = require 'include/db.php';

// $paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 5); // by using ternary operator
$paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 5, Article::getTotal($conn, true));	 // php Null coalescing operator [if $_GET['page'] exist then it will show else other] + Total number of content

	// Show articles with page containing 5 article limit and 0 offset value
$top_articles = Article::getPage($conn, 110000, 0, true);	
?>   
							<?php foreach ($top_articles as $article): ?>						
											<url>
											<loc>/blogs/article.php?id=<?= $article['id']; ?>&amp;title=<?= htmlspecialchars(str_replace(' ','-',str_replace('%','per',$article['title']))); ?></loc>
											<lastmod>2022-06-18</lastmod>
											<changefreq>weekly</changefreq>
											<priority>0.9</priority>
											</url>							
							<?php endforeach; ?>

