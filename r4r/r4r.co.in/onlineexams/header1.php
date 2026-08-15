<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
}
-->
</style>

<style>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    height:100%;
}

li {
	text-align: left;
	height:100%;
}

li a {
    display: inline-block;
    color: white;
    text-align: left;
    padding: 14px 16px;
    text-decoration: none;

}

li a:hover {
	width:100%;
    background-color: red;
}

.active {
	width:100%;
    background-color: red;
}</style>
<table border="0" width="100%" cellspacing="0" cellpadding="0" background="images/header.png">
  <tr>
    <td width="90%" valign="top">

<div align="left"></div></td>
    <td width="10%">
     <img border="0" src="image/brought1.jpg" width="203" height="68" align="right"></td>
  </tr>
</table>
<table border="0" width="100%" cellspacing="0" cellpadding="0" bgcolor="#000000" background="img/blackbar.jpg">
  <tr>
    <td width="100%" align="right"><img border="0" src="image/blackbar.jpg" width="89" height="15"></td>
  </tr>
  </Table>
  <Table width="100%">
  <tr>
  <td>
  <?php @$_SESSION['login'];
  error_reporting(1);
  ?>
  </td>
    <td>

	<?php
	if(isset($_SESSION['login']))
	{
	// echo "<div align=\"right\"><strong><a href=\"signout.php\">Signout</a></strong></div>";
	 }
	 else
	 {
	 	echo "&nbsp;";
	 }
	?>
	</td>

  </tr>

</table>
