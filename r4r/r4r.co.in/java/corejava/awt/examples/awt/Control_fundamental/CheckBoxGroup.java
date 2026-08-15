//creat CheckboxGroup
import java.awt.*;
import java.awt.event.*;
import java.applet.*;
/*
<applet code="CheckBoxGroup" width=300 height=200>
</applet>
*/
public class CheckBoxGroup extends Applet implements ItemListener {
String msg="";
Checkbox one,two;
CheckboxGroup cbg;
public void init(){
 cbg=new CheckboxGroup();
 one = new Checkbox("Male",cbg,true);
 two = new Checkbox("Female",cbg,false);
add(one);
add(two);
one.addItemListener(this);
two.addItemListener(this);

}
public void itemStateChanged(ItemEvent ie)
{
repaint();
}
public void paint(Graphics g)
{
msg="Your gender is....";
g.drawString(msg,4,80);
msg = cbg.getSelectedCheckbox().getLabel();
g.drawString(msg,4,120);
}

}






