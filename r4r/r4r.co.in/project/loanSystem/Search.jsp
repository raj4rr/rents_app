<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%
 ses=(String)session.getAttribute("UserName");
if(ses!=null)
{ %><html>

<head>
<title>Search Show Report</title>
</head>

<body>
<Script Language="JavaScript">
function Validate()
{
if(document.SearchDeleteReport.Branchnumber.value=="" )
{
alert("Branch Number Must Be Enter");
return;
}
if(document.SearchDeleteReport.Branchnumber.value.length<=5 )
{
alert("Branch number Must Be Greater Than 5!!");
return;
}
document.SearchDeleteReport.action="ShowReport.jsp";
document.SearchDeleteReport.submit();

}</Script>

<center>
<font color="#800080" face="Copperplate Gothic Light"><b>  
     <font size="6">Search </font></b><font size="6"><b>Show Report</b></font></font>
     <div align=left><a href="Admin.jsp">Home</a></div>
     <div align=right><a href="Logout.jsp">Logout</a></div>&nbsp;</p>
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
    </table>
  <p>&nbsp;<input type="button" value="Search" onclick="Validate();"name="B1" tabindex="3"><input type="reset" value="Cancel" name="B2" tabindex="4"></p>
</form>
</center>
</body>

</html>
<% 
}
else
{
response.sendRedirect("Unauthorised.htm");
} 
%>