import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Langue } from 'src/app/models/Langue';
import { CrudCVService } from 'src/app/service/crud-cv.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-langue',
  templateUrl: './langue.component.html',
  styleUrls: ['./langue.component.css']
})
export class LangueComponent {
  langue: FormGroup[] = [];
  langueForm: FormGroup;
  
  constructor(private fb: FormBuilder, private service: CrudCVService, private toast: NgToastService) {
    let formControls = {
      titre: new FormControl('', [
        Validators.required,
      ]),
      niveau: new FormControl('', [
        Validators.required,
      ]),
    };
  
    this.langueForm = this.fb.group(formControls);
  }
  
  get langueControls() {
    return this.langueForm.get('langue') as FormArray;
  }
  
  delete(i: number) {
    // Supprimer la langue correspondant à l'index i
    this.langueControls.removeAt(i);
  }
  
  addItem(event: Event) {
    event.preventDefault();
    // Créez un nouvel objet vide représentant le nouveau bloc langue/niveau
    const newLangueNiveau = this.fb.group({
      titre: ['', Validators.required],
      niveau: ['', Validators.required]
    });
    // Ajoutez le nouvel objet au tableau langueControls
    this.langueControls.push(newLangueNiveau);
  }
  
  ngOnInit() {
    const defaultLangue = this.fb.group({
      titre: ['', Validators.required],
      niveau: ['', Validators.required]
    });
  
    this.langueControls.push(defaultLangue);
  }
  
  saveLangue() {
    if (this.langueForm.invalid) {
      this.toast.info({
        detail: 'Veuillez remplir tous les champs.',
        summary: 'Erreur'
      });
      return;
    }
  
    const data = this.langueForm.getRawValue().langue;
  
    // You can then use the 'data' array to save the data
  
    this.service.saveLangue(data).subscribe(
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
