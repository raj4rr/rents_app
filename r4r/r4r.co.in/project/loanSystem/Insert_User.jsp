<%@ page import="java.sql.*" errorPage="errorpage.jsp" language="java" %>
<%

int flag=0;
String userName=request.getParameter("userName");
String password=request.getParameter("password");
String cpassword=request.getParameter("cpassword");
String FirstName=request.getParameter("FirstName");
String MiddleName=request.getParameter("MiddleName");
String LastName=request.getParameter("LastName");
String Address1=request.getParameter("Address1");
String Address2=request.getParameter("Address2");
String City=request.getParameter("City");
String State=request.getParameter("State");
String Pincode=request.getParameter("PinCode");
String Emailid=request.getParameter("EmailID");
String PhoneNumber=request.getParameter("PhoneNumber");

Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
Connection conn=DriverManager.getConnection("jdbc:odbc:DSN");

PreparedStatement stat=conn.prepareStatement("SELECT * FROM auth where username=?");		
        stat.setString(1,userName);
	ResultSet rs = stat.executeQuery();
        if(rs.next())
		{
			flag=1;
			%>
			<SCRIPT language="JavaScript">
			alert("User name already exists");
			location.href="NewUser.html";
			</SCRIPT>
			<%
		}
		else
		{
			flag=0; 
		}


if(flag==0)
{
PreparedStatement stat1=conn.prepareStatement("INSERT INTO auth values(?,?)");
			stat1.setString(1,userName);
			stat1.setString(2,password);
                        stat1.execute();
                        stat1.close();
PreparedStatement pstmt=conn.prepareStatement("insert into  NewUser values(?,?,?,?,?,?,?,?,?,?,?,?)");
pstmt.setString(1,userName);
pstmt.setString(2,password);
pstmt.setString(3,FirstName);
pstmt.setString(4,MiddleName);
pstmt.setString(5,LastName);
pstmt.setString(6,Address1);
pstmt.setString(7,Address2);
pstmt.setString(8,City);
pstmt.setString(9,State);
pstmt.setString(10,Pincode);
pstmt.setString(11,Emailid);
pstmt.setString(12,PhoneNumber);
pstmt.execute();
pstmt.close();
conn.close();

response.sendRedirect("Success.jsp");
}

%>
