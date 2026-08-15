
//Draw Arcs

import java.awt.*;
import java.applet.*;
/*
<applet code="Arcs" width=300 height=200>
</applet>
*/

public class Arcs extends Applet
{
public void paint(Graphics g)
{
g.drawArc(10,20,50,50,0,130);
g.drawArc(40,50,70,60,0,65);

g.fillArc(70,90,100,90,0,230);}
}

