<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%
 ses=(String)session.getAttribute("UserName");
if(ses!=null)
{
String Interest=request.getParameter("interestrate");
String installmentNumber=request.getParameter("Instalment");
String cinterest=request.getParameter("cinterest");
String cprincipal=request.getParameter("cprincipal");
String osprincipal=request.getParameter("osprincipal");

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
PreparedStatement pstmt=conn.prepareStatement("select * from irmanual where interestrate=? and installment=?");
pstmt.setString(1,Interest);
pstmt.setString(2,installmentNumber);
ResultSet rs=pstmt.executeQuery();
if(rs.next())
{
out.println("<center><br><br><b>You Have Already Inserted</b>");
out.println("<p><a href='Intersetmanual.html'>Click</a>Here To Back</p></center>");
return;
}
else
{
PreparedStatement pstmt1=conn.prepareStatement("insert into irmanual values(?,?,?,?,?)");
pstmt1.setString(1,Interest);
pstmt1.setString(2,installmentNumber);
pstmt1.setString(3,cinterest);
pstmt1.setString(4,cprincipal);
pstmt1.setString(5,osprincipal);

pstmt1.execute();
response.sendRedirect("InstallmentSuccess.jsp");
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

