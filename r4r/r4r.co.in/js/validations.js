
function  checkAuthorized()
{
if(checkNotNullFields()==true){
var a=document.f1.a.value;
var b=document.f1.b.value;
var sum=document.f1.sum.value;
if(sum!=a+b)alert("Wrong SuM Try Again.........");
else document.f1.submit();
}
}

function  checkNotNullFields(){

{
if (document.f1.username.value == "")
{
alert("Please enter a value for the \" Your Name\" field.");
document.f1.username.focus();
return false;
}
if (document.f1.question.value == "")
{
alert("Please enter a value for the \"ASK Question or POST Articles\" field.");
document.f1.question.focus();
return false;
}
if (document.f1.sum.value == "")
{
alert("Please enter a value for the \"SUM\" field.");
document.f1.sum.focus();
return false;
}
return true;
}
}
