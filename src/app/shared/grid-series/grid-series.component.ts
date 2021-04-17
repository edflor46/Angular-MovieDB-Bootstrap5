import { Component, Input } from '@angular/core';
import { Series } from '../../interfaces/SeriesCollection.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-series',
  templateUrl: './grid-series.component.html',
  styles: [],
})
export class GridSeriesComponent {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  @Input() seriesEmision: Series[];
  // @Input() buscarSeries: Series[];
  // serie:Series;


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
  /*                                  Go Serie                                  */
  /* -------------------------------------------------------------------------- */
  goSerie(serie:Series) {
    this.router.navigate(['/serie', serie.id]);
  }
}
