/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package r4r.co.in;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;

/**
 * Save as a LoginForm.java
 * Program work as a Model Class
 */
public class LoginForm extends org.apache.struts.action.ActionForm {
    
    private String area;

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }
   
    public LoginForm() {
        super();
    }

    @Override
    public ActionErrors validate(ActionMapping mapping, HttpServletRequest request) {
        ActionErrors errors = new ActionErrors();
        if (getArea() == null || getArea().length() < 1) {
            errors.add("area", new ActionMessage("error.login.required"));
        }
        return errors;
    }

}
