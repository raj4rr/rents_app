<html>
<head>
<title>Logged out</title>
</head>
<body >
	<CENTER>
	<H1> <u>LoanSystem Logout</u> </H1>
	</CENTER>
	
	<%@  page errorPage="errorpage.jsp" language="java" %>
	<%
	session.invalidate();
                 // session.setAttribute("UserName",null); 
	%>
        <center>
	<BR><BR><BR><BR><b>You have logged out successfully.
        <BR><BR>Return to Loan System? <a href="Login.html">Click here</a></b>
        </center>
</body>
</html>
