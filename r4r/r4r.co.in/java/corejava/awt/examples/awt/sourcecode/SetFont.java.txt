import java.applet.*;
import java.awt.*;
//<applet code="SetFont" width=200 height=200></applet>
public class SetFont extends Applet
{
	 Font a,b,c;
	 public void init()
	 {
		setBackground(Color.cyan);
		a=new Font("Algerian",Font.PLAIN,25);
		b=new Font("TimesRoman",Font.BOLD + Font.ITALIC,45);
		c=new Font("Courier",Font.ITALIC,30);
	 }
	 public void paint(Graphics g)
	 {
		g.setFont(a);
		g.setColor(Color.black);
		g.drawString("Set font",10,20);
		g.setFont(b);
		g.setColor(Color.blue);
		g.drawString("Shrish singh",10,60);
		g.setFont(c);
		g.setColor(Color.yellow);
		g.drawString("From Unnao",10,90);
	}
}
 