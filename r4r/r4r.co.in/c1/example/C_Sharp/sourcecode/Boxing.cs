using System;
class TestBoxing  
{
   public static void Main() 
   {
      int i = 123;
      object o = i;  // Implicit boxing
      i = 456;       // Change the contents of i
      Console.WriteLine("The value-type value = {0}", i);
      Console.WriteLine("The object-type value = {0}", o);
   }
}




