import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form-modal',
  templateUrl: './contact-form-modal.component.html',
  styleUrls: ['./contact-form-modal.component.css']
})
export class ContactFormModalComponent implements OnInit {

  contactForm: FormGroup;

  constructor(  private _FormBuilder: FormBuilder) {
    this.contactForm = this._FormBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phonenumber: ['', Validators.required],
      coachingservice: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  async ngOnInit() {

  }


  sendMail() {
    
  }

  resetForm() {
    
  }

}
