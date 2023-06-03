
import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Model_cv } from 'src/app/models/model_cv';
import { CrudCVService } from 'src/app/service/crud-cv.service';
import { NgToastService } from 'ng-angular-popup';
import { Contact } from 'src/app/models/Contact';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.css']
})
export class CreateCVComponent {
  @ViewChild(ContactComponent) contactComponent!: ContactComponent;
  cvForm!: FormGroup;
  contactId!: String; // Add a property to store the contactId
  cvData:  Model_cv = new Model_cv(); // Object to store the CV data
  

  constructor(private cvService: CrudCVService, private fb: FormBuilder) {}
  saveContact() {
    this.contactComponent.saveContact(); // Appeler la méthode saveContact() du composant ContactComponent
  }

  handleContactData(contactId: String): void {
    this.contactId = contactId;
    console.log('ContactId received:', this.contactId);
  }
  
  

  saveCV() {
    console.log('ContactId used:', this.contactId);
   
  
    // Assigner les valeurs des champs de formulaire à cvData
    this.cvData.titre = this.cvForm.value.titre;
    this.cvData.enteteId = this.cvForm.value.entete || null;
    this.cvData.contactId = this.contactId;
    this.cvData.experienceId = this.cvForm.value.experience || null;
    this.cvData.formationId = this.cvForm.value.formation || null;
    this.cvData.langueId = this.cvForm.value.langue || null;
    this.cvData.competenceId = this.cvForm.value.competence || null;
    this.cvData.centreInteretId = this.cvForm.value.centreInteret || null;
  
    const cvDataWithContactData = {
      titre: this.cvData.titre,
      enteteId: this.cvData.enteteId,
      contactId: this.cvData.contactId,
      experienceId: this.cvData.experienceId,
      formationId: this.cvData.formationId,
      langueId: this.cvData.langueId,
      competenceId: this.cvData.competenceId,
      centreInteretId: this.cvData.centreInteretId
    };
  
    this.cvService.saveCV(cvDataWithContactData)
      .subscribe(
        (response) => {
          // Handle successful response
          console.log('CV saved successfully:', response);
        },
        (error) => {
          // Handle error response
          console.error('Error saving CV:', error);
        }
      );
  }
  ngOnInit(): void {
    this.cvForm = this.fb.group({
      titre:'ttttt',
      entete: [''],
      langue: [''],
      competence: [''],
      experience: [''],
      formation: [''],
      centreInteret: ['']
    });
  }
  
}  
  

  