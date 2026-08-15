package com.itext.pdf.example.r4r;
//These are package of java.io.*
import java.io.FileOutputStream;
import java.io.IOException;
//These are package of iText API 
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

/**
 *This is example of set margins of a PDF.
 */
public class MarginsInPDF {
	/**
	 * Here we are creating  a PDF document with different pages that have different margins.
	 * To set the margins we are using the setMargins() method.
	 * Here we are using an other method setMarginMirroring(true).This is used to set the mirrore of previous page margins at next page
	 */
	public static void main(String[] args) {

		System.out.println("Set margins in PDF pages.");
		// Step1:Here we are creating an object of a document.
		Document document = new Document(PageSize.A5, 36, 72, 108, 180);

		try {

			// Step2:Here we are creating a writer that listens to the document and directs a PDF-stream to a file.

			PdfWriter.getInstance(document, new FileOutputStream(
					"MarginsInPDF.pdf"));

			// Step3:Here we are opening the document.
			document.open();

			// Step4:Here we are adding the paragraph in PDF document.Here margins are default.
			document
					.add(new Paragraph(
							"The left margin of this document is 36pt (0.5 inch); the right margin 72pt (1 inch); the top margin 108pt (1.5 inch); the bottom margin 180pt (2.5 inch). "));
			Paragraph paragraph = new Paragraph();
			document.add(paragraph);
			//Here we are setting the margings.
			document.setMargins(180, 108, 72, 36);
			document
					.add(new Paragraph(
							"Now we change the margins. You will see the effect on the next page."));
			document.add(paragraph);
			//Here we are setting the margin mirror true.So that the margins will be mirrored.
			document.setMarginMirroring(true);
			document
					.add(new Paragraph(
							"Starting on the next page, the margins will be mirrored."));
			document.add(paragraph);
		} catch (DocumentException de) {
			System.err.println(de.getMessage());
		} catch (IOException ioe) {
			System.err.println(ioe.getMessage());
		}

		// Step5:We are closing the document
		document.close();
	}
}
