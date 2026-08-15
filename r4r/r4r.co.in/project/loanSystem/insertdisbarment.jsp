<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%
 ses=(String)session.getAttribute("UserName");
if(ses!=null)
{

String canumber=request.getParameter("canumber");
String installment=request.getParameter("Instalment");
String Installmentamount=request.getParameter("installamount");
String Date=request.getParameter("Date");
String Share=request.getParameter("Share");
String Insurense=request.getParameter("Insurense");
String Misc=request.getParameter("Misc");
try
{
Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
}
catch(ClassNotFoundException ex)
{
out.println("Error:"+ex.getMessage());
}
try
{
Connection conn=DriverManager.getConnection("jdbc:odbc:DSN");
PreparedStatement pst=conn.prepareStatement("select * from DataEntry where clanumber=?");
pst.setString(1,canumber);
ResultSet rs1=pst.executeQuery();
if(rs1.next())
{
PreparedStatement pstmt=conn.prepareStatement("select * from Disbarment where lanumber=? and install=?");
pstmt.setString(1,canumber);
pstmt.setString(2,installment);
ResultSet rs=pstmt.executeQuery();
if(rs.next())
{ 
response.sendRedirect("disbarmentfail.html");
}
else
{
PreparedStatement pstmt1=conn.prepareStatement("insert into Disbarment values(?,?,?,?,?,?,?)");
pstmt1.setString(1,canumber);
pstmt1.setString(2,installment);
pstmt1.setString(3,Installmentamount);
pstmt1.setString(4,Date);
pstmt1.setString(5,Share);
pstmt1.setString(6,Insurense);
pstmt1.setString(7,Misc);
pstmt1.execute();
out.println("Your Data Has Been Successfully Inserted");
out.println("<a href='Admin.jsp'>Click</a> To Go Back");
}
}
else
{
out.println("<center><b><br><br><br>User Does not exist</b><p><a href='Disbarment.html'>Click</a>Here To Back</p></center>");
}
}
catch(SQLException sql)
{
out.println("Error:"+sql.getMessage());
}

}
else{
response.sendRedirect("Unauthorised.htm");
}
%>
