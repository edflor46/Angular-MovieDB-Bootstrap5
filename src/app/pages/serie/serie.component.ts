import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CastSerie } from '../../interfaces/SerieCredits.interface';
import {
  SerieDetails,
  Network,
  Season,
} from '../../interfaces/SerieDetails.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styles: [],
})
export class SerieComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */

  serieCast: CastSerie[] = [];
  production: Network[] = [];
  seasonSerie: Season[] = [];
  serieDetails: SerieDetails;

 



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

  /* -------------------------------------------------------------------------- */
  /*                                   OnInit                                   */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.getSerieDetails();
   
  }

  /* -------------------------------------------------------------------------- */
  /*                              Get Serie Details                             */
  /* -------------------------------------------------------------------------- */

  getSerieDetails() {
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.apiSvc.getSerieDetails(id),
      this.apiSvc.getSerieCast(id),
    ]).subscribe(([serie, cast]) => {
      //Si no viene data del Servicio retornar a home
      if (!serie) {
        this.router.navigate(['/home']);
        return;
      } else {
        //Data details serie
        this.serieDetails = serie;

        //Data cast serie
        this.serieCast = cast.filter((actor) => actor.profile_path !== null);

        //Data season serie
        this.seasonSerie = serie.seasons;

        //Data production serie
        this.production = serie.production_companies.filter(
          (logo) => logo.logo_path !== null
        );
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                   onBack                                   */
  /* -------------------------------------------------------------------------- */
  onBack() {
    this.location.back();
  }
}
