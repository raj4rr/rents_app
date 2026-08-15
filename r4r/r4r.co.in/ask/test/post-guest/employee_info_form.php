<script type="text/javascript">
function seller_form_valid()
	{
		var validate = true;var tb=new Array();
       tb[0] = document.getElementById("employee_name");
	    tb[1] = document.getElementById("employee_contact");
		 tb[2] = document.getElementById("login_username");
		  tb[3] = document.getElementById("loginpassword");
		   tb[4] = document.getElementById("address_optional");
		   tb[5] = document.getElementById("address_permanent");
        for (var i = 0; i < tb.length; i++) {
            if (tb[i].type == "text" || tb[i].type == "password" || tb[i].type == "textarea") {
                var txtValue = tb[i].value.trim();
                if (txtValue =="") {
                    tb[i].style.borderColor="Red";
                    validate = false;
                }
            }
        }
		return validate;
	}

	function remove_seller_form_valid(id_valid)
	{
		$('#'+id_valid).css('border-color', '#9F9F9F');
	}
	function is_number_key(evt,wrong)
      {
		 $('#'+wrong).css('background-color','white');
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
          {   $('#'+wrong).css('background-color','#FFA042');
				return false;
		}
         return true;
      }
</script>
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

if(isset($_SESSION['employee_id']))
{
	$employee_info_sql=mysql_query("SELECT * from employee_information where employee_id='$_SESSION['employee_id']'");
	$rs_info_sql=mysql_fetch_array($employee_info_sql);
?>  
<h1>Employee Information</h1>
  <div class="tableContent" style="border:none;">

			<table width="100%" cellspacing="1" cellpadding="7">

					<form action="employee_info_form_insert.php" method="post" onSubmit="return seller_form_valid();" name="seller_info">
					<tr>
						<td width="50%"><p>Name*:</p>
						<input class="input" type='text' name='employee_name' id='employee_name'  maxlength="40" style="text-transform:capitalize; width:250px;"/>
						</td>
                        <td width="50%"><p>Contact*:</p>
				<input class="input" type='text' name='employee_contact' id='employee_contact'  maxlength="10" style="width:250px;" onFocus="remove_seller_form_valid(this.id);" onKeyPress="return is_number_key(event,this.id);"/>
						</td>
					</tr>

                    <tr>
						<td width="50%"><p>User name*:</p>
						<input class="input" type='text' name='login_username' id='login_username' value="<?php if(isset($rs_info_sql['login_user_name'])) echo $rs_info_sql['login_user_name']; ?>"  maxlength="40" style="width:250px;" onFocus="remove_seller_form_valid(this.id);"/>
						</td>
                        <td width="50%"><p>Password*:</p>
				<input class="input" type="password" name='loginpassword' id='loginpassword' maxlength="20" style="text-transform:capitalize; width:250px;" onFocus="remove_seller_form_valid(this.id);"/>
						</td>
					</tr>

                    <tr>
                        <td width="50%"><p>Address permanent*:</p>
                        <textarea name='address_permanent' id='address_permanent' style=" height:100px; width:250px;max-width:250px; max-height:100px;" class="input" onFocus="remove_seller_form_valid(this.id);"></textarea>
						</td>
                        <td width="50%"><p>Address (Optional)*:</p>
                        <textarea name='address_optional' id='address_optional' style=" height:100px; width:250px;max-width:250px; max-height:100px;" class="input" onFocus="remove_seller_form_valid(this.id);"></textarea>
						</td>
					</tr>
                    <tr>
                    <td width="100%" colspan="2">
                <input type="submit" value="Save"/>
                      </td>
                    </tr>
                    </form>
			</table>	
		</div>	

<?php }
else
{
				$url_se=$_SERVER['HTTP_REFERER'];
				header("Location:$url_se");
}?>
