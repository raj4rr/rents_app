package com.itext.pdf.example.r4r;

//These are package of java.io.*
import java.io.FileOutputStream;
import java.io.IOException;
//These are package of iText API 
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
/**
 * Here in this example we are creating a PDF document with different pages that  have different alignments.
 * To set alignment we are using setAlignment(int arg).
 */
public class SetAlignmentInPDF {
	/**
	 * Creates a PDF document with different pages that have different alignments.
	 */
	public static void main(String[] args) {

		System.out.println("Set Alignment in PDF file");
		// Step1: Here we are creating an object of a document.
		Document document = new Document(PageSize.A5, 36, 72, 108, 180);

		try {

			// Step 2:Here we are creating  a writer that listens to the document and directs a PDF-stream to a file.

			PdfWriter
					.getInstance(document, new FileOutputStream("Alignment.pdf"));

			// Step3: Here we are opening the document
			document.open();

			// Step4: Here we are adding paragraph, creating new page and setting alignments.
			Paragraph paragraph = new Paragraph();
			paragraph.setAlignment(Element.ALIGN_RIGHT);

			paragraph.add("RIGHT Alignment");
			document.add(paragraph);
			document.newPage();
			paragraph = new Paragraph();
			paragraph.setAlignment(Element.ALIGN_CENTER);

			paragraph.add("CENTER Alignment");
			document.add(paragraph);
			document.newPage();
			paragraph = new Paragraph();
			paragraph.setAlignment(Element.ALIGN_BASELINE);

			paragraph.add("BASELINE Alignment");
			document.add(paragraph);
			document.newPage();
			paragraph = new Paragraph();
			paragraph.setAlignment(Element.ALIGN_BOTTOM);

			paragraph.add("BOTTOM Alignment");
			document.add(paragraph);
			document.newPage();
			paragraph = new Paragraph();
			paragraph.setAlignment(Element.ALIGN_MIDDLE);

			paragraph.add("MIDDLE Alignment");
			document.add(paragraph);
			document.newPage();
			paragraph = new Paragraph();
			paragraph.setAlignment(Element.ALIGN_TOP);

			paragraph.add("TOP Alignment");
			document.add(paragraph);
			document.newPage();
			paragraph = new Paragraph();
			paragraph.setAlignment(Element.ALIGN_LEFT);

			paragraph.add("LEFT Alignment");
			document.add(paragraph);

		} catch (DocumentException de) {
			System.err.println(de.getMessage());
		} catch (IOException ioe) {
			System.err.println(ioe.getMessage());
		}

		// Step5:Here we are closing the document.
		document.close();
	}
}

