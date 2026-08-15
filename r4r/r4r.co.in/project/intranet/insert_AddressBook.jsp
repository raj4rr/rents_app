<html>
<body bgcolor="#CCFFFF">
<%@  page errorPage="errorpage.jsp" language="java"  import="java.sql.*"  %>

 <% String user_src=null;
	user_src=(String)session.getValue("user");
	Connection conn;
	conn=null;
	ResultSet rs;
	rs=null;
         
	String fname=request.getParameter("fname");
	String lname=request.getParameter("lname");
        String fname1=request.getParameter("fname1");
	String lname1=request.getParameter("lname1");
        String fname2=request.getParameter("fname2");
	String lname2=request.getParameter("lname2");
	String email=request.getParameter("email");
	String To=(String)session.getValue("To");
         String Bcc=(String)session.getValue("Bcc");
         String Cc=(String)session.getValue("Cc");
 
               
        
	
	int flag=0;
	
	try
	{
		Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
		conn =DriverManager.getConnection("jdbc:odbc:Data"); 
	     
               if(To!=null||email!=null)
                   {email=To;
 
             PreparedStatement stat= conn.prepareStatement("INSERT INTO AddressBook values(?,?,?,?)" );
		stat.setString(1,user_src);
                stat.setString(2,fname);
                stat.setString(3,lname);
                stat.setString(4,email);
                rs = stat.executeQuery();
               
             }
           if(Bcc!=null)
            {email=Bcc;
 
             PreparedStatement stat3= conn.prepareStatement("INSERT INTO AddressBook values(?,?,?,?)" );
			stat3.setString(1,user_src);
                stat3.setString(2,fname1);
                stat3.setString(3,lname1);
                stat3.setString(4,email);
                rs = stat3.executeQuery();
                
               }
              if(Cc!=null)
               {email=Cc;
 
             PreparedStatement stat4= conn.prepareStatement("INSERT INTO AddressBook values(?,?,?,?)" );
		stat4.setString(2,fname2);
                	stat4.setString(1,user_src);
                stat4.setString(3,lname2);
                stat4.setString(4,email);
                rs = stat4.executeQuery();
                
                
              } 
				
                          
                          
                          response.sendRedirect("Addressbook1.jsp"); 
					
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
</body>
</html>
