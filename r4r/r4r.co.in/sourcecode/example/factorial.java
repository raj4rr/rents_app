/*Developed By:Renu Singh 
 *Role		  :Programmer
 *Qualification:B.Tech( Computer Science & Engg.)
 **/
class factorial
{
int fact(int n){
int result;
if(n==1)
return 1;
result=fact(n-1)*n;
return result;
}
}
class recursion{
public static void main(String args[])
{
factorial f=new factorial();
System.out.println("factorial of 3 is"+f.fact(3));
System.out.println("factorial of 3 is"+f.fact(4));
System.out.println("factorial of 3 is"+f.fact(5));
}
}