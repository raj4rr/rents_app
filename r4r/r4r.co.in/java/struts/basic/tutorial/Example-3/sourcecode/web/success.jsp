<%-- 
    Document    : success.jsp
    Description : Fourth Page of Login Application
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<html>
    <head>
        <%-- page refresh within 10 sec and search for the URL --%>
        <meta http-equiv="refresh" content="10; URL=index.jsp">
        <title>Success Page</title>
    </head>
    <body>
        <h1>Congratulations! You detail successfully submit </h1>
        <b> Please check your detail below: </b>
        <ul>
            <p> Username:<strong> <bean:write name="RegisterForm" property="userName" /></strong></p>
            <p> Password:<strong> <bean:write name="RegisterForm" property="password" /></strong></p>
            <p> Name:<strong> <bean:write name="RegisterForm" property="name" /></strong></p>
            <p> Address:<strong> <bean:write name="RegisterForm" property="address" /></strong></p>
            <p> Phone/Mobile No:<strong> <bean:write name="RegisterForm" property="number" /></strong></p>
        </ul>
        <ul><B>
                Thanks for Registartion, our team will contact u soon
            </B>

            <p> Return to <a style=" cursor: auto;color: green" href="index.jsp"> home </a> Page </p>

            or wait for 10 sec page automatic redirect to the <a style="color: green"> home </a> page
        </ul>
    </body>
</html>
