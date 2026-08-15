<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>


<%
String userName=request.getParameter("userName");
String password=request.getParameter("password");
int flag=0;
try
{
Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
Connection conn=DriverManager.getConnection("jdbc:odbc:DSN");
Statement stmt=conn.createStatement();
ResultSet rs=stmt.executeQuery("Select username,passwords from auth");
while(rs.next())
{
 String username=rs.getString(1);
 String passwords=rs.getString(2);
 session.setAttribute("UserName",userName);
if(userName.equals("renu")&& passwords.equals(password))    
          {
              flag=2;
           response.sendRedirect("Admin.jsp");   
           }
if(userName.equals(username)&& passwords.equals(password))
          {
	flag=1;
         }

}

if(flag==1)
{
response.sendRedirect("User.jsp");
}
if(flag==0)
{
response.sendRedirect("Invaliduser.html");
}
conn.close();  
}
catch(ClassNotFoundException ex)
    {
    out.println("Error:"+ex.getMessage());
     }
catch(Exception e)
   {
    out.println("Error:"+e.getMessage());
  }
%>
