/*
 * Save as a UploadForm.java
 * Bean class of FileUpload Application
 */
package r4r.struts;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;
import org.apache.struts.upload.FormFile;


public class UploadForm extends org.apache.struts.action.ActionForm {

    private String name = null;
    private FormFile document = null;

    public String getName() {
        return name;
    }

    public void setName(String string) {
        name = string;
    }

    public FormFile getDocument() {
        return document;
    }

    public void setDocument(FormFile document) {
        this.document = document;
    }

    public UploadForm() {
        super();
    }

    //Reset method
    @Override
    public void reset(ActionMapping mapping, HttpServletRequest request) {
        name = null;
        document = null;
    }

    /*
     * This is the action called from the Struts framework.
     */
    @Override
    public ActionErrors validate(ActionMapping mapping, HttpServletRequest request) {
        ActionErrors errors = new ActionErrors();
        if (name == null || name.length() < 1) {
            errors.add("name", new ActionMessage("error.name.required"));
        }
        if (document.getFileSize() == 0) {
            errors.add("Zerosize", new ActionMessage("error.Zerosize.required"));
        }
        return errors;
    }
}
