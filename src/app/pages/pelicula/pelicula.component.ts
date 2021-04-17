import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  MovieDetails,
  ProductionCompany,
} from '../../interfaces/MovieDetails.interface';
import { Cast } from '../../interfaces/Creditst.interface';
import { combineLatest } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [],
})
export class PeliculaComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  movie: MovieDetails;
  cast: Cast[] = [];
  company: ProductionCompany[] = [];

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private apiSvc: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    window.scroll({
      top:0,
      left:0
    });
  }

  ngOnInit(): void {
    this.getMovieDetails();
  }

  /* -------------------------------------------------------------------------- */
  /*                              Get Movie Details                             */
  /* -------------------------------------------------------------------------- */
  getMovieDetails() {
    const { id } = this.activatedRoute.snapshot.params;

    //Combine latest
    combineLatest([
      this.apiSvc.getMovieDetails(id),
      this.apiSvc.getCastMovie(id),
    ]).subscribe(([movie, cast]) => {
      if (!movie) {
        this.router.navigate(['/home']);
        return;
      } else {
        this.movie = movie;
        this.company = movie.production_companies.filter(
          (logo) => logo.logo_path !== null
        );
        this.cast = cast;
      }
    });

    // // 2 consultas independientes
    // this.apiSvc.getMovieDetails(id).subscribe((movie) => {
    //   console.log(movie);
    //   if (!movie) {
    //     this.router.navigate(['/home']);
    //   }
    //   this.movie = movie;
    // });

    // this.apiSvc.getCastMovie(id).subscribe((cast) => {
    //   console.log(cast);
    //   this.cast = cast;
    // });
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Back                                    */
  /* -------------------------------------------------------------------------- */
  onBack(){
    this.location.back();
  }
}
