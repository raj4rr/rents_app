<?php
require 'blogs/include/init.php';

$conn = require 'blogs/include/db.php';

// $paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 5); // by using ternary operator
$paginator = new Paginator(isset($_GET['page']) ? $_GET['page'] : 1, 5, Article::getTotal($conn, true));	 // php Null coalescing operator [if $_GET['page'] exist then it will show else other] + Total number of content

	// Show articles with page containing 5 article limit and 0 offset value
$top_articles = Article::getPage($conn, 20, 0, true);	
?>
<div class="card my-4">
     <h5 class="card-header"> Top articles </h5>

							<?php foreach ($top_articles as $article): ?>
							<a href="/blogs/article/<?= $article['id']; ?>/<?= htmlspecialchars(str_replace(' ','-',str_replace('%','per',$article['url']))); ?>"><?= htmlspecialchars($article['title']); ?></a>
									<p><?= substr(strip_tags($article['content']),0,200); ?></p>
									<?php if ($article['published_at']): ?>
											Published at:- <time><?= $article['published_at'] ?></time>		
											<br/>							
										<?php endif; ?>									
							<?php endforeach; ?>						

    </div>
