<html>
<body>
<%@  page errorPage="errorpage.jsp" language="java"  import="java.sql.*" import="java.util.*"  %>
<%
	Connection conn;
	conn=null;
	ResultSet rs;
	rs=null;
	try
	{
		String To=request.getParameter("To");
		String Cc=request.getParameter("Cc");
                String Bcc=request.getParameter("Bcc");
		String list=request.getParameter("list");
                String Subject=request.getParameter("Subject");
		String Text1=request.getParameter("Text1");
      		Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
		conn = DriverManager.getConnection("jdbc:odbc:Data"); 
		
	           session.putValue("To",To);
                   session.putValue("Cc",Cc);
                   session.putValue("Bcc",Bcc);

			PreparedStatement stat=conn.prepareStatement("INSERT INTO mail_table values(?,?,?,?,?,?,?,?)");
			stat.setString(1,To);
			
			stat.setString(2,Subject);
			stat.setString(3,list);	
			stat.setString(4,Text1);
			 
                        stat.setString(5,(String)session.getValue("user"));
         		stat.setString(6,"date");
                        stat.setString(7,"Bcc");
                        stat.setString(8,"Cc");

			stat.executeUpdate();
                        PreparedStatement stat1=conn.prepareStatement("INSERT INTO mail_table values(?,?,?,?,?,?,?,?)");
			stat1.setString(1,Bcc);
			
			stat1.setString(2,Subject);
			stat1.setString(3,list);	
			stat1.setString(4,Text1);
			 
                        stat1.setString(5,(String)session.getValue("user"));
         		stat1.setString(6,"date");
                        stat1.setString(7,"Bcc");
                        stat1.setString(8,"Cc");


			stat1.executeUpdate();
                        PreparedStatement stat2=conn.prepareStatement("INSERT INTO mail_table values(?,?,?,?,?,?,?,?)");
			stat2.setString(1,Cc);
			
			stat2.setString(2,Subject);
			stat2.setString(3,list);	
			stat2.setString(4,Text1);
			 
                        stat2.setString(5,(String)session.getValue("user"));
         		stat2.setString(6,"date");
                        stat2.setString(7,"Bcc");
                        stat2.setString(8,"Cc");


			stat2.executeUpdate();
                        response.sendRedirect("valid.jsp");
                        
                        
			
	}
	catch(Exception E)
	{
		
	}
	finally
	{
		
		conn.close();
	}
	%>
</body>
</html>
