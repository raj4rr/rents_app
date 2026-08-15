<%-- 
    Document   : success
    Created on : 19 May, 2011, 12:55:13 PM
    Author     : Sachin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Success Page</title>
    </head>
    <body>
        <h2>Congratulations! You have successfully logged in </h2>
        <b> Your Detail here:</b>
        <ul>
            <table border="0" cellspacing="4" cellpadding="4">
                <tbody>
                    <tr>
                        <td> UserName:</td>
                        <td><b><bean:write name="RegisterForm" property="RegUserName" /></b> </td>
                    </tr>
                    <tr>
                        <td> Password:</td>
                        <td><b><bean:write name="RegisterForm" property="RegPassword" /></b> </td>
                    </tr>
                    <tr>
                        <td> Name:</td>
                        <td><b><bean:write name="RegisterForm" property="RegName" /></b> </td>
                    </tr>
                    <tr>
                        <td> Number:</td>
                        <td><b><bean:write name="RegisterForm" property="RegNumber" /></b> </td>
                    </tr>
                    <tr>
                        <td> Email-ID:</td>
                        <td><b><bean:write name="RegisterForm" property="email" /></b> </td>
                    </tr>
                </tbody>
            </table>
        </ul>
        <ul>
            <p>Return to <a style="cursor: auto" href="index.jsp">home page</a></p>
        </ul>
    </body>
</html>
