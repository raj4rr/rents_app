/*
 * Save as a RegisterAction.java
 */
package r4r.struts;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;
import org.apache.struts.action.DynaActionForm;

public class RegisterAction extends org.apache.struts.action.Action {

    /* forward name="" path="" */
    private static final String SUCCESS = "success";
    private static final String FAILURE = "failure";

    /**
     * This is the action called from the Struts framework.
     * @return
     */
    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        ActionErrors errors = new ActionErrors();

        //Make the instance of DynaActionForm Here
        DynaActionForm actionForm = (DynaActionForm) form;

        /* ---- Call the property from DynaActionForm ---- */
        String RegUserName = (String) actionForm.get("RegUserName");
        String RegPassword = (String) actionForm.get("RegPassword");
        String RegName = (String) actionForm.get("RegName");
        String email = (String) actionForm.get("email");
        int RegNumber = (Integer) actionForm.get("RegNumber");

        /*----- Set up validation into register.jsp page -- */
        if (RegUserName == null || RegUserName.length() < 1) {
            errors.add("RegUserName", new ActionMessage("error.userName"));
        }
        if (RegPassword == null || RegPassword.length() < 1) {
            errors.add("password", new ActionMessage("error.password"));
        }
        if (RegName == null || RegName.length() < 1) {
            errors.add("RegName", new ActionMessage("error.RegName"));
        }
        if (email.equals("") || email.indexOf('@') == -1 || email.indexOf('.') == -1
                || email.indexOf("@@") != -1 || email.indexOf("..") != -1) {
            errors.add("email", new ActionMessage("error.email"));
        }
        if (RegNumber == 0) {
            errors.add("RegNumber", new ActionMessage("error.RegNumber"));
        }

        //Save the specified error messages in HTTP request attribute
        saveErrors(request, errors);
        if (errors.isEmpty()) {
            return mapping.findForward(SUCCESS);
        } else {
            return mapping.findForward(FAILURE);
        }
    }
}
