/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.myapp.struts;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.upload.FormFile;
import org.apache.struts.validator.DynaValidatorForm;

public class UploadAction extends org.apache.struts.action.Action {

    /* forward name="" path="" */
    private static final String SUCCESS = "success";
    private FileOutputStream outputStream = null;
    FormFile formFile = null;

    /**
     * This is the action called from the Struts framework.
     * @return
     */
    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        DynaValidatorForm validatorForm = (DynaValidatorForm) form;

        String name = (String) validatorForm.get("name");
        formFile = (FormFile) validatorForm.get("document");

        try {
            String path = getServlet().getServletContext().getRealPath("") + "/" + formFile.getFileName();
            outputStream = new FileOutputStream(new File(path));
            outputStream.write(formFile.getFileData());
        } catch (FileNotFoundException e) {
            throw new FileNotFoundException(e.getMessage());
        } finally {
            if (outputStream != null) {
                outputStream.close();
            }
        }
        validatorForm.set("document", formFile);
        request.setAttribute("SizeOfFile", formFile.getFileSize());
        return mapping.findForward(SUCCESS);
    }
}
