<%--
    Document    : sucess.jsp
    Description : Second Page of ValidationEx_2 Application
--%>

<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>

<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>

<html:html lang="true">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><bean:message key="welcome.title"/></title>
    </head>
    <body style="background-color: white">
        <h1>Congratulations ! your Detail successfully submit</h1>
        <h2> Check your detail</h2>
        <ul>
            <table border="1" cellspacing="4" cellpadding="4" style="border-bottom-style: groove; border-color: blue">
                <tbody>
                    <tr>
                        <td> Name: </td>
                        <td><b><bean:write name="RegisterForm" property="name" /></b></td>
                    </tr>
                    <tr>
                        <td> Phone/Mobile No: </td>
                        <td><b><bean:write name="RegisterForm" property="number" /></b></td>
                    </tr>
                    <tr>
                        <td> Age: </td>
                        <td><b><bean:write name="RegisterForm" property="age" /></b></td>
                    </tr>
                    <tr>
                        <td> E-mail Id: </td>
                        <td><b><bean:write name="RegisterForm" property="email" /></b></td>
                    </tr>
                    <tr>
                        <td> Gender: </td>
                        <td><b><bean:write name="RegisterForm" property="gender" /></b></td>
                    </tr>
                </tbody>
            </table>
        </ul>
    </body>
</html:html>
