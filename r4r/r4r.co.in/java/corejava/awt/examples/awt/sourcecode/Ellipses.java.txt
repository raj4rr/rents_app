
//Draw Ellipses AND Circle

import java.awt.*;
import java.applet.*;
/*
<applet code="Ellipses" width=300 height=300>
</applet>
*/

public class Ellipses extends Applet
{
public void paint(Graphics g)
{
g.drawOval(0,0,40,40);
g.fillOval(50,50,50,50);

g.fillOval(110,110,50,70);
g.drawOval(00,60,50,70);
}
}

