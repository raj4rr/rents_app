
<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%
ses=(String)session.getAttribute("UserName");
if(ses!=null)
{
String LaNumber=request.getParameter("LANumber");
String CLANumber=request.getParameter("CLANumber");
String Name=request.getParameter("Name");
String DOB1=request.getParameter("DOB1");
String HFName=request.getParameter("HFName");
String Name2=request.getParameter("Name2");
String DOB2=request.getParameter("DOB2");
String HF2=request.getParameter("HF2");
String AD1=request.getParameter("AD1");
String AD2=request.getParameter("AD2");
String City=request.getParameter("City");
String State=request.getParameter("State");
String National=request.getParameter("National");
String Pincode=request.getParameter("PinCode");
String ADP1=request.getParameter("ADP1");
String ADP2=request.getParameter("ADP2");
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
PreparedStatement pstmt;
pstmt=conn.prepareStatement("update DataEntry set name=?, dob1=?, hfname=?, name2=?, dob2=?, hf2=?, ad1=?, city=?, state=?, national=?, pincode=?, adp1=?, pcity=?, pstate=?, pnational=?, ppincode=?, number=?, imembernumber=?, lsamount=?, sannumber=?, interest=?, tenure=? where clanumber=?" );
pstmt.setString(1,Name);
pstmt.setString(2,DOB1);
pstmt.setString(3,HFName);
pstmt.setString(4,Name2);
pstmt.setString(5,DOB2);
pstmt.setString(6,HF2);
pstmt.setString(7,AD1);
pstmt.setString(8,City);
pstmt.setString(9,State);
pstmt.setString(10,National);
pstmt.setString(11,Pincode);
pstmt.setString(12,ADP1);
pstmt.setString(13,PCity);
pstmt.setString(14,PState);
pstmt.setString(15,PNational);
pstmt.setString(16,PPincode);
pstmt.setString(17,Number);
pstmt.setString(18,Imembernumber);
pstmt.setString(19,LSAmount);
pstmt.setString(20,SANumber);
pstmt.setString(21,Interest);
pstmt.setString(22,Tenure);
pstmt.setString(23,LaNumber);
int rs=pstmt.executeUpdate();
}catch(SQLException sql)
{
out.println("Error:"+sql.getMessage());
}
}

else
{
response.sendRedirect("Unauthorised.htm");
}
%>
 


