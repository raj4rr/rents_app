
<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%
 ses=(String)session.getAttribute("UserName");
if(ses!=null)
{
String Branchnumber=request.getParameter("Branchnumber");
String Computernumber=request.getParameter("Computernumber");
Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
Connection conn=DriverManager.getConnection("jdbc:odbc:DSN");
PreparedStatement pstmt=conn.prepareStatement("Delete from DataEntry where lanumber=? or clanumber=?");
pstmt.setString(1,Branchnumber);
pstmt.setString(2,Computernumber);
response.sendRedirect("deleteSuccess.html");
}
else{
response.sendRedirect("Unauthorised.htm");
}
%>
