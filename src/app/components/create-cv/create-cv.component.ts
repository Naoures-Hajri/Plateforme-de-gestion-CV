
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
  @ViewChild('contactComponent',{ static: false })
  contactComponent!: ContactComponent;

  cvForm!: FormGroup; 
  cvData: Model_cv | undefined;
  constructor(private fb: FormBuilder, private service: CrudCVService,private toast: NgToastService){
    console.log('CreateCVComponent instantiated');

  }
  // Function to handle the emitted contact data from the child component
  handleContactData(contact1: Contact): void {
    console.log('handleContactData called');
    console.log('Received contact data:', contact1);
    this.cvData = {
      titre: 'tttttttttttt',
      entete: this.cvForm.get('entete')?.value,
      contact: contact1,
      langue: this.cvForm.get('langue')?.value,
      competence: this.cvForm.get('competence')?.value,
      experience: this.cvForm.get('experience')?.value,
      formation: this.cvForm.get('formation')?.value,
      centreInteret: this.cvForm.get('centreInteret')?.value
    };

    // Call the saveCV() function with the updated cvData object
    this.saveCV();
  }
  



  saveCV(): void {
    if (!this.cvData) {
      return;
    }
    this.service.saveCV(this.cvData).subscribe(
      (res) => {
        console.log(res);
        // CV saved successfully
        this.toast.success({ detail: 'CV ajoutée avec succès.', summary: 'Succès' });
      },
      (cvSaveError) => {
        // Error saving the CV
        console.error(cvSaveError);
        this.toast.error({ detail: 'Erreur lors de l\'enregistrement du CV.', summary: 'err msg !!' });
      }
    );
  }

  ngOnInit(): void {
    this.cvForm = this.fb.group({
      entete: '',
      contact: this.fb.group({
        tel: '',
        mail: '',
        adresse: ''
      }),
      langue: '',
      competence: '',
      experience: '',
      formation: '',
      centreInteret: ''
    });
    console.log('cvForm initialized:', this.cvForm);
  }
}
  

  