import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Series } from '../../interfaces/SeriesCollection.interface';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series-emision',
  templateUrl: './series-emision.component.html',
  styles: [],
})
export class SeriesEmisionComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  seriesEmision: Series[] = [];
  @HostListener('window:scroll', ['$event'])

  /* -------------------------------------------------------------------------- */
  /*                                   Scroll                                   */
  /* -------------------------------------------------------------------------- */
  scroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 130;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos > max) {
      if (this.apiSvc.load) {
        return;
      }
    } else {
      this.apiSvc
        .getSeries()
        .subscribe((series) => this.seriesEmision.push(...series));
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(private apiSvc: ApiService, private router: Router) {}

  /* -------------------------------------------------------------------------- */
  /*                                   OnInit                                   */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.apiSvc
      .getSeries()
      .subscribe((series) => (this.seriesEmision = series));
  }

  /* -------------------------------------------------------------------------- */
  /*                                  OnDestroy                                 */
  /* -------------------------------------------------------------------------- */
  ngOnDestroy(): void {
    this.apiSvc.resetPageMoviesApi();
  }
}
