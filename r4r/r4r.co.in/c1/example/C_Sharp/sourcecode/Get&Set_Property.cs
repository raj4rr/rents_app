
//Implementation Of Get & Set Property

using System;
public abstract class a
{
   public abstract double  Area 
   {
      get;
      set;
   }
}
class b : a
{
    private double x;
    public override double  Area
   {
	get
	{
		return x;
	}
	set
	{
		x=value;
	}
    }
}
class c
{
	public static void Main()
	{
		b y=new b();
		y.Area=100; //set
		Console.WriteLine(y.Area); //get
	}
}

		