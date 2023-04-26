from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from Candidature.serializers import MyDataSerializer
import PyPDF2
import re
import json
import collections
from django.http import JsonResponse
import PyPDF2
import re
import json
import collections
from django.http import JsonResponse


# Create your views here.
class MyDataView(APIView):
    def get(self, request, format=None):
        data = [
            {'name': 'John', 'age': 25},
            {'name': 'Jane', 'age': 30},
        ]



    file_name = "cv1.pdf"
    doc = PyPDF2.PdfFileReader(file_name)

    pages = doc.getNumPages()
    text = ""
    for i in range(pages):
        current_page = doc.getPage(i)
        text += current_page.extractText()

    entities = {}
    key = False
    contact = {}
    experience = {}
    langues = {}
    text_split = [i.strip() for i in text.split('\n')]

    for phrase in text_split:
        if len(phrase) == 1:
            p_key = phrase
        else:
            p_key = set(phrase.lower().split()) & set(cs.RESUME_SECTIONS)
        try:
            p_key = list(p_key)[0]
        except IndexError:
            pass
        if p_key in cs.RESUME_SECTIONS:
            entities[p_key] = []
            key = p_key
        elif key and phrase.strip():
            entities[key].append(phrase)

    for key, value in entities.items():
        if key in ['contact']:
            contact[key] = value
        elif key in ['experience']:
            experience[key]= value   
        elif key in ['langues']:
            langues[key]= value 

    contact_data = collections.OrderedDict()
    contact_row = contact.get('contact', [])
    if len(contact_row) >= 4:
        contact_data["tel"] = contact_row[0]
        contact_data["mail"] = contact_row[1]
        contact_data["adr1"] = contact_row[2]
        contact_data["adr2"] = contact_row[3]

    experience_data = []
    experience_rows = experience.get('experience', [])
    for row in experience_rows:
        experience_dict = collections.OrderedDict()
        row_data = row.split('\n')
        if len(row_data) >= 4:
            experience_dict["date"] = row_data[0]
            experience_dict["société"] = row_data[1]
            experience_dict["poste"] = row_data[2]
            experience_dict["taches"] = row_data[3]
        experience_data.append(experience_dict)

    langues_data = collections.OrderedDict()
    langues_row = langues.get('langues', [])
    if len(langues_row) >= 3:
        langues_data["l1"] = langues_row[0]
        langues_data["l2"] = langues_row[1]
        langues_data["l3"] = langues_row[2]

    result = {
        "contact": contact_data,
        "experience": experience_data,
        "langues": langues_data
    }

    print(JsonResponse(result)) 
    
