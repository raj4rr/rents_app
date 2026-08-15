<%-- 
    Document    : Register.jsp
    Description : Third Page of Login Application
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>

<html:html xhtml="true">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Register Page</title>
    </head>
    <body>
        <html:form action="/register" method="post">
        <h1>For taking part in onLine draw, please register yourself</h1>
        <b>Please don't leave any block empty</b>
        <ul>
            <p>
                
                <bean:message key="welcome.username" /><BR>
                <html:errors property="UserName" />
                <html:text property="userName" maxlength="12"/>

                 
                <BR><BR> <bean:message key="welcome.password" /><BR>
                <html:errors property="Password" />
                <html:password property="password" maxlength="10"/>

                 
                <BR><BR> <bean:message key="welocme.name" /> <BR>
                <html:errors property="name" />
                <html:text property="name" maxlength="15"/>

             
                <BR><BR> <bean:message key="welcome.address" /> <BR>
                   <html:errors property="Address" />
                <html:textarea property="address" rows="5" cols="15"/>

                
                <BR><BR> <bean:message key="welcome.number" /> <BR>
                 <html:errors property="Number" />
                <html:text property="number" maxlength="13"/>
            </p>
            <p>
                <html:submit property="submit" value=" Register " />
                &nbsp;&nbsp;<html:button property="reset" value=" Reset " />
            </p>
        </ul>
        </html:form>
    </body>
</html:html>
