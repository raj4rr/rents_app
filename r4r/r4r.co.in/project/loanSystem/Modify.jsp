<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%
ses=(String )session.getAttribute("UserName");
if(ses!=null)
{
%>
<html>
<head><title>Party Details  Page->>By Renu Singh</title>
</head>
<body>
<Script Language="JavaScript">
function Validate()
{
if(document.frm.LANumber.value=="" && document.frm.CLANumber.value=="")
{
alert("LaNumber or CLANumber Must BE Enter");
return document.frm.LaNumber.focus();
}

if(document.frm.Name.value=="")
{
alert("Name Must Be Enter");
return document.frm.Name.focus();
}
if(document.frm.DOB1.value=="")
{
alert("Date Of Birth Must Be Enter");
return document.frm.DOB1.focus();
}
if(document.frm.DOB2.value=="")
{
alert("Date Of Birth Must Be Enter");
return document.frm.DOB2.focus();
}
if(document.frm.HFName.value=="")
{
alert("Husband/Father Name Must Be Enter");
return document.frm.HFName.focus();
}
if(document.frm.Name2.value=="")
{
alert("Name2 Must Be Enter");
return document.frm.Name2.focus();
}
if(document.frm.HF2.value=="")
{
alert("Husbannd/Father Name Must Be Enter");
return document.frm.HF2.focus();
}
if(document.frm.AD1.value=="")
{
alert("Address1 Must Be Enter");
return document.frm.AD1.focus();
}

if(document.frm.City.value=="")
{
alert("City Must Be Enter");
return document.frm.City.focus();
}
if(document.frm.National.value=="")
{
alert("Nationalty Must Be Enter");
return document.frm.National.focus();
}
if(document.frm.State.value=="")
{
alert("State Must Be Enter");
return document.frm.State.focus();
}
if(document.frm.PinCode.value=="")
{
alert("Pincode Must Be Enter");
return document.frm.PinCode.focus();
}
if(document.frm.ADP1.value=="")
{
alert("ADP1 Must Be Enter");
return document.frm.ADP1.focus();
}

if(document.frm.PCity.value=="")
{
alert("PCity Must Be Enter");
return document.frm.PCity.focus();
}
if(document.frm.PState.value=="")
{
alert("PState Must Be Enter");
return document.frm.PState.focus();
}
if(document.frm.PNational.value=="")
{
alert("PNational Must Be Enter");
return document.frm.PNational.focus();
}
if(document.frm.PPinCode.value=="")
{
alert("PPincode Must Be Enter");
return document.frm.PPinCode.focus();
}
if(document.frm.Number.value=="")
{
alert("Number Must Be Enter");
return document.frm.Number.focus();
}
if(document.frm.Imembernumber.value=="")
{
alert("CLANumber Must Be Enter");
return document.frm.Imembernumber.focus();
}
if(document.frm.SANumber.value=="")
{
alert("SANumber Must Be Enter");
return document.frm.SANumber.focus();
}
if(document.frm.LSAmount.value=="")
{
alert("LSAmount Must Be Enter");
return document.frm.LSAmount.focus();
}
if(document.frm.Interest.value=="")
{
alert("Interest Must Be Enter");
return document.frm.Interest.focus();
}
if(document.frm.Tenure.value=="")
{
alert("Tenure Must Be Enter");
return document.frm.Tenure.focus();
}
document.frm.action="UpdateModify.jsp";
document.frm.submit();

}
</SCRIPT>



<%
String LaNumber=request.getParameter("Branchnumber");
String CLANumber=request.getParameter("Computernumber");
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
Statement pstmt=conn.createStatement();
ResultSet rs;
if(LaNumber==null)
rs=pstmt.executeQuery("select * from DataEntry where  clanumber='"+CLANumber+"'");
else
rs=pstmt.executeQuery("select * from DataEntry where lanumber='"+LaNumber+"'");
while(rs.next())
{
String name=rs.getString("name");
String dob1=rs.getString("dob1");
String hfname=rs.getString("hfname");
String name2=rs.getString("name2");
String dob2=rs.getString("dob2");
String hf2=rs.getString("hf2");
String ad1=rs.getString("ad1");
String city=rs.getString("city");
String state=rs.getString("state");
String national=rs.getString("national");
String pincode=rs.getString("pincode");
String adp1=rs.getString("adp1");
String pcity=rs.getString("pcity");
String pstate=rs.getString("pstate");
String pnational=rs.getString("pnational");
String ppincode=rs.getString("ppincode");
String number=rs.getString("number");
String imembernumber=rs.getString("imembernumber");
String lsamount=rs.getString("lsamount");
String sannumber=rs.getString("sannumber");
String tenure=rs.getString("tenure");
String interest=rs.getString("interest");


%>


<center><h1><font size="6" color="#003333">Party Details</font><font size="6" color="#FF0000"><br>
</font><font color="#FF0000" size="4" face="Arial">*</font><font size="2" face="Arial">Must 
be Enter</font></h1>
<p><br><br><div align="left"><a href="Admin.jsp">Home</a></div>
<div align="right"><a href="Logout.html">Logout</a></div></p>

<form name="frm" >
<table border="2" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#0000FF" width="50%">
  <tr>
    <td width="50%">Branch Loan Account Number<font color="#FF0000">*</font></td>
    <td width="50%">
    <input type="text" name="LANumber" size="20" value="<%=LaNumber %>" tabindex="1" value="rerer"></td>
  </tr>
  <tr>
    <td width="50%">Computer Loan Account Number<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="CLANumber" size="20" value="<%=CLANumber %>" tabindex="2"></td>
  </tr>
  <tr>
    <td width="100%" colspan="2"><b>Name1 OF The Member</b><font color="#FF0000">*</font></td>
  </tr>
  <tr>
    <td width="50%">Name<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="Name" size="20" value="<%=name %>" tabindex="3"></td>
  </tr>
  <tr>
    <td width="50%">Date Of Birth<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="DOB1" size="20" value="<%=dob1 %>" tabindex="4"></td>
  </tr>
  <tr>
    <td width="50%">Husband/Father Name<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="HFName" size="20" value="<%=hfname %>" tabindex="5"></td>
  </tr>
  <tr>
    <td width="100%" colspan="2"><b>Name2 OF The Member</b><font color="#FF0000">*</font></td>
  </tr>
  <tr>
    <td width="50%">Name<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="Name2" size="20" value="<%=name2 %>" tabindex="6"></td>
  </tr>
  <tr>
    <td width="50%">Date Of Birth<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="DOB2" size="20" value="<%=dob2 %>" tabindex="7"></td>
  </tr>
  <tr>
    <td width="50%">Husband/Father Name<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="HF2" size="20" value="<%=hf2 %>" tabindex="8"></td>
  </tr>
  <tr>
    <td width="100%" colspan="2"><b>Name3 OF The Member</b></td>
  </tr>
  <tr>
    <td width="50%">Name</td>
    <td width="50%"><input type="text" name="Name3" size="20" tabindex="9"></td>
  </tr>
  <tr>
    <td width="50%">Date Of Birth</td>
    <td width="50%"><input type="text" name="DOB3" size="20" tabindex="10"></td>
  </tr>
  <tr>
    <td width="50%">Husband/Father Name</td>
    <td width="50%"><input type="text" name="HF3" size="20" tabindex="11"></td>
  </tr>
  <tr>
    <td width="100%" colspan="2"><b>Address OF Corresponds</b><font color="#FF0000">*</font><b> </b></td>
  </tr>
  <tr>
    <td width="50%">&nbsp;</td>
    <td width="50%"><input type="text" name="AD1" size="20" value="<%=ad1 %>" tabindex="12"></td>
  </tr>
  <tr>
    <td width="50%">&nbsp;</td>
    <td width="50%"><input type="text" name="AD2" size="20"  tabindex="13"></td>
  </tr>
  <tr>
    <td width="50%">City<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="City" size="20" value="<%=city %>" tabindex="14"></td>
  </tr>
  <tr>
    <td width="50%">State<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="State" size="20" value="<%=state %>" tabindex="15"></td>
  </tr>
  <tr>
    <td width="50%">Nationality<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="National" size="20" value="<%=national %>" tabindex="16"></td>
  </tr>
  <tr>
    <td width="50%">Pin Code<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="PinCode" size="20" value="<%=pincode %>" tabindex="17"></td>
  </tr>
  <tr>
    <td width="100%" colspan="2"><b>Address OF Property</b><font color="#FF0000">*</font></td>
  </tr>
  <tr>
    <td width="50%">&nbsp;</td>
    <td width="50%"><input type="text" name="ADP1" size="20" value="<%=adp1 %>" tabindex="18"></td>
  </tr>
  <tr>
    <td width="50%">&nbsp;</td>
    <td width="50%"><input type="text" name="ADP2" size="20" tabindex="19"></td>
  </tr>
  <tr>
    <td width="50%">City<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="PCity" size="20" value="<%=pcity %>"tabindex="20"></td>
  </tr>
  <tr>
    <td width="50%">State<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="PState" size="20" value="<%=pstate %>" tabindex="21"></td>
  </tr>
  <tr>
    <td width="50%">Nationality<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="PNational" size="20" value="<%=pnational %>" tabindex="22"></td>
  </tr>
  <tr>
    <td width="50%">Pin Code<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="PPinCode" size="20" value="<%=ppincode %>" tabindex="23"></td>
  </tr>
  <tr>
    <td width="50%">Contact Number<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="Number" size="20" value="<%=number %>" tabindex="24"></td>
  </tr>
  <tr>
    <td width="50%">Insured Member Name<font color="#FF0000">*</font></td>
    <td width="50%">
    <input type="text" name="Imembernumber" size="20" value="<%=imembernumber %>" tabindex="25"></td>
  </tr>
  <tr>
    <td width="50%">Second Insured Number<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="SANumber" size="20" value="<%=sannumber %>" tabindex="26"></td>
  </tr>
  <tr>
    <td width="50%">Loan Sectioned amount (Rs)</td>
    <td width="50%"><input type="text" name="LSAmount" size="20" value="<%=lsamount %>" tabindex="27"></td>
  </tr>
  <tr>
    <td width="50%">Sanctioned Date</td>
    <td width="50%">DD<select size="1" name="D1" tabindex="29">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
    <option value="11">11</option>
    <option value="12">12</option>
    <option value="13">13</option>
    <option value="14">14</option>
    <option value="15">15</option>
    <option value="16">16</option>
    <option value="17">17</option>
    <option value="18">18</option>
    <option value="19">19</option>
    <option value="20">20</option>
    <option value="21">21</option>
    <option value="22">22</option>
    <option value="23">23</option>
    <option value="24">24</option>
    <option value="25">25</option>
    <option value="26">26</option>
    <option value="27">27</option>
    <option value="28">28</option>
    <option value="29">29</option>
    <option value="30">30</option>
    <option value="31">31</option>
    </select>MM<select size="1" name="D2" tabindex="30">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
    <option value="11">11</option>
    <option value="12">12</option>
    </select>YY<select size="1" name="D3" tabindex="31">
    
    <option value="1999">1990</option>
    <option value="1991">1991</option>
    <option value="1992">1992</option>
    <option value="1993">1993</option>
    <option value="1994">1994</option>
    <option value="1995">1995</option>
    <option value="1996">1996</option>
    <option value="1997">1997</option>
    <option value="1998">1998</option>
    <option value="1999">1999</option>
    <option value="2000">2000</option>
    <option value="2001">2001</option>
    <option value="2002">2002</option>
    <option value="2003">2003</option>
    <option value="2004">2004</option>
    <option value="2005">2005</option>
    <option value="2006">2006</option>
    <option value="2007" selected>2007</option>
    <option value="2008">2008</option>
    <option value="2009">2009</option>
    <option value="2010">2010</option>
    <option value="2011">2011</option>
    <option value="2012">2012</option>
    <option value="2013">2013</option>
    <option value="2014">2014</option>
    <option value="2015">2015</option>
    <option value="2016">2016</option>
    <option value="2017">2017</option>
    <option value="2018">2018</option>
    <option value="2019">2019</option>
    <option value="2020">2020</option>
    
    </select></td>
  </tr>
  <tr>
    <td width="50%">Rate OF Interest<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="Interest" size="20" value="<%=interest %>" tabindex="32"></td>
  </tr>
  <tr>
    <td width="50%">Tenure<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="Tenure" size="20" value="<%=tenure %>" tabindex="33"></td>
  </tr>
  
  </table>
  <b>
  <table><tr><td><b>
    <input type="button" value="Modify" onclick="Validate();"name="B1" tabindex="34"></b><input type="reset" value="Reset" name="Reset" tabindex="35"><b><input type="button" value="Cancel" name="Cancel" tabindex="36"></td></tr></table>
  
</form>
</center>
<% } 
}
catch(SQLException sql)
{
out.println("Error:"+sql);
}
%> </b>
</body>
</html>
<% }
else
{
response.sendRedirect("Unauthorised.htm");
} %>