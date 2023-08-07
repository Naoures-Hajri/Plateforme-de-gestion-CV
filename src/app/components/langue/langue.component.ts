import { Component, EventEmitter, Output } from '@angular/core';
import {  FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Langue } from 'src/app/models/Langue';
import { CrudCVService } from 'src/app/service/crud-cv.service';
import { NgToastService } from 'ng-angular-popup';
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
  addNewBlock() {
    const newBlock = this.fb.group({
      langue: ['', Validators.required]
      
    });
    this.existingLangue().push(newBlock); // Ajoute le contrôle 'langue' au tableau 'titre'
    console.log(this.existingLangue().controls);
  
    
  }
  
  delete(index: number) {
    this.existingLangue().removeAt(index);
     // Mettre à jour la valeur dans localStorage
     localStorage.setItem('interet', JSON.stringify(this.storedLangue));
    
  }

  deleteNew(index:number){
    this.newBloc().removeAt(index)
  }
  
  addNewBlocLangue() {
    this.newBloc().push(this.newBlocLangue());
  }
  ngOnInit() {
    this.storedLangue = JSON.parse(localStorage.getItem('langue') || '[]');
    console.log(this.storedLangue);
  
    if (this.storedLangue.length === 0) {
      this.addNewBlock(); // Appel à addNewBloc() si le bloc langue est vide
    } else {
      this.storedLangue.forEach((langue) => {
       
        this.existingLangue().push(this.fb.control(langue));
      });
    }
  
  }
  
  saveLangue() {
    if (this.langueForm.invalid) {
      this.toast.info({
        detail: 'Veuillez remplir tous les champs.',
        summary: 'Erreur'
      });
      return;
    }
  
    const langues: String[]  = this.langueForm.value.langue.map((langue: String) => {
      return langue;
    });
  
    // Save the data to localStorage
    localStorage.setItem('langue', JSON.stringify(langues));
  
    // Save the data
    this.service.saveLangue({ langue: langues }).subscribe(
      (res: any) => {
        console.log('Response:', res);
        if (res && res.langueId) {
          console.log('Emitting _id:', res.langueId);
          this.langueData.emit(res.langueId);
  
          this.toast.success({
            detail: 'Langue ajoutée avec succès.',
            summary: 'Succès'
          });
        }
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
