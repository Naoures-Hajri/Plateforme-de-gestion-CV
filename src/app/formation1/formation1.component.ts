import { Component, EventEmitter, Output } from '@angular/core';
import { Formation } from '../models/Formation';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CrudCVService } from '../service/crud-cv.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-formation1',
  templateUrl: './formation1.component.html',
  styleUrls: ['./formation1.component.css']
})
export class Formation1Component {
  @Output() formationData: EventEmitter<String> = new EventEmitter<String>();  
  formationForm: FormGroup;

  constructor(private fb: FormBuilder, private service: CrudCVService, private toast: NgToastService) {
    this.formationForm = this.fb.group({
      formations: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Au démarrage, vous pouvez ajouter une formation initiale vide
    this.addFormation();
  }

  get formations(): FormArray {
    return this.formationForm.get('formations') as FormArray;
  }

  addFormation(): void {
    this.formations.push(this.createFormationGroup());
  }

  createFormationGroup(): FormGroup {
    return this.fb.group({
      dateDeb: '',
      dateFin: '',
      diplome: '',
      etablissement: ''
    });
  }

  removeFormation(index: number): void {
    this.formations.removeAt(index);
  }

  saveFormation(): void {
    const formationsData: Formation[] = this.formationForm.value.formations;
    // Envoyer formationsData au service pour l'enregistrement
    this.service.saveFormation(formationsData).subscribe(
      (res: any) => {
        if (res && res._id) {
          
          console.log('Emitting _id:', res._id);
          this.formationData.emit(res._id);}
        setTimeout(() => {
          this.toast.success({
            detail: 'Formation ajoutée avec succès.',
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
