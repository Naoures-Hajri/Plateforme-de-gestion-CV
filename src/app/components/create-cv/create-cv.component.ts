import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { NgToastService } from 'ng-angular-popup';
import { MyResponse } from 'src/app/my-response';
import { CrudCVService } from 'src/app/service/crud-cv.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/Contact';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.css']
})
export class CreateCVComponent {
  contactForm:FormGroup
  contact: string[] = [];
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  constructor(private http: HttpClient, private service: CrudCVService, private toast: NgToastService, private fb: FormBuilder) { 
    let formControls={
      tel: new FormControl('',[
        Validators.required,
      ]),
      mail: new FormControl('',[
        Validators.pattern(this.emailPattern)
      ]),
      adresse: new FormControl('',[
        Validators.required,
      ]),
    }
    this.contactForm=this.fb.group(formControls)
  }
  get tel() {return this.contactForm.get('tel')}
  get mail() {return this.contactForm.get('mail')}
  get adresse() {return this.contactForm.get('adresse')}
  ngOnInit() {
    this.http.get<MyResponse>('http://localhost:8000/my-data').subscribe((response) => {
      this.contact = response.contact;
      
      
      console.log(this.contact)
      
    });
  }

  saveContact(){
    let data = this.contactForm.value;
    console.log(data);
    let contact= new Contact(data.tel,data.mail,data.adresse)
    if(data.tel==0||data.mail==0||data.adresse==0){
      this.toast.info({detail:'error msg !!',
      summary:'remplir votre champs'});
    }else{
      this.service.saveContact(contact).subscribe(
        res=>{
          console.log(res);
          this.toast.success({detail:'success msg',
          summary: 'Ajout avec succés'});
        },
        err=>{
          console.log(err);
          this.toast.error({detail:'error msg',
          summary: 'Vérifier les champs'});
        }
      )
    }
  }

}
