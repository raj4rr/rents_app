/*
 * Save as a RegisterForm.java
 */
package com.myapp.struts;

import javax.servlet.http.HttpServletRequest;
import org.apache.struts.action.*;

public class RegisterForm extends org.apache.struts.action.ActionForm {

    private String userName, password, name, address;
    private int number;

    public String getName() {
        return name;
    }

    public void setName(String string) {
        name = string;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int i) {
        number = i;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public RegisterForm() {
        super();
    }

    @Override
    public ActionErrors validate(ActionMapping mapping, HttpServletRequest request) {
        ActionErrors errors = new ActionErrors();
        if (getName() == null || getName().length() < 1) {
            errors.add("name", new ActionMessage("error.name.required"));
        }
        if (getUserName() == null || getUserName().length() < 1) {
            errors.add("UserName", new ActionMessage("error.UserName.required"));
        }
        if (getPassword() == null || getPassword().length() < 1) {
            errors.add("Password", new ActionMessage("error.Password.required"));
        }
        if (getPassword().length() < 1) {
            errors.add("Address", new ActionMessage("error.Address.required"));
        }
        if (getNumber() < 1) {
            errors.add("Number", new ActionMessage("error.Number.required"));
        }
        return errors;
    }
}
