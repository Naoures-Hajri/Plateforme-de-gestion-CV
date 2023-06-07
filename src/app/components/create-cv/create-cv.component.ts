
import {  Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Model_cv } from 'src/app/models/model_cv';
import { CrudCVService } from 'src/app/service/crud-cv.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.css']
})
export class CreateCVComponent {
 
  cvForm!: FormGroup;
  contactId!: String; // Add a property to store the contactId
  enteteId!: String; // Add a property to store the enteteId
  competenceId!: String; // Add a property to store the competenceId
  langueId!: String; // Add a property to store the langueId
  centreInteretId!: String; // Add a property to store the interetId
  experienceId!: String; // Add a property to store the experienceId
  formationId!: String; // Add a property to store the formationId
  cvData:  Model_cv = new Model_cv(); // Object to store the CV data
  

  constructor(private cvService: CrudCVService, private fb: FormBuilder) {}

 

  handleContactData(contactId: String): void {
    this.contactId = contactId;
    console.log('ContactId received:', this.contactId);
  }
  handleEnteteData(enteteId: String): void {
    this.enteteId = enteteId;
    console.log('EnteteId received:', this.enteteId);
  }
  handleCompetenceData(competenceId: String): void {
    this.competenceId = competenceId;
    console.log('CompetenceId received:', this.competenceId);
  }
  handleLangueData(langueId: String): void {
    this.langueId = langueId;
    console.log('LangueId received:', this.langueId);
  }
  handleInteretData(interetId: String): void {
    this.centreInteretId = interetId;
    console.log('InteretId received:', this.centreInteretId);
  }
  handleExperienceData(experienceId: String): void {
    this.experienceId = experienceId;
    console.log('ExperienceId received:', this.experienceId);
  }
  handleFormationData(formationId: String): void {
    this.formationId = formationId;
    console.log('FormationId received:', this.formationId);
  }
  saveCV() {
    
    if (
      this.contactId &&
      this.enteteId &&
      this.competenceId &&
      this.langueId &&
      this.centreInteretId &&
      this.experienceId &&
      this.formationId
    )
  
    // Assigner les valeurs des champs de formulaire à cvData
    
    this.cvData.enteteId = this.enteteId;
    this.cvData.contactId = this.contactId;
    this.cvData.experienceId = this.experienceId;
    this.cvData.formationId = this.formationId;
    this.cvData.langueId = this.langueId;
    this.cvData.competenceId = this.competenceId;
    this.cvData.centreInteretId = this.centreInteretId;
  
    const cvDataWithData = {
      
      enteteId: this.cvData.enteteId,
      contactId: this.cvData.contactId,
      experienceId: this.cvData.experienceId,
      formationId: this.cvData.formationId,
      langueId: this.cvData.langueId,
      competenceId: this.cvData.competenceId,
      centreInteretId: this.cvData.centreInteretId
    };
  
    this.cvService.saveCV(cvDataWithData)
      .subscribe(
        (response) => {
          // Handle successful response
          console.log('CV saved successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            html: '<h3>Le CV a été enregistré avec succès.</h3>',
          });
        },
        (error) => {
          // Handle error response
          console.error('Error saving CV:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            html: '<h3>Une erreur s\'est produite lors de l\'enregistrement du CV.</h3>',
          });
        }
      );
  }
  ngOnInit(): void {
    this.cvForm = this.fb.group({
      
      
      
    });
  }
  
}  
  

  