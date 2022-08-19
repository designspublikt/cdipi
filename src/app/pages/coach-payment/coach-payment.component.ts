import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-coach-payment',
  templateUrl: './coach-payment.component.html',
  styleUrls: ['./coach-payment.component.css']
})
export class CoachPaymentComponent implements OnInit {

  coachingServices: string[] = [
    'coaching_de_carrera',
    'coaching_en_comunicacion_profesional',
    'coaching_en_imagen_de_marca',
    'coaching_en_educacion_emocional_y_liderazgo',
    'coaching_en_lanzamiento_de_empresa',
    'coaching_en_gestion_o_acompanamiento_ejecutivo',
    'coaching_en_equipo_colectivo'
  ];

  title: string = '';
  type: string = '';

  constructor(  private _ActivatedRoute: ActivatedRoute,
                private _Router: Router) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      let t = this.coachingServices.find(service => service == params.type);

      if(t) {
        this.type = t;

        this.title = this.type.replace(/_/g, ' ');
        
        if(t == 'coaching_en_gestion_o_acompanamiento_ejecutivo') {
          this.title = this.title.replace(/acompanamiento/, 'acompañamiento');
        }
      };

      if(this.type == '') this._Router.navigate(['/not-found']);
    });
  }

}
