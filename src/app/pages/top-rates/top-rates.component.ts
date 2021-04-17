import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/Cartelera.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-top-rates',
  templateUrl: './top-rates.component.html',
  styles: [],
})
export class TopRatesComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  moviesTopRates: Movie[] = [];

  @HostListener('window:scroll', ['$event'])

  /* -------------------------------------------------------------------------- */
  /*                                   Scroll                                   */
  /* -------------------------------------------------------------------------- */
  scroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1400;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos > max) {
      this.apiSvc
        .getMoviesRated()
        .subscribe((moviesTR) => this.moviesTopRates.push(...moviesTR));
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(private apiSvc: ApiService) {}
 

  /* -------------------------------------------------------------------------- */
  /*                                  ngOnInit                                  */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.apiSvc
      .getMoviesRated()
      .subscribe((topRates) => (this.moviesTopRates = topRates));
  }

/* -------------------------------------------------------------------------- */
/*                                 ngOnDestroy                                */
/* -------------------------------------------------------------------------- */

ngOnDestroy(): void {
  this.apiSvc.resetPageMoviesApi();
}

}
