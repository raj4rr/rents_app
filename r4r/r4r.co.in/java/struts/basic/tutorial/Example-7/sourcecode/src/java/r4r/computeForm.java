/*
 * Save as a computeForm.java
 */
package r4r;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;

/**
 *
 * @author Sachin
 */
public class computeForm extends org.apache.struts.action.ActionForm {

    private String setDayOfWeek;
    private int day, month, year;

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getSetDayOfWeek() {
        return setDayOfWeek.toString();
    }

      void setDayOfWeek(String setDayOfWeek) {
       this.setDayOfWeek = setDayOfWeek;
    }

    /**
     *
     */
    public computeForm() {
        super();
    }

    /**
     * This is the action called from the Struts framework.
     */
    @Override
    public ActionErrors validate(ActionMapping mapping, HttpServletRequest request) {
        ActionErrors errors = new ActionErrors();
        if (month == 0) {
            errors.add("month", new ActionMessage("error.month"));
        }
        if (year == 0 || year < 4) {
            errors.add("year", new ActionMessage("error.year"));
        }
        if (year < 1582) {
            errors.add("pre_gregorian", new ActionMessage("error.pre_gregorian"));
        }
        return errors;
    }
}
