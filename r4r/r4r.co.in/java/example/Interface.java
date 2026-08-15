
interface  InterfaceExp{
            abstract void show();
             void show1();
             void show2();
             int a=0;
         
           
            }

class InterfaceDemo implements InterfaceExp{
        
   public  void show(){}
   public void show1(){}
   public void show2()
              {}

}

class Interface{
public static void main(String a[])
{
InterfaceDemo demo=new InterfaceDemo();
             demo.show();

}
}
