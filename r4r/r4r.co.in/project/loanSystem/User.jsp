<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%
ses=(String)session.getAttribute("UserName");
if(ses!=null)
{
%>
<html>
<head>
<title>USER LOGIN</title>
</head>
<body><center>
<p><font color="red" size="5" face="Arial">Welcome To User:</font>
<font face="Arial" size="3" color="back"></font></p><b>User Name:</b><i><%=ses %> </i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="Logout.jsp">       LogOut</a><p>
<table border="2" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#0000FF" width="40%">
  <tr>
    <td width="100%" align="center"><b>
<a href="Search.jsp"><font size="5">Show Report</font></a></b></td>
  </tr>
  <tr>
    <td width="100%" align="center">
<p><b>
<a href="InterestCalculator.jsp"><font size="5">Interest Calculator</font></a><font size="5">
</font></b> </p>
    </td>
  </tr>
</table></p></center>
<%
}
else{
response.sendRedirect("Unauthorised.htm");
}
%>
</body>
</html>