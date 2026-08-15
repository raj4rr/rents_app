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
	if (user_src!=null){
         Connection conn;
	conn=null;
	ResultSet rs,rs1;
	rs=null;
         String s=request.getParameter("id");
	session.putValue("id",s);
	int flag=0;
         int g=0,f=0;
	
	try
	{
		Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
		conn =DriverManager.getConnection("jdbc:odbc:Data"); 
		Statement stat= conn.createStatement();
                Statement stat1= conn.createStatement();
		 rs1 = stat1.executeQuery("SELECT * FROM user_auth where username='"+user_src+"'");
      if(rs1.next())
               rs = stat.executeQuery("SELECT * FROM mail_table where Subject='"+s+"'"); 
       while(rs.next()) {    g=1;
 
		
	%>
	
           
      



<TR>
<TD  height=24 bgcolor=#FFFFFF>


 <a href="Inbox.jsp">Inbox</a></font>
</TD>
</TR>
<TR>
<TD>
</TD>
</TR>
<TR>
<TD  height=24 bgcolor=#ECF9FF>&nbsp; &nbsp; 
<a href="WriteMial.jsp">Write Mail</a>

</TD>
</TR>
<TR>
<TD>
</TD>
</TR>
<TR>
<TD  height=24 bgcolor=#ECF9FF>
&nbsp; &nbsp; <a href="AddressBook1.jsp">Address Book</a>
</TD>
</TR>
<TR>
<TD>
</TD>
</TR>
</table>


<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0 width=100%>

</TABLE>
<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0 width=100% >
<TR bgcolor=#EEEEEE>
<TD width=100%>
<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0 width=100%>
<TR>
<TD align=center width=100%>
<form action="delete.jsp">
<input type=submit  name=del value="Delete" </form>
</TD>

</TR>
</TABLE>
</TD>
</TR>
<TR>
<TD>
<TABLE cellSpacing=0 cellPadding=0 border=0><TR><TD height=1></TD></TR></TABLE>
</TD>
</TR>
</TABLE>
<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0 width=100%>
<TR BGCOLOR=#D2D2D2>
<td>From:<%=rs.getString(5) %></Td></Tr>
<tr><td>To:<%=rs.getString(1) %></td></tr>
<tr><td>Cc:<%=rs.getString(7) %></td></tr>
<tr><td>Subject:<%=rs.getString(2) %></td></tr>
<tr><td>Date:<%=rs.getString(6) %></td></tr>

<tr><td>Message::<%=rs.getString(4) %></td></tr>








       
<% }
	}
		catch(Exception E)
		{
			
		}	
		finally
		{
			rs.close();
			conn.close();
		}
		
	
	
 
%></FORM>
</TABLE><%} else {out.println("Session is Expired <a href='Login.htm'>Login</a>");}%>
</body>
           
</html>
	</body>
           
</html>
