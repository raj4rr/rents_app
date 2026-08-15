<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%
 ses=(String)session.getAttribute("UserName");
if(ses!=null)
{
%>
<html>

<head>
<title>Search Modify</title>
</head>

<body>
<Script Language="JavaScript">
function Validate()
{
if(document.SearchDeleteReport.Branchnumber.value==""&& document.SearchDeleteReport.Computernumber.value=="")
{
alert("Branch Number OR Computer Number Must Be Enter");
return;
}
if(document.SearchDeleteReport.Branchnumber.value.length<=5 && document.SearchDeleteReport.Computernumber.value.length<=5)
{
alert("Branch number OR Computer Number Must Be Greater Than 5!!");
return;
}
document.SearchDeleteReport.action="Modify.jsp";
document.SearchDeleteReport.submit();

}</Script>

<center><font color="#8C4600"><b>
  
     <font size="6">Search </font></b><font size="6"><b>Modify</b></font></font><p>&nbsp;</p>
<form Name="SearchDeleteReport">

  
</b></p>
  <table border="2" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#0000FF" width="52%">
    <tr>
      <td width="50%"><font size="4">By Branch Loan 
      Account Number</font><font size="4" color="#FF0000">* </font></td>
      <td width="50%"><b>
      <font color="#FF0000" size="4">
      <input type="text" name="Branchnumber" size="20" tabindex="1"></font></b></td>
    </tr>
    <tr>
      <td width="100%" colspan="2">
      <p align="center"><b><font size="5">or</font></b></td>
    </tr>
    <tr>
      <td width="50%">
      <font size="4">By<font color="#FF0000"> </font>Computer Loan Account 
      Number</font><font size="4" color="#FF0000">*</font></td>
      <td width="50%">
      <input type="text" name="Computernumber" size="20" tabindex="2"></td>
    </tr>
  </table>
  <p><b>
  <font color="#FF0000" size="4">&nbsp; </font>
</b>&nbsp;<input type="button" value="Search" onclick="Validate();"name="B1" tabindex="3"><input type="reset" value="Cancel" name="B2" tabindex="4"></p>
</form>
</center>
</body>

</html>
 <% } 
else
{
response.sendRedirect("Unauthorised.htm");
} %>