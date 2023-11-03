

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CvService } from 'src/app/service/cv.service';
// import { NgToastService } from 'ng-angular-popup';
// import { Contact } from 'src/app/models/Contact';
// import { CrudCVService } from 'src/app/service/crud-cv.service';
class Contact {
  constructor(
    public contactId?: string,
    public tel?: String,
    public mail?: String,
    public adresse?: String,
    public cv?: any
  ) { }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  @Output() contactData: EventEmitter<String> = new EventEmitter<String>();



  contact: string[] = [];




  constructor(private service: CvService, private fb: FormBuilder) {
    let formControls = {
      tel: new FormControl('', [
        Validators.required,
      ]),
      mail: new FormControl('', [
        Validators.required,
      ]),
      adresse: new FormControl('', [
        Validators.required,
      ]),
    }
    this.contactForm = this.fb.group(formControls)
  }
  get tel() { return this.contactForm.get('tel') }
  get mail() { return this.contactForm.get('mail') }
  get adresse() { return this.contactForm.get('adresse') }


  saveContact() {
    let data = this.contactForm.value;
    console.log(data);
    let contact1 = new Contact(undefined, data.tel, data.mail, data.adresse);

    if (data.tel == 0 || data.mail == 0 || data.adresse == 0) {
     
      alert('Veuillez remplir tous les champs.')
    } else {

      this.service.saveContact(contact1).subscribe(
        res => {

          console.log(res);
          console.log('Emitting contactId:', res);
          this.contactData.emit(res.contactId);
          alert('Contact ajouté avec succès.')


         
        },
        err => {
          console.error(err);
          alert('Veuillez vérifier.')
          // this.toast.error({detail:'err msg !! ',
          // summary:'Veuillez vérifier.'});
        }
      );
    }
  }

  ngOnInit() {


    this.contact = JSON.parse(localStorage.getItem('contact') || ' ')
    this.contactForm.patchValue({
      tel: this.contact.find(num => num.match('[0-9]*')),

      mail: this.contact.find(mail => mail.match('@')),

      adresse: this.contact[2],
      cv: null
    })


  }

}

