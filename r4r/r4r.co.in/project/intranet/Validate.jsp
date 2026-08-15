<html>
<body>
<%@  page errorPage="errorpage.jsp" language="java"  import="java.sql.*"  %>
<%
	Connection conn;
	conn=null;
	ResultSet rs;
	rs=null;
	try
	{
		String strName=request.getParameter("UserName");
		String strPass=request.getParameter("Password");
		Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
		conn = DriverManager.getConnection("jdbc:odbc:Data"); 
		PreparedStatement stat= conn.prepareStatement("SELECT * FROM user_auth where username=? and password =?");
		stat.setString(1,strName);
		stat.setString(2,strPass);
		rs = stat.executeQuery();
		if(rs.next())
		{
			
			String str1,str2;
			str1=rs.getString(1);
			str2=rs.getString(2);
			session.putValue("user",strName);
			if(str1.equals("Administrator"))
			{
				response.sendRedirect("Admin.htm");
			}
			else
			{
				
				response.sendRedirect("Inbox.jsp");
			}
		}       
		else
		{
			response.sendRedirect("InvalidUser.htm");
		}
	}
	catch(Exception E)
	{
		out.println("Error "+E);
	}
	finally
	{
		rs.close();
		conn.close();
	}
	%>
</body>
</html>
