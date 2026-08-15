<%-- 
    Document     : dispaly.jsp
    Description  : Second Page of EmailLogin Application
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Check your Day!</h1>
        <ul>
            <p> Calculated, Day of Week : <strong> <bean:write name="computeForm" property="setDayOfWeek"/></strong> </p>
        </ul>
        <ul>
            <p> Return to <a style="cursor: auto; color: green" href="index.jsp"> home Page </a></p>
        </ul>
    </body>
</html>
