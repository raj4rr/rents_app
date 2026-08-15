
<%--
    Document    : search.jsp
    Description : Second Page of GenException Application
--%>

<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>

<html>
    <head>
        <title><bean:message key="welcome.title"/></title>
    </head>
    <body>
        <h1 align="center"><bean:message key="welcome.heading"/></h1>

        <hr width="100%" size="+2" noshade="groove" style="color: blue">

        <h2 align="center"> R4R Tech Soft Employee Partal- Employee Search</h2>

        <hr align="center" width="75%" noshade="true">

        <html:errors/>
        <strong style="color: blue"> Detail Search by either employee name or employe Social Security Number</strong>
        <html:form  method="post" action="/search">
            <ul>
                <table cellpadding="4" cellspacing="4">
                    <tr>
                        <td><bean:message key="welcome.first"/></td>
                        <td><html:text property="name" size="20"/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td> --- OR ---</td>
                    </tr>
                    <tr>
                        <td><bean:message key="welcome.number"/></td>
                        <td><html:text property="ssNum" size="20"/> &equiv; (x-xxx-xx-xxxx)</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><html:submit value=" Submit Query "/></td>
                    </tr>
                </table>
            </ul>
        </html:form>

        <logic:present name="searchForm" property="results">

            <hr width="100%" size="+1" noshade="true">
            <hr width="100%" size="+1" noshade="true">

            <bean:size id="size" name="searchForm" property="results"/>

            <%--  If Logic value>0, then return the value  --%>
            <logic:greaterThan name="size" value="0">
                <strong><u>Check Search Details</u></strong><BR><BR>
                <table border="1">
                    <tr>
                        <th> Employee Name </th>
                        <th>Social Security Number</th>
                        <th> Department </th>
                        <th> Date Of Joining </th>
                    </tr>
                    <logic:iterate id="result" name="searchForm" property="results">
                        <tr>
                            <td><bean:write name="result" property="name"/></td>
                            <td><bean:write name="result" property="ssNum"/></td>
                            <td><bean:write name="result" property="dept" /></td>
                            <td><bean:write name="result" property="dated" /></td>
                        </tr>
                    </logic:iterate>
                </table>
                <p> Query Search on <strong><bean:write name="searchForm" property="date" /></strong>
                    at the time <strong><bean:write name="searchForm" property="time" /></strong> </p>
                </logic:greaterThan>
            </logic:present>
    </body>
</html>
