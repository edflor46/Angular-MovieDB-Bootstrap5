import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/Cartelera.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-now-movies',
  templateUrl: './grid-now-movies.component.html',
  styles: [],
})
export class GridNowMoviesComponent {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  @Input() movies: Movie[];

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(private router: Router) {
    window.scroll({
      top:0,
      left:0
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Go Movie                                  */
  /* -------------------------------------------------------------------------- */
  goMovie(movie: Movie) {
    this.router.navigate(['/pelicula', movie.id]);
  }
}
