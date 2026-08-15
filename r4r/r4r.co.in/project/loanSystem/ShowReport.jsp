<html>
<head>
<title>Shows Report</title>
</head>
<body>
<center><b>
<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%! String PartyName=null; %>
<%! String InterestRate=null; %>
<%! String install=null; %>
<%! String amount=null; %>
<%! String date=null; %>
<%! ResultSet rs2,rs3,rs4; %>
<%! String Disinstall=null; %>
<%! String Disamount=null; %>
<%! String Disdate=null; %>
<%! String Disshare=null; %>
<%! String Disinsuranse=null; %>
<%! String Dismisc=null; %>
<%! String cinterest=null; %>
<%! String cprincipal=null; %>
<%! String osprincipal=null; %>
<%
ses=(String)session.getAttribute("UserName");
if(ses!=null)
{
String msg=null;
String Clanumber=request.getParameter("Branchnumber");

try
{
Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
}
catch(ClassNotFoundException ex)
{
out.println("Error:"+ex.getMessage());
}
try
{
Connection conn=DriverManager.getConnection("jdbc:odbc:DSN");
PreparedStatement stmt=conn.prepareStatement("select * from DataEntry where lanumber=?");
stmt.setString(1,Clanumber);
ResultSet rs=stmt.executeQuery();
if(rs.next())
{
PartyName=rs.getString("name");
InterestRate=rs.getString("interest");
%>
<font size="6" color="#FF0066">Show Reports</font>
<table border="2" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#0000FF" width="48%">
  <tr>
    <td width="50%"><b>
    Name of Party:</b></td>
    <td width="50%"><%=PartyName%></td>
  </tr>
  <tr>
    <td width="50%"><b>
    Rate of Interest:</b></td>
    <td width="50%"><%=InterestRate%></td>
  </tr>
  <tr>
    <td width="50%"><b>
    Duration:</b></td>
    <td width="50%">&nbsp;</td>
  </tr>
</table>
<table border="2" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#800000" width="100%">
  <tr>
    <th width="6%" rowspan="2">Date</th>
    <th width="6%" rowspan="2">Amount Received</th>
    <th width="6%" rowspan="2">Installment Number</th>
    <th width="18%" colspan="3">Penalty</th>
    <th width="18%" colspan="3">Interest</th>
    <th width="18%" colspan="3">Insurance</th>
    <th width="21%" colspan="3">Principle</th>
    <th width="7%" rowspan="2">Out Standing Principal</th>
    <th width="7%" rowspan="2">Others</th>
  </tr>
<tr>
    <th width="6%">Amount</th>
    <th width="6%">Pay</th>
    <th width="6%">Remain</th>
    <th width="6%">Amount</th>
    <th width="6%">Pay</th>
    <th width="6%">Remain</th>
    <th width="6%">Amount</th>
    <th width="6%">Pay</th>
    <th width="6%">Remain</th>
    <th width="7%">Amount</th>
    <th width="7%">Pay</th>
    <th width="7%">Remain</th>
  </tr>
<%
PreparedStatement pst1=conn.prepareStatement("select * from Deposit where lanumber=?");
pst1.setString(1,Clanumber);
rs2=pst1.executeQuery();
PreparedStatement pst2=conn.prepareStatement("select * from Disbarment where lanumber=?");
pst2.setString(1,Clanumber);
rs3=pst2.executeQuery();
while(rs3.next())
{
Disinstall=rs3.getString("install");
Disamount=rs3.getString("amount");
Disdate=rs3.getString("date");
Disshare=rs3.getString("share");
Disinsuranse=rs3.getString("insurance");
Dismisc=rs3.getString("misc");
}
PreparedStatement pst3=conn.prepareStatement("select * from irmanual where interestrate=? and installment=?");
pst3.setString(1,InterestRate);
pst3.setString(2,Disinstall);
rs4=pst3.executeQuery();
while(rs4.next())
{
cinterest=rs4.getString("cinterest");
cprincipal=rs4.getString("cprincipal");
osprincipal=rs3.getString("osprincipal");
}
while(rs2.next())
{install=rs2.getString(2);
amount=rs2.getString(3);
date=rs2.getString(4);

%>
<tr>
    <td width="6%"><%=date%></td>
    <td width="6%"><%=amount%></td>
    <td width="6%"><%=install%></td>
    <td width="6%">&nbsp;</td>
    <td width="6%">&nbsp;</td>
    <td width="6%">&nbsp;</td>
    <td width="6%">&nbsp;</td>
    <td width="6%">&nbsp;</td>
    <td width="6%">&nbsp;</td>
    <td width="6%">&nbsp;</td>
    <td width="6%">&nbsp;</td>
    <td width="6%">&nbsp;</td>
    <td width="7%">&nbsp;</td>
    <td width="7%">&nbsp;</td>
    <td width="7%">&nbsp;</td>
    <td width="7%">&nbsp;</td>
    <td width="7%">&nbsp;</td>
  </tr>
<%
} 

}
else
{
out.println("<center><br><br><b>Computer Genrated Number Does Not Exist</b><br><br><br><a href='DataEntry.jsp'>Click</a>Here To Back</center>");
return;
}

%>

<pre><font size="6">  
</font>
</pre>


  
  
</table>
</b>
<p><input value=" OK  " type="submit" name="OK"> </p>
</center>

</body>

</html>
<%}
catch(SQLException sqlex)
{
out.println("Error:"+sqlex.getMessage());
}
 }
else
{
response.sendRedirect("Unauthorised.htm");
} %>