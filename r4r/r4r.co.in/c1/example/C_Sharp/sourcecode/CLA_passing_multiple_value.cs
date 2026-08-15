//Command Line Argument :- PASSING multiple VALUES AT RUN TIME
using System;
class x
{
	public static void Main(String[] args)
	{
		for(int i=0;i<args.Length;i++)
		{
			Console.WriteLine("The name is --->"+args[i]);
		}	
	}		
}
