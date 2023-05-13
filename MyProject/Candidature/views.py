from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import PyPDF2
from . import constants as cs
import re
import json
import collections
from django.http import JsonResponse
from rest_framework.decorators import api_view
import os
@api_view(['POST'])
def file_upload(request):
    destination_path = 'MyProject/uploads'
    uploaded_file = request.FILES['file']
    with open(os.path.join(destination_path, uploaded_file.name), 'wb+') as destination_file:
            for chunk in uploaded_file.chunks():
                destination_file.write(chunk)
    file_name = os.path.join(destination_path, uploaded_file.name)
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

    

    print(entities)
    return JsonResponse(entities)            
   
# Create your views here.
class MyDataView(APIView):
    def post(request):
        
        destination_path = 'MyProject/uploads'
        uploaded_file = request.FILES['file']
        with open(os.path.join(destination_path, uploaded_file.name), 'wb+') as destination_file:
            for chunk in uploaded_file.chunks():
                destination_file.write(chunk)
               
        file_name = uploaded_file.name
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
    
