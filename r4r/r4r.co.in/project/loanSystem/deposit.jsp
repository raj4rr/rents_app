<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>

<%! String ses=null; %>
<% 
ses=(String)session.getAttribute("UserName");
if(ses!=null)
{
String CAnumber=request.getParameter("CAccountNumber");
String  Install=request.getParameter("Instalment");
String Amount=request.getParameter("Amount");
String Date=request.getParameter("DD");
String Month=request.getParameter("MM");
String Year=request.getParameter("YY");
String date=Date+"/"+Month+"/"+Year;
Connection conn=null;
try
{
Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
}
catch(ClassNotFoundException ex)
{
out.println("Error:" +ex.getMessage());
}
try
{
conn=DriverManager.getConnection("jdbc:odbc:DSN");
PreparedStatement pst=conn.prepareStatement("select clanumber from DataEntry where lanumber=?");
pst.setString(1,CAnumber);
ResultSet rs=pst.executeQuery();
if (rs.next())
{
PreparedStatement pstmt=conn.prepareStatement("select * from deposit where install=? ");
pstmt.setString(1,Install);
ResultSet rsr=pstmt.executeQuery();
if(rsr.next())
{
out.println("<center>You Had Already Deposited");
out.println("<p><a href=deposit.html>click</a>Here To Back </p></center>");
conn.close();
}
else
{
PreparedStatement ps=conn.prepareStatement("insert into deposit values(?,?,?,?)");
ps.setString(1,CAnumber);
ps.setString(2,Install);
ps.setString(3,Amount);
ps.setString(4,date);
ps.execute();
conn.close();
}
}
else{
out.println("<center>User Does Not Exist");
out.println("<p><a href=deposit.html>click</a>Here To Back </p></center>");
conn.close();
}
}catch(SQLException sqlex)
{
out.println("Error:" +sqlex.getMessage());
conn.close();
}
}
else
{
response.sendRedirect("Unauthorised.htm");
}
%>
