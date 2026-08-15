
function openChat(){
document.location.href="/openchat/";
	//myWindow=window.open('/openchat/','career','scrollbars=yes,width=800,height=600')
//myWindow.document.write("<a href='/public-shtml/MCA%206%20Months%20training%20Permanent%20Job%286%20months%20two%20way%20bonds.%29.shtml'>MCA 6 Months training+ Permanent Job</a>");
//myWindow.focus()

}
	
function career(){
	//myWindow=window.open('/public-shtml/MCA%206%20Months%20training%20Permanent%20Job%286%20months%20two%20way%20bonds.%29.shtml','career','scrollbars=yes,width=800,height=600')
//myWindow.document.write("<a href='/public-shtml/MCA%206%20Months%20training%20Permanent%20Job%286%20months%20two%20way%20bonds.%29.shtml'>MCA 6 Months training+ Permanent Job</a>");
//myWindow.focus()

}


	
function askQuestion(){
	document.location.href="/ask/";

//myWindow.focus();
	
	
//document.location.href="/answer.php";

}
	
function placementPaper(){
	
		document.location.href="/faq/";
		//myWindow=window.open('','','width=400,height=200')
//myWindow.document.write("<h2>Coming Soon</h2>");

//myWindow.focus()
}
	
function interviewQns(){
	
		document.location.href="/faq/index1.shtml";
		//myWindow=window.open('','','width=400,height=200')
//myWindow.document.write("<h2>Coming Soon</h2>");

//myWindow.focus()
}
	
function miniProjects(){
		myWindow=window.open('','','width=400,height=200')
myWindow.document.write("<h2>Coming Soon</h2>");

myWindow.focus()
}
	
function aptitudePaper(){
	document.location.href="/faq/";
		//myWindow=window.open('','','width=400,height=200')
//myWindow.document.write("<h2>Coming Soon</h2>");

//myWindow.focus()
}
	
function hrQANS(){
	
	document.location.href="/hr/";
		//myWindow=window.open('','','width=400,height=200')
//myWindow.document.write("<h2>Coming Soon</h2>");

//myWindow.focus()
}
function contactUS(){
		myWindow=window.open('','','width=400,height=200')
		
	myWindow.document.write("<h2>Contact Us</h2><br><br>");
	  myWindow.document.write("<table border='1' cellpadding='0' cellspacing='0' style='border-collapse: collapse' bordercolor='#111111' width='100%' id='AutoNumber1'>");
        myWindow.document.write("<tr>");
        myWindow.document.write("<td>Looking for finance partner (minimum investment 50 Lakhs)<br><br><br><b>Vision :</b> Provide information till end of world. <br><br></td></tr><tr>");



      //   myWindow.document.write("<a href='mailto:rituraj.tyagi@gmail.com'><font color='#000000'>r</font><font class='sbr'><font color='#000000'>ituraj.tyagi@gmail.com</font></font></a><br>");
          myWindow.document.write("<font class='sbr'>&nbsp;</font><font size='3' face='Arial'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </font></td>");
          myWindow.document.write("<td>");
          myWindow.document.write("<p dir='ltr'>Mr. Rajesh Kumar<br>");
          myWindow.document.write("<a href='mailto:rajeshpatel04@gmail.com'><font color='#000000'>");
          myWindow.document.write("rajeshpatel04@gmail.com</font></a><br>");
          myWindow.document.write("Mobile: +91-9871985511</td>");
        myWindow.document.write("</tr>");
  myWindow.document.write("</table>");



myWindow.focus()
}

function postComments(){
	document.location.href="/comments/comments.php";
	//	myWindow=window.open('/comments/comments.php','','width=800,height=828')	

myWindow.focus()
}
function readComments(){
	document.location.href="/comments/";
		// myWindow=window.open('/comments','','width=800,height=828')


myWindow.focus()
}



startList = function() {
if (document.all&&document.getElementById) {
cssdropdownRoot = document.getElementById("cssdropdown");
for (x=0; x<cssdropdownRoot.childNodes.length; x++) {
node = cssdropdownRoot.childNodes[x];
if (node.nodeName=="LI") {
node.onmouseover=function() {
this.className+=" over";
}
node.onmouseout=function() {
this.className=this.className.replace(" over", "");
}
}
}
}
}

if (window.attachEvent)
window.attachEvent("onload", startList)
else
window.onload=startList;

//--><!]]></script>

<script type="text/javascript">

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
return null;
}
var user=getCookie("user");
  if (user==null)
  {
//myWindow=window.open('/public-shtml/MCA%206%20Months%20training%20Permanent%20Job%286%20months%20two%20way%20bonds.%29.shtml','career','scrollbars=yes,width=800,height=500')
  setCookie("user","true",1); 
 }
  


function displayCode(){
myWindow=window.open('','hhhh','width=400,height=200')
myWindow.document.write("<h2>Copy & Past Following Source Code</h2>");

myWindow.document.write("<table border='1'><tr><td>&lt;a href='"+document.location.href+"'&gt;Enter Text Here&lt;a&gt;</td></tr></table>"); 
myWindow.document.write("<h6>You are not allowed to copy  and publish any data form website .<br>You can add above code on your website or blogs.</h6>");
myWindow.focus()
}
