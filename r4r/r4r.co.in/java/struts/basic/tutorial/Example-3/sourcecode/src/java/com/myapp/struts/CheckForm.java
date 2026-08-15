/*
 * Save as a CheckForm.java
 */

package com.myapp.struts;

import javax.servlet.http.HttpServletRequest;
import org.apache.struts.action.*;

public class CheckForm extends org.apache.struts.action.ActionForm {

    private int age;

    
    public int getAge() {
        return age;
    }

    public void setAge(int i) {
        age = i;
    }

    public CheckForm() {
        super();
    }
    /**
     * This is the action called from the Struts framework.
     * @return
     */
    @Override
    public ActionErrors validate(ActionMapping mapping, HttpServletRequest request) {
        ActionErrors errors = new ActionErrors();
        if (getAge() < 18) {
            errors.add("Age", new ActionMessage("error.Age.required"));
        }
        return errors;
    }
}
