<%--
    Document    : welcomeStruts.jsp
    Description : Second Page of Login Application
--%>


<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>

<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>

<html:html lang="true">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><bean:message key="welcome.title"/></title>
        <html:base/>
    </head>
    <body style="background-color: white">

        <logic:notPresent name="org.apache.struts.action.MESSAGE" scope="application">
            <div  style="color: red">
                ERROR:  Application resources not loaded -- check servlet container
                logs for error messages.
            </div>
        </logic:notPresent>

        <html:form action="/check" method="post">

            <h1><bean:message key="welcome.heading"/></h1>
            <p><bean:message key="welcome.message"/></p>
            <ul>
                <b>For participation into onLine draw, Age must be above 17</b>
                
                <p><bean:message key="welcome.age" /><BR>
                    <html:errors property="Age" />
                    <html:text property="age" />
                </p>
                <p>
                    <html:submit property="submit" value=" Submit " />
                    &nbsp;&nbsp;<html:cancel property="cancel" value=" Cancel " />
                </p>
            </ul>

        </html:form>
    </body>
</html:html>
