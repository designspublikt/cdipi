import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  auth: boolean;

  constructor(  private _FormBuilder: FormBuilder,
                private _AuthService: AuthService,
                private _ToastrService: ToastrService,
                private _Router: Router) {

    this.loginForm = this._FormBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.auth = !this._AuthService.checkAuth() ? this._AuthService.checkAuth() : true;
    if(this.auth) this._Router.navigate(['/admin']);

  }

  ngOnInit(): void {
  }

  login(loginForm: FormGroup) {
    Swal.fire({
      title: 'Verificando datos...',
      willOpen: () => {
        Swal.showLoading();
      },
      showConfirmButton: false
    });

    localStorage.clear();

    this._AuthService.login(loginForm.value)
      .subscribe(async loginRes => {
        if(!loginRes.status) {
          this._ToastrService.error('CREDENCIALES INCORRECTAS', 'EL USUARIO O LA CONTRASEÑA NO SON CORRECTOS');
          Swal.close();
          return;
        }


        let saveSession = await this.saveSession(loginRes);

        if(saveSession) {
          Swal.fire({
            icon: 'success',
            title: 'Acceso Correcto',
            text: 'Te estamos redirigiendo a la plataforma',
            showConfirmButton: false,
            timer: 2500,
            willOpen: () => {
              Swal.showLoading()
            },
            willClose: () => {
              this._Router.navigateByUrl('/', {skipLocationChange: true})
                .then(() => {
                  this._Router.navigate(['/admin']);
                });
            }
          });
        }

      })
  }


  async saveSession(userSession: any) {
    let authP = new Promise((resolve, reject) => {
      if(userSession.token == '') reject(new Error('Token Inválido'));

      let userData = {
        firstname: userSession.user.firstname,
        lastname: userSession.user.lastname,
        username: userSession.user.username,
        token: userSession.token
      }

      localStorage.setItem('userSession', JSON.stringify(userData));
      resolve(true);
    });

    let result = await authP;
    return result;
  }

}
