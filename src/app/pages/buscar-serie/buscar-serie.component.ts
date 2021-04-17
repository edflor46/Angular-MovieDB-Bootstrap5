
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Series } from 'src/app/interfaces/SeriesCollection.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-buscar-serie',
  templateUrl: './buscar-serie.component.html',
  styles: [
  ]
})
export class BuscarSerieComponent implements OnInit {

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  buscarSeries: Series[] = [];
  busqueda: string;

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiSvc: ApiService,
    private location:Location
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                   OnInit                                   */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.getSearchSerie();
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Get Search                                 */
  /* -------------------------------------------------------------------------- */

  getSearchSerie(){
    this.activatedRoute.params.subscribe(
      (params) => (this.busqueda = params.termino)
    );

    this.apiSvc.searchSerie(this.busqueda).subscribe(series => this.buscarSeries = series);
      // .searchMovie(this.busqueda)
      // .subscribe((movies) => (this.buscarNowMovies = movies));
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
