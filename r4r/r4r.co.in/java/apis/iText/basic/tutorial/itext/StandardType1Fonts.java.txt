package com.itext.pdf.example.r4r;

import java.io.FileOutputStream;
import java.io.IOException;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

/**
 * Generates a PDF with the 14 Standard Type 1 Fonts. There are 14 standard
 * fonts that should be available by default in each PDF reader. These fonts are
 * Courier Bold,Courier,  Courier Italic (Oblique), Courier Bold and Italic,
 * Helvetica Bold,Helvetica,  Helvetica Italic (Oblique), Helvetica Bold and
 * Times Roman Bold,Italic, Times Roman,  Times Roman Italic, Times Roman Bold
 * and Italic, Symbol and ZapfDingBats® (see also the section on built-in
 * fonts). As you can see the different faces (bold, normal,  italic and
 * bolditalic) of the same type face (Helvetica,Courier,  Times Roman) are
 * considered to be different fonts. 
 */

public class StandardType1Fonts {

	/**
	 * Here we are enerating a PDF file with the 14 standard Type 1 Fonts
	 */
	public static void main(String[] args) {

		System.out.println("14 Standard Type 1 fonts used to create a PDF file");

		// Step1: Here we are creating an object of a document.
		Document document = new Document();
		try {
			// Step2:Here we are creating a writer that listens to the document
			PdfWriter.getInstance(document, new FileOutputStream(
					"StandardType1FontsPDF.pdf"));

			// Step3:Here we are opening the document
			document.open();
			// Step4:Here we are creating the  the 14 standard fonts in PDF.I will suggest you  don't use this Font constructor this is for demonstration purposes only, use FontFactory
			Font[] fonts = new Font[14];
			fonts[0] =new Font(Font.COURIER, Font.DEFAULTSIZE, Font.ITALIC);
			fonts[1] =  new Font(Font.COURIER, Font.DEFAULTSIZE, Font.NORMAL);
			fonts[2] = new Font(Font.COURIER, Font.DEFAULTSIZE, Font.BOLD);
			fonts[3] = new Font(Font.HELVETICA, Font.DEFAULTSIZE, Font.NORMAL);
			fonts[4] = new Font(Font.COURIER, Font.DEFAULTSIZE, Font.BOLD
					| Font.ITALIC);
			fonts[5] = new Font(Font.HELVETICA, Font.DEFAULTSIZE, Font.ITALIC);
			fonts[6] = new Font(Font.HELVETICA, Font.DEFAULTSIZE, Font.BOLD);
			fonts[7] = new Font(Font.TIMES_ROMAN, Font.DEFAULTSIZE, Font.ITALIC);
			fonts[8] = new Font(Font.TIMES_ROMAN, Font.DEFAULTSIZE, Font.NORMAL);
			fonts[9] = new Font(Font.HELVETICA, Font.DEFAULTSIZE,
					Font.BOLDITALIC);
			fonts[10] = new Font(Font.TIMES_ROMAN, Font.DEFAULTSIZE, Font.BOLD);
			fonts[11] = new Font(Font.SYMBOL);
			fonts[12] = new Font(Font.TIMES_ROMAN, Font.DEFAULTSIZE,
					Font.BOLDITALIC);
			fonts[13] = new Font(Font.ZAPFDINGBATS);
			//Here we are adding the content into documents
			for (int i = 0; i < 14; i++) {
				document
						.add(new Paragraph(
								"R4R Example Of Generates a PDF with the 14 Standard Type 1 Fonts",
								fonts[i]));
			}
		} catch (DocumentException de) {
			System.err.println(de.getMessage());
		} catch (IOException ioe) {
			System.err.println(ioe.getMessage());
		}

		// Step5: Here  close the document
		document.close();
	}
}
