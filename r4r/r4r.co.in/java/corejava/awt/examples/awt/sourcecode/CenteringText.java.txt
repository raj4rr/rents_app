 //Centering text

import java.awt.*;
import java.applet.*;
/*<applet code="CenteringText" width=200 hight=100>
</applet>
*/
public class CenteringText extends Applet
{

final Font f=new Font("SanfAerif",Font.ITALIC,20);

public void paint(Graphics g)
{
Dimension d=this.getSize();
g.setFont (f);
g.setColor(Color.green);
drawCenteredString("This is centered string.",d.width,d.height,g);
}
public void drawCenteredString(String s,int h,int w,Graphics g)
{
FontMetrics fm=g.getFontMetrics();
int X=(w-fm.stringWidth(s))/2;
int Y=(fm.getAscent()+(h-fm.getAscent()+(fm.getDescent()))/2);
g.drawString(s,X,Y);
}}