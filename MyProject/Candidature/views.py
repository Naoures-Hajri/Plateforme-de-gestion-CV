from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import PyPDF2
from . import constants as cs
import re
import json
import collections
from django.http import JsonResponse


# Create your views here.
class MyDataView(APIView):
    def get(self, request, format=None):
       
        
        file_name = "MyProject/cv1.pdf"
        doc = PyPDF2.PdfFileReader(file_name)

        pages = doc.getNumPages()
        text = ""
        for i in range(pages):
            current_page = doc.getPage(i)
            text += current_page.extractText()

        text_split = [i.strip() for i in text.split('\n')]
    # sections_in_resume = [i for i in text_split if i.lower() in sections]
        entities = {}
        key = False
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

    

        
        return JsonResponse(entities)
    
