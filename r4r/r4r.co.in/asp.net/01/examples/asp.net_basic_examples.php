<?php  
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
@include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/php/sourcecode.php');

$id=$_GET["qid"];

            $stm = $pdo->prepare("SELECT  *  FROM `sourcecode` WHERE  id=:id");
			$stm->bindParam(":id", $id, PDO::PARAM_INT);
			$stm->execute();

			$rows = $stm->fetchAll(PDO::FETCH_ASSOC);
					foreach($rows as $row) {
					    ?>

<!DOCTYPE HTML PUBLIC "-/W3C/DTD HTML 4.01 Transitional/EN" "http:/www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">

<HTML><HEAD><TITLE><?php echo $row['title']; ?></TITLE>

<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META content="Rajesh Kumar" name="author">
<META http-equiv="expires" content="0">
<META content="r4r.co.in" name="owner">
<META http-equiv=content-type content="text/html; charset=iso-8859-1">
<META name="description" CONTENT="<?php echo  $row['descriptions']; ?>" >
<META name="keywords" CONTENT="<?php echo  $row['keywords']; ?>">

<link href="/images/logo.gif" type="image/gif" rel="SHORTCUT ICON">
<link href="/css/main.css" rel="stylesheet" type="text/css" />
</HEAD>
<BODY>
<?php include($_SERVER['DOCUMENT_ROOT'] . "/template/header.php"); ?>
<div class="page_wrapper" style=" padding-top:10px;">
  <table cellpadding="3">
    <tr>
           <td style="width:83%;" valign="top">

        <table>
          <tr>
            <td style="width:20%" valign="top"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/leftmenu.shtml'); ?></td>
            <td style="80%" valign="top">
            <!-- Header End-->

<div class="main_content">

<?php 
 displayContents($row['id'],$row['title'],$row['keywords'],$row['descriptions'],$row['introduction'],$row['classdescription'],$row['methoddescription'],$row['sourcecodedescription'],$row['sourcecode'],$row['output'],$row['file'],$row['language'],$row['username'],$row['date']);

} ?>

</div>
</td>
          </tr>
        </table></td>
      <td style="width:17%" valign="top"><?php @include($_SERVER['DOCUMENT_ROOT'] . '/commonfiles/rightmenu.shtml');?></td>
    </tr>
  </table>
</div>
<?php include_once($_SERVER["DOCUMENT_ROOT"] . "/template/footer.php"); ?>

</BODY>
</HTML>