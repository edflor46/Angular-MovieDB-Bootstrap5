import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Cast } from '../../interfaces/Creditst.interface';

@Component({
  selector: 'app-slide-cast',
  templateUrl: './slide-cast.component.html',
  styles: [],
})
export class SlideCastComponent implements OnInit, AfterViewInit {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  @Input() cast: Cast[];
  swiper: Swiper;

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor() {}
  

  ngOnInit(): void {}

  /* -------------------------------------------------------------------------- */
  /*                                AfterViewInit                               */
  /* -------------------------------------------------------------------------- */
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-cast', {
      slidesPerView: 4.2,
      freeMode: true,
      spaceBetween: 15,
    });
  }
}
