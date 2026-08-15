<%--
    Document    : index.jsp
    Description : First Page of EmailLogin Application
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

        <html:form action="/compute">
        <h3><bean:message key="welcome.heading"/></h3>
        <p><bean:message key="welcome.message"/></p>
        
         <html:errors property="pre_gregorian"/>
        <table border="0" cellspacing="4" cellpadding="4">
            <tbody>
                <tr>
                    <td><html:errors property="" />
                        <bean:message key="welcome.day" /></td>
                    <td><html:text property="day" size="20" maxlength="2" /></td>
                </tr>
                <tr>
                    <td><html:errors property="month"/>
                        <bean:message key="welcome.month" /></td>
                    <td><html:text property="month" size="20" maxlength="2" /></td>
                </tr>
                <tr>
                    <td><html:errors property="year"/>                       
                        <bean:message key="welcome.year" /></td>
                    <td><html:text property="year" size="20" maxlength="4" /></td>
                </tr>
                <tr>
                    <td align="center"><html:submit value="" /></td>
                    <td align="center"><html:reset value="" /></td>
                </tr>
            </tbody>
        </table>
        </html:form>
    </body>
</html:html>
