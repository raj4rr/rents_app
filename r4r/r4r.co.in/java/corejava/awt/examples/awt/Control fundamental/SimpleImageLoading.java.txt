
//Loading Image
/*
<applet code="SimpleImageLoading" width=300 height=200>
<param name="img" value="DSC00519.jpeg">
</applet>
*/

import java.awt.*;
import java.applet.*;


public class SimpleImageLoading extends Applet
{
Image img;
public void init()
{
img=getImage(getDocumentBase(), getParameter("img"));
}
public void paint(Graphics g)
{
g.drawImage(img,0,0,this);
}
}

