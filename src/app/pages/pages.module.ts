import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { BuscarComponent } from './buscar/buscar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { TopRatesComponent } from './top-rates/top-rates.component';
import { RatingModule } from 'ng-starrating';
import { SeriesEmisionComponent } from './series-emision/series-emision.component';
import { SerieComponent } from './serie/serie.component';
import { BuscarSerieComponent } from './buscar-serie/buscar-serie.component';


@NgModule({
  declarations: [
    HomeComponent,
    PeliculasComponent,
    PeliculaComponent,
    BuscarComponent,
    TopRatesComponent,
    SeriesEmisionComponent,
    SerieComponent,
    BuscarSerieComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    SharedModule,
    PipesModule,
    RatingModule
  ]
})
export class PagesModule { }
