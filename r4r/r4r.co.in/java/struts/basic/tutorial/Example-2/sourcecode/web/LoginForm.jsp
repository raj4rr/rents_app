<%-- 
    Document   : LoginForm
    Created on : 9 May, 2011, 2:41:55 PM
    Author     : Sachin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html:html xhtml="true">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>LoginPage</title>
    </head>
    <body style="background-color: white ">

        <html:form method="post" action="/login" >
            <h1>Struts Login !Login Form</h1>

            <html:errors property="name"/>
            <br><bean:message key="welcome.name" /> <br>
            <html:text property="name" maxlength="14" />

            <html:errors property="password"/>
            <br><br> <bean:message key="welcome.password" /> <br>
            <html:password property="password" maxlength="10" />

            <html:errors property="age"/>
            <br><br> <bean:message key="welcome.age" /> <br>
            <html:text property="age"  maxlength="2" />

            <html:errors property="Email"/>
            <br><br> <bean:message key="welcome.email" /> <br>
            <html:text property="email" />

            <br><br> <html:submit property="submit" value=" Login " />
            &nbsp;&nbsp; <html:button property="reset" value=" Reset " />
        </html:form>
    </body>

</html:html>
