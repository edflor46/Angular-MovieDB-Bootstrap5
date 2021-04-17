import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  Swiper    from 'swiper';
import { Movie }  from '../../interfaces/Cartelera.interface';
import { Autoplay } from 'swiper';


@Component({
  selector: 'app-slide-movie',
  templateUrl: './slide-movie.component.html',
  styles: [],
})
export class SlideMovieComponent implements OnInit, AfterViewInit {
  /* -------------------------------------------------------------------------- */
  /*                               Input From Home                              */
  /* -------------------------------------------------------------------------- */

  @Input() movieSlide: Movie[];
  constructor(private router:Router) {}

  /* -------------------------------------------------------------------------- */
  /*                                AfterViewInit                               */
  /* -------------------------------------------------------------------------- */
  
  ngAfterViewInit(): void {
    Swiper.use([Autoplay]);
    const swiper = new Swiper('.swiper-container', {
      // Optional parameters
      loop: true,
      effect: 'fade',
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      }
     
    
     
    });
  }

  ngOnInit(): void {}

  goMovie(movie:Movie){
    this.router.navigate(['/pelicula', movie.id])
  }
}
