import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

import { Interet } from '../models/Interet';
import { CvService } from 'src/app/service/cv.service';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss']
})
export class HobbiesComponent {
  @Output() interetData: EventEmitter<String> = new EventEmitter<String>();
  hobbyForm: FormGroup;

  constructor(private fb: FormBuilder, private service: CvService) {
    this.hobbyForm = this.fb.group({
      hobby: '',
     newHobby: this.fb.array([]),
    });
  }

  newHobby(): FormArray {
    return this.hobbyForm.get('newHobby') as FormArray;
  }

  newInteret(): FormGroup {
    return this.fb.group({
      interet: " ",
    });
  }

  deleteNew(index: number) {
    this.newHobby().removeAt(index);
  }

  addItem(event: Event) {
    this.newHobby().push(this.newInteret());
    event.preventDefault(); // Prevent form submission and page refresh
  }

  saveHobby(event: Event) {
    event.preventDefault();

    const existingInteret = this.hobbyForm.get('hobby')?.value;
    const newInteret = this.hobbyForm.get('newHobby')?.value.map((newHobby: { interet: string }) => newHobby.interet);

    // Combine les compétences existantes et nouvelles
    const allInterets = new Interet(undefined,[existingInteret, ...newInteret]);

      // Enregistrez le tableau de compétences
  this.service.saveInteret(allInterets).subscribe(
    (saveRes) => {
      console.log(saveRes);
      console.log('Emitting interetId:', saveRes);
      this.interetData.emit(saveRes.interetId);
      alert('Interet ajoutée avec succès.')
     
      this.hobbyForm.get('hobby')?.setValue(existingInteret);
    },
    (err) => {
      console.error(err);
     
      alert('Veuillez vérifier.')
    }
  );}
}
