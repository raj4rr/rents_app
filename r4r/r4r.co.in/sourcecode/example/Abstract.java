/*Developed By:Renu Singh 
 *Role		  :Programmer
 *Qualification:B.Tech( Computer Science & Engg.)
 **/
abstract class AbstractExp{
	abstract void show();
	abstract void display();
	void show1()
	{
	System.out.println("Concreate Method");
	}
	}
 class Abstractdemo extends AbstractExp{
 	void show()
 	{
 	System.out.println("Hi");
 	}
	void display()
	{
	System.out.println("Hello");
	}
	}
 class Abstract{
 	public static void main(String a[]){
 		Abstractdemo demo=new Abstractdemo();
 		demo.show();
 		demo.display();
}
}














