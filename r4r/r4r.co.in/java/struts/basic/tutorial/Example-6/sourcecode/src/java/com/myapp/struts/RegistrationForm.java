/*
 * Save as a RegistrationForm.java
 */
package com.myapp.struts;

import javax.servlet.http.HttpServletRequest;
import org.apache.struts.action.*;

public class RegistrationForm extends org.apache.struts.action.ActionForm {

    private String userName, password, name, address, email, gender;
    private int number, age;

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public String getGender() {
        return gender;
    }

    public String getName() {
        return name;
    }

    public int getNumber() {
        return number;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public RegistrationForm() {
        super();
    }

    /**
     * This is the action called from the Struts framework.
     */
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
            errors.add("password", new ActionMessage("error.Password.required"));
        }
        if (getAddress() == null || getAddress().length() < 1) {
            errors.add("Address", new ActionMessage("error.Address.required"));
        }
        if (getEmail().equals("") || getEmail().indexOf('@') == -1 || getEmail().indexOf('.') == -1
                || getEmail().indexOf("@@") != -1 || getEmail().indexOf("..") != -1) {
            errors.add("Email Id", new ActionMessage("error.Email.required"));
        }
        if (getAge() < 2) {
            errors.add("age", new ActionMessage("error.age.required"));
        }
        if (getNumber() < 1) {
            errors.add("number", new ActionMessage("error.number.required"));
        }
        if (getGender() == null) {
            errors.add("gender", new ActionMessage("error.gender.required"));
        }
        return errors;
    }
}
