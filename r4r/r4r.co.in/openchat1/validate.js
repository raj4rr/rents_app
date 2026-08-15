

function loginValidation(){


if(document.frm.userName.value=="")
{
	alert("User Name Can Not be Blank.");
        return document.frm.userName.focus;
	
}
if(document.frm.userName.value.indexOf(" ")==0)
{
	alert("User Name Can Not be Blank.");
        return document.frm.userName.focus;
	
}
if(document.frm.password.value=="")
{
	alert("Password Can Not be Blank.");
        return document.frm.password.focus;
	
}
if(document.frm.password.value.indexOf(" ")==0)
{
	alert("Password Can Not be Blank.");
        return document.frm.password.focus;
	
}
document.frm.action="login.php";
document.frm.submit();
}


function profileValidation(){
if(document.profile.userID.value=="")
{
	alert("User ID Can Not be Blank.");
        return document.profile.userID.focus;
	
}
if(document.profile.userID.value.indexOf(" ")==0)
{
	alert("User ID Can Not be Blank.");
        return document.profile.userID.focus;
	
}

if(document.profile.userName.value=="")
{
	alert("User Name Can Not be Blank.");
        return document.profile.userName.focus;
	
}
if(document.profile.userName.value.indexOf(" ")==0)
{
	alert("User Name Can Not be Blank.");
        return document.profile.userName.focus;
	
}
if(document.profile.password.value=="")
{
	alert("Password Can Not be Blank.");
        return document.profile.password.focus;
	
}
if(document.profile.password.value.indexOf(" ")==0)
{
	alert("Password Can Not be Blank.");
        return document.profile.password.focus;
	
}
if(document.profile.confirmPassword.value=="")
{
	alert("Confirm Password Can Not be Blank.");
        return document.profile.confirmPassword.focus;
	
}
if(document.profile.confirmPassword.value.indexOf(" ")==0)
{
	alert("Confirm Password Can Not be Blank.");
        return document.profile.confirmPassword.focus;
	
}
if(document.profile.confirmPassword.value!=document.profile.password.value)
{
	alert("Password don't match.Try again....");
        return document.profile.password.focus;
	
}
if(document.profile.fatherName.value=="")
{
	alert("Father Name Can Not be Blank.");
        return document.profile.fatherName.focus;
	
}
if(document.profile.fatherName.value.indexOf(" ")==0)
{
	alert("Father Name Can Not be Blank.");
        return document.profile.fatherName.focus;
	
}
if(document.profile.emailID.value=="")
{
	alert("Email ID Can Not be Blank.");
        return document.profile.emailID.focus;
	
}
if(document.profile.emailID.value.indexOf(" ")==0)
{
	alert("Email ID Can Not be Blank.");
        return document.profile.emailID.focus;
	
}
if(document.profile.emailID.value.indexOf("@")==-1||document.profile.emailID.value.indexOf(".")==-1||document.profile.emailID.value.length<6||document.profile.emailID.value.indexOf(".")==(document.profile.emailID.value.indexOf("@")+1))
{
	alert("Email ID is not valid.");
        return document.profile.emailID.focus;
	
}
if(document.profile.currentLocation.value=="")
{
	alert("Current Location Can Not be Blank.");
        return document.profile.currentLocation.focus;
	
}
if(document.profile.currentLocation.value.indexOf(" ")==0)
{
	alert("Current Location Can Not be Blank.");
        return document.profile.currentLocation.focus;
	
}
if(document.profile.homeTown.value=="")
{
	alert("Home Town Can Not be Blank.");
        return document.profile.homeTown.focus;
	
}
if(document.profile.homeTown.value.indexOf(" ")==0)
{
	alert("Home Town Can Not be Blank.");
        return document.profile.homeTown.focus;
	
}
if(document.profile.currentCompany.value=="")
{
	alert("Current Company Can Not be Blank.");
        return document.profile.currentCompany.focus;
	
}
if(document.profile.currentCompany.value.indexOf(" ")==0)
{
	alert("Current Company Can Not be Blank.");
        return document.profile.currentCompany.focus;
	
}
if(document.profile.designation.value=="")
{
	alert("Designation Can Not be Blank.");
        return document.profile.designation.focus;
	
}
if(document.profile.designation.value.indexOf(" ")==0)
{
	alert("Designation Can Not be Blank.");
        return document.profile.designation.focus;
	
}
if(document.profile.currentTechnology.value=="")
{
	alert("Current Technology Can Not be Blank.");
        return document.profile.currentTechnology.focus;
	
}
if(document.profile.currentTechnology.value.indexOf(" ")==0)
{
	alert("Current Technology Can Not be Blank.");
        return document.profile.currentTechnology.focus;
	
}if(document.profile.contactNumber.value=="")
{
	alert("Contact Number Can Not be Blank.");
        return document.profile.contactNumber.focus;
	
}
if(document.profile.contactNumber.value.indexOf(" ")==0)
{
	alert("Contact Number Can Not be Blank.");
        return document.profile.contactNumber.focus;
	
}
document.profile.action="profile.php";
document.profile.submit();
}
function updateValidation(){
if(document.update.userID.value=="")
{
	alert("User ID Can Not be Blank.");
        return document.update.userID.focus;
	
}
if(document.update.userID.value.indexOf(" ")==0)
{
	alert("User ID Can Not be Blank.");
        return document.update.userID.focus;
	
}

if(document.update.userName.value=="")
{
	alert("User Name Can Not be Blank.");
        return document.update.userName.focus;
	
}
if(document.update.userName.value.indexOf(" ")==0)
{
	alert("User Name Can Not be Blank.");
        return document.update.userName.focus;
	
}
if(document.update.password.value=="")
{
	alert("Password Can Not be Blank.");
        return document.update.password.focus;
	
}
if(document.update.password.value.indexOf(" ")==0)
{
	alert("Password Can Not be Blank.");
        return document.update.password.focus;
	
}
if(document.update.confirmPassword.value=="")
{
	alert("Confirm Password Can Not be Blank.");
        return document.update.confirmPassword.focus;
	
}
if(document.update.confirmPassword.value.indexOf(" ")==0)
{
	alert("Confirm Password Can Not be Blank.");
        return document.update.confirmPassword.focus;
	
}
if(document.update.confirmPassword.value!=document.update.password.value)
{
	alert("Password don't match.Try again....");
        return document.update.password.focus;
	
}
if(document.update.fatherName.value=="")
{
	alert("Father Name Can Not be Blank.");
        return document.update.fatherName.focus;
	
}
if(document.update.fatherName.value.indexOf(" ")==0)
{
	alert("Father Name Can Not be Blank.");
        return document.update.fatherName.focus;
	
}
if(document.update.emailID.value=="")
{
	alert("Email ID Can Not be Blank.");
        return document.update.emailID.focus;
	
}
if(document.update.emailID.value.indexOf(" ")==0)
{
	alert("Email ID Can Not be Blank.");
        return document.update.emailID.focus;
	
}
if(document.update.emailID.value.indexOf("@")==-1||document.update.emailID.value.indexOf(".")==-1||document.update.emailID.value.length<6||document.update.emailID.value.indexOf(".")==(document.update.emailID.value.indexOf("@")+1))
{
	alert("Email ID is not valid.");
        return document.update.emailID.focus;
	
}
if(document.update.currentLocation.value=="")
{
	alert("Current Location Can Not be Blank.");
        return document.update.currentLocation.focus;
	
}
if(document.update.currentLocation.value.indexOf(" ")==0)
{
	alert("Current Location Can Not be Blank.");
        return document.update.currentLocation.focus;
	
}
if(document.update.homeTown.value=="")
{
	alert("Home Town Can Not be Blank.");
        return document.update.homeTown.focus;
	
}
if(document.update.homeTown.value.indexOf(" ")==0)
{
	alert("Home Town Can Not be Blank.");
        return document.update.homeTown.focus;
	
}
if(document.update.currentCompany.value=="")
{
	alert("Current Company Can Not be Blank.");
        return document.update.currentCompany.focus;
	
}
if(document.update.currentCompany.value.indexOf(" ")==0)
{
	alert("Current Company Can Not be Blank.");
        return document.update.currentCompany.focus;
	
}
if(document.update.designation.value=="")
{
	alert("Designation Can Not be Blank.");
        return document.update.designation.focus;
	
}
if(document.update.designation.value.indexOf(" ")==0)
{
	alert("Designation Can Not be Blank.");
        return document.update.designation.focus;
	
}
if(document.update.currentTechnology.value=="")
{
	alert("Current Technology Can Not be Blank.");
        return document.update.currentTechnology.focus;
	
}
if(document.update.currentTechnology.value.indexOf(" ")==0)
{
	alert("Current Technology Can Not be Blank.");
        return document.update.currentTechnology.focus;
	
}if(document.update.contactNumber.value=="")
{
	alert("Contact Number Can Not be Blank.");
        return document.update.contactNumber.focus;
	
}
if(document.update.contactNumber.value.indexOf(" ")==0)
{
	alert("Contact Number Can Not be Blank.");
        return document.update.contactNumber.focus;
	
}
document.update.action="update.php";
document.update.submit();
}
function newUserValidation(){
if(document.newUser.userID.value=="")
{
	alert("User ID Can Not be Blank.");
        return document.newUser.userID.focus;
	
}
if(document.newUser.userID.value.indexOf(" ")==0)
{
	alert("User ID Can Not be Blank.");
        return document.newUser.userID.focus;
	
}

if(document.newUser.userName.value=="")
{
	alert("User Name Can Not be Blank.");
        return document.newUser.userName.focus;
	
}
if(document.newUser.userName.value.indexOf(" ")==0)
{
	alert("User Name Can Not be Blank.");
        return document.newUser.userName.focus;
	
}

if(document.newUser.password.value=="")
{
	alert("Password Can Not be Blank.");
        return document.newUser.password.focus;
	
}
if(document.newUser.password.value.indexOf(" ")==0)
{
	alert("Password Can Not be Blank.");
        return document.newUser.password.focus;
	
}
if(document.newUser.confirmPassword.value=="")
{
	alert("Confirm Password Can Not be Blank.");
        return document.newUser.confirmPassword.focus;
	
}
if(document.newUser.confirmPassword.value.indexOf(" ")==0)
{
	alert("Confirm Password Can Not be Blank.");
        return document.newUser.confirmPassword.focus;
	
}
if(document.newUser.confirmPassword.value!=document.newUser.password.value)
{
	alert("Password don't match.Try again....");
        return document.newUser.password.focus;
	
}
if(document.newUser.fatherName.value=="")
{
	alert("Father Name Can Not be Blank.");
        return document.newUser.fatherName.focus;
	
}
if(document.newUser.fatherName.value.indexOf(" ")==0)
{
	alert("Father Name Can Not be Blank.");
        return document.newUser.fatherName.focus;
	
}
if(document.newUser.emailID.value=="")
{
	alert("Email ID Can Not be Blank.");
        return document.newUser.emailID.focus;
	
}

if(document.newUser.emailID.value.indexOf(" ")==0)
{
	alert("Email ID Can Not be Blank.");
        return document.newUser.emailID.focus;
	
}
if(document.newUser.emailID.value.indexOf("@")==-1||document.newUser.emailID.value.indexOf(".")==-1||document.newUser.emailID.value.length<6||document.newUser.emailID.value.indexOf(".")==(document.newUser.emailID.value.indexOf("@")+1))
{
	alert("Email ID is not valid.");
        return document.newUser.emailID.focus;
	
}
if(document.newUser.currentLocation.value=="")
{
	alert("Current Location Can Not be Blank.");
        return document.newUser.currentLocation.focus;
	
}
if(document.newUser.currentLocation.value.indexOf(" ")==0)
{
	alert("Current Location Can Not be Blank.");
        return document.newUser.currentLocation.focus;
	
}

document.newUser.action="newUser.php";
document.newUser.submit();
}



