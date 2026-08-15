<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%
 ses=(String)session.getAttribute("UserName");
if(ses!=null)
{
String LANumber=request.getParameter("LANumber");
String CLANumber=request.getParameter("CLANumber");
String name=request.getParameter("Name");
String DOB1=request.getParameter("DOB1");
String HFName=request.getParameter("HFName");
String Name2=request.getParameter("Name2");
String DOB2=request.getParameter("DOB2");
String HFName2=request.getParameter("HF2");
String AD1=request.getParameter("AD1");
String City=request.getParameter("City");
String State=request.getParameter("State");
String National=request.getParameter("National");
String PinCode=request.getParameter("PinCode");
String ADP1=request.getParameter("ADP1");
String PCity=request.getParameter("PCity");
String PState=request.getParameter("PState");
String PNational=request.getParameter("PNational");
String PPincode=request.getParameter("PPinCode");
String Number=request.getParameter("Number");
String Imembernumber=request.getParameter("Imembernumber");
String LSAmount=request.getParameter("LSAmount");
String SANumber=request.getParameter("SANumber");
String Interest=request.getParameter("Interest");
String Tenure=request.getParameter("Tenure");
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
PreparedStatement pstmt=conn.prepareStatement("select lanumber,clanumber,name,dob1,hfname from DataEntry where lanumber=? and name=? and dob1=? and hfname=?");
pstmt.setString(1,LANumber);
pstmt.setString(2,name);
pstmt.setString(3,DOB1);
pstmt.setString(4,HFName);
ResultSet rs=pstmt.executeQuery();
if(rs.next())
{
out.println("Party already exist");
return;
}
else
{
PreparedStatement pstmt1=conn.prepareStatement("Insert into DataEntry values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
pstmt1.setString(1,LANumber);
pstmt1.setString(2,CLANumber);
pstmt1.setString(3,name);
pstmt1.setString(4,DOB1);
pstmt1.setString(5,HFName);
pstmt1.setString(6,Name2);
pstmt1.setString(7,DOB2);
pstmt1.setString(8,HFName2);
pstmt1.setString(9,AD1);
pstmt1.setString(10,City);
pstmt1.setString(11,State);
pstmt1.setString(12,National);
pstmt1.setString(13,PinCode);
pstmt1.setString(14,ADP1);
pstmt1.setString(15,PCity);
pstmt1.setString(16,PState);
pstmt1.setString(17,PNational);
pstmt1.setString(18,PPincode);
pstmt1.setString(19,Number);
pstmt1.setString(20,Imembernumber);
pstmt1.setString(21,LSAmount);
pstmt1.setString(22,SANumber);
pstmt1.setString(23,Interest);
pstmt1.setString(24,Tenure);
pstmt1.execute();
response.sendRedirect("EntrySuccess.jsp");
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

