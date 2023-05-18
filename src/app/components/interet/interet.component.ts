import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CrudCVService } from 'src/app/service/crud-cv.service';
import { NgToastService } from 'ng-angular-popup';
import { Interet } from 'src/app/models/Interet';
import { forkJoin,Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-interet',
  templateUrl: './interet.component.html',
  styleUrls: ['./interet.component.css']
})
export class InteretComponent {
  
  centreInt:string[]=['']
 
  intForm:FormGroup;
  
  constructor( private fb: FormBuilder, private service: CrudCVService,private toast: NgToastService) { 
    this.intForm = this.fb.group({  
      interet: this.fb.array([]),  
      newInt: this.fb.array([]),  
    });  
  }
  existingInt(): FormArray {
    return this.intForm.get('interet') as FormArray;
  }
  newInter() : FormArray {  
    return this.intForm.get("newInt") as FormArray  
  } 
  newInteret(): FormGroup {  
    return this.fb.group({  
      
      inter: '',  
    })  
  }  
  delete(index:number){
   
  
    this.existingInt().removeAt(index);
     // Update the value in localStorage
  localStorage.setItem('interet', JSON.stringify(this.centreInt));
  }
  
  deleteNew(index:number){
    this.newInter().removeAt(index)
  }
 
  ngOnInit() {
   
    this.centreInt = JSON.parse(localStorage.getItem('interet') || ' ');
    this.centreInt.forEach((int) => {
      this.existingInt().push(this.fb.control(int));
    });
    
  }

 addItem(event: Event){
  
    this.newInter().push(this.newInteret());  
    event.preventDefault(); // Prevent form submission and page refresh
  }
  

  
  saveInteret(event: Event) {
    event.preventDefault(); // Prevent form submission and page refresh
    const existingValues = this.intForm.get('interet')?.value;
    const newValues = this.intForm.get('newInt')?.value;
    this.centreInt = [...existingValues, ...newValues.map((v: { inter: string }) => v.inter)];
  
    let interet1 = new Interet(this.centreInt);
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
        setTimeout(() => {
          this.toast.success({ detail: 'Interet ajoutée avec succès.', summary: 'Succès' });
        }, 1000);
  
        // Update the form control values
        this.intForm.get('interet')?.setValue(this.centreInt);
      },
      err => {
        console.error(err);
        this.toast.error({ detail: 'Veuillez vérifier.', summary: 'Erreur' });
      }
    );
  }
  
}

