

<%--
    Document   : welcomeStruts
    Created on : 17 Apr, 2011, 9:25:53 PM
    Author     : Sachin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><bean:message key="welcome.title" /></title>
    </head>
    <body>
        <h1>Congratulations! You have successfully Forward </h1>
        <ul>
            <p>Your Message: <bean:write name="LoginForm" property="area"/></p>
        </ul>

        <p>Return to <a href="index.jsp"> Home</a> page</p>
    </body>
</html>
