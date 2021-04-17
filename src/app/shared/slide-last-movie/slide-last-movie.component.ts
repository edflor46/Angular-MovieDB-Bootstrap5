import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/Cartelera.interface';
import Swiper, { Autoplay } from 'swiper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide-last-movie',
  templateUrl: './slide-last-movie.component.html',
  styles: [],
})
export class SlideLastMovieComponent implements OnInit, AfterViewInit {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */

  @Input() lastMovies: Movie[];
  swiper: Swiper;

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(private router: Router) {}
  ngAfterViewInit(): void {
    Swiper.use([Autoplay]);
    this.swiper = new Swiper('.swiper-last', {
      slidesPerView: 4.2,
      freeMode: true,
      spaceBetween: 15,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }

  ngOnInit(): void {}

  /* -------------------------------------------------------------------------- */
  /*                                  Go Movie                                  */
  /* -------------------------------------------------------------------------- */

  goMovie(movie: Movie) {
    this.router.navigate(['/pelicula', movie.id]);
  }
}
