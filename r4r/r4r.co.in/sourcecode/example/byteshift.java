/*Developed By:Renu Singh 
 *Role		  :Programmer
 *Qualification:B.Tech( Computer Science & Engg.)
 **/
class byteshift
{
public static void main(String args[])
{
byte a=64,b;
int i;
i=a<<3;
b=(byte)(a<<3);
System.out.println("original value of a:"+a);
System.out.println("i and b:"+i+""+b);
b=(byte)(a>>3);
System.out.println("original value of a:"+a);
System.out.println("i and b:(>>)"+i+""+b);
b=(byte)(a>>>3);
System.out.println("original value of a:"+a);
System.out.println("i and b(>>>):"+i+""+b);

}
}