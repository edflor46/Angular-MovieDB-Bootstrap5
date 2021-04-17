import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-buscar-serie',
  templateUrl: './form-buscar-serie.component.html',
  styles: [
  ]
})
export class FormBuscarSerieComponent  {

  constructor(private router:Router){}
  /* -------------------------------------------------------------------------- */
  /*                                   Buscar                                   */
  /* -------------------------------------------------------------------------- */

  buscarSerie(buscar: string) {
    buscar.trim();

    
    
    if (buscar.length === 0) {
      return;
    }else{
      this.router.navigate(['/buscar-serie', buscar]);
    }
  }

}
