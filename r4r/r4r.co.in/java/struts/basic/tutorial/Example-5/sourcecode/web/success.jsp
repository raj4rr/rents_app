<%-- 
    Document    : success
    Description : Third Page of lotteryDraw Application
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>success Page</title>
    </head>
    <body>
        <h1>Hello Guest! Please Note down your Number </h1>
        <ul>
            <table border="1" cellspacing="5" cellpadding="5" style="border-color:lime">
                <tbody>
                    <tr>
                        <td>Today Date:</td>
                        <td><strong> <bean:write name="LotteryForm" property="date"/></strong></td>
                    </tr>
                    <tr>
                        <td>Selected Lottery:</td>
                        <td><strong> <bean:write name="LotteryForm" property="lottery"/> </strong></td>
                    </tr>
                    <tr>
                        <td>Lottery Number:</td>
                        <td><strong> <bean:write name="LotteryForm" property="number"/> </strong></td>
                    </tr>
                </tbody>
            </table>

        </ul>
        <ul><p>Good Luck for draw,
                Wish to Play again, then <a style="cursor: auto;color: green" href="index.jsp">Click</a> here.
        </ul>

    </body>
</html>
