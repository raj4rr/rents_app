/*
 * Save as a RegisterAction.java
 * Action Class Of ValidationEx_2 application
 */
package com.myapp.struts;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.validator.DynaValidatorForm;


public class RegisterAction extends org.apache.struts.action.Action {

    /* forward name="" path="" */
    private static final String SUCCESS = "success";

    /**
     * This is the action called from the Struts framework.
     */
    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        DynaValidatorForm validatorForm = (DynaValidatorForm) form;

        String name = (String) validatorForm.get("name");
        Integer number = (Integer) validatorForm.get("number");
        Integer age = (Integer) validatorForm.get("age");
        String email = (String) validatorForm.get("email");
        String gender = (String) validatorForm.get("gender");


        return mapping.findForward(SUCCESS);
    }
}
