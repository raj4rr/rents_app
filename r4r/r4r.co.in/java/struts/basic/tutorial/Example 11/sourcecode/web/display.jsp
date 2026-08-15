<%--
    Document    : Display.jsp
    Description : Second Page of FileUpload Application
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Dispaly Page</title>
    </head>
    <body>
        <h1><bean:message key="welcome.dispaly"/></h1>
        <ul>
            Name of File: <b> <bean:write name="UploadForm" property="name" /></b><br/><br/>

            Name of Upload File:<b> <bean:write name="UploadForm" property="document" /></b><br/><br/>

            Size of Upload File:<b> <%= request.getAttribute("SizeofFile")%> bytes </b><br/><br/>

            <img src="<bean:write name="UploadForm" property="document" />" width="500" height="300"
                 alt="<bean:write name="UploadForm" property="name" />"/><BR/><Br/>

            <strong>Only Image file display, but you can esily download any file link given below </strong><br/>

            <a href="<bean:write name="UploadForm" property="document" />"> Click here to download that file</a>
        </ul>
    </body>
</html>
