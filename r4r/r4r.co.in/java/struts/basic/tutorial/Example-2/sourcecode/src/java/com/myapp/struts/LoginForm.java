/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.myapp.struts;

import javax.servlet.http.*;
import org.apache.struts.action.*;

public class LoginForm extends org.apache.struts.action.ActionForm {
    
    private String name,password,email;
    private int age;

  // Getter/Setter property of parameter
    public String getName() {
        return name;
    }
    public void setName(String string) {
        name = string;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }

    public LoginForm() {
        super();
    }

    /**
     * This is the action called from the Struts framework.
     * @param mapping The ActionMapping used to select this instance.
     * @param request The HTTP Request we are processing.
     * @return
     */
    public ActionErrors validate(ActionMapping mapping, HttpServletRequest request) {
        ActionErrors errors = new ActionErrors();
         if (getName() == null || getName().length() < 1) {
            errors.add("name", new ActionMessage("error.name.required"));
        }
        if (getPassword() == null || getPassword().length() < 1) {
            errors.add("password", new ActionMessage("error.password.required"));
        }
        if (getAge() < 11) {
            errors.add("age", new ActionMessage("error.age.required"));
        }
        if (getEmail() == null || getEmail().indexOf('@') == -1 || getEmail().indexOf('.') == -1
                || getEmail().indexOf("@@") != -1 || getEmail().indexOf("..") != -1) {
            errors.add("Email", new ActionMessage("error.Email.required"));
        }
        return errors;
    }
}
