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
	ResultSet rs;
	rs=null;

	
	int flag=0;
	
	try
	{
		Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
		conn =DriverManager.getConnection("jdbc:odbc:Data"); 
		Statement stat= conn.createStatement();
		
               rs = stat.executeQuery("SELECT Subject,From1,Date FROM mail_table where UserName='"+user_src+"'");
            
		
	%>
	
        <form action="">   
      <TABLE WIDTH=124 CELLSPACING=0 CELLPADDING=0 BORDER=0>

 <TABLE WIDTH=100% CELLSPACING=0 CELLPADDING=0 BORDER=0>
<TR>
<TD width=50% height=24   bgcolor=#B7E9FF>
&nbsp;&nbsp;&nbsp;&nbsp;<B>Welcome <%=user_src %>
,</B><BR>
</TD>
<td width=50% height=24   bgcolor=#B7E9FF align="right">
<a href="Logout.jsp" ><font size="2"  >Logout</font></a>
</td>
</TR>

</TABLE>



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
<TD  height=24 bgcolor=#ECF9FF>
&nbsp; &nbsp; 
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
<!-- New Mail -->
<td width=23 height=32 align=center>


<td >
<a href=""><font color=#375894><B>From</B></font></a>
</td>

<td  >
<a href=""><font color=#375894><B>Subject</B></font></a>
</td>


<td>
<B>Date</B></font></a>
</td>
</tr>


<% while(rs.next()){ %>
<TR BGCOLOR=#ECF9FF>
 <TD>

 </td><td>
<% String s1=rs.getString(1); 
   String s2=rs.getString(2);
   String s3=rs.getString(3);%>
  
<a href='ShowMessage.jsp?id=<%=s1 %>'><%=s2%></a>
</B>
</TD>
<td >
<%=s1 %>
</TD>
<td >
<%=s3 %>
</TD>
</TR>
<% flag=flag+1; %>


       
<%}
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
		
	
	
 
%><B> Number Of mail:<%=flag %></b></FORM>
</TABLE><%} else {out.println("Session is Expired <a href='Login.htm'>Login</a>");}%>
</body>           
</html>
	</body>
         