<%--
    Document    : index.jsp
    Description : First Page of FileUpload Application
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
       
        <html:form method="POST" action="/upload" enctype="multipart/form-data" >
            <h3 align="center"><bean:message key="welcome.heading"/></h3>
            <!-- Display error into browser -->
            <html:errors />
            <ul>
                <table border="0" cellspacing="6" cellpadding="5">
                    <tbody>
                        <tr>
                            <td><bean:message key="welocome.first" /></td>
                            <td><html:text property="name" size="30" /></td>
                        </tr>
                        <tr>
                            <td><bean:message key="welocome.second" /></td>
                            <td><html:file property="document" size="30" /></td>
                        </tr>
                        <tr>
                            <td align="center"><html:submit property="submit" value=" Upload File " /></td>
                            <td><html:reset property="reset" value=" Reset " /></td>
                        </tr>
                    </tbody>
                </table>
            </ul>
        </html:form>
    </body>
</html:html>
