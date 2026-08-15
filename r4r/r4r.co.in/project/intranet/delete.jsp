<html>

<head>
<title>Search Results</title>
</head>

<body bgcolor="#CCFFFF">

	<CENTER>
	<marquee><H1> <u>Intranet Mailing System </u> </H1></marquee>
	</CENTER>

	<BR>
         
	<%@  page errorPage="errorpage.jsp" language="java"  import="java.sql.*"  %>
	<%
	int i;
	String user_src=null;
	user_src=(String)session.getValue("user");
	String user_src1=null;
	user_src1=(String)session.getValue("id");
	if (user_src!=null){
         Connection conn;
	conn=null;
	ResultSet rs;
	rs=null;

	
	int flag=0;
	
	try
	{
		Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
		conn =DriverManager.getConnection("jdbc:odbc:Data"); 
		Statement stat= conn.createStatement();
		
               rs = stat.executeQuery("delete FROM mail_table where Subject='"+user_src1+"'");
            
		out.println("Your mail has been deleted.click here to <a href='Inbox.jsp'>back</a>");
	
	
	
	}
		catch(Exception E)
		{
			out.println("Error inserting value"+E);
		}	
		finally
		{
			rs.close();
			conn.close();
                        
		}
		
	
%>
</TABLE><%} else {out.println("Session is Expired <a href='Login.htm'>Login</a>");}%>
</body>           
</html>
	</body>
         