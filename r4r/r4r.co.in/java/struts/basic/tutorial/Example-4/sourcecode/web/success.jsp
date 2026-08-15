<%-- 
    Document   : success.jsp
    Created on : Third Page of onLineDraw Application
--%>

<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<html>
    <head>
        <meta http-equiv="refresh" content="10; URL=index.jsp">
        <title>success Page</title>
    </head>
    <body>
        <h1>Your Detail!</h1>
        <ul>
            <p> First Name:<strong> <bean:write name="DynaExample" property="first" /></strong> </p>
            <p> Last Name: <strong><bean:write name="DynaExample" property="last" /></strong></p>
            <p> Age: <strong><bean:write name="DynaExample" property="age" /></strong></p>
            <p> Number: <strong><bean:write name="DynaExample" property="number" /></strong></p>
        </ul>
        <ul>
            <p> Please, wait page automatic return to <strong> Home </strong> Page. </p>
        </ul>
    </body>
</html>
