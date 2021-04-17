import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/Cartelera.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styles: [],
})
export class PeliculasComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  movies: Movie[] = [];
  @HostListener('window:scroll', ['$event'])
  

  /* -------------------------------------------------------------------------- */
  /*                                   Scroll                                   */
  /* -------------------------------------------------------------------------- */
  scroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos > max) {
      if (this.apiSvc.load) {
        return;
      }
      this.apiSvc
        .getMoviesData()
        .subscribe((movies) => this.movies.push(...movies));
    } 
    
  }
  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(private apiSvc: ApiService) {}

  /* -------------------------------------------------------------------------- */
  /*                                  OnDestroy                                 */
  /* -------------------------------------------------------------------------- */
  ngOnDestroy(): void {
    this.apiSvc.resetPageMoviesApi();
  }

  /* -------------------------------------------------------------------------- */
  /*                                   OnInit                                   */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.apiSvc.getMoviesData().subscribe((movies) => {
      this.movies = movies;
      
    });
  }

 
}
