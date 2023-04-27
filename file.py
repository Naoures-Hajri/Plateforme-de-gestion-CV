import PyPDF2
import re
import constants as cs
import json
import collections
file_name= "cv1.pdf"
doc = PyPDF2.PdfFileReader(file_name)




pages = doc.getNumPages()

for i in range(pages):
	current_page = doc.getPage(i)
	text = current_page.extractText()



def extract_entity_sections_grad(text):
    '''
    Helper function to extract all the raw text from sections of
    resume specifically for graduates and undergraduates
    :param text: Raw text of resume
    :return: dictionary of entities
    '''
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

    # entity_key = False
    # for entity in entities.keys():
    #     sub_entities = {}
    #     for entry in entities[entity]:
    #         if u'\u2022' not in entry:
    #             sub_entities[entry] = []
    #             entity_key = entry
    #         elif entity_key:
    #             sub_entities[entity_key].append(entry)
    #     entities[entity] = sub_entities

    # pprint.pprint(entities)

    # make entities that are not found None
    # for entity in cs.RESUME_SECTIONS:
    #     if entity not in entities.keys():
    #         entities[entity] = None
    return entities



""" for key, value in entities.items():
    if key in ['contact']:
        contact[key] = value
    elif key in ['experience']:
        experience[key]= value   
    elif key in ['langues']:
        langues[key]= value 
    
for row in contact.values():
    c = collections.OrderedDict()
    c["tel"] = row[0]
    c["mail"] = row[1]
    c["adr1"] = row[2]
    c["adr2"] = row[3]
print(c)


for row in experience.values():
    e = collections.OrderedDict()
    e["date"] = row[0]
    e["société"] = row[1]
    e["poste"] = row[2]
    e["taches"] = row[3]

print(e)

for row in langues.values():
    l = collections.OrderedDict()
    l["l1"] = row[0]
    l["l2"] = row[1]
    l["l3"] = row[2]
print(l)
 """

 
 
print(extract_entity_sections_grad(text)) 



     
    
        



