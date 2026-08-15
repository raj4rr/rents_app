/*
 * Save as a SearchAction.java
 */
package r4r;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class SearchAction extends org.apache.struts.action.Action {

    /* forward name="success" path="" */
    private static final String SUCCESS = "success";

    /**
     * This is the action called from the Struts framework.
     * @return
     */
    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        //Create a new Employee data page
        EmployeDate data = new EmployeDate();
        ArrayList results;

        //Call the search form here:
        searchForm searchForm = (searchForm) form;

        String name = searchForm.getName();

        // Perform employee search based on what criteria was entered.
        if (name != null && name.trim().length() > 0) {
            results = data.searchByName(name);
        } else {
            results = data.searchBySsNum(searchForm.getSsNum().trim());
        }

        // Throw an application exception if results were not found.
        if (results.size() < 1) {
            throw new NoResultsFoundException();
        }

        // Now, Place search results in SearchForm, and access by JSP page.
        searchForm.setResults(results);

        // All condition true, then Forward control to XML mapping.
        return mapping.getInputForward();
    }
}

