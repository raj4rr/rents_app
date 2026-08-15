/*
 * Save as a computeAction.java
 */
package r4r;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;

/**
 *
 * @author Sachin
 */
public class computeAction extends org.apache.struts.action.Action {

    /* forward name="success" path="" */
    private static final String SUCCESS = "success";
    private static final String FAILURE = "failure";

    /**
     * This is the action called from the Struts framework.
     */
    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        ActionErrors errors = new ActionErrors();
        computeForm dateData = (computeForm) form;

        //Taking parameter form the Bean Class
        int day = dateData.getDay();
        int month = dateData.getMonth();
        int year = dateData.getYear();

        //Define Varable
        int dayOfWeek, valcen, valleap, valmon, valyear, valday;

        //Declear centuries
        int[] centuries = new int[4];
        centuries[0] = 2;
        centuries[1] = 0;
        centuries[2] = 5;
        centuries[3] = 3;

        //Complete List of Month in a single year
        int[] months = new int[13];
        months[1] = 5;
        months[2] = 1;
        months[3] = 0;
        months[4] = 3;
        months[5] = 5;
        months[6] = 1;
        months[7] = 3;
        months[8] = 6;
        months[9] = 2;
        months[10] = 4;
        months[11] = 0;
        months[12] = 2;

        //Complete List of Days in a single week
        String[] daysOfWeek = new String[7];
        daysOfWeek[0] = "Sunday";
        daysOfWeek[1] = "Monday";
        daysOfWeek[2] = "Tuesday";
        daysOfWeek[3] = "Wednesday";
        daysOfWeek[4] = "Thursday";
        daysOfWeek[5] = "Friday";
        daysOfWeek[6] = "Saturday";

        try {

            if (month < 3) {
                year--; // Subtract 1 from year
            }

            valcen = centuries[year / 100 % 4];
            valleap = year % 100 / 4;
            valyear = year % 100 % 7;
            valmon = months[month];
            valday = day % 7;
            dayOfWeek = valcen + valleap + valyear + valmon + valday;
            dayOfWeek = dayOfWeek % 7;
            //Set setDayofWeek property into Bean Class
            dateData.setDayOfWeek(daysOfWeek[dayOfWeek]);

           //Set the parameter to the JSP page
            request.setAttribute("dateData", dateData);

        } catch (Exception e) {
            errors.add("exception", new ActionMessage("exception.nameofDay"));
             throw new UnsupportedOperationException(e.fillInStackTrace());
        }
       //Save error messages keys into HTTP request attribute for use by the <html:errors> tag
        saveErrors(request, errors);
        if (errors.isEmpty()) {
            return mapping.findForward(SUCCESS);
        } else {
            return mapping.findForward(FAILURE);
        }
    }
}
