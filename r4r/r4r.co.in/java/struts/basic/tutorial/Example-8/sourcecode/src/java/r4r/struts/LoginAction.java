/*
 * Save as a LoginAction.java
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

public class LoginAction extends org.apache.struts.action.Action {

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
        //DynaActionForm call here
        DynaActionForm actionForm = (DynaActionForm) form;
        boolean flag1 = false;
        boolean flag2 = false;
        boolean flag3 = false;

        /* --- index.jsp page property ---  */
        String LoginName = (String) actionForm.get("LoginName");
        String LoginPassword = (String) actionForm.get("LoginPassword");

        /* --- Register.jsp page property ---  */
        String RegUserName = (String) actionForm.get("RegUserName");
        String RegPassword = (String) actionForm.get("RegPassword");

        /*----- Set up validation into index.jsp page -- */
        if (LoginName == null || LoginName.length() < 1) {
            errors.add("RegUserName", new ActionMessage("error.userName"));
        }
        if (LoginPassword == null || LoginPassword.length() < 1) {
            errors.add("password", new ActionMessage("error.password"));
        }
        //Save the specified error messages in HTTP request attribute
        saveErrors(request, errors);
        if (errors.isEmpty()) {
            flag1 = true;
        } else {
            flag1 = false;
        }

        //Match the Data from two different Pages
        if (LoginName.equals(RegUserName)) {
            flag2 = true;
        } else {
            errors.add("userMatch", new ActionMessage("error.userMatch"));
            if (errors.size() != 0) {
                saveErrors(request, errors);
            }
        }
        if (LoginPassword.equals(RegPassword)) {
            flag3 = true;
        } else {
            errors.add("passMatch", new ActionMessage("error.passMatch"));
            if (errors.size() != 0) {
                saveErrors(request, errors);
            }
        }

        //Checking flags condition
        if (flag1 == true && flag2 == true && flag3 == true) {
            return mapping.findForward(SUCCESS);
        } else {
            return mapping.findForward(FAILURE);
        }
    }
}
