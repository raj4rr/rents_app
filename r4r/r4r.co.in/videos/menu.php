<?php 
if(isset($_GET['categoryname'])) {
	$categoryname=$_GET['categoryname'];

	?>
<HTML><HEAD><TITLE><?php echo $categoryname ;?> videos</TITLE>
<meta name="description" CONTENT="<?php echo $categoryname ;?> videos">
<meta name="keywords" CONTENT="<?php echo $categoryname ;?> videos">

<?php

}else {

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<HTML><HEAD><TITLE>General Knowledge(Hindi/English),Core Java videos,Core Java example,Core Java tutorial,Core Java tutorials,Core Java examples, Core Java interview questions ,Core Java interview answers,Core Java interview questions and answers,Core Java interview questions and answer</TITLE>

<META http-equiv="content-type" content="text/html; charset=iso-8859-1">
<meta name="description" CONTENT="General Knowledge(Hindi/English), Core Java videos,Core Java example,Core Java tutorial,Core Java tutorials,Core Java examples, Core Java interview questions ,Core Java interview answers,Core Java interview questions and answers,Core Java interview questions and answer">
<meta name="keywords" CONTENT="General Knowledge(Hindi/English),Core Java videos,Core Java example,Core Java tutorial,Core Java tutorials,Core Java examples, Core Java interview questions ,Core Java interview answers,Core Java interview questions and answers,Core Java interview questions and answer">
<?php
 }
?>
<META content="Rajesh Kumar" name="author">
<META http-equiv="expires" content="0">
<META content="r4r.co.in" name="owner">
		<META http-equiv=content-type content="text/html; charset=iso-8859-1">
		<META http-equiv="Content-Language" content="en-us">
		   <link href="/images/logo.gif" type="image/gif" rel="SHORTCUT ICON">
        <link href="/css/main.css" rel="stylesheet" type="text/css" />
	</HEAD>

	<BODY>

<script src="/js/jquery 1.6.4.js" type="text/javascript"></script>

<script type="text/javascript">
$(document).ready(function() {
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
	if(jQuery.browser.mobile)
	{
		$('#right_menu').remove();
		$('#left_menu').remove();
		$('#extra_menu').remove();
		//alert('mobile');
		$('.header').append('<link rel="stylesheet" href="/css/main_mobile.css" type="text/css" />');
		var pTags = $( "td" );
	 if ( pTags.parent().is( "div" ) ) {
		pTags.unwrap();
	 } else {
		pTags.wrap( "<div></div>");
	 }
	 $('#add').remove();
	 $('#training').remove();

	}

});
</script>

<style>#training{
	background: #498AF3 none repeat scroll 0% 0%;
position: absolute;
bottom: 0px;
right: 35%;
z-index: 990;
cursor: pointer;
text-align: right;
padding: 10px 10px;
color: #FFF;
font-size: large;
top: 15px;
height: 21px;
}</style>

<script type="text/javascript">$(document).ready(function() {$(document).scroll(function() {	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;if (scrollTop > 250){$('#top_button').fadeIn();}else{$('#top_button').fadeOut();	}});$('#top_button').click(function() {	document.documentElement.scrollTop=0;document.body.scrollTop=0;$('#top_button').fadeOut();});});</script>
<a id="top_button" style="position: fixed;bottom: 75px;right: 3%;z-index: 990;-webkit-border-radius: 5px; display:none;-moz-border-radius: 5px; cursor:pointer;"><img src="/images/top_arrow.png" /></a>

<link href="/css/menu.css" rel="stylesheet" type="text/css" />

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<div class="header">
<table cellpadding="0" cellspacing="0">
<tr>
<td style="width:20%;">
	<a href="/" ><div class="logo"><table><tr><td>
    <font style="color:#FFF; font-size:50px; margin-left:20px;"><font style="color:#0EC3F7;">r</font>4r</font>
    </td><td valign="middle">Right place for Right person    </td></tr></table>
    </div></a>
</td>
<td style="width:80%; text-align:right;">

	<ul class="extra_menu">

    	<li> <a href="http://forums.r4r.co.in/">Forum</a></li>
    	<li> <a href="/profile/feedback.shtml">Feedback</a></li>
        <li> <a href="#">Login/Register</a></li>
        <li> <a href="/ask/">Ask query</a></li>
         <li><a href="/openchat/">Chat</a></li>
    </ul>
</td>
</tr>
<style>
#ddmenu ul li
{
	padding: 0px 10px 0px 10px;
}
#ddmenu ul li span.top-heading a
{
	display:block;	
	text-decoration:none;
}
#ddmenu ul li:hover
{
	background:red;
	padding: 0px 10px 0px 10px;
}
</style>
<tr>
<td style="width:100%;" colspan="2">
    <nav id="ddmenu">
    <div class="menu-icon"></div>
    <ul style="text-align:center; ">
    	<li><span class="top-heading"><a href="/c/">C</a></span></li>
        <li><span class="top-heading"><a href="/java/">Java</a></span></li>
        <li><span class="top-heading"><a href="/java/spring/">Spring</a></span></li>
        <li><span class="top-heading"><a href="/java/hibernate/">Hibernate</a></span></li>
        <li><span class="top-heading"><a href="/java/struts/">Struts</a></span></li>
        <li><span class="top-heading"><a href="/c1/">C# .Net</a></span></li>
        <li><span class="top-heading"><a href="/asp.net/">ASP.Net</a></span></li>
        <li><span class="top-heading"><a href="/wcf/">WCF</a></span></li>
        <li><span class="top-heading"><a href="/java/android/">Android</a></span></li>
        <li><span class="top-heading"><a href="/sql/">MS-SQL</a></span></li>
        <li><span class="top-heading"><a href="/webtechnology/">WEB Technology</a></span></li>
         <li><span class="top-heading"><a href="/php/">PHP</a></span></li>
          <li><span class="top-heading"><a href="/onlineexams/">onlineexams</a></span></li>
    </ul>
</nav>
</td>
</tr>
</table>
</div>

    <div class="page_wrapper" style=" padding-top:10px;" >
        <table cellpadding="3">
        	<tr>
            <td style="width:90%;" valign="top"><h1>R4R Videos</h1>

            	<table>
                    <tr>
                        <td style="width:30%" valign="top">
<div id="left_menu" >
<div>R4R Vidios</div>

<?php
$resultm=mysqli_query($conn,"SELECT DISTINCT  categoryname FROM videos where status=1");
 while($rowm=$resultm->fetch_array()){?>
	<p><a href="?categoryname=<?php echo $rowm['categoryname'];?>"><?php echo $rowm['categoryname'];?></a></p>

	  <?php }?>
  </div>

