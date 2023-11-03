import { Component, EventEmitter, Output } from '@angular/core';

import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CvService } from 'src/app/service/cv.service';
class Formation{
  dateDeb?: Date;
  dateFin?: Date;
  diplome?: String;
  etablissement?: String;
  cv?: any
}

@Component({
  selector: 'app-formation1',
  templateUrl: './formation1.component.html',
  styleUrls: ['./formation1.component.scss']
})
export class Formation1Component {
  @Output() formationData: EventEmitter<String> = new EventEmitter<String>();
  formationForm: FormGroup;

  constructor(private fb: FormBuilder, private service: CvService) {
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
          this.formationData.emit(res._id);
        }
        alert('Formation ajoutée avec succès.')
    
      },
      err => {
      
        alert('Veuillez vérifier.')
      }
    );
  }
}
