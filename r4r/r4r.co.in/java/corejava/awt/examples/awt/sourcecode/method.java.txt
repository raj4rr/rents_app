
//Display method

import java.awt.*;
import java.applet.*;
/*
<applet code="Method" width=300 height=200>
</applet>
*/

public class Method extends Applet
{

String msg;


public void init(){

setBackground(Color.red);
setForeground(Color.green);
msg="Start string  ";

}

public void start()
{
msg  +="Mid string  ";
}
public void paint(Graphics g)
{
msg+="End string.";
g.drawString(msg,10,30);
}
}

