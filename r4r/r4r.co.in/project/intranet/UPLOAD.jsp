<%@  page errorPage="errorpage.jsp" %>
 
<%@ page import="java.util.List" %>
   <%@ page import="java.util.Iterator" %>
   <%@ page import="java.io.File" %>
   <%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
   <%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
   <%@ page import="org.apache.commons.fileupload.*"%>
   <%@ page contentType="text/html;charset=UTF-8" language="java" %>
   <center><table border="2">
        
   <%
 boolean isMultipart = ServletFileUpload.isMultipartContent(request);
 if (!isMultipart) {
 } else {
	   FileItemFactory factory = new DiskFileItemFactory();
	   ServletFileUpload upload = new ServletFileUpload(factory);
	   List items = null;
	   try {
		   items = upload.parseRequest(request);
	   } catch (FileUploadException e) {
		   e.printStackTrace();
	   }
	   Iterator itr = items.iterator();
	   while (itr.hasNext()) {
	   FileItem item = (FileItem) itr.next();
	   if (item.isFormField()) {
	   } else {
		   try {
			   String itemName = item.getName();
			   File savedFile = new File(""+itemName);
			   item.write(savedFile);  
				session.putValue("file",itemName);	

		   } catch (Exception e) {
			   e.printStackTrace();
		   }
	   }
	   }
   }			   out.println("<CENTER><marquee><H1> <u>Intranet Mailing System </u> </H1></marquee>	</CENTER><tr><td><b>Your files have been saved.</td></tr>");
                           out.println("<a href='WriteMial.jsp'>Back</a>");
   %>
    </table>
   </center>