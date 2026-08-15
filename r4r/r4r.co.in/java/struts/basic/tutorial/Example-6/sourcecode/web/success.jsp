<%-- 
    Document    : success
    Description : Sixth Page of EmailLogin Application
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<html>
    <head>
        <meta http-equiv="refresh" content="10; URL=index.jsp">
        <title>success</title>
    </head>
    <body style="background-color:threedlightshadow">
        <h1><bean:message key="welcome.heading"/></h1>
        <h2>Congratulations! You have successfully logged in </h2>
        <b> Your Detail here:</b>

        <table style="background-color: aqua" border="1" cellspacing="8" cellpadding="5">

            <tbody>             
                <tr>
                    <td> UserName: </td>
                    <td><bean:write name="RegistrationForm" property="userName" /></td>
                </tr>
                <tr>
                    <td>Passsword: </td>
                    <td><bean:write name="RegistrationForm" property="password" /></td>
                </tr>
                <tr>
                    <td> Name: </td>
                    <td><bean:write name="RegistrationForm" property="name" /></td>
                </tr>
                <tr>
                    <td>Age: </td>
                    <td><bean:write name="RegistrationForm" property="age" /></td>
                </tr>
                <tr>
                    <td> Address: </td>
                    <td><bean:write name="RegistrationForm" property="address" /></td>
                </tr>
                <tr>
                    <td> E-mail Id: </td>
                    <td><bean:write name="RegistrationForm" property="email" /></td>
                </tr>
                <tr>
                    <td> Phone/Mobile NO: </td>
                    <td><bean:write name="RegistrationForm" property="number" /></td>
                </tr>
                <tr>
                    <td> Gender:</td>
                    <td> <bean:write name="RegistrationForm" property="gender" /></td>
                </tr>
            </tbody>
        </table>    

        <ul><B> Wait for 10sec page automatic redirect to<strong style="color: blue"> Home </strong> page, or click link below</B>
            <p>Return to <a style="cursor:auto; color:green" href="index.jsp"> Home </a> page</p>
        </ul>
    </body>
</html>
