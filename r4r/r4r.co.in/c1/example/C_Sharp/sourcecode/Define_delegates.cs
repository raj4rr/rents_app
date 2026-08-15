/*Delegates :- Function pointer. It conation  reference of Function
*/
using System;
// delegate declaration
delegate void MyDelegate();
public class a
{
   public void display() 
   {
      Console.WriteLine("Hello."); 
   }
}
public class b
{
   static public void Main() 
   {
      a x=new a();
      // Map the delegate to the instance method
      MyDelegate d = new MyDelegate(x.display);
      d();
   
   }
}
