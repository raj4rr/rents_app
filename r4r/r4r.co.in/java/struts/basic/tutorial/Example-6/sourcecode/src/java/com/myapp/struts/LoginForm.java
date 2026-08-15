/*
 * Save as a LoginForm.java
 */

package com.myapp.struts;

import javax.servlet.http.HttpServletRequest;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;


public class LoginForm extends org.apache.struts.action.ActionForm {
    
    private String username,password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LoginForm() {
        super();
    }

    /**
     * This is the action called from the Struts framework.
     */
    @Override
    public ActionErrors validate(ActionMapping mapping, HttpServletRequest request) {
        ActionErrors errors = new ActionErrors();
        if (getUsername() == null || getUsername().length() < 1) {
            errors.add("UserName", new ActionMessage("error.UserName.required"));
        }if(getPassword()==null||getPassword().length()<1){
             errors.add("password", new ActionMessage("error.Password.required"));
        }
        return errors;
    }
}
