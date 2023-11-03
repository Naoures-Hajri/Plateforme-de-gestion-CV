import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder,FormArray, FormGroup } from '@angular/forms';

import { CvService } from 'src/app/service/cv.service';

import { forkJoin,Observable, Observer } from 'rxjs';
import { Competence } from '../models/Competence';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.scss']
})
export class CompetencesComponent implements OnInit {

  @Output() competenceData: EventEmitter<String> = new EventEmitter<String>();
 
  comp:string[]=['']
 
  compForm:FormGroup;
  
  constructor( private fb: FormBuilder, private service: CvService) { 
    this.compForm = this.fb.group({  
      competence: this.fb.array([]),  
      newComp: this.fb.array([]),  
    });  
  }
  existingComp(): FormArray {
    return this.compForm.get('competence') as FormArray;
  }
  newComp() : FormArray {  
    return this.compForm.get("newComp") as FormArray  
  } 
  newCompetence(): FormGroup {  
    return this.fb.group({  
      
      compt: '',  
    })  
  }  
  delete(index:number){
   
  
    this.existingComp().removeAt(index);
     // Update the value in localStorage
  localStorage.setItem('competence', JSON.stringify(this.comp));
  }
  
  deleteNew(index:number){
    this.newComp().removeAt(index)
  }
 
  ngOnInit() {
   
    this.comp = JSON.parse(localStorage.getItem('competence') || ' ');
    this.comp.forEach((c) => {
      this.existingComp().push(this.fb.control(c));
    });
    
  }

 addItem(event: Event){
  
    this.newComp().push(this.newCompetence());  
    event.preventDefault(); // Prevent form submission and page refresh
  }
  

  
  saveCompetence(event: Event) {
    event.preventDefault(); // Prevent form submission and page refresh
    const existingValues = this.compForm.get('competence')?.value;
    const newValues = this.compForm.get('newComp')?.value;
    this.comp = [...existingValues, ...newValues.map((v: { compt: string }) => v.compt)];
  
    let competence1 = new Competence(undefined,this.comp);
    console.log(competence1);
  
    const saveCompetence$ = this.service.saveCompetence(competence1);
    const updateLocalStorage$ = new Observable<void>((observer: Observer<void>) => {
      localStorage.setItem('competence', JSON.stringify(this.comp));
      observer.next();
      observer.complete();
    });
  
    forkJoin([saveCompetence$, updateLocalStorage$]).subscribe(
      ([saveRes]) => {
        console.log(saveRes);
        console.log('Emitting competenceId:', saveRes);
        this.competenceData.emit(saveRes.competenceId); 
       
        alert('Compétence ajoutée avec succès.')
        // Update the form control values
        this.compForm.get('competence')?.setValue(this.comp);
      },
      err => {
        console.error(err);
        alert('Veuillez vérifier.')
      }
    );
  }
  
}

