//Working with paint mode Without Showing Pointer

import java.awt.*;
import java.applet.*;
import java.awt.event.*;
/*
<applet code="XORMode" width=300 height=200>
</applet>
*/

public class XORMode extends Applet
{
public void paint(Graphics g)
{
g.setColor(Color.yellow);
g.drawLine(0,0,200,200);
g.setColor(Color.black);
g.fillRect(20,20,70,70);
g.setColor(Color.red);
g.drawLine(10,100,50,00);
g.setXORMode(Color.black);
g.setPaintMode();
}
}
