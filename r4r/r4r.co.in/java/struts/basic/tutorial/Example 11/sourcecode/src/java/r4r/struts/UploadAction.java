/*
 * Save as a UploadAction.java
 * Action class of FileUpload Application
 */
package r4r.struts;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.upload.FormFile;

public class UploadAction extends org.apache.struts.action.Action {

    /* forward name="success" path="" */
    private static final String SUCCESS = "success";
    private FileOutputStream outputStream = null;
    
    /**
     * This is the action called from the Struts framework.
     */
    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        UploadForm uploadForm = (UploadForm) form;
        //Processing FormFile request
        FormFile formFile = null;

        try {
            formFile = uploadForm.getDocument();
            //Get the original path of the file
            String path = getServlet().getServletContext().getRealPath("") + "/" + formFile.getFileName();
            //Open the OutputStream and pass file path in it
            outputStream = new FileOutputStream(new File(path));
            //Provide the size of file in OutputStream
            outputStream.write(formFile.getFileData());
            
        } catch (Exception e) {
            throw new IOException(e.fillInStackTrace());
            //Now close the OutputStream if it upload our file
        } finally {
            if (outputStream != null) {
                outputStream.close();
            }
            //Set the property into Bean class
            uploadForm.setDocument(formFile);

            //Set Size property into JSP page
            request.setAttribute("SizeofFile", formFile.getFileSize());
        }
        return mapping.findForward(SUCCESS);
    }
}

 
