<%-- 
    Document    : DisplayPage
    Description : Forth Page of EmailLogin Application
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<html>
    <head>

        <%-- Redirect page within the 10 sec, to login.jsp  --%>
        <meta http-equiv="refresh" content="10; URL= login.jsp" >

        <title>Dispaly Page</title>
    </head>
    <body style="background-color:threedlightshadow">
        <h1><bean:message key="welcome.heading"/></h1>
        <h2>Congratulations! You have successfully Register</h2>
        <ul> Your Detail:
            <p> UserName: <bean:write name="RegistrationForm" property="userName" /></p>
            <p> Password: <bean:write name="RegistrationForm" property="password" /></p>
        </ul>
        <ul> <b>
            Please wait for 10 sec, Page will be automatic redirect to Login Page otherwise do it manually by click the
            link given below.
            </b>

            <p>Now, Forward to <a style="cursor:auto; color:green" href="login.jsp"> Login </a> Page </p>
        </ul>
    </body>
</html>
