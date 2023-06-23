const { PDFDocument, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const updatePDFCV = async (req, res) => {
  try {
    const inputFilePath = 'templates/model1.pdf';
    const outputFilePath = 'output/newCV.pdf';

    const phoneNumberToReplace = '060606';
    const newPhoneNumber = '1234567890';

    // Read the input PDF file
    const fileBytes = fs.readFileSync(inputFilePath);

    // Extract text content from the PDF using pdf-parse
    const pdfData = await pdfParse(fileBytes);
    const textContent = pdfData.text;

    // Replace the phone number in the text content
    const modifiedTextContent = textContent.replace(phoneNumberToReplace, newPhoneNumber);

    // Create a new PDF document with pdf-lib
    const modifiedPdfDoc = await PDFDocument.create();
    const modifiedFont = await modifiedPdfDoc.embedFont(StandardFonts.Helvetica);
    const modifiedPage = modifiedPdfDoc.addPage();
    modifiedPage.setFont(modifiedFont);
    modifiedPage.drawText(modifiedTextContent);

    // Save the modified PDF to a new file
    const modifiedPdfBytes = await modifiedPdfDoc.save();
    fs.writeFileSync(outputFilePath, modifiedPdfBytes);

    console.log('PDF CV updated successfully');
    return res.status(200).json({ message: 'Modified PDF CV created successfully' });
  } catch (error) {
    console.error('Error updating PDF CV:', error);
    return res.status(500).json({ error: 'Failed to update PDF CV' });
  }
};

module.exports = { updatePDFCV };