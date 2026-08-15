/*
 * Save as a LoginAction.java
 */
package com.myapp.struts;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;

public class LoginAction extends org.apache.struts.action.Action {

    /* forward name="success" path="" */
    private static final String SUCCESS = "success";

    /**
     * This is the action called from the Struts framework.
     * @return
     */
    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        String key = "";
        ActionErrors errors = new ActionErrors();
        //Http Session create
        HttpSession session = request.getSession(true);
        //Create instance of Bean classes
        com.myapp.struts.RegistrationForm registrationForm = (RegistrationForm) session.getAttribute("RegistrationForm");
        com.myapp.struts.LoginForm loginForm = (LoginForm) session.getAttribute("LoginForm");

        //Set Flag
        boolean flag1 = false;
        boolean flag2 = false;
        //Match condition
        if (registrationForm.getUserName().equals(loginForm.getUsername())) {
            flag1 = true;
        } else {
            errors.add("usermatch", new ActionMessage("error.usermatch.required"));
            if (errors.size() != 0) {
                saveErrors(request, errors);
            }
        }
        if (registrationForm.getPassword().equals(loginForm.getPassword())) {
            flag2 = true;
        } else {
            errors.add("passmatch", new ActionMessage("error.passmatch.required"));
            if (errors.size() != 0) {
                saveErrors(request, errors);
            }
        }
        if (flag1 == true && flag2 == true) {
            key = "SUCCESS";
        } else {
            key = "FAILURE";
        }
        return mapping.findForward(key);
    }
}
