import { Component, EventEmitter, Output } from '@angular/core';
import {  FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Langue } from 'src/app/models/Langue';
import { CrudCVService } from 'src/app/service/crud-cv.service';
import { NgToastService } from 'ng-angular-popup';
import { forkJoin, Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-langue',
  templateUrl: './langue.component.html',
  styleUrls: ['./langue.component.css']
})
export class LangueComponent {
  @Output() langueData: EventEmitter<String> = new EventEmitter<String>();  
  
  langueForm: FormGroup;
  storedLangue:String[]=[];
  constructor(private fb: FormBuilder, private service: CrudCVService, private toast: NgToastService) {
    this.langueForm = this.fb.group({
      langue: this.fb.array([]),
     
      newBloc: this.fb.array([]),
    });
  }
   existingLangue(): FormArray {
    return this.langueForm.get('langue') as FormArray;
  }

  newBloc(): FormArray {
    return this.langueForm.get("newBloc") as FormArray;
  }
  newBlocLangue(): FormGroup {
    return this.fb.group({
      newL: ['', Validators.required]
     
    });
  }
  addNewBlock(event: Event) {
 
   
      this.newBloc().push(this.newBlocLangue());
      event.preventDefault(); // Empêcher la soumission du formulaire et le rafraîchissement de la page
    }
    
  
  
  delete(index: number) {
    this.existingLangue().removeAt(index);
     // Mettre à jour la valeur dans localStorage
     localStorage.setItem('langue', JSON.stringify(this.storedLangue));
    
  }

  deleteNew(index:number){
    this.newBloc().removeAt(index)
  }

  addNewBlocLangue(event: Event) {
    this.newBloc().push(this.newBlocLangue());
    event.preventDefault();
  }
  ngOnInit() {
    this.storedLangue = JSON.parse(localStorage.getItem('langue') || '[]');
    console.log(this.storedLangue);
  
    this.storedLangue.forEach((lang) => {
      this.existingLangue().push(this.fb.control(lang));
    });
  
  }
  
  saveLangue(event: Event) {
    event.preventDefault();
    const existingValues = this.langueForm.get('langue')?.value;
    const newValues = this.langueForm.get('newBloc')?.value.map((v: { newL: string }) => v.newL);
    this.storedLangue = [...existingValues, ...newValues];
  
    // Update localStorage first
    localStorage.setItem('langue', JSON.stringify(this.storedLangue));
  
    // Create the Langue object
    let langues = new Langue(undefined, this.storedLangue);
  
    const saveLang$ = this.service.saveLangue(langues);
    const updateLocalStorage$ = new Observable<void>((observer: Observer<void>) => {
      observer.next();
      observer.complete();
    });
  
    forkJoin([saveLang$, updateLocalStorage$]).subscribe(
      ([saveRes]) => {
        console.log(saveRes);
        console.log('Emitting langueId:', saveRes);
        this.langueData.emit(saveRes.langueId);
  
        setTimeout(() => {
          this.toast.success({ detail: 'Langue ajoutée avec succès.', summary: 'Succès' });
        }, 1000);
  
        // Mettre à jour les valeurs des contrôles du formulaire
        this.langueForm.get('langue')?.setValue(this.storedLangue);
      },
      err => {
        console.error(err);
        this.toast.error({ detail: 'Veuillez vérifier.', summary: 'Erreur' });
      }
    );
  }
  
}
