package com.itext.pdf.example.r4r;

//In this example we are making a simple first program of pdf.
//We are creating a pdf with name "HelloWorld.pdf".
//In this pDF we are writeing a String "HelloWorld" .
//You can compile and run this application at command promt.
//To run this example you need only iText API and set its classpath. 
//There are following five steps to create PDF using java.
import java.io.FileOutputStream;
import java.io.IOException;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

public class HelloWorld {

	/**
	 * Generates a PDF file with the text 'Hello World'
	 */
	public static void main(String[] args) {

		System.out.println("Hello World");

		// Step1: Creation of a document-object
		Document document = new Document();
		try {
			// Step2:Create a writer that listens to the document and directs a  PDF-stream to a file.
			PdfWriter.getInstance(document, new FileOutputStream(
					"HelloWorld.pdf"));

			// Step3: Open the document
			document.open();
			// Step4: Add a paragraph to the document
			document.add(new Paragraph("Hello World"));
		} catch (DocumentException de) {
			System.err.println(de.getMessage());
		} catch (IOException ioe) {
			System.err.println(ioe.getMessage());
		}

		// Step 5: Close the document
		document.close();
		System.out.println("PDF is created sussecefully ");
	}
}