package com.itext.pdf.example.r4r;
import java.io.FileOutputStream;
import java.io.IOException;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfWriter;
/**
 * In this example we are going to set the background color of a PDF file.
 * We are first creating a PDF file and then setting the color by using setBackgroundColor(Color objectOfColor)
 */
public class SetBackgroundColorOfPDF {
    /**
     * Creates a PDF document and set its background color.
     */
    public static void main(String[] args) {
        
        System.out.println("Set backgroundcolor of PDF");
        
      //Here we are creating and object of rectangle. This is basically for size of page.  
        Rectangle pageSize = new Rectangle(236, 720);
        //Here we are setting the background color of PDF 
        pageSize.setBackgroundColor(new java.awt.Color(0xFF, 0xFF, 0xDE));
        // Step 1: Here we are creating an object of a document
        Document document = new Document(pageSize);
        
        try {
            
            // Step2: Here we are creating a writer that listens to the document and directs a PDF-stream to a file
            
            PdfWriter.getInstance(document, new FileOutputStream("SetBackgroundcolr.pdf"));
            
          // Step 3:Here we are opening the document
            document.open();
            // Step 4: Here we are adding some paragraphs to the document
            
            document.add(new Paragraph("The backgroundcolor of the Rectangle used for this PageSize, is #FFFFDE."));
            document.add(new Paragraph("That's why the background of this document is yellowish..."));
            
        }
        catch(DocumentException de) {
            System.err.println(de.getMessage());
        }
        catch(IOException ioe) {
            System.err.println(ioe.getMessage());
        }
        
        // Step 5: Here we are closing  the document
        document.close();
    }
}


