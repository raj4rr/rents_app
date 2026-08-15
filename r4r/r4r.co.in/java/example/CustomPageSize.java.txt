package com.itext.pdf.example.r4r;

import java.io.FileOutputStream;
import java.io.IOException;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfWriter;

/**
 *In this example we are going to customize the page size.
 */
public class CustomPageSize {
    /**
     * Creates a PDF document with a certain pagesize
     */
    public static void main(String[] args) {
        
        System.out.println("Customization of  PDF PageSize ");
        
        //Creating an object of rectangle to cutomize the PDF page size.
        Rectangle pageSize = new Rectangle(216, 720);
//      Step 1: Here we are creating of a Document object
        Document document = new Document(pageSize);
        
        try {
            
            // Step2:
            // Here we are creating a writer that listens to the document
            // and directs a PDF-stream to a file
            
            PdfWriter.getInstance(document, new FileOutputStream("CustomPageSize.pdf"));
            
            // Step3:Here we are opening the document
            document.open();
            
            //Step4:Here we are add some paragraphs to the document
            //These paragraphs are the standard size of the page in diffrent unit.
            document.add(new Paragraph("The size of this page is 216x720 points."));
            document.add(new Paragraph("216pt / 72 points per inch = 3 inch"));
            document.add(new Paragraph("720pt / 72 points per inch = 10 inch"));
            document.add(new Paragraph("The size of this page is 3x10 inch."));
            document.add(new Paragraph("3 inch x 2.54 = 7.62 cm"));
            document.add(new Paragraph("10 inch x 2.54 = 25.4 cm"));
            document.add(new Paragraph("The size of this page is 7.62x25.4 cm."));
            
        }
        catch(DocumentException de) {
            System.err.println(de.getMessage());
        }
        catch(IOException ioe) {
            System.err.println(ioe.getMessage());
        }
        
        // Step5:Here we are closing the document
        document.close();
    }
}
