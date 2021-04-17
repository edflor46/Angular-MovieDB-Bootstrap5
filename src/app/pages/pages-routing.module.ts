import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { BuscarComponent } from './buscar/buscar.component';
import { TopRatesComponent } from './top-rates/top-rates.component';
import { SeriesEmisionComponent } from './series-emision/series-emision.component';
import { SerieComponent } from './serie/serie.component';
import { BuscarSerieComponent } from './buscar-serie/buscar-serie.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home'                     ,   component  :  HomeComponent          },
      { path: 'peliculas'                ,   component  :  PeliculasComponent     },
      { path: 'pelicula/:id'             ,   component  :  PeliculaComponent      },
      { path: 'buscar/:termino'          ,   component  :  BuscarComponent        },
      { path: 'top-rates'                ,   component  :  TopRatesComponent      },
      { path: 'series-emision'           ,   component  :  SeriesEmisionComponent },
      { path: 'serie/:id'                ,   component  :  SerieComponent         },
      { path: 'buscar-serie/:termino'    ,   component  :  BuscarSerieComponent   },
      { path: '**'                       ,   redirectTo :   'home'                },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
