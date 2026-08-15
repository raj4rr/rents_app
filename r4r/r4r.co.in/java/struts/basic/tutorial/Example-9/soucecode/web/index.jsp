<%--
    Document    : index.jsp
    Description : First Page of GenException Application
--%>

<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>


<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>

<html:html xhtml="true">
    <head>
        <title><bean:message key="welcome.title"/></title>
    </head>
    <body>
        <h1 align="center"><bean:message key="welcome.heading"/></h1>
        <hr width="100%" size="+2" noshade="groove" style="color: blue">

        <h2 align="center"> R4R Tech Soft Employee Partal</h2>

        <hr width="80%" noshade="true">

        <ul type="square">
            <li><html:link forward="sorry"> Add an Employee Detail </html:link></li>
            <li><html:link forward="search"> Search for Employees Detail </html:link></li>
            <li><html:link forward="sorry"> Delete an Employee Delail </html:link></li>
        </ul>

    </body>
</html:html>
