import { Component, OnInit} from '@angular/core';
import { FormBuilder,FormArray, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Competence } from 'src/app/models/Competence';
import { CrudCVService } from 'src/app/service/crud-cv.service';
import { forkJoin,Observable, Observer } from 'rxjs';


@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit{

 
 
  comp:string[]=['']
 
  compForm:FormGroup;
  
  constructor( private fb: FormBuilder, private service: CrudCVService,private toast: NgToastService) { 
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
  
    let competence1 = new Competence(this.comp);
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
        setTimeout(() => {
          this.toast.success({ detail: 'Compétence ajoutée avec succès.', summary: 'Succès' });
        }, 1000);
  
        // Update the form control values
        this.compForm.get('competence')?.setValue(this.comp);
      },
      err => {
        console.error(err);
        this.toast.error({ detail: 'Veuillez vérifier.', summary: 'Erreur' });
      }
    );
  }
  
}


 
 /*  ngOnInit() {
    this.compForm.patchValue({
      competence:[]=this.comp
    })
  } */
    
  


