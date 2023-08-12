import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CrudCVService } from '../service/crud-cv.service';
import { NgToastService } from 'ng-angular-popup';
import { Experience } from '../models/Experience';
@Component({
  selector: 'app-experience1',
  templateUrl: './experience1.component.html',
  styleUrls: ['./experience1.component.css']
})
export class Experience1Component {
  @Output() experienceData: EventEmitter<String> = new EventEmitter<String>();  
  experienceForm: FormGroup;

  constructor(private fb: FormBuilder, private service: CrudCVService, private toast: NgToastService) {
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
      poste:'',
      entreprise:'',
      dateDeb: '',
      dateFin: '',
      description: '',
    });
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  saveExperience(): void {
    const experiencesData: Experience[] = this.experienceForm.value.formations;
    // Envoyer experiencesData au service pour l'enregistrement
    this.service.saveExperience(experiencesData).subscribe(
      (res: any) => {
        if (res && res._id) {
          
          console.log('Emitting _id:', res._id);
          this.experienceData.emit(res._id);}
        setTimeout(() => {
          this.toast.success({
            detail: 'Experience ajoutée avec succès.',
            summary: 'Succès'
          });
        }, 1000);
      },
      err => {
        console.error(err);
        this.toast.error({
          detail: 'Veuillez vérifier.',
          summary: 'Erreur'
        });
      }
      );
      }
}
