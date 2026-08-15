<center>
<form method="post" action="/images/sendeail.php">

<!-- DO NOT change ANY of the php sections -->
<?php
$ipi = getenv("REMOTE_ADDR");
$httprefi = getenv ("HTTP_REFERER");
$httpagenti = getenv ("HTTP_USER_AGENT");
?>

<input type="hidden" name="ip" value="<?php echo $ipi ?>" />
<input type="hidden" name="httpref" value="<?php echo $httprefi ?>" />
<input type="hidden" name="httpagent" value="<?php echo $httpagenti ?>" />
<table width="194" border="1">
  <tr>
    <td width="86"><div align="left"><span class="style1">Your Name:</span></div></td>
    <td width="115"><div align="left">
      <input type="text" name="visitor" size="14" />
    </div></td>
  </tr>
  <tr>
    <td><div align="left"><span class="style1">Your Email:</span></div></td>
    <td><div align="left">
      <input type="text" name="visitormail" size="14" />
    </div></td>
  </tr>
  <tr>
    <td class="style2"><div align="left"><strong>Mail Message</strong>: </div></td>
    <td><div align="left">
      <textarea name="notes" rows="4" cols="14"></textarea>
    </div></td>
  </tr>
  <tr>
    <td colspan="2"> <input name="submit" type="submit" value="Send Mail" /></td>
    </tr>
</table>
<br />
<br />
<br />
<br /> 
<br />
<br />
<br />
<br />
<br />
<br />
</form>
</center>

