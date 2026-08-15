/*
 * Save as a InsertDataAction
 */
package r4r.struts;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;
import org.apache.struts.action.DynaActionForm;

public class InsertDataAction extends org.apache.struts.action.Action {

    /* forward name="" path="" */
    private static final String SUCCESS = "success";
    private static final String FAILURE = "failure";

    // Initialize SQL connection equal null
    private Connection con = null;

    /**
     * This is the action called from the Struts framework.
     * Execute method of action class
     */
    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        //Initilized Action error
        ActionErrors errors = new ActionErrors();
        //Call DynaActionForm Instance here
        DynaActionForm actionForm = (DynaActionForm) form;

        // Taking Property from DynaActionform
        String userName = (String) actionForm.get("userName");
        String firstName = (String) actionForm.get("firstName");
        String lastName = (String) actionForm.get("lastName");
        int age = (Integer) actionForm.get("age");
        int number = (Integer) actionForm.get("number");

        //Set up flag message
        boolean flag1 = false;
        boolean flag2 = false;

        //Set up validation in form
        if (userName == null || userName.length() < 1) {
            errors.add("userName", new ActionMessage("error.userName"));
        }
        if (firstName == null || firstName.length() < 1) {
            errors.add("firstName", new ActionMessage("error.firstName"));
        }
        if (lastName == null || lastName.length() < 1) {
            errors.add("lastName", new ActionMessage("error.lastName"));
        }
        if (age == 0 || age < 1) {
            errors.add("age", new ActionMessage("error.age"));
        }
        if (number == 0 || number < 1) {
            errors.add("number", new ActionMessage("error.number"));
        }
        //Save error messages keys into the appropriate HTTP request attribute for use by the <html:errors> tag
        saveErrors(request, errors);
        //Check- is errors empty
        if (errors.isEmpty()) {
            flag1 = true;
        } else {
            flag1 = false;
        }

        // Now Start communicate with database
        try {

            Class.forName("com.mysql.jdbc.Driver").newInstance();
            con = DriverManager.getConnection("jdbc:mysql:///r4r", "root", "sachin");
            //Check and open connection
            if (!con.isClosed()) {
                //Insert value into SQL Table
                PreparedStatement ps = (PreparedStatement) con.prepareStatement("INSERT INTO dummy(`userName`,`firstName`,`lastName`,age,`number`)"
                        + " VALUES (?,?,?,?,?) ");
                 //Set string and position into table
                ps.setString(1, userName);
                ps.setString(2, firstName);
                ps.setString(3, lastName);
                ps.setInt(4, age);
                ps.setInt(5, number);

                //Execute all the above statement
                ps.execute();

            } else {
                errors.add("SQL", new ActionMessage("error.SQLConnectivity"));
            }
        } catch (Exception ex) {
            errors.add("SQLException", new ActionMessage("error.SQLException"));
            throw new SQLException(ex.fillInStackTrace());
        } finally {
            //Close SQL server connection
            try {
                if (con != null) {
                    con.close();
                }
            } catch (SQLException e) {
                throw new SQLException(e.getSQLState() + e.fillInStackTrace());
            }
        }

        //Save error messages keys into the appropriate HTTP request attribute for use by the <html:errors> tag
        saveErrors(request, errors);
        if (errors.isEmpty()) {
            flag2 = true;
        } else {
            flag2 = false;
        }

        //Check the condition of boolean flags
        if (flag1 == true && flag2 == true) {
            return mapping.findForward(SUCCESS);
        } else {
            return mapping.findForward(FAILURE);
        }
    }
}
