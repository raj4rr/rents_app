<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%

 ses=(String)session.getAttribute("UserName");
if(ses!=null){
%>
<html>
<head><title>Adminstrater Page</title>
</head>
<body>
<center>
<h2><font face="Arial"><font color=red size=8>Welcome To Administrator</h2></font>
<font face="Arial" size="3" color="back"></font></p><b>User Name:</b><i><%=ses %> </i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="Logout.jsp">       LogOut</a><p>
<table border="3" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#0000FF" width="67%">
  <tr>
    <td width="33%"><b><a href="deposit.html"><font color="#800080">Deposit</font></a><a href=ShowReport.jsp><font color="#800080">
    </font></a></b></td>
    <td width="33%"><b><a href="DataEntry.jsp"><font color="#800080">Data Entry</font></a></b></td>
    <td width="34%"><b><a href="DeletSearch.jsp"><font color="#800080">Delete Entry</font></a></b></td>
  </tr>
  <tr>
    <td width="33%"><b>
    <a href="ModifySearch.jsp"><font color="#800080">Modify Entry</font></a></b></td>
    <td width="33%"><b><a href=Disbarment.html ><font color="#800080">
    Disbarment</font></a></b></td>
    <td width="34%"><b>
    <a href="Search.jsp"><font color="#800080">Show Report</font></a><font color="#800080">&nbsp;
    </font></b></td>
  </tr>
<tr>
    <td width="33%"><b>
    <font color="#800080"><a href="Intersetmanual.html">Interest </a></font></b>
    <font color="#800080" face="Arial"><b><a href="Intersetmanual.html">Interest 
    Rate &amp; Principal</a></b></font></td>
    <td width="33%"><b><a href=Intrestratecalculater.html ><font color="#800080">
    Intrestrate Calculater</font></a></b></td>
    <td width="34%"><b>
    <a href="PartySearch.jsp"><font color="#800080">Show Party</font></a><font color="#800080">&nbsp; 
    `</font></b></td>
  </tr>
<tr>
    <td width="33%"><font color="#800080"><b><a href="Showmanual.html">Show 
    Interest Rate &amp; Principal</a></b></font></td>
    <td width="33%">&nbsp;</td>
    <td width="34%">&nbsp;</td>
  </tr>
</table>
<p>&nbsp;</p>
</center>
</font>
</body>
</html>
<%
}
else
{
response.sendRedirect("Unauthorised.htm");
}
%>