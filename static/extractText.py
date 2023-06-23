from PyPDF2 import PdfReader, PdfWriter

def replace_text(input_pdf, output_pdf, phone_number):
    pdf = PdfReader(input_pdf)
    writer = PdfWriter()

    for page in pdf.pages:
        text = page.extract_text()
        modified_text = text.replace("06 06 06 06 06", phone_number)
        page.merge_page(page)
        writer.add_page(page)

    with open(output_pdf, "wb") as f:
        writer.write(f)

    print("Modified PDF CV created successfully.")

# Exemple d'utilisation
replace_text("templates/model1.pdf", "output/modified_cv.pdf", "1234567890")
