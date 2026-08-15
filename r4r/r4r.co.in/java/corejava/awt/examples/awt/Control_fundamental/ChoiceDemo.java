//Choice



import java.awt.*;
import java.awt.event.*;
import java.applet.*;

/*
<applet code="ChoiceDemo" width=300 height=200>
</applet>
*/

public class ChoiceDemo extends Applet implements ItemListener {
Choice country,city;
String msg="";

public void init()
{

 country = new Choice();
 city = new Choice();



country.add("India");
country.add("Rusia");
country.add("Pakistan");
country.add("Srilanka");


city.add("unnao");
city.add("Lucknow"); 

city.add("Lahour"); 

city.add("Kuvait");

city.select("Caindy");



add(country);
add(city);
 
country.addItemListener(this);
city.addItemListener(this);
}
public void itemStateChanged(ItemEvent ie)
{
repaint();
}
public void paint(Graphics g)
{
msg="Your country name is:";
msg+=country.getSelectedItem();
g.drawString(msg,6,120);
msg="your city name is:";
msg += city.getSelectedItem();
g.drawString(msg,6,140);
}

}






