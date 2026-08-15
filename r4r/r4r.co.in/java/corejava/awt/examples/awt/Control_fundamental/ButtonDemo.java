//creat Button
import java.awt.*;
import java.applet.*;
import java.awt.event.*;
/*
<applet code="ButtonDemo" width=300 height=200>
</applet>
*/

public class ButtonDemo extends Applet implements ActionListener {

String msg="which is the last month ?";

Button one,two,three,four;
public void init()
{


 one = new Button("Jan");
 two = new Button("Nov");
 three = new Button("Dec");
 four = new Button("Feb");

add(one);
add(two);
add(three);
add(four);

one.addActionListener(this);
two.addActionListener(this);
three.addActionListener(this);
four.addActionListener(this);
}
public void actionPerformed(ActionEvent ae)
{
 
String str=ae.getActionCommand();
if(str.equals("Jan"))
{
msg="Your answer is Jan";
}
else if(str.equals("Nov"))
{
msg="Your answer is Nov";

}
else if(str.equals("Dec"))
{
msg="Your answer is Dec";
}
else if(str.equals("Feb"))
{
msg="Your answer is Feb";
}
repaint();
}
public void paint(Graphics g)
{

g.drawString(msg,6,100);
}}




