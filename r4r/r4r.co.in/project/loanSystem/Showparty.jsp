<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%
ses=(String)session.getAttribute("UserName");
if(ses!=null)
{
String msg=null;
String Clanumber=request.getParameter("Computernumber");

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
PreparedStatement stmt=conn.prepareStatement("select * from DataEntry where lanumber=?");
stmt.setString(1,Clanumber);
ResultSet rs=stmt.executeQuery();
while(rs.next())
{
String lanumber= rs.getString(1);
String clanumber=rs.getString(2);
String name=rs.getString(3);
String dob1=rs.getString(4);
String hfname=rs.getString(5);
String name2=rs.getString(6);
String dob2=rs.getString(7);
String hf2=rs.getString(8);
String ad1=rs.getString(9);
String city=rs.getString(10);
String state=rs.getString(11);
String national=rs.getString(12);
String pincode=rs.getString(13);
String adp1=rs.getString(14);
String pcity=rs.getString(15);
String pstate=rs.getString(16);
String pnational=rs.getString(17);
String ppincode=rs.getString(18);
String number=rs.getString(19);
String imembernumber=rs.getString(20);
String lsamount=rs.getString(21);
String sannumber=rs.getString(22);
String interest=rs.getString(23);
String tenure=rs.getString(24);
out.println("<center><div align='left'><a href='Admin.jsp'>Home</a></div><div align='Right'><a href='Logout.jsp'>Logout</a></div></p><form action='Admin.jsp'><Table><tr><td>loan acount number</td><td>"+lanumber);
out.println("</td></tr><tr><td>computer genrated number</td><td>"+clanumber);
out.println("</td></tr><tr><td>name</td><td>"+name);
out.println("</td></tr><tr><td>date of birth</td><td>"+dob1);
out.println("</td></tr><tr><td>husband/father name</td><td>"+hfname);
out.println("</td></tr><tr><td>name</td><td>"+name2);
out.println("</td></tr><tr><td>date of birth</td><td>"+dob2);
out.println("</td></tr><tr><td>husband/father name</td><td>"+hf2);
out.println("</td></tr><tr><td>address</td><td>"+ad1);
out.println("</td></tr><tr><td>city</td><td>"+city);
out.println("</td></tr><tr><td>state</td><td>"+state);
out.println("</td></tr><tr><td>nationality</td><td>"+national);
out.println("</td></tr><tr><td>Pincode</td><td>"+pincode);
out.println("</td></tr><tr><td>address party</td><td>"+adp1);
out.println("</td></tr><tr><td>city party</td><td>"+pcity);
out.println("</td></tr><tr><td>party state</td><td>"+pstate);
out.println("</td></tr><tr><td>party nationality</td><td> "+pnational);
out.println("</td></tr><tr><td>party pincode</td><td>"+ppincode);
out.println("</td></tr><tr><td>number</td><td>"+number);
out.println("</td></tr><tr><td>imembernumber</td><td>"+imembernumber);
out.println("</td></tr><tr><td>loan sectioned amount</td><td>"+lsamount);
out.println("</td></tr><tr><td>sanctioned</td><td>"+sannumber);
out.println("</td></tr><tr><td>interest</td><td>"+interest);
out.println("</td></tr><tr><td>tenure</td><td>"+tenure+"</td></td></tr><tr><td></td></tr><tr><td spancols=2 align='center'><input type='submit' value='  OK  '></form></table></center>");
}
}
catch(SQLException sqlex)
{
out.println("Error:"+sqlex.getMessage());
}
 }
else
{
response.sendRedirect("Unauthorised.htm");
}
%>