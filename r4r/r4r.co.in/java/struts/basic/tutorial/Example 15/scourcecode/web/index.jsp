<%--
    Document    : index.jsp
    Description : First Page of ValidationEx_2 Application
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
        <html:form action="/register" onsubmit="return validateRegisterForm(this)">

             <%-- =========== Add JavaScript error into JSP page ============ --%>
            <html:javascript formName="RegisterForm" />

            <%-- ================================================ --%>
            <h3><bean:message key="welcome.heading"/></h3>

            <ul>
                <table border="0" cellspacing="4" cellpadding="4">
                    <tbody>
                        <tr>
                            <td><bean:message key="welcome.name" /></td>
                            <td><html:text property="name" size="25" /></td>
                        </tr>
                        <tr>
                            <td><bean:message key="welcome.number" /></td>
                            <td><html:text property="number" size="25" /></td>
                        </tr>
                        <tr>
                            <td><bean:message key="welcome.age" /></td>
                            <td><html:text property="age" size="25" /></td>
                        </tr>
                        <tr>
                            <td><bean:message key="welcome.email" /></td>
                            <td><html:text property="email" size="25" /></td>
                        </tr>
                        <tr>
                            <td><bean:message key="welcome.gender"/></td>
                            <td><html:radio property="gender" value="male" /> Male
                                <html:radio property="gender" value="female" />Female </td>
                        </tr>
                        <tr>
                            <td align="center"><html:submit /></td>
                            <td align="center"><html:reset /></td>
                        </tr>
                    </tbody>
                </table>
            </ul>
        </html:form>
    </body>
</html:html>
