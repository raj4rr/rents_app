<?php include("lock.php");include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
if(isset($_SESSION['employee_id']))
{
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>r4r | Admin</title>
<link rel="stylesheet" type="text/css" href="../admin_css/grid.css"/>
<link rel="stylesheet" type="text/css" href="../admin_css/content.css"/>
<link type="text/css" rel="stylesheet" href="../admin_js/jquery-te-1.4.0.css">
<script type="text/javascript" src="../admin_js/jquery 1.6.4.js"></script>
<script type="text/javascript" src="../admin_js/popup.js"></script>
<script src="../admin_js/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {$(".close_box").click(function() {$('#question_box').fadeOut('slow');$("#question_box_back").fadeOut('slow');});});
function question_box(question_id)
{
	$('#question_box_ans').fadeIn('slow');$("#question_box_back").css('display', 'block' );
	$.ajax({type: "get",url: "question_box.php",data: "question_id="+question_id,cache:false,dataType:"html",
	success: function (response){$('#content').html(response);},error:function(){}});
} 

function question_box_ans(question_id,ans)
{   $('#question_box_ans').hide();
	$('#question_box').fadeIn('slow');$("#question_box_back").css('display', 'block' );
	$.ajax({type: "get",url: "question_box -ans.php",data: "question_id="+question_id+"&ans="+ans,cache:false,dataType:"html",
	success: function (response){$('#content').html(response);},error:function(){}});
} 

function delete_category(delete_category_id,id)
{
	var confer=confirm("Are you sure to remove this: "+delete_category_id+"?");
    if (confer){$("#category_image"+id).html('');$("#category_image"+id).append("<img src='../images/ajax.gif' id='updateimageloader' width='12' style='padding:0px; background:none;' />");$.ajax({type: "get",url: "delete_category.php",data: "delete_category_id="+encodeURIComponent(delete_category_id),cache:false,dataType:"html",success: function (response){if(response==1){$("#category"+id).remove();$("#updateimageloader").remove();}else{alert(encodeURIComponent(response));}},error:function(){$("#category"+id).html("&nbsp;");$("#update_imageloader").remove();}});}
	else{return false;}
}
</script>
<style>
.questionbox
{
	border:#CCC solid 8px;
	border-radius:4px;
	background:#DDD;
}
#content
{
	padding:5px;
	font-size:13px;
}
.questionbox_padding
{
	padding:8px;
	border-radius:4px;
}
.head_div
{
	text-align:center;
	font-size:large;
	font-weight:bold;
	padding: 5px 0px 10px 0px;
}
.questionbox.close
{
	width: 16px;
	background: url(../images/close.png) no-repeat left top;
	height: 16px;
	position: absolute;
	right: 15px;
	top: 15px;
}

.gray_box{
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color:#000000;
    z-index:1;
    -moz-opacity: 0.8;
    opacity:.80;
    filter: alpha(opacity=80);
	filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
	display:none;
}
.popup_boxx { 
	width:750px;
	position:fixed;  
	_position:absolute; 
	top:50%;
    left:50%;
	margin:-300px 0 0 -375px; 
	z-index:1003; 
	display:none;
	height:500px; 
}
.close_box {
    	width:16px;
		background:url(../images/close.png) no-repeat left top;
		height:16px;
		position:absolute;
		right:15px;
		top:15px;
		cursor:pointer;
}
.jqte_editor, .jqte_source {
  padding: 10px;
  background: #FFF;
  height: 270px;
  max-height:270px;
  min-height: 100px;
  overflow: auto;
  outline: none;
  word-wrap: break-word;
  -ms-word-wrap: break-word;
  resize: vertical;
  border:1px #CCC solid;
}
.jqte_toolbar {
  overflow: auto;
  padding: 3px 4px;
  background: #EEE;
  border: #BBB 1px solid;
  }
</style>
</head>
<body>

 <div class="header">
 	<a href="http://r4r.in/admin" class="grid_3 logo"></a>
    <div class="grid_right">
        <ul class="navigation">
			<li><a class="pageactive">Interview Question</a></li>
            <li><a class="login"><?php echo 'Hi '.$row_employee_full_information['employee_name'];?></a></li>
            <li><a href="../logout.php" class="login">Log out</a></li>
        </ul>
	</div>
 </div>

		<div class="wrapper" style="min-height:510px; ">
				<?php
				if(isset($_REQUEST['r'])){
					if($_REQUEST['r']=='r4r_interview')
					include("r4r_interview_q.php");
					else
					include("r4r_interview_q.php");
				} else
				include("r4r_interview_q.php");
				?>
        </div>

<script src="../admin_js/jquery.min.js"></script>
<script src="../admin_js/text_limit.js"></script>       
	<div id="question_box" class="gray_box"></div>
	<div id="question_box_back" class="popup_boxx">
		<div class="questionbox">
			<div class="tableContent questionbox_padding">
				<div class="head_div"><a class="close_box" title="Close"></a></div>
				<div id="content"></div>
			</div>
		</div>
	</div>

	<div id="question_box_ans" class="gray_box"></div>
	<div id="question_box_back" class="popup_boxx">
		<div class="questionbox">
			<div class="tableContent questionbox_padding">
				<div class="head_div"><a class="close_box" title="Close"></a></div>
				<div id="content"></div>
			</div>
		</div>
	</div>

<div class="footer">
           <p> Copyright&nbsp;&nbsp;&copy;&nbsp;2012-14&nbsp; r4r Techsoft Solutions </p>        

</div>
    </body>

</html>
<?php
} else {
	$url="../login/";header("location:$url");
}
mysql_close($r4r_con);?>

