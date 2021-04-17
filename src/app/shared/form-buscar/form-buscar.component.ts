import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-buscar',
  templateUrl: './form-buscar.component.html',
  styles: [],
})
export class FormBuscarComponent  {

constructor(private router:Router){}
  /* -------------------------------------------------------------------------- */
  /*                                   Buscar                                   */
  /* -------------------------------------------------------------------------- */

  buscarPelicula(buscar: string) {
    buscar.trim();
    
    if (buscar.length === 0) {
      return;
    }else{
      this.router.navigate(['/buscar', buscar]);
    }
  }

}
