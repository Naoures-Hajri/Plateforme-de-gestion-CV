import { Component } from '@angular/core';
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
  
  
  langueForm: FormGroup;
  storedLangue:Langue[]=[];
  constructor(private fb: FormBuilder, private service: CrudCVService, private toast: NgToastService) {
    this.langueForm = this.fb.group({
      titre: this.fb.array([]),
      niveau: this.fb.array([]),
      newBloc: this.fb.array([]),
    });
  }
  get existingTitre(): FormArray {
    return this.langueForm.get('titre') as FormArray;
  }
  get existingNiveau(): FormArray {
    return this.langueForm.get('niveau') as FormArray;
  }
  get newBloc(): FormArray {
    return this.langueForm.get("newBloc") as FormArray;
  }
  newBlocLangue(): FormGroup {
    return this.fb.group({
      newL: ['', Validators.required],
      newN: ['', Validators.required]
    });
  }
  addNewBlock() {
    const newBlock = this.fb.group({
      langue: ['', Validators.required],
      niveau: ['', Validators.required]
    });
    this.existingTitre.push(newBlock); // Ajoute le contrôle 'langue' au tableau 'titre'
    console.log(this.existingTitre.controls);
  
    
  }
  
  delete(index: number) {
    this.existingTitre.removeAt(index);
    this.existingNiveau.removeAt(index);
  }
  addNewBlocLangue() {
    this.newBloc.push(this.newBlocLangue());
  }
  ngOnInit() {
    this.storedLangue = JSON.parse(localStorage.getItem('langue') || '[]');
    console.log(this.storedLangue);
    
    this.storedLangue.forEach((langue) => {
      const langueGroup = this.fb.group({
        langue: [langue, Validators.required],
        niveau: ['', Validators.required]
      });
      this.existingTitre.push(langueGroup);
    });
  }
  saveLangue() {
    if (this.langueForm.invalid) {
      this.toast.info({
        detail: 'Veuillez remplir tous les champs.',
        summary: 'Erreur'
      });
      return;
    }
    if (this.newBloc.invalid) {
      this.toast.info({
        detail: 'Veuillez remplir tous les champs du nouveau bloc.',
        summary: 'Erreur'
      });
      return;
    }
  
    const langues: Langue[] = [
      ...this.langueForm.value.titre.map((langue: any) => {
        return {
          langue: langue.titre,
          niveau: langue.niveau
        };
      }),
      ...this.langueForm.value.newBloc.map((bloc: any) => {
        return {
          langue: bloc.newL,
          niveau: bloc.newN
        };
      })
    ];
  
    // Save the data to localStorage
    localStorage.setItem('langue', JSON.stringify(langues));
  
    // Save the data
    this.service.saveLangue(this.langueForm.value.titre).subscribe(
      res => {
        console.log(res);
        setTimeout(() => {
          this.toast.success({
            detail: 'Langue ajoutée avec succès.',
            summary: 'Succès'
          });
        }, 1000);
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
