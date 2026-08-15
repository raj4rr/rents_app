/*Abstract class 
	class :- 1)Concreet class(We can create object  of that)
		**method:- concreet method(method having body)
	         2)Abstract class(we can not create object, because it is too 			general )
		**method :-1) abstract method(method without body)
			 2) concrete method
		it is used to inherit
		
*/
abstract class human
{
	//Abstract methods
	public  abstract void hair();
	//Concrete method
	public void display()
	{
		System.Console.WriteLine("hello");
	}
	
	
}
class boys : human
{
	public override void hair()
	{
		System.Console.WriteLine("Small");
	}
	
}
class girls : human
{
	public override void hair()
	{
		System.Console.WriteLine("LONG");
	}

}
class  a
{
	public static void Main()
	{
		boys b=new boys();
		girls g=new girls();
		b.hair();
		g.hair();
		b.display();
		g.display();
		
		
		
	}
}
