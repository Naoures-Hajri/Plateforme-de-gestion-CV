
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Contact } from 'src/app/models/Contact';
import { CrudCVService } from 'src/app/service/crud-cv.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Output() contactData: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactForm:FormGroup;
 
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
    let contact1 = new Contact(data.tel, data.mail, data.adresse);
  
    if (data.tel == 0 || data.mail == 0 || data.adresse == 0) {
      this.toast.info({detail:'err msg !! ',
      summary:'Veuillez remplir tous les champs.'});
    } else {
      
      this.service.saveContact(contact1).subscribe(
        res => {
          
          console.log(res);
            // Emit the contact data
          this.contactData.emit(contact1);
        
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
  getContactData(): Contact {
    const data = this.contactForm.value;
    return new Contact(data.tel, data.mail, data.adresse);
  }
  ngOnInit() {

  
    this.contact=JSON.parse(localStorage.getItem('contact')||' ')
     this.contactForm.patchValue({
       tel:this.contact.find(num=>num.match('[0-9]*')),
       
       mail:this.contact.find(mail=>mail.match('@')),
       
       adresse:this.contact[2],
       cv:null
     })
    
 
   }
  
}
