<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');include("lock.php");
$_SESSION['employee_id']='4';
if(isset($_SESSION['employee_id']))
{
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>r4r | Admin</title>
<link rel="stylesheet" type="text/css" href="admin_css/grid.css"/>
<link rel="stylesheet" type="text/css" href="admin_css/content.css"/>
<link type="text/css" rel="stylesheet" href="admin_js/jquery-te-1.4.0.css">
<script type="text/javascript" src="admin_js/jquery 1.6.4.js"></script>
<script type="text/javascript" src="admin_js/popup.js"></script>
<script src="admin_js/jquery.min.js"></script>

<script type="text/javascript">
	function load_subcategory(category_id){ 
		$("#subcategory_id").html("&nbsp;");
         $("#subcategory_id").append("<option value='0' id='updateImageLoader1'>Loading..</option>");
                  $.ajax({
                         type: "get",
                         url: "subcategory.php",
						 data: "parameter_id="+category_id,
                         cache:false,
                         dataType:"html",
                         success: function (response) {
                            $("#subcategory_id").html(response);
							$("#updateImageLoader1").remove();
                           },
                           error:function(){
                             $("#subcategory_id").html("&nbsp;");
                               $("#updateImageLoader1").remove();
                           }
                  });
     }
	function is_Number_Key(evt,wrong)
      {
		 $('#'+wrong).css('background-color','white');
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
          {   $('#'+wrong).css('background-color','#FFA042');
				return false;
		}
         return true;
      }

	  function is_numeric_decimal(evt,id_w)
      {
		$('#'+id_w).css('background-color','white');
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 46 || charCode > 57) || charCode==47)
          {  $('#'+id_w).css('background-color','#FFA042');
				return false;
		}
         return true;
      }

	function remove_laptop_insert_valid(id_valid)
	{
		$('#'+id_valid).css('color','#717171');
		$('#'+id_valid).css('border-color', '#717171');
	}

	function laptop_update_valid()
	{
		var validate = true;
        var tb = document.getElementsByTagName("input");
        for (var i = 0; i < tb.length; i++) {
            if (tb[i].name == "model_name" || tb[i].name == "model_color" || tb[i].name == "model_id" || tb[i].name == "operating_system" || tb[i].name == "laptop_processor" || tb[i].name == "hdd_storage" || tb[i].name == "system_memory") {
                var txtValue = tb[i].value.trim();
                if (txtValue =="") {
                    tb[i].style.color="Red";tb[i].style.borderColor="Red"
                    validate = false;
                }
            }
        }
		if(validate==true)
		{
			var r = confirm("Are you sure you want to do update this product?");
			if (r == true)
		  	{
		  		return true;
		  	}
			else
		  	{
		  		return false;
		  	}
		}
		else 
		{ 
			return validate;
		}
	}

</script>
</head>
<body>
<?php 
$seller_info_sql=mysql_query("SELECT * from employee_information where employee_id='$_SESSION['employee_id']'");
$rs_info_sql=mysql_fetch_array($seller_info_sql);
if($rs_info_sql['employee_name']=="" || $rs_info_sql['employee_contact']=="" || $rs_info_sql['employee_permanent_address']=="" || $rs_info_sql['employee_optional_address']==""){
  ?>
  <script type="text/javascript">
	$(document).ready(function () {
		$("#show_employee_form").css('display','block');
		$("#show_employee_form_back").css('display','block');
		});
</script>
<div id="show_employee_form"></div>
<div id="show_employee_form_back">
<?php include("employee_info_form.php");?>
</div>
<?php }else
{?>

 <div class="header">
 	<a href="" class="grid_3 logo"></a>
    <div class="grid_right">
        <ul class="navigation">

            <li><a class="pageactive" href="interviews/">Interview Question</a></li>

            <li><a href="/mcqs/admin/" class="login">MCQs</a></li>

            <?php if(isset($_REQUEST['r']) && $_REQUEST['r']=='subcategory'){?>
        	<li><a class="pageactive">Subcategory</a></li>
            <?php } else {?> <li><a href="?r=subcategory">Subcategory(Topics)</a></li><?php }?>

        	<?php if(isset($_REQUEST['r'])==''){?>
        	<li><a class="pageactive">Insert</a></li>
            <?php } else {?><li><a href="../post-topics/">Insert</a></li><?php }?>

            <?php if(isset($_REQUEST['r']) && $_REQUEST['r']=='update'){?>
        	<li><a class="pageactive">Update</a></li>
            <?php } else {}?>

        </ul>
	</div>
 </div>

		<div class="wrapper" style="min-height:510px; ">
				<?php
				if(isset($_REQUEST['r'])){
					if($_REQUEST['r']=='update')
					include("edit_topic.php");
					else if($_REQUEST['r']=='category')
					include("category_insert_update.php");
					else if($_REQUEST['r']=='subcategory')
					include("subcategory_insert_update.php");
					else if($_REQUEST['r']=='topic')
					include("topic_list.php");
					else
					include("new_topic.php");
				} else
				include("new_topic.php");
				?>
        </div>
          </div>
        <script type="text/javascript">
$(document).ready(function () {

	$('input[type="text"],textarea').bind('keyup', function () {
	if(this.value=='') {this.style.backgroundColor='#fff';}
	else this.style.backgroundColor='#FFFFCE';
	});
	$( "select" ).change(function() {
	if(this.value=='0') {this.style.backgroundColor='#fff';$( "#subcategory_id" ).css('background-color','#fff');}
	else  {this.style.backgroundColor='#FFFFCE';}

	});

	var tb = document.getElementsByTagName("input");
   for (var i = 0; i < tb.length; i++) {
	if(tb[i].type=='text'){
		if (tb[i].value){
		tb[i].style.backgroundColor='#FFFFCE';
		}
	}
   }

   var txt = document.getElementsByTagName("textarea");
   for (var i = 0; i < txt.length; i++) {
		if (txt[i].value){
		txt[i].style.backgroundColor='#FFFFCE';

	}
   }
   var txt = document.getElementsByTagName("select");
   for (var i = 0; i < txt.length; i++) {
		if (txt[i].value!='0'){
		txt[i].style.backgroundColor='#FFFFCE';

	}
   }
});	

</script>

<script src="admin_js/jquery.min.js"></script>
<script src="admin_js/text_limit.js"></script>       

    </body>
    <?php  mysql_close($conn);  ?>
</html>
<?php 
	}
} else {
	$url="login/";header("location:$url");
}?>

