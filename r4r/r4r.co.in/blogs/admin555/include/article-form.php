<?php if (!empty($article->errors)): ?>
	<ul>
		<?php foreach ($article->errors as $error): ?>
			<li>
				<?= $error ?>
			</li>
		<?php endforeach; ?>
	</ul>
<?php endif; ?>

<form method="post" id="formArticle" onsubmit="return Validate()">

	<div class="form-group">
		<label for="title"><b>Title</b> Not Allowed:-`~!@#\$%\^&\*\(\)\-=_+\\\[\]{}/\?,\.\/<\></label>
		<input class="form-control" type="text" name="title" id="title" onchange="return allLetter(this);" placeholder="Article Title" value="<?= htmlspecialchars($article->title); ?>">
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
		<label for="published_at">Publication Date & Time</label>
		<input class="form-control" type="datetime-local" name="published_at" value="<?= htmlspecialchars($article->published_at) ?>">
	</div>
	<fieldset>
		<legend>Categories</legend>
		<?php foreach ($categories as $category): ?>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" name="category[]" value="<?= $category['id'] ?>"
							 id="category<?= $category['id'] ?>"
							 <?php if (in_array($category['id'], $category_ids)): ?>checked<?php endif; ?>>
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

      return true;
     }
   else
     {
      alert("characters is invalid");
     return false;
     }
  }

 </script>
