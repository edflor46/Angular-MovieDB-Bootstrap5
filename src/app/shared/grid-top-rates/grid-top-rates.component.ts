import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/Cartelera.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-top-rates',
  templateUrl: './grid-top-rates.component.html',
  styles: [],
})
export class GridTopRatesComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  @Input() moviesTopRates: Movie;

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(private router:Router) {}

  ngOnInit(): void {
    window.scroll({
      top:0,
      left:0
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                              Go Movie Top Rate                             */
  /* -------------------------------------------------------------------------- */

  goMovieRate(movie: Movie) {
    this.router.navigate(['/pelicula', movie.id]);
  }
}
