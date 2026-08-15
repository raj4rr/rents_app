//Using Text Area



import java.awt.*;
import java.applet.*;

/*
<applet code="TextAreaDemo" width=300 height=200>
</applet>
*/

public class TextAreaDemo extends Applet{

public void init()
{
 String val= "my self Shrish Singh \n"+
                 "i an from unnao\n"+
                "I have done my schooling from R.S.S. inter college unnao\n\n"+
                  "My hobies are playing Cricket Watching Cricket and Football \n"+
                  "I complite my Technical degree from ABES Engg. college in 2008 \n"+
                   "This time I am working in a software company name is R4R.";
TextArea text = new TextArea(val,5,30);
add(text); 
               
}

}






