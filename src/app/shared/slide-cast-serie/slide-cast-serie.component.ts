import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { CastSerie } from '../../interfaces/SerieCredits.interface';
import { Autoplay } from 'swiper';

@Component({
  selector: 'app-slide-cast-serie',
  templateUrl: './slide-cast-serie.component.html',
  styles: [],
})
export class SlideCastSerieComponent implements OnInit, AfterViewInit {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  @Input() serieCast: CastSerie[];
  swiper: Swiper;

  constructor() {}

  /* -------------------------------------------------------------------------- */
  /*                                AfterViewInit                               */
  /* -------------------------------------------------------------------------- */

  ngAfterViewInit(): void {
    Swiper.use([Autoplay]);
    this.swiper = new Swiper('.swiper-cast', {
      slidesPerView: 3.2,
      freeMode: true,
      spaceBetween: 15,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
    });
  }

  ngOnInit(): void {
   
    
    
  }


  
}
