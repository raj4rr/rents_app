<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>

<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>

<html:html lang="true">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><bean:message key="welcome.title"/></title>
        <html:base/>
    </head>
    <body style="background-color: white">

        <html:form action="/login" >

            <h3><bean:message key="welcome.heading"/></h3>
            <p><bean:message key="welcome.message"/></p>
            <html:errors />
            <ul>
                <table border="0" cellspacing="4" cellpadding="4">
                    <tbody>
                        <tr>
                            <td><bean:message key="welcome.userName"/></td>
                            <td><html:text property="LoginName" size="25" maxlength="15" /></td>
                        </tr>
                        <tr>
                            <td><bean:message key="welcome.password"/></td>
                            <td><html:password property="LoginPassword" size="25" maxlength="15" /></td>
                        </tr>
                        <tr>
                            <td align="center"><html:submit value=" Check Login " /></td>
                            <td align="center"><html:reset value=" Reset " /></td>
                        </tr>
                    </tbody>
                </table>
            </ul>
            <ul>
                <hr size="+2" width="80%" style="color: blue">
                <BR>
                <p><font face="Arial"> New User please regiset yourself first by
                        <html:link style="cursor: auto;color: green" forward="register"> Click Here</html:link></font></p>
            </ul>

        </html:form>
    </body>
</html:html>

