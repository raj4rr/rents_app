/*
 * Save as a searchForm.java
 */
package r4r;

import java.util.Calendar;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;

/**
 *
 * @author Sachin
 */
public class searchForm extends org.apache.struts.action.ActionForm {

    private String name = null;
    private String ssNum = null;
    private List results = null;
    private String date, time;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setSsNum(String ssNum) {
        this.ssNum = ssNum;
    }

    public String getSsNum() {
        return ssNum;
    }

    public void setResults(List results) {
        this.results = results;
    }

    public List getResults() {
        return results;
    }

    //GET date in dd/mm/yyyy formate
    public String getDate() {
        StringBuffer date = new StringBuffer();
        Calendar calendar = Calendar.getInstance();
        date.append(calendar.get(Calendar.DAY_OF_MONTH));
        date.append("/");
        date.append(calendar.get(Calendar.MONTH) + 1);
        date.append("/");
        date.append(calendar.get(Calendar.YEAR));

        return date.toString();
    }

    public void setDate(String date) {
        this.date = date;
    }
    //GET Time in HH/MM/SS formate

    public String getTime() {
        StringBuffer time = new StringBuffer();
        Calendar calendar = Calendar.getInstance();
        time.append(calendar.get(Calendar.HOUR));
        time.append(":");
        time.append(calendar.get(Calendar.MINUTE));
        time.append(":");
        time.append(calendar.get(Calendar.SECOND));
        return time.toString();
    }

    public void setTime(String time) {
        this.time = time;
    }

    // Reset  all form fields.
    @Override
    public void reset(ActionMapping mapping, HttpServletRequest request) {
        name = null;
        ssNum = null;
        results = null;
    }

    // Validate form data.
    @Override
    public ActionErrors validate(ActionMapping mapping,
            HttpServletRequest request) {
        ActionErrors errors = new ActionErrors();

        boolean nameEntered = false;
        boolean ssNumEntered = false;

        // Determine if name has been entered.
        if (name != null && name.length() > 0) {
            nameEntered = true;
        }

        // Determine if social security number has been entered.
        if (ssNum != null && ssNum.length() > 0) {
            ssNumEntered = true;
        }

        /* Validate that either name or social security number
        has been entered. */
        if (!nameEntered && !ssNumEntered) {
            errors.add(null, new ActionMessage("error.search.criteria.missing"));
        }

        /* Validate format of social security number if
        it has been entered. */
        if (ssNumEntered && !isValidSsNum(ssNum.trim())) {
            errors.add("ssNum", new ActionMessage("error.search.ssNum.invalid"));
        }

        return errors;
    }

    // Validate format of social security number.
   private static boolean isValidSsNum(String ssNum) {
        if (ssNum.length() < 13) {
            return false;
        }

        for (int i = 0; i < 13; i++) {
            if (i == 1 || i == 5 || i == 8) {
                if (ssNum.charAt(i) != '-') {
                    return false;
                }
            } else if ("0123456789".indexOf(ssNum.charAt(i)) == -1) {
                return false;
            }
        }
        return true;
    }
}
