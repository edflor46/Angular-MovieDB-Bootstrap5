import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SlideMovieComponent } from './slide-movie/slide-movie.component';
import { RouterModule } from '@angular/router';
import { SlideLastMovieComponent } from './slide-last-movie/slide-last-movie.component';
import { PipesModule } from '../pipes/pipes.module';
import { GridTopRatesComponent } from './grid-top-rates/grid-top-rates.component';
import { GridNowMoviesComponent } from './grid-now-movies/grid-now-movies.component';
import { RatingModule } from 'ng-starrating';
import { SlideCastComponent } from './slide-cast/slide-cast.component';
import { FormBuscarComponent } from './form-buscar/form-buscar.component';
import { SeriesSlideComponent } from './series-slide/series-slide.component';
import { GridSeriesComponent } from './grid-series/grid-series.component';
import { SlideCastSerieComponent } from './slide-cast-serie/slide-cast-serie.component';
import { SlideSeasonSerieComponent } from './slide-season-serie/slide-season-serie.component';
import { FormBuscarSerieComponent } from './form-buscar-serie/form-buscar-serie.component';





@NgModule({
  declarations: [
    NavbarComponent,
    SlideMovieComponent,
    SlideLastMovieComponent,
    GridTopRatesComponent,
    GridNowMoviesComponent,
    SlideCastComponent,
    FormBuscarComponent,
    SeriesSlideComponent,
    GridSeriesComponent,
    SlideCastSerieComponent,
    SlideSeasonSerieComponent,
    FormBuscarSerieComponent
 

  
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    RatingModule
  ],
  exports:[
    NavbarComponent,
    SlideMovieComponent,
    SlideLastMovieComponent,
    GridTopRatesComponent,
    GridNowMoviesComponent,
    SlideCastComponent,
    FormBuscarComponent,
    SeriesSlideComponent,
    GridSeriesComponent,
    SlideSeasonSerieComponent,
    SlideCastSerieComponent,
    FormBuscarSerieComponent

    
  ]
})
export class SharedModule { }
