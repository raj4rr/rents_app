<%--
    Document    : display.jsp
    Description : Second Page of FileUpload_2 Application
--%>

<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>

<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>

<html:html lang="true">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <title>Display page</title>
    </head>
    <body style="background-color: white">

        <h1><bean:message key="welcome.dispaly" /></h1>
        <ul>
            Name of File: <b> <bean:write name="UploadForm" property="name" /></b><BR><BR>

            Name of Upload File: <b> <bean:write name="UploadForm" property="document" /></b><BR><BR>

            Size of Upload File: <b> <%= request.getAttribute("SizeofFile")%> bytes </b><BR><BR>

            <img src="<bean:write name="UploadForm" property="document" />" width="500" height="300"
                 alt="<bean:write name="UploadForm" property="name" />" /> <BR><BR>

            <strong>Only Image file display, but you can esily download any file link given below </strong><BR><BR>
            <a href="<bean:write name="UploadForm" property="document"/>">  Click here to download that file </a>
            
        </ul>
    </body>
</html:html>
