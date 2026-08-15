// enum :- Used to declare multiple constant
using System;
public class A
{
   enum Days {Sat=1, Sun, Mon, Tue, Wed, Thu, Fri};

   public static void Main() 
   {
      int x = (int) Days.Sun;
      int y = (int) Days.Fri;
      Console.WriteLine("Sun = {0}", x);
      Console.WriteLine("Fri = {0}", y);
   }
}
