//creat a Textfield
import java.awt.*;
import java.awt.event.*;
import java.applet.*;
/*
<applet code="TextFieldDemo" width=300 height=250>
</applet>
*/
public class TextFieldDemo extends Applet implements ActionListener {
TextField name ,pass;
public void init(){
Label namep = new Label("name :",Label.RIGHT);
Label passp = new Label("password",Label.RIGHT);
name =new TextField(12);
pass =new TextField(8);
pass.setEchoChar('*');
add(namep);
add(name);
add(passp);
add(pass);
name.addActionListener(this);
pass.addActionListener(this);

}
public void actionPerformed(ActionEvent ae)
{
repaint();
}
public void paint(Graphics g)
{
g.setColor( Color.red);
g.drawString("name:"+ name.getText(),200,60);

g.drawString("selected text in name:" +name.getSelectedText(),200,80);
g.drawString("password:" + pass.getText(),200,100);
}

}






