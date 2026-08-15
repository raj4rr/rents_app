<%--
    Document    : welcomeStruts.jsp
    Description : Second Page of onLineDraw Application
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

        <html:form action="/example" method="post">

        <h3><bean:message key="welcome.heading"/></h3>
        <p><bean:message key="welcome.message"/></p>

        <table style="border:groove" border="1" cellspacing="5" cellpadding="5">
            <tbody>
                <tr>
                    <html:errors property="first" />
                    <td> <bean:message key="welocme.first" /></td>
                    <td><html:text property="first" size="20"/></td>
                </tr>
                <tr>
                    <html:errors property="last" />
                    <td><bean:message key="welcome.last" /> </td>
                    <td><html:text property="last" size="20"/></td>
                </tr>
                <tr>
                    <html:errors property="age" />
                    <td><bean:message key="welcome.age" /></td>
                    <td><html:text property="age" size="20"/></td>
                </tr>
                <tr>
                    <html:errors property="number" />
                    <td><bean:message key="welocme.number" /></td>
                    <td><html:text property="number" size="20"/></td>
                </tr>
                <tr>
                    <td align="center"><html:submit property="submit" value=" Submit " /></td>
                        <td align="center"><html:reset property="reset" value=" Reset " /></td>
                </tr>
            </tbody>
        </table>

        </html:form>
    </body>
</html:html>
