<html>

<head>
<title>Source Code Insert Form </title>

<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
  require_once dirname(__FILE__) . '/../config/site_config.php';
 require_once $CONFIG['CORE_PATH'] . "../db/sdbconnection.php";

$id=$_GET["id"];
$option=$_GET["option"];
if (!$sconnection)
  {
  die('Could not connect: ' . mysql_error());
  }

 $rs = mysql_query("SELECT  *  FROM `sourcecode` WHERE  id='$id' ") or die("State query error!");
 while(list($id,$title,$keywords,$descriptions,$introduction,$classdescription,$methoddescription,$sourcecodedescription,$sourcecode,$output,$file,$language,$username,$date,$hide) = mysql_fetch_row($rs))
{

?>

    <SCRIPT language=JavaScript src="../js/wysiwyg.js" type=text/javascript></SCRIPT>
    <LINK href=".../styles/style.css" type=text/css rel=stylesheet>
    <script type="text/javascript" src="../ide/scripts/jquery-1.3.2.min.js"></script>
    <script type="text/javascript" src="../ide/scripts/jquery-ui-1.7.2.custom.min.js"></script>
    <link rel="Stylesheet" type="text/css" href="../ide/style/jqueryui/ui-lightness/jquery-ui-1.7.2.custom.css">
    <script type="text/javascript" src="../ide/scripts/jHtmlArea-0.7.0.js"></script>
    <link rel="Stylesheet" type="text/css" href="../ide/style/jHtmlArea.css">
    <script type="text/javascript" src="../ide/scripts/jHtmlArea.ColorPickerMenu-0.7.0.js"></script>
    <link rel="Stylesheet" type="text/css" href="../ide/style/jHtmlArea.ColorPickerMenu.css" />

</script>
</head>

<body>

<form method="POST" name="SForm" action="Update_Source_Code.php">
<input type="hidden" name="id" value="<?php echo htmlspecialchars($id); ?>">
  <p align="center">Update Source Code</p>
  <p align="center"><b><font size="5">Source Code Update Form </font></b></p>
  <table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="100%" id="AutoNumber1">
    <tr>
      <td width="25%">Title<font color="#FF0000">*</font></td>
      <td width="75%">
  <input type="text" name="title" size="50" tabindex="1" value="<?php echo htmlspecialchars($title); ?>"></td>
    </tr>
    <tr>
      <td width="25%">Meta Data Keywords<font color="#FF0000">*</font></td>
      <td width="75%">
  <input type="text" name="keywords" size="50" tabindex="2" value="<?php echo htmlspecialchars($keywords); ?>"></td>
    </tr>
    <tr>
      <td width="25%">Meta Data Descriptions<font color="#FF0000">*</font></td>
      <td width="75%">
  <input type="text" name="descriptions" size="50" tabindex="3" value="<?php echo htmlspecialchars($descriptions); ?>"></td>
    </tr>
    <tr>
      <td width="25%">Introduction<font color="#FF0000">*</font></td>
      <td width="75%">
  <textarea rows="3" name="introduction" id="introduction" cols="69" tabindex="4"><?php echo htmlspecialchars($introduction); ?></textarea>
   <SCRIPT language=JavaScript>generate_wysiwyg('introduction')</SCRIPT>

  </td>
    </tr>
    <tr>
      <td width="25%">Class/Library File&nbsp; Descriptions<font color="#FF0000">*</font></td>
      <td width="75%">
  <textarea rows="5" name="classdescription" id="classdescription" cols="69" tabindex="5"><?php echo htmlspecialchars($classdescription); ?></textarea>

   <SCRIPT language=JavaScript>generate_wysiwyg('classdescription')</SCRIPT>
  </td>
    </tr>
    <tr>
      <td width="25%">Method Descriptions<font color="#FF0000">*</font></td>
      <td width="75%">
  <textarea rows="10" name="methoddescription" id="methoddescription" cols="69" tabindex="6"><?php echo htmlspecialchars($methoddescription); ?></textarea>

   <SCRIPT language=JavaScript>generate_wysiwyg('methoddescription')</SCRIPT>
  </td>
    </tr>
    <tr>
      <td width="25%">Source Code Descriptions <font color="#FF0000">*</font></td>
      <td width="75%">
  <textarea rows="10" name="sourcecodedescription" id="sourcecodedescription"  cols="69" tabindex="7"><?php echo htmlspecialchars($sourcecodedescription); ?></textarea>

   <SCRIPT language=JavaScript>generate_wysiwyg('sourcecodedescription')</SCRIPT>
  </td>
    </tr>
    <tr>
     <TD width="25%">Source Code<FONT color=#ff0000>*</FONT>
  <!--  
        <input id="choosecolor" type="button" value="Choose Color..." />
    <script type="text/javascript">
        $(function() {
            $("#choosecolor").click(function() {
                jHtmlAreaColorPickerMenu(this, {
                    colorChosen: function(color) {
                        $(document.body).css('background-color', color);
                    }
                });
            });
        });
    </script>

-->
   <script type="text/javascript">
       $.ui.dialog.defaults.bgiframe = true;
       $(function() {
             $("#dialogShowButton").click(function() {
               $("#dialog").dialog({width: 420});
               $("#dialogEditor").htmlarea({
                toolbar: ["html", "|",
                            "forecolor",  // <-- Add the "forecolor" Toolbar Button
                            "|", "bold", "italic", "underline", "|", "p", "h1", "h2", "h3", "|", "link", "unlink"] // Overrides/Specifies the Toolbar buttons to show
            });
        });
	})

	</script>

<input id="dialogShowButton" value="Show Editor" type="button">

 <div aria-labelledby="ui-dialog-title-dialog" role="dialog" tabindex="-1" class="ui-dialog ui-widget ui-widget-content ui-corner-all  ui-draggable ui-resizable" style="display: none; position: absolute; overflow: hidden; z-index: 1004; outline: 0px none; height: auto; width: 420px; top: 427.5px; left: 460px;"><div style="-moz-user-select: none;" unselectable="on" class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span style="-moz-user-select: none;" unselectable="on" id="ui-dialog-title-dialog" class="ui-dialog-title">Basic dialog</span>
 <a style="-moz-user-select: none;" unselectable="on" role="button" class="ui-dialog-titlebar-close ui-corner-all" href="#">
 <span style="-moz-user-select: none;" unselectable="on" class="ui-icon ui-icon-closethick">close</span></a>
 </div>
 <div class="ui-dialog-content ui-widget-content" id="dialog" style="height: auto; min-height: 88px; width: auto;">

  <div class="ui-dialog-content ui-widget-content" id="dialog" style="height: auto; min-height: 88px; width: auto;">

	    <textarea id="dialogEditor" rows="10" style="width: 400px; display: none;"></textarea></div>
    </div>
    </div>

    </TD>
  <td width="75%" >
      <textarea rows="20" name="sourcecode" id="sourcecode" cols="69" tabindex="8"><?php echo htmlspecialchars($sourcecode); ?></textarea>
       <SCRIPT language=JavaScript>generate_wysiwyg('sourcecode')</SCRIPT>
      </td>
    </tr>
       <tr>
      <td width="25%" >
      Output</td>
  <td width="75%" >
      <textarea rows="5" name="output" id="output" cols="69" tabindex="9"><?php echo htmlspecialchars($output); ?></textarea>
       <SCRIPT language=JavaScript>generate_wysiwyg('output')</SCRIPT>
      </td>
    </tr>

    <tr>
      <td width="25%" >
      <p align="left">
  Source Code Keyword<font color="#FF0000">*</font></td>
  <td width="75%" >
      <p align="left">
  <input type="text" name="language" size="50" tabindex="12" value="<?php echo htmlspecialchars($language); ?>"></td>
    </tr>
    <tr>
      <td width="25%" >
      User Name<font color="#FF0000">*</font></td>
        <td width="75%" >
      <input type="text" name="username" size="50" tabindex="13" value="<?php echo htmlspecialchars($username); ?>"></td>
    </tr>
    <tr>
      <td width="100%" colspan="2">
      <p align="center">
  <input type="submit" value="Update"   name="save" tabindex="14">
  <input type="reset" value="Reset" name="reset" tabindex="15">
  </td>
    </tr>
  </table>
</form>

 <?php
	}
mysql_close($sconnection);
?>

</body>

</html>
