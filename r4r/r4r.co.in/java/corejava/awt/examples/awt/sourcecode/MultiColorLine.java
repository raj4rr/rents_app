//display multiple line of text
import java.awt.*;
import java.applet.*;
/*<applet code="MultiColorLine" width=300 hight=200>
</applet>
*/
public class MultiColorLine extends Applet
{
int curX=0, curY=0;
public void init()
{
Font f=new Font("SanfAerif",Font.ITALIC,20);
setFont (f);
}

public void paint(Graphics g)
{

FontMetrics fm=g.getFontMetrics();
g.setColor(Color.blue);
nextLine("this is Blue line. ",g);
g.setColor(Color.red);
nextLine("this is Red line",g);
g.setColor(Color.green);
nextLine("this is Green line",g);
}
//jump to next line

void nextLine(String s,Graphics g)
{
FontMetrics fm=g.getFontMetrics();
curY+=fm.getHeight();                        //advance to next line
curX=0;
g.drawString(s,curX,curY);
curX=fm.stringWidth(s);                    //advance to end of line
}


//Display same line

void sameLine(String s,Graphics g)
{
FontMetrics fm=g.getFontMetrics();
g.drawString(s,curX,curY);
curX+=fm.stringWidth(s);
}
}