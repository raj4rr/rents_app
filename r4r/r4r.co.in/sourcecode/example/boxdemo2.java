/*Developed By:Renu Singh 
 *Role		  :Programmer
 *Qualification:B.Tech( Computer Science & Engg.)
 **/
class box
{
double width;
double height;
double depth;
void volume(){
return width*height*depth;
}
}
class boxdemo3{
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
vol=mybox1.volume();
System.out.println("volume is"+vol);
vol=mybox2.volume();
System.out.println("volume is"+vol);
}
}