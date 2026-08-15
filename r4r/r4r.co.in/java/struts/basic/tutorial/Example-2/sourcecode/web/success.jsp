<%--
    Document    : success.jsp
    Description : Fourth Page of Login Application
--%>

<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html:html xhtml="true">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Success Login</title>
    </head>
    <body>
        <h1>Congratulations! You have successfully logged in </h1>
        <!-- Value retrive form Beans -->
        <ul>
            <p>Name:<strong> <bean:write name="LoginForm" property="name"/></strong> </p>
            <p>Password:<strong>  <bean:write name="LoginForm" property="password"/> </strong> </p>
            <p>Age: <strong>  <bean:write name="LoginForm" property="age"/></strong> </p>
            <p>E-mail Id: <strong>  <bean:write name="LoginForm" property="email"/> </strong> </p>
        </ul>
        <BR><B>Thanks for registration</B>
        <ul>
            	<!-- Link provide for direct call index.jsp page -->
            <p> Return to <a href="index.jsp"> Home </a> page</p>
        </ul>
    </body>
</html:html>
