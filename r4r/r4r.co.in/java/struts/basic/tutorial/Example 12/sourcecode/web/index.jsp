<%--
    Document    : index.jsp
    Description : First Page of FileUpload_2 Application
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
    </head>
    <body style="background-color: white">
        
        <html:form method="post" action="/upload" enctype="multipart/form-data">
        <h1><bean:message key="welcome.heading"/></h1>
        <html:errors />
        <ul>
            <table border="0" cellspacing="4" cellpadding="4">
                <tbody>
                    <tr>
                        <td><bean:message key="welocome.first" /></td>
                        <td><html:text property="name" size="30"/></td>
                    </tr>
                    <tr>
                        <td><bean:message key="welocome.second" /></td>
                        <td><html:file property="document" size="30" /></td>
                    </tr>
                    <tr>
                        <td></td>
                       <td align="left"><html:submit value=" File Upload "/></td>
                    </tr>
                </tbody>
            </table>
        </ul>
        </html:form>
    </body>
</html:html>
