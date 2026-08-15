//Structure with constructor
struct a
{
	private int x;
	public a(int y)
	{
		x=y;
	}
	public void display()
	{
		System.Console.WriteLine("x="+x);
	}
}
class b
{
	public static void Main()
	{
		a t=new a(333);
		t.display();
	}
}
	
	