import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
// import { CrudCVService } from '../service/crud-cv.service';
// import { NgToastService } from 'ng-angular-popup';

import { CvService } from 'src/app/service/cv.service';
import { Experience } from '../models/experience';
@Component({
  selector: 'app-experience1',
  templateUrl: './experience1.component.html',
  styleUrls: ['./experience1.component.scss']
})
export class Experience1Component {
  @Output() experienceData: EventEmitter<String> = new EventEmitter<String>();
  experienceForm: FormGroup;

  constructor(private fb: FormBuilder, private service: CvService) {
    this.experienceForm = this.fb.group({
      experiences: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Au démarrage, vous pouvez ajouter une formation initiale vide
    this.addExperience();
  }

  get experiences(): FormArray {
    return this.experienceForm.get('experiences') as FormArray;
  }

  addExperience(): void {
    this.experiences.push(this.createExperienceGroup());
  }

  createExperienceGroup(): FormGroup {
    return this.fb.group({
      poste: '',
      entreprise: '',
      dateDeb: '',
      dateFin: '',
      description: '',
    });
  }
  isExperienceFormInvalid(): boolean {
    const experiencesData: Experience[] = this.experienceForm.value.experiences;
  
    for (const experience of experiencesData) {
      if (!experience.poste || !experience.entreprise || !experience.dateDeb || !experience.dateFin || !experience.description) {
        return true; // Return true if any field is empty
      }
    }
  
    return false; // Return false if all fields are filled
  }
  
  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  saveExperience(): void {
    const experiencesData: Experience[] = this.experienceForm.value;
    console.log(experiencesData)
    this.experienceForm.value.experiences.map((i: any) => {
      console.log(i);
      this.service.saveExperience(i).subscribe(
        (res: any) => {
          if (res && res._id) {

            console.log('Emitting _id:', res._id);
            this.experienceData.emit(res._id);
          }
      
          alert('Experience ajoutée avec succès.')
        },
        err => {
          console.error(err);
        
          alert('Veuillez vérifier.')
        }
      );
    })
    // Envoyer experiencesData au service pour l'enregistrement

  }
}
