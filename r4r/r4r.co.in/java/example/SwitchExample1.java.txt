public class SwitchExample1{
	static short sh;
	static int   num;
	static long  l;
	public SwitchExample1(){
			switch(sh)
				{
				case 0: System.out.println(sh);
				break;
				case 1: System.out.println(sh);
				break;
				case 2: System.out.println(sh);
				break;
				case 3: System.out.println(sh);
				break;
				default:
					System.out.println("Default");
				break;
				}
			switch(num)
				{
				case 0: System.out.println(num);
				break;
				case 1: System.out.println(num);
				break;
				case 2: System.out.println(num);
				break;
				case 3: System.out.println(num);
				break;
				case 4: System.out.println(num);
				break;
				default:
					System.out.println("Default");
				break;
				}
			/*switch(l)
				{ 
				case 0: System.out.println(i);
				break;
				case 1: System.out.println(i);
				break;
				case 2: System.out.println(i);
				break;
				case 3: System.out.println(i);
				break;
				case 4: System.out.println(i);
				break;
				default:
					System.out.println("Default");
				break;
				}
				Compile Time Error
				********************************************
				*SwitchExample1.java:30: possible loss of precision
                *found   : long
                *required: int
                *switch(L)
                *       ^
                *  1 error
				*
				*/
	}
	public static void main(String args[]){
		new SwitchExample1();
  }
}
