import PyPDF2
import re


file_name= "CV_HAJRI_Naoures (1).pdf"
doc = PyPDF2.PdfFileReader(file_name)


search = "FORMATION"

pages = doc.getNumPages()

for i in range(pages):
	current_page = doc.getPage(i)
	text = current_page.extractText()
if re.findall(search, text):
    print(re.findall(search, text)) 
""" from pyresparser import ResumeParser
data = ResumeParser('CV_HAJRI_Naoures (1).pdf').get_extracted_data 

from resume_parser import resumeparse
data = resumeparse.read_file('CV_HAJRI_Naoures (1).pdf')  """


