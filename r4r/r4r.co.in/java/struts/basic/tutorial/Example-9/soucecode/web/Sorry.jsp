<%--
    Document    : search.jsp
    Description : Third Page of GenException Application
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>

<html:html xhtml="true">
    <head>
        <title><bean:message key="welcome.title"/></title>
    </head>
    <body>
        <h1 align="center"><bean:message key="welcome.heading"/></h1>
        <hr width="100%" size="+2" noshade="groove" style="color: blue">
        <h1>We apologize for the inconvenience! Page not ready yet</h1>
        <ul>
            Return to <html:link forward="home"> home </html:link> page
        </ul>
    </body>
</html:html>
