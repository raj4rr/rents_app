
//Draw polygons

import java.awt.*;
import java.applet.*;
/*
<applet code="Polygons" width=230 height=210>
</applet>
*/

public class Polygons extends Applet
{
public void paint(Graphics g)
{
int xpoints[]={70,100,130,70,130};
int ypoints[]={70,30,70,100,100};
int num=6;
g.drawPolygon(xpoints , ypoints , num);

}
}

