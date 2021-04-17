import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Cartelera, Movie } from '../interfaces/Cartelera.interface';
import { MovieDetails } from '../interfaces/MovieDetails.interface';
import { Cast, Credits } from '../interfaces/Creditst.interface';
import { SerieDetails } from '../interfaces/SerieDetails.interface';
import { CastSerie, SerieCredits } from '../interfaces/SerieCredits.interface';
import { Series, SeriesCollection } from '../interfaces/SeriesCollection.interface';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */

  private api_url = 'https://api.themoviedb.org/3';
  private moviePage = 1;
  public load: boolean;

  constructor(private http: HttpClient) {}

  /* -------------------------------------------------------------------------- */
  /*                            Reset Page Movies API                           */
  /* -------------------------------------------------------------------------- */

  resetPageMoviesApi() {
    this.moviePage = 1;
  }

  /* -------------------------------------------------------------------------- */
  /*                                Query Params                                */
  /* -------------------------------------------------------------------------- */
  get params() {
    return {
      api_key: '93bdf0bd3fedb8bbb3a8ab710651dc60',
      language: 'es-ES',
      page: this.moviePage.toString(),
    };
  }

  /* -------------------------------------------------------------------------- */
  /*                               Get Movies Data                              */
  /* -------------------------------------------------------------------------- */

  getMoviesData(): Observable<Movie[]> {
    if (this.load) {
      return of([]);
    }
    return this.http
      .get<Cartelera>(`${this.api_url}/movie/now_playing?`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          this.moviePage += 1;
          this.load = false;
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Get Rated                                 */
  /* -------------------------------------------------------------------------- */

  getMoviesRated(): Observable<Movie[]> {
    if (this.load) {
      return of([]);
    } else {
      return this.http
        .get<Cartelera>(`${this.api_url}/movie/top_rated?`, {
          params: this.params,
        })
        .pipe(
          map((resp) => resp.results),
          tap(() => {
            this.moviePage += 1;
            this.load = false;
          })
        );
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                              Get Movie Details                             */
  /* -------------------------------------------------------------------------- */
  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.http
      .get<MovieDetails>(`${this.api_url}/movie/${id}`, {
        params: this.params,
      })
      .pipe(catchError((err) => of(null)));
  }

  /* -------------------------------------------------------------------------- */
  /*                               Get Cast Movie                               */
  /* -------------------------------------------------------------------------- */
  getCastMovie(id: string): Observable<Cast[]> {
    return this.http
      .get<Credits>(`${this.api_url}/movie/${id}/credits`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.cast),
        catchError((err) => of([]))
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                                Search Movie                                */
  /* -------------------------------------------------------------------------- */

  searchMovie(termino: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query: termino };

    return this.http
      .get<Cartelera>(`${this.api_url}/search/movie`, {
        params,
      })
      .pipe(map((movies) => movies.results));
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Get Series                                 */
  /* -------------------------------------------------------------------------- */

  getSeries(): Observable<Series[]> {
    if (this.load) {
      return of([]);
    }

    return this.http
      .get<SeriesCollection>(`${this.api_url}/tv/on_the_air?/`, {
        params: this.params,
      })
      .pipe(
        map((series) => series.results),

        tap(() => {
          this.moviePage += 1;
          this.load = false;
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                              Get Serie Details                             */
  /* -------------------------------------------------------------------------- */

  getSerieDetails(id: string): Observable<SerieDetails> {
    return this.http
      .get<SerieDetails>(`${this.api_url}/tv/${id}?`, {
        params: this.params,
      })
      .pipe(catchError((err) => of(null)));
  }

  /* -------------------------------------------------------------------------- */
  /*                              Get Serie Credits                             */
  /* -------------------------------------------------------------------------- */

  getSerieCast(id: string): Observable<CastSerie[]> {
    return this.http
      .get<SerieCredits>(`${this.api_url}/tv/${id}/credits?`, {
        params: this.params,
      })
      .pipe(
        map((cast) => cast.cast),
        catchError((err) => of([]))
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                                Search Serie                                */
  /* -------------------------------------------------------------------------- */

  searchSerie(termino: string): Observable<Series[]> {
    const params = { ...this.params, page: '1', query: termino };

    return this.http
      .get<SeriesCollection>(`${this.api_url}/search/tv`, {
        params,
      })
      .pipe(map((series) => series.results));
  }
}
