import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Series } from '../../interfaces/SeriesCollection.interface';
import { Router } from '@angular/router';
import Swiper, { Autoplay } from 'swiper';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-series-slide',
  templateUrl: './series-slide.component.html',
  styles: [],
})
export class SeriesSlideComponent implements AfterViewInit {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  @Input() seriesEmision: Series[];
  swiper: Swiper;

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(private router: Router) {}

  /* -------------------------------------------------------------------------- */
  /*                                  AfterInit                                 */
  /* -------------------------------------------------------------------------- */

  ngAfterViewInit(): void {
    Swiper.use([Autoplay]);
    this.swiper = new Swiper('.swiper-series', {
      slidesPerView: 4.2,
      loop:true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      freeMode: true,
      spaceBetween: 15,
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Go Serie                                  */
  /* -------------------------------------------------------------------------- */

  goSerie(serie:Series){
    this.router.navigate(['/serie', serie.id]);
  }
}
