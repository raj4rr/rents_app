
<%--
    Document    : Display.jsp
    Description : Second Page of InsertInDataBase Application
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Dispaly Page</title>
    </head>
    <body>
        <h1>Congratulations! You data successfully store into DataBase</h1>
        <h2> Check your detail</h2>
        <ul>
            <table border="1" cellspacing="4" cellpadding="4">
                <tbody>
                    <tr>
                        <td> UserName :</td>
                        <td><b><bean:write name="InsertDataForm" property="userName" /></b></td>
                    </tr>
                    <tr>
                        <td> First Name: </td>
                        <td><b><bean:write name="InsertDataForm" property="firstName"  /></b></td>
                    </tr>
                    <tr>
                        <td> Last Name:</td>
                        <td><b><bean:write name="InsertDataForm" property="lastName"  /></b></td>
                    </tr>
                    <tr>
                        <td> Age: </td>
                        <td><b><bean:write name="InsertDataForm" property="age" /></b></td>
                    </tr>
                    <tr>
                        <td> Number: </td>
                        <td><b><bean:write name="InsertDataForm" property="number" /></b></td>
                    </tr>
                </tbody>
            </table>
        </ul>
        <ul>
            <p> Now, return back to <a style="cursor: auto; color: green" href="index.jsp"> home </a>page</p>
        </ul>
    </body>
</html>
