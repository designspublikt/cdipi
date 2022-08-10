import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coaching',
  templateUrl: './coaching.component.html',
  styleUrls: ['./coaching.component.css']
})
export class CoachingComponent implements OnInit {

  coachingForm: FormGroup;

  constructor(  private _FormBuilder: FormBuilder) {
    this.coachingForm = this._FormBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      topic: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  sendMail() {
    if(this.coachingForm.invalid) {
      Swal.fire({
        title: 'Formulario Incompleto',
        text: 'Se deben completar todos los campos',
        confirmButtonText: 'Verificar',
        showCancelButton: false
      });
    } else {

    }
  }

}
