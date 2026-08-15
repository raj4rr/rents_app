<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%!String ses=null; %>
<%
 ses=(String)session.getAttribute("UserName");
if(ses!=null)
{%><html>
<head><title>Success</title>
<body>
<center>
<br><br><br>
<b><font size="6" color="#008000">Data Has Been Saved.</font></b><font size="6"><br>
</font><br><br><font size="4">To 
Enter New Data <a href="DataEntry.jsp">Click </a>here. </font><br><br>Click Here To <a href="Admin.jsp">Home</a>
</center>
</body>
</html>

<%}
else
{
response.sendRedirect("Unauthorised.htm");
}
%>