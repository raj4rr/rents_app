<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>

<html:html xhtml="true">
    <head>
         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><bean:message key="welcome.title"/></title>
        <html:base/>
    </head>
  <!--  <body style="background-color: #f5eabe"> -->
    <body style="background-color: #E0EFAB" >
      <!-- action= parameter which call Action class, for this check your Action mapping in struts-config.xml file  -->
        <html:form action="/login" method="post">
            <h1><bean:message key="welcome.heading" /></h1>
            <h2><bean:message key="welcome.message"/></h2>
        
            <BR>
            <!-- Add error to the page  -->
            <html:errors property="area"/>
            <b><bean:message key="welcome.login.message" /></b>
            <BR style="background-color: #996699 "><html:textarea property="area" rows="5" cols="20" />
            <BR><BR>
            <html:submit value=" Froward " property="submit" />

            <html:reset value=" Reset " property="reset" />
        </html:form>
    </body>
</html:html>
