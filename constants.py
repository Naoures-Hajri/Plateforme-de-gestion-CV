from nltk.corpus import stopwords

# Nom  Prenom
NAME_PATTERN      = [{'POS': 'PROPN'}, {'POS': 'PROPN'}]






STOPWORDS         = set(stopwords.words('french'))

RESUME_SECTIONS = [
                    
                    'contact',
                    'profil',
                    'centre',
                    'competences',
                    'langues',
                    'formation',
                    'experience',
                    'hobbies',
                  
                    
]

