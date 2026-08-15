package com.itext.pdf.example.r4r;

import java.io.FileOutputStream;
import java.io.IOException;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

/**
 * Demonstrates the use of PageSize.
 * In this example we are creating a PDF file. Then we are creating new pages with different size.
 * To create new a page we have a method newPage().
 * To set size we have a method setpagesize(int pageSize).
 * To add paragraph we have add(Paragraph p) methods.  
 */
public class DefaultPDFPageSize {
	/**
	 * Creates a PDF document with a certain pagesize
	 */
	public static void main(String[] args) {

		System.out
				.println("The default PageSize and some other standard sizes available which you can use.");

		// Step 1: Creation of a document-object.
		Document document = new Document();

		try {

			// Step2:
			// We are creating a writer that listens to the document and directs a PDF file. 
			PdfWriter.getInstance(document, new FileOutputStream(
					"DefaultPageSize.pdf"));

			// Step3: We are opening the document.
			document.open();

			// Step 4: We are adding here some paragraphs to the document.
			document.add(new Paragraph("The default PageSize is DIN A4."));
			document.setPageSize(PageSize.A3);
			document.newPage();
			document.add(new Paragraph("This PageSize is DIN A3."));
			document.setPageSize(PageSize.A2);
			document.newPage();
			document.add(new Paragraph("This PageSize is DIN A2."));
			document.setPageSize(PageSize.A1);
			document.newPage();
			document.add(new Paragraph("This PageSize is DIN A1."));
			document.setPageSize(PageSize.A0);
			document.newPage();
			document.add(new Paragraph("This PageSize is DIN A0."));
			document.setPageSize(PageSize.A5);
			document.newPage();
			document.add(new Paragraph("This PageSize is DIN A5."));
			document.setPageSize(PageSize.A6);
			document.newPage();
			document.add(new Paragraph("This PageSize is DIN A6."));
			document.setPageSize(PageSize.A7);
			document.newPage();
			document.add(new Paragraph("This PageSize is DIN A7."));
			document.setPageSize(PageSize.A8);
			document.newPage();
			document.add(new Paragraph("This PageSize is DIN A8."));
			document.setPageSize(PageSize.LETTER);
			document.newPage();
			document.add(new Paragraph("This PageSize is LETTER."));
			document.add(new Paragraph(
					"A Lot of other Standard PageSizes are Available."));

		} catch (DocumentException de) {
			System.err.println(de.getMessage());
		} catch (IOException ioe) {
			System.err.println(ioe.getMessage());
		}

		// Step5: We are closing the document.
		document.close();
	}
}
