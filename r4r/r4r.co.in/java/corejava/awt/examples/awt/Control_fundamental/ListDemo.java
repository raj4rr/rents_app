// Handling List 


import java.awt.*;
import java.awt.event.*;
import java.applet.*;
/*
<applet code="ListDemo" width=300 height=200>
</applet>
*/

public class ListDemo extends Applet implements ActionListener {
List country,city;
String msg="";

public void init()
{
 country = new List(3,false);
 city = new List(3,false);

country.add("India");
country.add("Rusia");
country.add("Pakistan");
country.add("Srilanka");

city.add("unnao");
city.add("Lucknow");
city.add("Lahour"); 
city.add("Kuvait");

add(country);
add(city);
country.addActionListener(this);
city.addActionListener(this);
}
public void actionPerformed(ActionEvent ae)
{
repaint();
}
public void paint(Graphics g)
{
int idx[];
msg="your country name is:";
idx=country.getSelectedIndexes();
for(int i=0;i<idx.length;i++)
msg +=country.getItem(idx[i]) +" ";
g.drawString(msg,6,120);
msg="your city name is:";
msg +=city.getSelectedItem();
g.drawString(msg,6,140);
}

}






