import { AfterViewInit, Component, Input } from '@angular/core';
import Swiper from 'swiper';
import { Season } from '../../interfaces/SerieDetails.interface';
import { Autoplay } from 'swiper';


@Component({
  selector: 'app-slide-season-serie',
  templateUrl: './slide-season-serie.component.html',
  styles: [],
})
export class SlideSeasonSerieComponent implements AfterViewInit {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  @Input() seasonSerie: Season[];
  swiper: Swiper;

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor() {}

  /* -------------------------------------------------------------------------- */
  /*                                AfterViewInit                               */
  /* -------------------------------------------------------------------------- */

  ngAfterViewInit(): void {
    Swiper.use([Autoplay]);
    this.swiper = new Swiper('.swiper-season', {
      slidesPerView: 3.2,
      freeMode: true,
      spaceBetween: 15,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
    });
  }

 
}
