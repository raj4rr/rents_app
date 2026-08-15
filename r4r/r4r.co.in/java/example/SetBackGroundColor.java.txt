//<applet code="SetBackGroundColor.class" width=200 height=300>
//</applet>
import java.applet.Applet;
import java.awt.*;

public class SetBackGroundColor extends Applet {
	public void init() {
		setBackground(Color.blue);
		resize(300, 300);
	}

	public void paint(Graphics g) {
		g.drawString("R4R JAVA APPLET BACKGROUND EXAMPLE", 10, 20);

	}
}
