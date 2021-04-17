import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../interfaces/Cartelera.interface';
import { ApiService } from '../../services/api.service';
import { Series } from '../../interfaces/SeriesCollection.interface';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  buscarNowMovies: Movie[] = [];
  busqueda: string;
  noResultados:boolean = false;

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiSvc: ApiService,
    private location: Location
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                   OnInit                                   */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.getSearch();
  
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Get Search                                 */
  /* -------------------------------------------------------------------------- */

  getSearch() {
    this.activatedRoute.params.subscribe(
      (params) => (this.busqueda = params.termino)
    );

    this.apiSvc
      .searchMovie(this.busqueda)
      .subscribe((movies) => {
        if (movies.length === 0) {
          this.noResultados = true;
          return;
        }else{
          this.buscarNowMovies = movies;
        }
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                                   goBack                                   */
  /* -------------------------------------------------------------------------- */

  goBack() {
    this.location.back();
  }

  /* -------------------------------------------------------------------------- */
  /*                                  OnDestroy                                 */
  /* -------------------------------------------------------------------------- */
  ngOnDestroy(): void {
    this.apiSvc.resetPageMoviesApi();
  }
}
