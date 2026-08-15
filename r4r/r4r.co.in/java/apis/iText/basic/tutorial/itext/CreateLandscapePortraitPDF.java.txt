package com.itext.pdf.example.r4r;

// In this example we are creating PDF in portrait/landscape format
//To create a document in landscape format, we just make the height lesser than the width.
//Then we have to rotate the standard pagesizes all by rotate().
 

import java.io.FileOutputStream;
import java.io.IOException;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

/**
 * Demonstrates the creating PDF in portrait/landscape format.
 */
public class CreateLandscapePortraitPDF {
    /**
     * Creates a PDF document with pages in portrait/landscape format.
     */
    public static void main(String[] args) {
        
        System.out.println("Documents in Landscape and Portrait format");
        // Step 1: Here we are Creating a document object
        Document document = new Document(PageSize.A4.rotate());
        
        try {
            
            // Step 2: Here we are creating a writer that listens to the document and directs a PDF-stream to a file.
            
            PdfWriter.getInstance(document, new FileOutputStream("LandscapePortrait.pdf"));
            
            // step 3: Here We are opening the document
            document.open();
            
            // step 4: Here we add some content to document
            document.add(new Paragraph("To create PDF in landscape format, We just need to make the height lesser than the width. to do so  rotate the PageSize Rectangle by using PageSize.A4.rotate()"));
            document.setPageSize(PageSize.A4);
            document.newPage();
            document.add(new Paragraph("This is portrait again"));
            
        }//Here we are handling all exceptions
        catch(DocumentException de) {
        	
            System.err.println(de.getMessage());
        }
        catch(IOException ioe) {
            System.err.println(ioe.getMessage());
        }
        
        // Step5: Here We are closing the document
        document.close();
    }
}


