//creat Checkbox



import java.awt.*;
import java.awt.event.*;
import java.applet.*;

/*
<applet code="CheckBox" width=300 height=200>
</applet>
*/

public class CheckBox extends Applet implements ItemListener {

String msg="";

Checkbox one,two,three,four;
public void init()
{
 one = new Checkbox("Apple");
 two = new Checkbox("Banana");
 three = new Checkbox("orange");
 four = new Checkbox("Grapes");
add(one);
add(two);
add(three);
add(four);
 
one.addItemListener(this);
two.addItemListener(this);
three.addItemListener(this);
four.addItemListener(this);
}
public void itemStateChanged(ItemEvent ie)
{
repaint();
}
public void paint(Graphics g)
{
msg="Which is your fevorite fruite?";
g.drawString(msg,4,80);
msg="Apple:" + one.getState();
g.drawString(msg,4,100);
msg="Banana:" + two.getState();
g.drawString(msg,4,120);
msg="Orange:" + three.getState();
g.drawString(msg,4,140);
msg="Grapes:" + four.getState();
g.drawString(msg,4,160);
}

}






