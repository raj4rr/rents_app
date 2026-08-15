
//Program for Collerdemonstration

import java.awt.*;
import java.applet.*;
/*
<applet code="ColorDemonstration" width=300 height=300>
</applet>
*/

public class ColorDemonstration extends Applet
{
public void paint(Graphics g)
{
Color c1=new Color(255,100,100);

Color c2=new Color(100,255,100);

Color c3=new Color(100,100,255);
g.setColor(c1);

g.drawLine(170,170,270,270);
g.setColor(c2);
g.drawRect(0,0,40,40);
g.setColor(c3);
g.fillRect(50,50,100,100);
g.drawLine(0,10,100,10);

}
}

