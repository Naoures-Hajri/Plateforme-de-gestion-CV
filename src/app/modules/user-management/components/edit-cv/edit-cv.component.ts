import { Component, OnInit } from '@angular/core';
import { CvService } from 'src/app/service/cv.service';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogEditFormationComponent } from '../dialog-edit-formation/dialog-edit-formation.component';
import { DialogEditExperienceComponent } from '../dialog-edit-experience/dialog-edit-experience.component';
@Component({
  selector: 'app-edit-cv',
  templateUrl: './edit-cv.component.html',
  styleUrls: ['./edit-cv.component.scss']
})
export class EditCvComponent implements OnInit {
  id: any
  user: any
  test: any
  itemGobal: any
  competence: any
  experience: any
  langue: any
  entete = {
    _id: null,
    nom: null,
    prenom: null,
    profession: null
  }
  formationForm = {

    diplome: null,
    etablissement: null,
    dateDeb: null,
    dateFin: null
  }

  expForm = {

    entreprise: null,
    poste: null,
    dateDeb: null,
    dateFin: null,
    description: null
  }


  inputLang: any
  inputComp: any
  contact = {
    _id: null,
    tel: null,
    mail: null,
    adresse: null
  }

  logo: any
  formation: any

  imgURL: any = "https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_100x100_v1.png"
  cv: any
  enteteForm: FormGroup
  constructor(private userService: UserService, private cvService: CvService, private fb: FormBuilder, private dialog: MatDialog) {

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
    this.userService.getUser().subscribe(res => {
      console.log(res);
      this.user = res
      this.id = this.user.user._id
      console.log(this.id)
      this.getCv()

    })
  }
  getCv() {
    this.cvService.getCvByIDUser(this.id).subscribe(res => {
      console.log(res);
      this.cv = res
      this.cv.reverse()
      this.cv = this.cv[0]
      this.entete = this.cv.entete
      this.contact = this.cv.contact
      this.competence = this.cv.competence.competence
      this.formation = this.cv.formation.formation
      this.experience = this.cv.experience.experience
      this.langue = this.cv.langue.langue

    })
  }

  ngOnInit(): void {

  }

  uploadFile(event: Event): void {
    event.stopPropagation();
    if (event.target['files'] && event.target['files'].length > 0) {
      [this.logo] = event.target['files'];

      this.sendLogo();
    }
  }

  sendLogo(): void {
    console.log(this.cv._id);
    
    const data: FormData = new FormData();
    data.append(`picture`, this.logo, this.logo.name);
    this.cvService.updateImages( this.cv.entete._id , data).subscribe(res=>{
      this.getCv()
    })
    }


    editentete() {
      this.cvService.editEntiteById(this.entete._id, this.entete).subscribe(res => {
        console.log(res)
        alert('done')
      })
    }


    editContact(){
      this.cvService.editContactById(this.contact._id, this.contact).subscribe(res => {
        console.log(res)
        alert('done')

      })
    }

    deleteComp(item: any){
      this.competence = this.competence.filter((i: any) => {
        return i !== item
      })
    }

    pushCom(){
      this.competence = this.competence.filter((i: any) => {
        return i !== this.itemGobal
      })
      this.competence.push(this.inputComp)
      this.inputComp = null
    }

    pushLang(){
      this.langue = this.langue.filter((i: any) => {
        return i !== this.itemGobal
      })
      this.langue.push(this.inputLang)
      this.inputLang = null
    }

    editcompetence(){
      console.log(this.competence)
      const obj = {
        competence: this.competence
      }
      this.cvService.editCompetenceById(this.cv.competence._id, obj).subscribe(res => {
        console.log(res)
      })
    }

    editFormationTab(data: any){
      data.formationId = this.cv.formation
      console.log(data);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = data
      const dialogRef = this.dialog.open(DialogEditFormationComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.getCv()
      });

    }
   
    editExpeTab(data: any){
      data.exp = this.cv.experience
      console.log(data);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = data
      const dialogRef = this.dialog.open(DialogEditExperienceComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.getCv()
      });
    }

    editComTab(item: any, index : any){
      console.log(index);
      this.itemGobal = item


      this.inputComp = this.competence[index]
    }
    editLangTab(item: any, index : any){
      console.log(index);
      this.itemGobal = item


      this.inputLang = this.langue[index]
    }
    editformation(){
      console.log(this.formation)
      const obj = {
        formation: this.formation
      }
      this.cvService.editFormationById(this.cv.formation._id, obj).subscribe(res => {
        console.log(res)
      })
    }

    editexperience(){
      console.log(this.experience)
      const obj = {
        experience: this.experience
      }
      this.cvService.editExperienceById(this.cv.experience._id, obj).subscribe(res => {
        console.log(res)
      })
    }
    editLangue(){
      console.log(this.langue)
      const obj = {
        langue: this.langue
      }
      this.cvService.editLangueById(this.cv.langue._id, obj).subscribe(res => {
        console.log(res)
      })
    }
    addExp(){
      this.experience.push(this.expForm)
    }
    deleteExp(item:any){
      this.experience = this.experience.filter((i: any) => {
        return i !== item
      })
    }
    addForma(){
      console.log(this.formationForm)
      this.formation.push(this.formationForm)
      
    }

    deleteFormation(item : any){
      this.formation = this.formation.filter((i: any) => {
        return i !== item
      })
    }

  }
