<%@ page import="java.sql.*"  errorPage="errorpage.jsp" language="java"  %>
<%! String ses=null; %>
<%
ses=(String)session.getAttribute("UserName");
if(ses!=null){ 
%>
<html>
<head><title>Party Details Page</title>
</head>
<body>
<Script Language="JavaScript">
function Validate()
{
if(document.frm.LANumber.value=="")
{
alert("Loan Account Number Must Be Enter");
return document.frm.LANumber.focus();
}
if(document.frm.CLANumber.value=="")
{
alert("Computer Loan Account Number Must Be Enter");
return document.frm.CLANumber.focus();
}
if(document.frm.Name.value=="")
{
alert("Name Of The Member Must Be Enter");
return document.frm.Name.focus();
}
if(document.frm.DOB1.value=="")
{
alert("Date Of Birth Must Be Enter");
return document.frm.DOB1.focus();
}

if(document.frm.HFName.value=="")
{
alert("Husband/Father Name Must Be Enter");
return document.frm.HFName.focus();
}
if(document.frm.Name2.value=="")
{
alert("Name Must Be Enter");
return document.frm.Name2.focus();
}
if(document.frm.DOB2.value=="")
{
alert("Date Of Birth Must Be Enter");
return document.frm.DOB2.focus();
}

if(document.frm.HF2.value=="")
{
alert("Husband/Father Name Must Be Enter");
return document.frm.HF2.focus();
}
if(document.frm.AD1.value=="")
{
alert("Address Must Be Enter");
return document.frm.AD1.focus();
}

if(document.frm.City.value=="")
{
alert("City Must Be Enter");
return document.frm.City.focus();
}

if(document.frm.State.value=="")
{
alert("State Must Be Enter");
return document.frm.State.focus();
}

if(document.frm.National.value=="")
{
alert("Nationality Must Be Enter");
return document.frm.National.focus();
}

if(document.frm.PinCode.value=="")
{
alert("Pin Code Must Be Enter");
return document.frm.PinCode.focus();
}

if(document.frm.ADP1.value=="")
{
alert("Address Of Property Must Be Enter");
return document.frm.ADP1.focus();
}

if(document.frm.PCity.value=="")
{
alert("City Of Prpoperty Must Be Enter");
return document.frm.PCity.focus();
}

if(document.frm.PState.value=="")
{
alert("Property Of State Must Be Enter");
return document.frm.PState.focus();
}

if(document.frm.PPinCode.value=="")
{
alert("Property Of Pin Code Must Be Enter");
return document.frm.PPinCode.focus();
}

if(document.frm.Number.value=="")
{
alert("Contect Number Must Be Enter");
return document.frm.Number.focus();
}

if(document.frm.Imembernumber.value=="")
{
alert("Insured Member Number Must Be Enter");
return document.frm.Imembernumber.focus();
}
if(document.frm.LSAmount.value=="")
{
alert("Loan senctioned Amount Must Be Enter");
return document.frm.LSAmount.focus();
}

if(document.frm.SANumber.value=="")
{
alert("Section Account Number Must Be Enter");
return document.frm.SANumber.focus();
}

if(document.frm.Interest.value=="")
{
alert("Rate Of Interest Must Be Enter");
return document.frm.Interest.focus();
}

if(document.frm.Tenure.value=="")
{
alert("Tenure Must Be Enter");
return document.frm.Tenure.focus();
}
document.frm.action="Insert_DataEntry.jsp";
document.frm.submit();

}
</Script>
<center>
<div align="left"><a href="Admin.jsp">Home</a></div>
<div align="center"><b>User Name:</b><i><%=ses %></i></div>
<div align="Right"><a href="Logout.jsp">Logout</a></div>
<h1><font size="6" color="#FF0000">Party Details<br>

</font><font color="#FF0000" size="4" face="Arial">*</font><font size="2" face="Arial">Must 
be Enter</font></h1>
<form name="frm">
<table border="2" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#0000FF" width="50%">
  <tr>
    <td width="50%">Branch Loan Account Number<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="LANumber" size="20" tabindex="1"></td>
  </tr>
  <tr>
    <td width="50%">Computer Loan Account Number<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="CLANumber" size="20" tabindex="2"></td>
  </tr>
  <tr>
    <td width="100%" colspan="2"><b>Name1 OF The Member</b><font color="#FF0000">*</font></td>
  </tr>
  <tr>
    <td width="50%">Name<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="Name" size="20" tabindex="3"></td>
  </tr>
  <tr>
    <td width="50%">Date Of Birth<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="DOB1" size="20" tabindex="4"></td>
  </tr>
  <tr>
    <td width="50%">Husband/Father Name<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="HFName" size="20" tabindex="5"></td>
  </tr>
  <tr>
    <td width="100%" colspan="2"><b>Name2 OF The Member</b><font color="#FF0000">*</font></td>
  </tr>
  <tr>
    <td width="50%">Name<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="Name2" size="20" tabindex="6"></td>
  </tr>
  <tr>
    <td width="50%">Date Of Birth<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="DOB2" size="20" tabindex="7"></td>
  </tr>
  <tr>
    <td width="50%">Husband/Father Name<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="HF2" size="20" tabindex="8"></td>
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
    <td width="50%"><input type="text" name="AD1" size="20" tabindex="12"></td>
  </tr>
  <tr>
    <td width="50%">&nbsp;</td>
    <td width="50%"><input type="text" name="AD2" size="20" tabindex="13"></td>
  </tr>
  <tr>
    <td width="50%">City<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="City" size="20" tabindex="14"></td>
  </tr>
  <tr>
    <td width="50%">State<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="State" size="20" tabindex="15"></td>
  </tr>
  <tr>
    <td width="50%">Nationality<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="National" size="20" tabindex="16"></td>
  </tr>
  <tr>
    <td width="50%">Pin Code<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="PinCode" size="20" tabindex="17"></td>
  </tr>
  <tr>
    <td width="100%" colspan="2"><b>Address OF Property</b><font color="#FF0000">*</font></td>
  </tr>
  <tr>
    <td width="50%">&nbsp;</td>
    <td width="50%"><input type="text" name="ADP1" size="20" tabindex="18"></td>
  </tr>
  <tr>
    <td width="50%">&nbsp;</td>
    <td width="50%"><input type="text" name="ADP2" size="20" tabindex="19"></td>
  </tr>
  <tr>
    <td width="50%">City<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="PCity" size="20" tabindex="20"></td>
  </tr>
  <tr>
    <td width="50%">State<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="PState" size="20" tabindex="21"></td>
  </tr>
  <tr>
    <td width="50%">Nationality<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="PNational" size="20" tabindex="22"></td>
  </tr>
  <tr>
    <td width="50%">Pin Code<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="PPinCode" size="20" tabindex="23"></td>
  </tr>
  <tr>
    <td width="50%">Contact Number<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="Number" size="20" tabindex="24"></td>
  </tr>
  <tr>
    <td width="50%">Insured Member Name<font color="#FF0000">*</font></td>
    <td width="50%">
    <input type="text" name="Imembernumber" size="20" tabindex="25"></td>
  </tr>
  <tr>
    <td width="50%">Second Insured Number<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="SANumber" size="20" tabindex="26"></td>
  </tr>
  <tr>
    <td width="50%">Loan Sectioned amount (Rs)</td>
    <td width="50%"><input type="text" name="LSAmount" size="20" tabindex="27"></td>
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
    <td width="50%"><input type="text" name="Interest" size="20" tabindex="32"></td>
  </tr>
  <tr>
    <td width="50%">Tenure<font color="#FF0000">*</font></td>
    <td width="50%"><input type="text" name="Tenure" size="20" tabindex="33"></td>
  </tr>
  </table>
  <b>
  <table><tr><td><b>
    <input type="button" value="    SAVE" name="SAVE" onclick="Validate();" tabindex="34"></b><input type="reset" value="Reset" name="Reset" tabindex="35"><b><input type="button" value="Cancel" name="Cancel" tabindex="36"></td></tr></table>
  
</form>
</center>
</b>
</body>
</html>
<% }
else
{
response.sendRedirect("session.html");
}
%>