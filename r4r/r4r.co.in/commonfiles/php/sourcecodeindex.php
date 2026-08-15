<?php  
 function displayContents($language,$defaultPageHeader,$navigationtourl,$pdo = null){ 
    if ($pdo === null) {
        global $pdos;
        $pdo = $pdos;
    }
 	$subject= trim(substr($language,0,strpos($language,"Examp")));
 //	echo $showurl;
 	?>

	 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/answer/datatable/dataTable.bootstrap.min.css">
	<style>
		.height10{
			height:10px;
		}
		.mtop10{
			margin-top:10px;
		}
		.modal-label{
			position:relative;
			top:7px
		}
	</style>

 <table id="myTable" class="table table-bordered table-striped">
					<thead>
						<th><div class="heading"><?=$defaultPageHeader ?></div></th>
					</thead>
					<tbody>

<?php

$stm = $pdo->prepare("SELECT  id,title  FROM `sourcecode` WHERE  language=:language AND hide='NO'");
			$stm->bindParam(":language", $language, PDO::PARAM_STR);
			$stm->execute();

?>

    	<div class="content_link">

<?php

  	$rows = $stm->fetchAll(PDO::FETCH_ASSOC);
					foreach($rows as $row) {
					?>

<tr><td><p class="no_border"> 
<a href='<?php echo $navigationtourl;?>?qid=<?= $row['id'] ?>' class='topic'><?= $row['title'] ?></a> 

   </p></td></tr>

  <?php
	}

//mysql_close($sconnection);

?>
</div>

</tbody>
				</table> 

<script src="/answer/jquery/jquery.min.js"></script>
<script src="/answer/bootstrap/js/bootstrap.min.js"></script>
<script src="/answer/datatable/jquery.dataTables.min.js"></script>
<script src="/answer/datatable/dataTable.bootstrap.min.js"></script>
<!-- generate datatable on our table -->
<script>
$(document).ready(function(){
	//inialize datatable
    $('#myTable').DataTable();

    //hide alert
    $(document).on('click', '.close', function(){
    	$('.alert').hide();
    })
});
</script>

<?php //include("../../../php/postcomment.php"); 
?> 

	  <?php } ?>
