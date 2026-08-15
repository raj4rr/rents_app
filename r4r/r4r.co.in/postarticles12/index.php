<?php session_start();

if (empty($_SESSION['token'])) {
    $_SESSION['token'] = bin2hex(random_bytes(32));
}
$token = $_SESSION['token'];
if (empty($_SESSION['CSRFtoken'])) {
    $_SESSION['CSRFtoken'] = bin2hex(random_bytes(32));
}
$CSRFtoken = $_SESSION['CSRFtoken'];
if(!empty($_POST['CSRFtoken']) && empty(!$_POST['token'])){
if($CSRFtoken==$_POST['CSRFtoken'] &&  $_POST['token']==$token)
{
	include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

	$data = [
    '0','0','P',$_POST['title'],$_POST['topic_description'],$_POST['topic_short_desc'],$_POST['keywords'],'1'

];
$stmt = $pdo->prepare("INSERT INTO `topic_p` (`category_id`, `subcategory_id`, `publish`, `topic_name`, `topic_description`, `topic_short_desc`, `keyword`, `admin_id`) VALUES (?,?,?,?,?,?,?,?)");
try {
    $pdo->beginTransaction();

        $stmt->execute($data);
   // }
    $pdo->commit();
	echo 'Insterted';
}catch (Exception $e){
    $pdo->rollback();
    throw $e;
}

}
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Post R4R</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
        <link href="css/wysiwyg.css" rel="stylesheet">
        <link href="css/highlight.min.css" rel="stylesheet">
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-1">&nbsp;</div>
                <div class="col-md-10">
                    <div class="well" style="margin: 2rem 0;">
                        <div class="form-group">
						<form action="#" method="POST">
							<label class="control-label" for="editor">Title:</label>
                            <textarea name="title" id="title" class="form-control" rows="3"></textarea>
							<label class="control-label" for="editor">Keyword:</label>
                            <textarea name="keywords" class="form-control" rows="3"></textarea>
							<label class="control-label" for="editor">Tags:</label>
                            <textarea name="tags" class="form-control" rows="3"></textarea>
							<label class="control-label" for="editor">Topic Short description:</label>
                            <textarea name="topic_short_desc" class="form-control" rows="3"></textarea>
                            <label class="control-label" for="editor">Topic description:</label>
                            <textarea id="editor" name="topic_description" class="form-control" rows="3"></textarea>
							<input type="hidden" name="token" value="<?php  echo $token; ?>" />
							<input type="hidden" name="CSRFtoken" value="<?php  echo $CSRFtoken; ?>" >
							<input type="submit" value="Save" > 
							</form>
                        </div>
                </div>
                <div class="col-md-1">&nbsp;</div>
            </div>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="js/wysiwyg.js"></script>
        <script src="js/highlight.js"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                $('#editor').wysiwyg({
                    debug: true
                });
            });
        </script>
    </body>
</html>