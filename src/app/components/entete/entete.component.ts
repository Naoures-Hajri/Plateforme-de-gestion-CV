import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Entete } from 'src/app/models/Entete';
import { CrudCVService } from 'src/app/service/crud-cv.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css']
})
export class EnteteComponent {
  @Output() enteteData: EventEmitter<String> = new EventEmitter<String>();
  message?:String
  userFile: any
  imagePath: any
  imgURL: any="https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_100x100_v1.png" 
 
  enteteForm:FormGroup
  constructor(private fb:FormBuilder,private service: CrudCVService,private toast: NgToastService){
    let formControls = {
  
      image: new FormControl('',[]),
      nom: new FormControl('',[
        Validators.required,
       
      ]),
      prenom: new FormControl('',[
        Validators.required,
       
      ]),
      profession: new FormControl('',[
        Validators.required,
       
      ])
    }
    this.enteteForm= this.fb.group(formControls)

  }
  get image() { return this.enteteForm.get('image') }
  get nom() { return this.enteteForm.get('nom') }
  get prenom() { return this.enteteForm.get('prenom') }
  get profession() { return this.enteteForm.get('profession') }
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
  

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Sauf les images sont acceptés.';
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
  saveEntete() {
    let data = this.enteteForm.value;
    console.log(data);
    let entete = new Entete(undefined,data.image, data.nom, data.prenom, data.profession);
    if (this.enteteForm.invalid) {
      this.toast.info({ detail: 'Veuillez remplir tous les champs.', summary: 'err msg !!' });
      return;
    }
    
    this.service.saveEntete(entete).subscribe(
      res => {
        console.log(res);
        console.log('Emitting enteteId:', res);
        this.enteteData.emit(res.enteteId); 
        setTimeout(() => {
          this.toast.success({ detail: 'Entete ajoutée avec succès.', summary: 'Succès' });
        }, 1000);
      },
      err => {
        console.error(err);
        this.toast.error({ detail: 'Veuillez vérifier.', summary: 'err msg !!' });
      }
    );
  }
  
  }

