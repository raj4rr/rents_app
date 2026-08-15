/*
 * Save as a UploadAction.java
 * Action class of FileUpload_2 application
 */
package com.myapp.struts;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;
import org.apache.struts.action.DynaActionForm;
import org.apache.struts.upload.FormFile;

public class UploadAction extends org.apache.struts.action.Action {

    /* forward name="" path="" */
    private static final String SUCCESS = "success";
    private static final String FAILURE = "failure";

    private FileOutputStream outputStream = null;
     private FormFile formFile = null;

    /**
     * This is the action called from the Struts framework.
     */
    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        DynaActionForm actionForm = (DynaActionForm) form;
        ActionErrors errors = new ActionErrors();

        //Set up flag
        boolean flag1 = false;

        // Provide validation into JSP page
        String name = (String) actionForm.get("name");
        formFile = (FormFile) actionForm.get("document");

        if (name == null || name.length() < 1) {
            errors.add("name", new ActionMessage("error.name"));
        }
        if (formFile.getFileSize() == 0) {
            errors.add("size", new ActionMessage("error.size"));
        }
       //Save error messages keys into HTTP request attribute for use by the <html:errors> tag
        saveErrors(request, errors);
        if (errors.isEmpty()) {
            flag1 = true;
        } else {
            flag1 = false;
        }

        // Now Upload document into Browser
        try {
            //Provide the real path of document
            String path = getServlet().getServletContext().getRealPath("") + "/" + formFile.getFileName();
            outputStream = new FileOutputStream(new File(path));
            outputStream.write(formFile.getFileData());
        } catch (IOException ex) {
            // throw new IOException(ex.fillInStackTrace());
        } finally {
            if (outputStream != null) {
                outputStream.close();
            }
        }
        //set property of document in DynaActionForm
        actionForm.set("document", formFile);
        //Set property direct into JSP page
        request.setAttribute("SizeofFile", formFile.getFileSize());


        if (flag1 == true) {
            return mapping.findForward(SUCCESS);
        } else {
            return mapping.findForward(FAILURE);
        }
    }
}

