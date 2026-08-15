<%-- 
    Document   : register.jsp
    Created on : 19 May, 2011, 11:41:09 AM
    Author     : Sachin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Register Page</title>
    </head>
    <body>
        
        <html:form action="/register">

            <h1><bean:message key="welcome.heading" /></h1>
        <html:errors />
        <table border="0" cellspacing="4" cellpadding="4">
            <tbody>
                <tr>
                    <td><bean:message key="welcome.userName" /></td>
                    <td><html:text property="RegUserName" size="25" maxlength="15" /></td>
                </tr>
                <tr>
                    <td><bean:message key="welcome.password" /></td>
                    <td><html:password property="RegPassword" size="25" maxlength="15" /></td>
                </tr>
                <tr>
                    <td><bean:message key="welcome.name" /></td>
                    <td><html:text property="RegName" size="25" maxlength="15" /></td>
                </tr>
                <tr>
                    <td><bean:message key="welcome.number" /></td>
                    <td><html:text property="RegNumber" size="25" maxlength="15" /></td>
                </tr>
                <tr>
                    <td><bean:message key="welcome.email" /></td>
                    <td><html:text property="email" size="25" maxlength="25" /></td>
                </tr>
                <tr>
                    <td align="center"><html:submit value=" Register " /></td>
                    <td align="center"><html:reset value=" Reset " /></td>
                </tr>
            </tbody>
        </table>
        </html:form>
    </body>
</html>
