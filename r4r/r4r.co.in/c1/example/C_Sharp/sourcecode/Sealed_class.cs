/*Sealed class:-
A sealed class cannot be inherited. 
Sealed class example in c#
*/
using System;
public sealed class MyClass 
{
   public int x; 
   public int y;
}
class a : MyClass
{
	public void display()
	{
		System.Console.WriteLine("Hello");
	}
}

class MainClass 
{
   public static void Main() 
   {
      MyClass mC = new MyClass(); 
      mC.x = 110;
      mC.y = 150;
      Console.WriteLine("x = {0}, y = {1}", mC.x, mC.y); 
   }
}

