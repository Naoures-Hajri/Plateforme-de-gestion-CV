import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CvService } from 'src/app/service/cv.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

class Entete {
  constructor(
    public enteteId?: String,
    public image?: String,
    public nom?: String,
    public prenom?: String,
    public profession?: String,
    public cv?: any
  ) { }
}

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.scss']
})
export class EnteteComponent implements OnInit {

  logo: any
  @Output() enteteData: EventEmitter<String> = new EventEmitter<String>();
  message?: String
  userFile: any
  imagePath: any
  imgURL: any = "https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_100x100_v1.png"
  me:any
  myCvs: any
  myCv: any
  enteteForm: FormGroup
  constructor(private userService : UserService ,private fb: FormBuilder, private service: CvService) {
    let formControls = {

      image: new FormControl('', []),
      nom: new FormControl('', [
        Validators.required,

      ]),
      prenom: new FormControl('', [
        Validators.required,

      ]),
      profession: new FormControl('', [
        Validators.required,

      ])
    }
    this.enteteForm = this.fb.group(formControls)

  }
  ngOnInit(): void {
    this.getCurrentUser()
  }
  get image() { return this.enteteForm.get('image') }
  get nom() { return this.enteteForm.get('nom') }
  get prenom() { return this.enteteForm.get('prenom') }
  get profession() { return this.enteteForm.get('profession') }
  onSelectFile(event: any) {
    event.stopPropagation();
    if (event.target['files'] && event.target['files'].length > 0) {
      [this.logo] = event.target['files'];

    }

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
    console.log(this.imgURL);
    const dataForm: FormData = new FormData();
    dataForm.append(`picture`, this.logo, this.logo.name);
    dataForm.append(`nom`, data.nom);
    dataForm.append(`prenom`, data.prenom);
    dataForm.append(`profession`, data.profession);

    // let entete = new Entete(undefined,this.imgURL, data.nom, data.prenom, data.profession);
    if (this.enteteForm.invalid) {
      alert('Veuillez remplir tous les champs.')
      return;
    }

    this.service.saveEntete(dataForm).subscribe(
      res => {
        console.log(res);
        console.log('Emitting enteteId:', res);
        this.enteteData.emit(res.enteteId);
        Swal.fire(
        {  position: 'top-end',
          icon: 'success',
          title: 'Entete ajoutée avec succès',
          showConfirmButton: false,
          timer: 1500}
        )

      },
      err => {
        console.error(err);
        alert('Veuillez vérifier.')

      }
    );
  }
  getCurrentUser(){
    this.userService.currentUser().subscribe(res=>{
      this.me = res.user
      console.log("user",this.me)
      this.getCvByIdUser()
    })
  }
  getCvByIdUser(){

    
    this.service.getCvByIDUser(this.me._id).subscribe(res=>{
      this.myCvs = res
      this.myCvs.reverse()
      this.myCv = this.myCvs[0]
      console.log(res);
      
    })
  }

}
