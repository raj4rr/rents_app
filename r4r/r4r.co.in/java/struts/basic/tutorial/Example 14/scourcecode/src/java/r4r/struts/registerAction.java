/*
 * Save as a registerAction.java
 * Action class of ValidationEx_1 application
 */
package r4r.struts;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.validator.DynaValidatorForm;


public class registerAction extends org.apache.struts.action.Action {

    /* forward name="" path="" */
    private static final String SUCCESS = "success";
    private String name, email, gender;
    private int age, number;

    /**
     * This is the action called from the Struts framework.
     */
    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        DynaValidatorForm validatorForm = (DynaValidatorForm) form;

        name = (String) validatorForm.get("name");
        email = (String) validatorForm.get("email");
        gender = (String) validatorForm.get("gender");
        age = (Integer) validatorForm.get("age");
        number = (Integer) validatorForm.get("number");

        return mapping.findForward(SUCCESS);
    }
}
