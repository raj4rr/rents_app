<%--
    Document    : index.jsp
    Description : First Page of InsertInDataBase Application
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

        
        <html:form action="/InsertData">
        <h3><bean:message key="welcome.heading"/></h3>
        <p><bean:message key="welcome.message"/></p>
        <!-- SQL Error Dispaly Here: -->
        <html:errors property="SQL" />
        <html:errors property="SQLException" />

        <table border="0" cellspacing="4" cellpadding="4">
            <tbody>
                <tr>
                    <td>
                        <html:errors property="userName" />
                        <bean:message key="welcome.username" /></td>
                    <td><html:text property="userName" maxlength="20" size="20" /></td>
                </tr>
                <tr>
                    <td>
                        <html:errors property="firstName" />
                        <bean:message key="welcome.firstname" /></td>
                    <td><html:text property="firstName" maxlength="10" size="20" /></td>
                </tr>
                <tr>
                    <td>
                        <html:errors property="lastName" />
                        <bean:message key="welcome.lastname" /></td>
                    <td><html:text property="lastName" maxlength="10" size="20" /></td>
                </tr>
                <tr>
                    <td>
                        <html:errors property="age" />
                        <bean:message key="welcome.age" /></td>
                    <td><html:text property="age" maxlength="2" size="20" /></td>
                </tr>
                <tr>
                    <td>
                        <html:errors property="number" />
                        <bean:message key="welcome.number" /></td>
                    <td><html:text property="number" maxlength="15" size="20" /></td>
                </tr>
                <tr>
                    <td align="center"><html:submit value=" Submit " /></td>
                    <td align="center"><html:reset value=" Reset " /></td>
                </tr>
            </tbody>
        </table>

        </html:form>
    </body>
</html:html>
