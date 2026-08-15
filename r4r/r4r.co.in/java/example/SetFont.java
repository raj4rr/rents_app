import java.applet.*;
import java.awt.*;
//<applet code="Appf1.class" width=200 height=200></applet>
public class SetFont extends Applet
{
	 Font a,b,c;
	 public void init()
	 {
		setBackground(Color.red);
		a=new Font("Algerian",Font.PLAIN,25);
		b=new Font("TimesRoman",Font.BOLD + Font.ITALIC,45);
		c=new Font("Courier",Font.ITALIC,25);
	 }
	 public void paint(Graphics g)
	 {
		g.setFont(a);
		g.setColor(Color.black);
		g.drawString("R4$",10,20);
		g.setFont(b);
		g.setColor(Color.blue);
		g.drawString("Rajesh",10,50);
		g.setFont(c);
		g.setColor(Color.white);
		g.drawString("Java",10,80);
	}
}
 