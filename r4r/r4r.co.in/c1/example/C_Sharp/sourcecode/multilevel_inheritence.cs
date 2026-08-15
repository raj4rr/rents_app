//Mulitlevel Inheritence
class a
{
	public void display()
	{
		System.Console.WriteLine("hahahaha");
	}
}
class b : a //b is child of a
{
	public void display1()
	{
		System.Console.WriteLine("hihihih");
	}
}
class d : b //d is child of b
{
	public void display2()
	{
		System.Console.WriteLine("hohohohoh");
	}
}

class c 
{
	public static void Main()
	{
		d x=new d();//Normally object of child
		x.display();
		x.display1(); 
		x.display2(); 
	}
}



