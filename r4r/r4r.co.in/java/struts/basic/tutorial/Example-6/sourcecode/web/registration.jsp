<%-- 
    Document    : registration.jsp
    Description : Third Page of EmailLogin Application
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Registration page</title>
    </head>
    <body style="background-color:threedlightshadow">

        <html:form action="/registration" method="POST">
        <h1><bean:message key="welcome.heading"/></h1>
        <ul>
             <table border="2" cellpadding="5" cellspacing="6" style="background-color:yellow">
             <tbody>
                 <tr>
                     <td><bean:message key="welcome.userName" />
                         <html:errors property="UserName" />
                     </td>
                     <td><html:text property="userName" size="25" maxlength="10"/> </td>
                 </tr>
                 <tr>
                     <td><bean:message key="welcome.password" />
                       <html:errors property="password" />
                     </td>
                     <td> <html:password property="password" size="25" maxlength="10"/> </td>
                 </tr>
                 <tr>
                     <td><bean:message key="welcome.name" />
                     <html:errors property="name" />
                     </td>
                     <td> <html:text property="name" size="25" maxlength="15"/> </td>
                 </tr>
                 <tr>
                     <td> <bean:message key="welcome.age" />
                     <html:errors property="age" />
                     </td>
                     <td> <html:text property="age" size="25" maxlength="2"/> </td>
                 </tr>
                 <tr>
                     <td> <bean:message key="welcome.email" />
                     <html:errors property="Email Id" />
                     </td>
                     <td> <html:text property="email" size="25" maxlength="25" /> </td>
                 </tr>
                 <tr>
                     <td><bean:message key="welcome.number" />
                     <html:errors property="number" />
                     </td>
                     <td> <html:text property="number" size="25" maxlength="15" /> </td>
                 </tr>
                  <tr>
                     <td> <bean:message key="welcome.address" />
                     <html:errors property="Address" />
                     </td>
                     <td> <html:textarea property="address" cols="20" rows="4" /> </td>
                 </tr>
                 <tr>
                     <td> <bean:message key="welocme.gender" />
                     <html:errors property="gender" />
                     </td>
                     <td><html:radio property="gender" value="Male" />Male
                         &nbsp;&nbsp;&nbsp;<html:radio property="gender" value="feMale" />Female</td>
                 </tr>
                 <tr>
                     <td>&nbsp;&nbsp;<html:submit property="submit" value=" Register "  /></td>
                     <td> &nbsp;&nbsp; <html:reset property="reset" value=" Reset " /></td>
                 </tr>
             </tbody>
         </table>
        </ul>

        </html:form>
    </body>
</html>
