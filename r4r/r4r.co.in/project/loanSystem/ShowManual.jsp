<html>
<head><title>TABLE SHOWING DETAILS OF INTEREST & PRINCIPAL</title></head>
<body>
<center>
<p>&nbsp;</p>

<p>&nbsp;</p>

<p><b>TABLE SHOWING DETAILS OF INTEREST &amp; PRINCIPAL</b></p>


<table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="37%">
  <tr>
    <td width="50%"><font size="2">INITIAL AMOUNT: </font></td>
    <td width="50%"><font size="2">RS.1000</font></td>
  </tr>
  <tr>
    <td width="50%"><font size="2">MODE OF REPAYMENT:</font></td>
    <td width="50%"><font size="2">57 QUARTERLY EQUATED INSTALLMENTS</font></td>
  </tr>
  <tr>
    <td width="50%">&nbsp;</td>
    <td width="50%"><font size="2">OF RS.37.31 CALCULATED @ <b><%=request.getParameter("interestrate") %> </b>,P.A., PAYABLE 
    QUARTER</font>LY</td>
  </tr>
</table>
<p><font size="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br>
&nbsp;&nbsp; <br>
&nbsp;</font></p>

<table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="80%">
  <tr>
    <th width="25%"><b>INST NUBS</b></th>
    <th width="25%"><b>COMPONENT INTEREST</b></th>
    <th width="25%"><b>COMPONENT PRINCIPAL</b></th>
    <th width="25%"><b>OUT STDG. PRINCIPAL</b></th>
  </tr>

<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %><%! String ses=null; %>
<%! int flags=0; %>

<%
 ses=(String)session.getAttribute("UserName");
if(ses!=null)
{
String Interest=request.getParameter("interestrate");

try
{
Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
}catch(ClassNotFoundException ex)
{
out.println("Error:"+ex.getMessage());
}
try
{
Connection conn=DriverManager.getConnection("jdbc:odbc:DSN");
PreparedStatement pstmt=conn.prepareStatement("select * from irmanual where interestrate=?");
pstmt.setString(1,Interest);
ResultSet rs=pstmt.executeQuery();
while(rs.next())
{
out.println("<tr><td>"+rs.getString(2)+"</td><td>"+rs.getString(3)+"</td><td>"+rs.getString(4)+"</td><td>"+rs.getString(5)+"</td><td></td></tr>");

flags=1;

}
if(flags==0)
{
out.println("<center><br><br><b>Your Choice Is Wrong</b>");
out.println("<p><a href='Showmanual.html'>Click</a>Here To Try Again</p>");
return;
}
}
catch(SQLException sql)
{
out.println("Error:"+sql.getMessage());
}

}
else
{
response.sendRedirect("Unauthorised.htm");
}
%>

</table>
<a href='Admin.jsp'>Back</a>
</center>
</body>
</html>