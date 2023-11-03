import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';



import { Langue } from '../models/langue';
import { CvService } from 'src/app/service/cv.service';

@Component({
  selector: 'app-langue1',
  templateUrl: './langue1.component.html',
  styleUrls: ['./langue1.component.scss']
})
export class Langue1Component {
  @Output() langueData: EventEmitter<String> = new EventEmitter<String>();
  langueForm: FormGroup;

  constructor(private fb: FormBuilder, private service: CvService) {
    this.langueForm = this.fb.group({
      langue: '',
      newLang: this.fb.array([]),
    });
  }

  newLang(): FormArray {
    return this.langueForm.get('newLang') as FormArray;
  }

  newLangue(): FormGroup {
    return this.fb.group({
      lang: " ",
    });
  }

  deleteNew(index: number) {
    this.newLang().removeAt(index);
  }

  addItem(event: Event) {
    this.newLang().push(this.newLangue());
    event.preventDefault(); // Prevent form submission and page refresh
  }

  saveLangue(event: Event) {
    event.preventDefault();

    const existingLangue = this.langueForm.get('langue')?.value;
    const newLangue = this.langueForm.get('newLang')?.value.map((newLang: { lang: string }) => newLang.lang);

    // Combine les compétences existantes et nouvelles
    const allLangues = new Langue(undefined,[existingLangue, ...newLangue]);

      // Enregistrez le tableau de compétences
  this.service.saveLangue(allLangues).subscribe(
    (saveRes) => {
      console.log(saveRes);
      console.log('Emitting langueId:', saveRes);
      this.langueData.emit(saveRes.langueId);
   

      alert('Langue ajoutée avec succès.')

    
      this.langueForm.get('langue')?.setValue(existingLangue);
    },
    (err) => {
      console.error(err);
      
      alert('Veuillez vérifier.')
    }
  );}
}
