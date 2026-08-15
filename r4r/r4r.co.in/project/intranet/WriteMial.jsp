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
<TR>
<TD>
</TD>
</TR>
</table>


<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0 width=100%>

<form name=lang action="insert_WriteMial.jsp" >



<!-- Compose buttons -->
<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0 width=100%>
<TR>
<TD valign=top width=422>
<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0 width=422 bgcolor=#EEEEEE>
<TR bgcolor=#FFFFFF>
<TD width=87>
<TABLE cellSpacing=0 cellPadding=0 border=0><TR><TD height=1 width=87></TD></TR></TABLE>
</TD>
<TD class=sb1 height=25>
<font color=#474747></font>
</TD>
</TR>
<TR>
<TD colspan=2>
<TABLE cellSpacing=0 cellPadding=0 border=0><TR><TD height=8></TD></TR></TABLE>
</TD>
</TR>
<TR>
<TD width=87 class=sbr align=right>
<B><a href="">To</a> : &nbsp;</B>
</TD>
<TD>
<input type=text name="To" size=40 ><br>
</TD>
</TR>
<TR>
<TD colspan=2>
<TABLE cellSpacing=0 cellPadding=0 border=0><TR><TD height=8></TD></TR></TABLE>
</TD>
</TR>
<TR>
<TD width=87 class=sbr align=right>
<B><a href="">Cc</a> : &nbsp;</B>
</TD>
<TD>
<input type=text name="Cc" size=40 ><br>
</TD>
</TR>
<TR>
<TD colspan=2>
<TABLE cellSpacing=0 cellPadding=0 border=0><TR><TD height=8></TD></TR></TABLE>
</TD>
</TR>
<TR>
<TD width=87 class=sbr align=right>
<B><a href="">Bcc</a> : &nbsp;</B>
</TD>
<TD>
<input type=text name="Bcc" size=40  rows="2" ><br>


</TD>
</TR>
<TR>
<TD colspan=2>
<TABLE cellSpacing=0 cellPadding=0 border=0><TR><TD height=8></TD></TR></TABLE>
</TD>
</TR>
<TR>
<TD width=87 class=sbr align=right>
<B>Subject : &nbsp;</B>
</TD>
<TD>
<input type=text name="Subject" size=40 value=""><br>
</TD>
</TR>
<TR>
<TD colspan=2>
<TABLE cellSpacing=0 cellPadding=0 border=0><TR><TD height=8></TD></TR></TABLE>
</TD>
</TR>
<TR>
<TD width=87 class=sbr align=right>
<B><a href="upload_file_multipale.html">Attachments</a> : &nbsp;</B>
</TD>
<TD>
<input type=text name="list" size=40 VALUE="<%=session.getValue("file") %> " READONLY><br>
</td>
</tr>
</TABLE>
<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0 BGCOLOR=#DCDCDC width=100%>
<TR>
<TD width=604 height=264 BGCOLOR=#DCDCDC align=left>
<input type=hidden name=mailmime value=text>
&nbsp;&nbsp;
<textarea name="Text1" rows=17 cols=71 size=58 > &nbsp;
</textarea>
</TD>
<TD>
<TABLE cellSpacing=0 cellPadding=0 border=0><TR><TD height=1></TD></TR></TABLE>
</TD>
</TR>
</TABLE>
<!-- Compose buttons -->
<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0 width=100%>
<TR bgcolor=#EEEEEE>
<TD height=32 width=450>
&nbsp;&nbsp;&nbsp;<input type=submit name=Send value=Send >
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</TD>
<TD width=95>
<TABLE cellSpacing=0 cellPadding=0 border=0><TR><TD height=1 width=95></TD></TR></TABLE>
</TD>
<TD align=left>
<input type=reset name=cancel value="Cancel" > &nbsp;
</TD>
</TR>
</FORM>
</TABLE><%} else {out.println("Session is Expired <a href='Login.htm'>Login</a>");}%>
</body>
           
</html>

