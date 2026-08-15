<%-- 
    Document    : login.jsp
    Description : Fifth Page of EmailLogin Application
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<html:html xhtml="true">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login page</title>
    </head>
    <body style="background-color:threedlightshadow">
        <html:form action="/login" method="POST" >
            <h1><bean:message key="welcome.heading"/></h1>
            <BR><ul>
                <html:errors  property="usermatch"/>
                <html:errors  property="passmatch"/>
                <table border="2" cellspacing="6" cellpadding="8" style="background-color: yellow">
                    <thead>
                        <tr>
                            <td>Detail </td>
                            <td> Detail From Beans</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> <bean:message key="welcome.userName" />
                            <html:errors property="UserName" />
                            </td>
                            <td><html:text property="username" size="25" maxlength="10"/></td>
                        </tr>
                        <tr>
                            <td> <bean:message key="welcome.password" />
                            <html:errors property="password" />
                            </td>
                            <td><html:password property="password" size="25" maxlength="10"/></td>
                        </tr>
                        <tr>
                            <td>
                                &nbsp;&nbsp;<html:submit property="submit" value=" Check " /></td>
                            <td>  &nbsp;&nbsp;&nbsp; <html:reset property="reset" value=" Reset " />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </ul>
        </html:form>
    </body>
</html:html>
