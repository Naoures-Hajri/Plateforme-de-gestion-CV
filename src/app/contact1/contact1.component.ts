import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Contact } from 'src/app/models/Contact';
import { CrudCVService } from 'src/app/service/crud-cv.service';

@Component({
  selector: 'app-contact1',
  templateUrl: './contact1.component.html',
  styleUrls: ['./contact1.component.css']
})
export class Contact1Component {
  contactForm:FormGroup;
  @Output() contactData: EventEmitter<String> = new EventEmitter<String>();


 
  contact: string[] = [] ;
 
  
  

  constructor( private service: CrudCVService,private toast: NgToastService, private fb: FormBuilder) { 
    let formControls={
      tel: new FormControl('',[
        Validators.required,
      ]),
      mail: new FormControl('',[
        Validators.required,
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

  
  saveContact() {
    let data = this.contactForm.value;
    console.log(data);
    let contact1= new Contact(undefined,data.tel,data.mail,data.adresse);
  
    if (data.tel == 0 || data.mail == 0 || data.adresse == 0) {
      this.toast.info({detail:'err msg !! ',
      summary:'Veuillez remplir tous les champs.'});
    } else {
      
      this.service.saveContact(contact1).subscribe(
        res => {
          
          console.log(res);
        console.log('Emitting contactId:', res);
        this.contactData.emit(res.contactId); 

         
        
          setTimeout(() => {
            this.toast.success({ detail: 'Contact ajouté avec succès.', summary: 'Succès' });
          }, 1000);
        },
        err => {
          console.error(err);
       
          this.toast.error({detail:'err msg !! ',
          summary:'Veuillez vérifier.'});
        }
      );
    }
  }
}
