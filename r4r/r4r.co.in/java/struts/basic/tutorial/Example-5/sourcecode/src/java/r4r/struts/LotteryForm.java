/*
 * Save as a LotteryForm.java
 */
package r4r.struts;

import java.util.Calendar;
import javax.servlet.http.*;
import org.apache.struts.action.*;

public class LotteryForm extends org.apache.struts.action.ActionForm {

    private String lottery, date, number;
    private int age;

    //Getter/Setter property of all above parameter
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getLottery() {
        return lottery;
    }

    public void setLottery(String lottery) {
        this.lottery = lottery;
    }

   //Getting random number
    public String getNumber() {
        int num1, num2, num3, num4, num5, num6;
        //Produce only single random number
        num1 = (int) (0 + (Math.random() * 9));
        num2 = (int) (0 + (Math.random() * 9));
        num3 = (int) (0 + (Math.random() * 9));
        num4 = (int) (0 + (Math.random() * 9));
        num5 = (int) (0 + (Math.random() * 9));
        num6 = (int) (0 + (Math.random() * 9));
        number = num1 + " " + num2 + " " + num3 + " " + num4 + " " + num5 + " " + num6;
        return number;
    }

    public void setNumber(String number) {

        this.number = number;
    }

    public void setDate(String date) {
        this.date = date;
    }
//Getting today date in format of DD/MM/YYYY
    public String getDate() {

        StringBuffer date = new StringBuffer();
        Calendar calendar = Calendar.getInstance();
        date.append(calendar.get(Calendar.MONTH) + 1);
        date.append("/");
        date.append(calendar.get(Calendar.DAY_OF_MONTH));
        date.append("/");
        date.append(calendar.get(Calendar.YEAR));

        return date.toString();
    }

    public LotteryForm() {
        super();
    }

    /**
     * This is the action called from the Struts framework.
     */
    @Override
    public ActionErrors validate(ActionMapping mapping, HttpServletRequest request) {
        ActionErrors errors = new ActionErrors();

        if (getAge() == 0) {
            errors.add("age", new ActionMessage("error.age.required"));
        }
        if (getAge() < 19) {
            errors.add("shortAge", new ActionMessage("error.shortAge.required"));
        }
        if (lottery == null) {
        errors.add("lottery", new ActionMessage("errr.lottery.required"));
        }
        return errors;
    }
}
