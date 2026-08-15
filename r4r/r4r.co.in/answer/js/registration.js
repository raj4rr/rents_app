function validregistration()
{
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var valide_mail = document.getElementById('reg_email').value;
	if (document.getElementById('reg_name').value == "") {
		document.getElementById("name_blank").style.color="Red";
        document.getElementById("name_blank").style.display="block";
        return false;
    }
    else if (document.getElementById('reg_email').value == "") {
		document.getElementById("formailblank_valid").style.color="Red";
        document.getElementById("formailblank_valid").style.display="block";
        document.getElementById('reg_email').focus();
        return (false);
    }
    else if (reg.test(valide_mail) == false) {
        document.getElementById("formailblank_valid").style.color="Red";
        document.getElementById("formailblank_valid").style.display="block";
		document.getElementById('reg_email').value = "";
		document.getElementById('reg_email').focus();
        return false;
    }
	else if (document.getElementById('reg_password').value == "") {
		document.getElementById("password_blank").style.color="Red";
        document.getElementById("password_blank").style.display="block";
        return false;
    }
	
	
}
function is_Number_Key(evt)
      {
			document.getElementById("phoneno_blank").style.color="white";
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
          {   document.getElementById("phoneno_blank").style.color="red";
				return false;
			}
         return true;
      }

function removevalidregistration() 
{
    document.getElementById("name_blank").style.display="none";
	document.getElementById("formailblank_valid").style.display="none";
	document.getElementById("password_blank").style.display="none";
	document.getElementById("phone_blank").style.display="none";
	document.getElementById("formailblankvalid").style.display="none";
	document.getElementById("passwordblank").style.display="none";
	document.getElementById("loginerror").style.display="none";
	document.getElementById("error_Login").style.display="none";
	return true;
}
function login_va() 
		{
			
				window.location.reload();
			
		}
function validlogin() 
{
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var validemail = document.getElementById('loginusername').value;
    if (document.getElementById('loginusername').value == "") {
		document.getElementById("formailblankvalid").style.color="Red";
        document.getElementById("formailblankvalid").style.display="block";
        document.getElementById('loginusername').focus();
        return (false);
    }
    else if (reg.test(validemail) == false) {
        document.getElementById("formailblankvalid").style.color="Red";
        document.getElementById("formailblankvalid").style.display="block";
		document.getElementById('loginusername').value = "";
		document.getElementById('loginusername').focus();
        return false;
    }
    else if (document.getElementById('loginpassword').value == "") {
		document.getElementById("passwordblank").style.color="Red";
        document.getElementById("passwordblank").style.display="block";
        return false;
    }
}
function removevalidlogin() 
{
	document.getElementById("name_blank").style.display="none";
	document.getElementById("formailblank_valid").style.display="none";
	document.getElementById("password_blank").style.display="none";
	document.getElementById("formailblankvalid").style.display="none";
	document.getElementById("passwordblank").style.display="none";
	document.getElementById("loginerror").style.display="none";
	document.getElementById("error_Login").style.display="none";
	return false;
}
function validforgotpassword() 
{
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var forgotvalidemail = document.getElementById('forgot_loginusername').value;
    if (document.getElementById('forgot_loginusername').value == "") {
		document.getElementById("forforgotpassword").style.color="Red";
        document.getElementById("forforgotpassword").style.display="block";
        document.getElementById('forgot_loginusername').focus();
        return false;
    }
    else if (reg.test(forgotvalidemail) == false) {
        document.getElementById("forforgotpassword").style.color="Red";
        document.getElementById("forforgotpassword").style.display="block";
		document.getElementById('forgot_loginusername').value = "";
		document.getElementById('forgot_loginusername').focus();
        return false;
    }
}
function removeforgotpassword() 
{
	document.getElementById("forforgotpassword").style.display="none";
	return true;
}