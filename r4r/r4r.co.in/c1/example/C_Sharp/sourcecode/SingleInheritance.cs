//Single Inheritence
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

class c 
{
	public static void Main()
	{
		b x=new b();//Normally object of child
		x.display();
		x.display1(); 
	}
}



