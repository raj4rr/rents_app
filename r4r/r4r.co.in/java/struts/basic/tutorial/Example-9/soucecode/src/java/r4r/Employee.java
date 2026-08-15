/*
 *  Save as a Employee.java
 * Page call by EmployeeData.java
 */
package r4r;

/**
 *
 * Getter/ Setter property of Employee data
 */
public class Employee {

    private String name, ssNum, dept, dated;

    public Employee(String name, String ssNum, String dept, String dated) {
        this.name = name;
        this.ssNum = ssNum;
        this.dept = dept;
        this.dated = dated;
    }

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

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getDated() {
        return dated;
    }

    public void setDated(String dated) {
        this.dated = dated;
    }
}
