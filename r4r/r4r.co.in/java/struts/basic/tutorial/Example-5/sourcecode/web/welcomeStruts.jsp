<%--
    Document    : welcomeStruts.jsp
    Description : Second Page of lotteryDraw Application
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

        <logic:notPresent name="org.apache.struts.action.MESSAGE" scope="application">
            <div  style="color: red">
                ERROR:  Application resources not loaded -- check servlet container
                logs for error messages.
            </div>
        </logic:notPresent>

        <html:form method="post" action="/lottery" >
            <h3 align="center"><bean:message key="welcome.heading"/></h3>
            <p align="center"><bean:message key="welcome.message"/></p>
            <hr align="center" width="600" size="2">

            <table align="center" border="1" cellspacing="8" cellpadding="9" style="border-color: #0000FF ">

                <tbody>
                    <tr>
                        <td><html:errors property="age" />
                            <html:errors property="shortAge" />
                            <bean:message key="welcome.age" />
                        </td>
                        <td><html:text property="age" maxlength="2" size="20"/></td>
                    </tr>
                    <tr>
                        <td><html:errors property="lottery" />
                            <bean:message key="welcome.select" />
                        </td>
                        <td> <select name="lottery" size="1">
                                <option value=" malamaal weekly "> Malamaal weekly </option>
                                <option value="Mega Million">Mega Million</option>
                                <option value="Super Lotto">Super Lotto</option>
                                <option value="Fantasy 5">Fantasy 5</option>
                                <option value="Big Spin">Big Spin</option>
                                <option value="Daily Derby">Daily Derby</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td align="center"><html:submit property="submit" value=" Play " /></td>
                        <td align="center"><html:reset property="reset" value=" Reset "/></td>
                    </tr>
                </tbody>
            </table>
                    <font face="Arial" size="3" color="#008000">  <p align="center">When you click Play button, your lottery number will be generated. </p> </font>
        </html:form>
    </body>
</html:html>
