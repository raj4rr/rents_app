<?php if (!empty($article->errors)): ?>
	<ul>
		<?php foreach ($article->errors as $error): ?>
			<li>
				<?= $error ?>
			</li>
		<?php endforeach; ?>
	</ul>
<?php endif; ?>
<p><a href="new-article.php">Add New Article</a> || <a href="new-category.php">Add New Categories</a> || <a href="category.php">All Categories</a> || <a href="menu.php">All Menu</a> || <a href="new-menu.php">Add New Menu</a></p>

<form method="post" id="formArticle" name="formArticle" onsubmit="return Validate()">

	<div class="form-group">
		<label for="title"><b>URL</b> Not Allowed:- `~!@#\$%\^&\*\(\)\-=_+\\\[\]{}/\?,\.\<\></label>

		<input class="form-control" type="text" name="url" id="url"  placeholder="Article URL" value="<?= htmlspecialchars($article->url); ?>"   required title="Pleace Enter Alphabet Characters Only" >

	</div>

	<div class="form-group">
		<label for="title"><b>Title</b> Not Allowed:-`~!@#\$%\^&\*\(\)\-=_+\\\[\]{}/\?,\.\<\></label>
		<input class="form-control" type="text" name="title" id="title"  placeholder="Article Title" value="<?= htmlspecialchars($article->title); ?>">
	</div>

	<div class="form-group">
		<label for="title">Keyword</label>
		<textarea name="keyword" id="keyword"  placeholder="Topic Keyword.."><?= htmlspecialchars($article->keyword) ?></textarea>

	</div>
	<div class="form-group">
		<label for="title">Meta Description</label>
		<textarea name="meta_desc" id="meta_desc"  placeholder="Topic Keyword.."><?= htmlspecialchars($article->meta_desc) ?></textarea>

	</div>

	<div class="form-group">
		<label for="content">Content</label>

<script type="text/javascript" src="admin_js/jquery-te-1.4.0.min.js" charset="utf-8"></script>
<textarea name="content" id="content" class="jqte-test" placeholder="Topic full description..."><?= htmlspecialchars($article->content) ?></textarea>
<script>
	$('.jqte-test').jqte();
</script>
	</div>
<div class="form-group">
		<label for="main_menu">Main Menu</label>
			<select id="main_menu" name="main_menu">
			<?php foreach ($menus as $menu): ?>

								<option value="<?= $menu['id']; ?>" <?php if ($menu['id']==$article->main_menu): ?>selected<?php endif; ?>><?= htmlspecialchars($menu['name']); ?></option>

							<?php endforeach; ?>

			</select>
	</div>
	<script>
		$('select').on('change', function() {

		//$("form-check-input"+this.value).disabled = false;
		   $(".form-check-input").prop( "disabled", true );
               //alert( "You" ); 
                $(".form-check-input").prop( "checked", false );

		 $(".category"+this.value).prop( "disabled", false );
		});
</script>

	<div class="form-group">
		<label for="published_at">Publication Date & Time</label>
		<input class="form-control" type="datetime-local" name="published_at" value="<?= htmlspecialchars($article->published_at) ?>">
	</div>
	<fieldset>
		<legend>Categories</legend>
		<?php foreach ($categories as $category): ?>
			<div class="form-check">
				<input  class="form-check-input category<?= $category['menu'] ?>" type="checkbox" name="category[]" value="<?= $category['id'] ?>"
							 id="category<?= $category['menu'] ?>"
							 <?php if (in_array($category['id'], $category_ids)): ?>checked<?php endif; ?> <?php if (!in_array($category['id'], $category_ids)): ?>disabled="true"<?php endif; ?> >
				<label class="form-check-label" for="category<?= $category['id'] ?>"><?= htmlspecialchars($category['name']) ?></label>
			</div>
		<?php endforeach; ?>
	</fieldset>
	<button class="btn">Save Article</button>

</form>

<script>
function Validate(){
   if(!validateForm()){
       alert("You must check atleast one of the checkboxes");
       return false;
   }
return true
}
function validateForm()
{
    var c=document.getElementsByTagName('input');
    for (var i = 0; i<c.length; i++){
        if (c[i].type=='checkbox')
        {
            if (c[i].checked){return true}
        }
    }
    return false;
}

function allLetter(inputtxt)
  {

var str=inputtxt.value;
//alert(str);
if(!str.match(/[!@#$%^&*()+\\\/\?<>-]/)) {

      return false;
     }
   else
     {
      alert("characters is invalid");
     return false;
     }
  }

 </script>
