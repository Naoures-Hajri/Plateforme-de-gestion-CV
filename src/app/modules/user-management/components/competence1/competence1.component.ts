import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';


import { CvService } from 'src/app/service/cv.service';
import { Competence } from '../models/Competence';

@Component({
  selector: 'app-competence1',
  templateUrl: './competence1.component.html',
  styleUrls: ['./competence1.component.scss']
})
export class Competence1Component {
  @Output() competenceData: EventEmitter<String> = new EventEmitter<String>();

  compForm: FormGroup;

  constructor(private fb: FormBuilder, private service: CvService, ) {
    this.compForm = this.fb.group({
      competence: '',
      newComp: this.fb.array([]),
    });
  }

  newComp(): FormArray {
    return this.compForm.get('newComp') as FormArray;
  }

  newCompetence(): FormGroup {
    return this.fb.group({
      compt: " ",
    });
  }

  deleteNew(index: number) {
    this.newComp().removeAt(index);
  }

  addItem(event: Event) {
    this.newComp().push(this.newCompetence());
    event.preventDefault(); // Prevent form submission and page refresh
  }

  saveCompetence(event: Event) {
    event.preventDefault();

    const existingCompetence = this.compForm.get('competence')?.value;
    const newCompetences = this.compForm.get('newComp')?.value.map((newComp: { compt: string }) => newComp.compt);

    // Combine les compétences existantes et nouvelles
    const allCompetences = new Competence(undefined,[existingCompetence, ...newCompetences]);

      // Enregistrez le tableau de compétences
  this.service.saveCompetence(allCompetences).subscribe(
    (saveRes) => {
      console.log(saveRes);
      console.log('Emitting competenceId:', saveRes);
      this.competenceData.emit(saveRes.competenceId);
      alert('Compétence ajoutée avec succès.')

      // Mettre à jour la valeur du champ 'competence' dans le formulaire
      this.compForm.get('competence')?.setValue(existingCompetence);
    },
    (err) => {
      console.error(err);
      alert('Veuillez vérifier.')
     
    }
  );}
}
