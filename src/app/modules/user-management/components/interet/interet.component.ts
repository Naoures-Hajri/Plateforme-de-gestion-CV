import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CvService } from 'src/app/service/cv.service';


import { forkJoin, Observable, Observer } from 'rxjs';
import { Interet } from '../models/Interet';

@Component({
  selector: 'app-interet',
  templateUrl: './interet.component.html',
  styleUrls: ['./interet.component.scss']
})
export class InteretComponent{

  @Output() interetData: EventEmitter<String> = new EventEmitter<String>();
  centreInt: string[] = [];

  intForm: FormGroup;

  constructor(private fb: FormBuilder, private service: CvService ) {
    this.intForm = this.fb.group({
      interet: this.fb.array([]),
      newInt: this.fb.array([]),
    });
  }

  existingInt(): FormArray {
    return this.intForm.get('interet') as FormArray;
  }

  newInter(): FormArray {
    return this.intForm.get("newInt") as FormArray;
  }

  newInteret(): FormGroup {
    return this.fb.group({
      inter: '',
    });
  }

  delete(index: number) {
    this.existingInt().removeAt(index);
    // Mettre à jour la valeur dans localStorage
    localStorage.setItem('interet', JSON.stringify(this.centreInt));
  }

  deleteNew(index: number) {
    this.newInter().removeAt(index);
  }

  ngOnInit() {
    this.centreInt = JSON.parse(localStorage.getItem('interet') || '[]');
    this.centreInt.forEach((int) => {
      this.existingInt().push(this.fb.control(int));
    });
  }

  addItem(event: Event) {
    this.newInter().push(this.newInteret());
    event.preventDefault(); // Empêcher la soumission du formulaire et le rafraîchissement de la page
  }

  saveInteret(event: Event) {
    event.preventDefault(); // Empêcher la soumission du formulaire et le rafraîchissement de la page
    const existingValues = this.intForm.get('interet')?.value;
    const newValues = this.intForm.get('newInt')?.value;
    this.centreInt = [...existingValues, ...newValues.map((v: { inter: string }) => v.inter)];

    let interet1 = new Interet(undefined,this.centreInt);
    console.log(interet1);

    const saveInteret$ = this.service.saveInteret(interet1);
    const updateLocalStorage$ = new Observable<void>((observer: Observer<void>) => {
      localStorage.setItem('interet', JSON.stringify(this.centreInt));
      observer.next();
      observer.complete();
    });

    forkJoin([saveInteret$, updateLocalStorage$]).subscribe(
      ([saveRes]) => {
        console.log(saveRes);
        console.log('Emitting interetId:', saveRes);
        this.interetData.emit(saveRes.interetId); 
    
        alert('Interet ajoutée avec succès.')
        // Mettre à jour les valeurs des contrôles du formulaire
        this.intForm.get('interet')?.setValue(this.centreInt);
      },
      err => {
        console.error(err);
       
        alert('Veuillez vérifier.')
      }
    );
  }
  
}