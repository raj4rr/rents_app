<html>
<head>
<title>Logged out</title>
</head>
<body bgcolor="#CCFFFF">
	<CENTER>
	<marquee><H1> <u>Intranet Mailing System </u> </H1></marquee>
	</CENTER>

	
	<%@  page errorPage="errorpage.jsp" language="java" %>
	<%
	session.invalidate();
	%>
        <center>
	<BR><BR><BR><BR><b>You have logged out successfully.
        <BR><BR>Return  <a href="Login.htm">Click here</a></b>
        </center>
</body>
</html>
