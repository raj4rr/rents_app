/*
 * Save as a EmployeDate.java
 * This page is call by Action class
 */
package r4r;

import java.util.ArrayList;

public class EmployeDate {


    /* This is part of dataBase(insert, query and update)
     * Utilized collection part(List) for Hardcore data
     */
    private static Employee[] employees = {
        new Employee("RituRaj Tyagi", "0-000-00-0000", "Computer", "10-01- 2010"),
        new Employee("Rajesh Patel", "1-111-11-1111", "Computer", "10-01- 2010"),
        new Employee("Ankit Tyagi", "2-222-22-2222", "IT ", "08-05- 2010"),
        new Employee("Sachin Tyagi", "4-444-44-4444", "Electronic", "12-06- 2010"),
        new Employee("Sunny Tyagi", "5-555-55-5555", "Electronic", "22-09- 2010"),
        new Employee("Binny Tyagi", "6-666-66-6666", "IT", "17-08- 2010")
    };

    // Search for employees by name.
    public ArrayList searchByName(String name) {
        ArrayList resultList = new ArrayList();

        for (int i = 0; i < employees.length; i++) {
            if (employees[i].getName().toUpperCase().indexOf(name.toUpperCase()) != -1) {
                resultList.add(employees[i]);
            }
        }
        return resultList;
    }

    // Search for employee by social security number.
    public ArrayList searchBySsNum(String ssNum) {
        ArrayList resultList = new ArrayList();

        for (int i = 0; i < employees.length; i++) {
            if (employees[i].getSsNum().equals(ssNum)) {
                resultList.add(employees[i]);
            }
        }
        return resultList;
    }
}
