
//program for set Background coller

import java.awt.*;
import java.applet.*;
/*
<applet code="SetBackgroundColor" width=300 height=300>
</applet>
*/

public class SetBackgroundColor extends Applet
{
public void paint(Graphics g)
{
setBackground(Color.yellow);
g.setColor(Color.red);

g.drawLine(170,170,270,270);
g.setColor(Color.blue);
g.drawRect(0,0,40,40);
g.fillRect(50,50,100,100);

}
}

