
class box
{
float width;
float height;
float depth;
}
class boxdemo{

public static void main(String args[])
{
box mybox=new box();
float vol;
mybox.width=10;
mybox.height=20;
mybox.depth=15;
vol=mybox.width*mybox.height*mybox.depth;
System.out.println("volume is"+vol);
}
}