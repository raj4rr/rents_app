/*Developed By:Renu Singh 
 *Role		  :Programmer
 *Qualification:B.Tech( Computer Science & Engg.)
 **/
class box
{
double width;
double height;
double depth;
box(){
width=10;
height=10;
depth=10;
}

double volume(){
return width*height*depth;
}
}
class boxdemo4{
public static void main(String args[])
{
box mybox1=new box();
box mybox2=new box();
double vol;
vol=mybox1.volume();
System.out.println("volume is"+vol);
vol=mybox2.volume();
System.out.println("volume is"+vol);
}
}