//UnBoxing
using System;
public class UnboxingTest 
{
   public static void Main() 
   {
      int intI = 123;

      // Boxing
      object o = intI;
      //Unboxing
      int intJ = (int) o;
      Console.WriteLine("Unboxing OK.");
   }
}
