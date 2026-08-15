/*
 * Save as a ExampleAction.java
 */
package r4r.struts;

import javax.servlet.http.*;
import org.apache.struts.action.*;

public class ExampleAction extends org.apache.struts.action.Action {

    /* forward name="success" path="" */
    private static final String SUCCESS = "success";
    /* failure name="failure" path="" */
    private static final String FAILURE = "failure";

    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        //Add error into incoming HTTP request
        ActionErrors error = new ActionErrors();
        // By making instance of DynaActionForm class,
        DynaActionForm actionForm = (DynaActionForm) form;
        //Value store into DynaForm is call here:
        String first = (String) actionForm.get("first");
        String last = (String) actionForm.get("last");
        int age = (Integer) actionForm.get("age");
        int number = (Integer) actionForm.get("number");

        //Check the valiadation condition into incomming HTTP request form DynaForm
        if (first == null || first.length() < 1) {
            error.add("first", new ActionMessage("error.first.required"));
        }
        if (last == null || last.length() < 1) {
            error.add("last", new ActionMessage("error.last.required"));
        }
        if (age == 0) {
            error.add("age", new ActionMessage("error.age.required"));
        }
        if (number < 1) {
            error.add("number", new ActionMessage("error.number.required"));
        }
        //Save Error/request and dispaly it anywhere within this application
        saveErrors(request, error);
        if (error.isEmpty()) {
            return mapping.findForward(SUCCESS);
        } else {
            return mapping.findForward(FAILURE);
        }
    }
}
