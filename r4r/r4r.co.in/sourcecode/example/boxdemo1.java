/*Developed By:Renu Singh 
 *Role		  :Programmer
 *Qualification:B.Tech( Computer Science & Engg.)
 **/
class box
{
double width;
double height;
double depth;
}
class boxdemo1{
public static void main(String args[])
{
box mybox1=new box();
box mybox2=new box();
double vol;
mybox1.width=10;
mybox1.height=20;
mybox1.depth=15;
mybox2.width=3;
mybox2.height=6;
mybox2.depth=9;
vol=mybox1.width*mybox1.height*mybox1.depth;
System.out.println("volume is"+vol);
vol=mybox2.width*mybox2.height*mybox2.depth;
System.out.println("volume is"+vol);
}
}