import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendMailService } from 'src/app/services/send-mail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coaching',
  templateUrl: './coaching.component.html',
  styleUrls: ['./coaching.component.css']
})
export class CoachingComponent implements OnInit {

  coachingForm: FormGroup;
  sendingMail: boolean = false;

  constructor(  private _FormBuilder: FormBuilder,
                private _SendMailService: SendMailService) {
    this.coachingForm = this._FormBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      topic: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async sendMail() {
    if(this.coachingForm.invalid) {
      Swal.fire({
        title: 'Formulario Incompleto',
        text: 'Se deben completar todos los campos',
        confirmButtonText: 'Verificar',
        showCancelButton: false
      });
    } else {
      this.sendingMail = true;
      let sendMail = await this.sendMailAsync(this.coachingForm.value);

      if(sendMail == true) {
        Swal.fire({
          icon: 'success',
          title: 'Hemos recibido la consulta',
          text: 'En breve nos pondremos en contacto',
          confirmButtonText: 'Aceptar'
        });

        this.coachingForm.reset();
        this.coachingForm.controls.topic.patchValue('');
      }
      
    }
  }
    async sendMailAsync(data: any) {
      let sendMailP = new Promise((resolve, reject) => {
        this._SendMailService.sendCoachMail(data)
          .subscribe(sendMailRes => {
            this.sendingMail = false;
            if(!sendMailRes.status) reject(sendMailRes);

            resolve(sendMailRes.status);
          });
      });

      let result = await sendMailP;
      return result;
    }

}
