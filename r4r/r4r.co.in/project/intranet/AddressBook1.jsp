<html>


<head>
<title>Search Results</title>

</head>

<body bgcolor="#FFFFFF">

	<CENTER>
	<marquee><H1> <u>Intranet Mailing System </u> </H1></marquee>
	</CENTER>

	<BR>
         
	
	<%@  page errorPage="errorpage.jsp" language="java"  import="java.sql.*"  %>
           <% String user_src=null;
	user_src=(String)session.getValue("user");
        String To=null;
        String Bcc=null;
        String Cc=null;
            String email=null;
                          
				
	if (user_src!=null){
        %>


      <TABLE WIDTH=124 CELLSPACING=0 CELLPADDING=0 BORDER=0>

 <TABLE WIDTH=100% CELLSPACING=0 CELLPADDING=0 BORDER=0>
<TR>
<TD width=50% height=24   bgcolor=#B7E9FF>
&nbsp;&nbsp;&nbsp;&nbsp;<B>Welcome <% out.println(" "+user_src);%>,</B><BR>
</TD>
<td width=50% height=24   bgcolor=#B7E9FF align="right">
<a href="Logout.jsp" ><font size="2"  >Logout</font></a>
</td>
</TR>

</TABLE>
<Table>
<TR>
<TD  height=24 bgcolor=#ECF9FF>
&nbsp; &nbsp; 
<a href="Inbox.jsp">Inbox</a>

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
     <form action="insert_AddressBook.jsp">
    

      <TR><td>Enter First Name</td>
    <TD><input type="text" name="fname"></TD>
    </TR>
    <TR><td>Enter Last Name</td>
    <TD><input type="text" name="lname"></TD>
    </TR>
   
    <TR><td>Enter Email Id</td>
    <TD>
      <input type="text" name="email" >
  </td></tr>
    <input type="submit">
</form>
</table>
<%} else {out.println("Session is Expired <a href='Login.htm'>Login</a>");}%>
</body>
           
</html>