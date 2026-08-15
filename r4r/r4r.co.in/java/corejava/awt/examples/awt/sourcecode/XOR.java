//Working with paint mode Showing Pointer
import java.awt.*;
import java.applet.*;
import java.awt.event.*;
/*
<applet code="XOR" width=300 height=200>
</applet>
*/
public class XOR extends Applet{
int chsX=100, chsY=100;
public XOR()
{
addMouseMotionListener(new MouseMotionAdapter()
{
public void mouseMoved(MouseEvent me)
{
int x=me.getX();
int y=me.getY();
chsX=x-20;
chsY=y-20;
repaint();
}});}
public void paint(Graphics g)
{
g.setColor(Color.green);
g.drawLine(0,0,200,200);
g.setColor(Color.black);
g.fillRect(20,20,70,70);
g.setColor(Color.red);
g.drawLine(10,100,50,20);
g.setColor(Color.green);
g.drawRect(50,0,50,50);

g.setXORMode(Color.black);
g.drawLine(chsX-10,chsY,chsX+10,chsY);
g.drawLine(chsX,chsY-10,chsX,chsY+10);
g.setPaintMode();
}
}
