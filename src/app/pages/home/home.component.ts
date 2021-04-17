import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../interfaces/Cartelera.interface';
import { Router } from '@angular/router';
import { Series } from 'src/app/interfaces/SeriesCollection.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  movieSlide: Movie[] = [];
  movieTopRated: Movie[] = [];
  lastMovies: Movie[] = [];
  seriesEmision: Series[] = [];

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(private apiSvc: ApiService, private router: Router) {}

  /* -------------------------------------------------------------------------- */
  /*                                   OnInit                                   */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    //Movies Slide
    this.getDataMovieSlide();

    //Movies Top Rated
    this.getRatedMovies();

    //Last Movies
    this.getLastMovies();

    //Series Emision
    this.getSeries();
  }

  /* -------------------------------------------------------------------------- */
  /*                                 ngOnDestroy                                */
  /* -------------------------------------------------------------------------- */

  ngOnDestroy(): void {
    this.apiSvc.resetPageMoviesApi();
  }

  /* -------------------------------------------------------------------------- */
  /*                              Get Slide Movies                              */
  /* -------------------------------------------------------------------------- */
  getDataMovieSlide() {
    this.apiSvc
      .getMoviesData()
      .subscribe((movie) => (this.movieSlide = movie.slice(0, 4)));
  }

  /* -------------------------------------------------------------------------- */
  /*                            Get Top Rated Movies                            */
  /* -------------------------------------------------------------------------- */

  getRatedMovies() {
    this.apiSvc
      .getMoviesRated()
      .subscribe((movie) => (this.movieTopRated = movie.slice(0, 4)));
  }

  /* -------------------------------------------------------------------------- */
  /*                                GoMovieRated                                */
  /* -------------------------------------------------------------------------- */
  goMovie(movie: Movie) {
    this.router.navigate(['/pelicula', movie.id]);
  }

  /* -------------------------------------------------------------------------- */
  /*                             Go Movies Top Rates                            */
  /* -------------------------------------------------------------------------- */

  goMoviesRate() {
    this.router.navigate(['/top-rates']);
  }

  /* -------------------------------------------------------------------------- */
  /*                                Go Movies Now                               */
  /* -------------------------------------------------------------------------- */

  goMovies() {
    this.router.navigate(['/peliculas']);
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Go Series                                 */
  /* -------------------------------------------------------------------------- */
  goSeries() {
    this.router.navigate(['/series-emision']);
  }

  /* -------------------------------------------------------------------------- */
  /*                               Get Last Movies                              */
  /* -------------------------------------------------------------------------- */

  getLastMovies() {
    this.apiSvc.getMoviesData().subscribe((movie) => (this.lastMovies = movie));
  }

  /* -------------------------------------------------------------------------- */
  /*                             Get Series Emision                             */
  /* -------------------------------------------------------------------------- */

  getSeries(){
    this.apiSvc.getSeries().subscribe(series => this.seriesEmision = series);
  }
}
