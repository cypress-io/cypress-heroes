import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, of, Subject } from 'rxjs';
import { Hero, HeroEditModel } from './models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  private heroesUrl = `${environment.apiUrl}/heroes`;
  private $heros: Subject<Hero[]> = new Subject();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getHeroes(): Observable<Hero[]> {
    this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])))
      .subscribe((heroes) => this.$heros.next(heroes));
    return this.$heros;
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .get<Hero>(url)
      .pipe(catchError(this.handleError<Hero>(`getHero id=${id}`)));
  }

  /** PUT: update the hero on the server */
  updateHero(hero: HeroEditModel, avatar?: File): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put<Hero>(url, hero, this.httpOptions).pipe(
      mergeMap((hero) => {
        if (avatar) {
          const formData = new FormData();
          formData.append('avatar', avatar);
          return this.http.post<Hero>(
            `${this.heroesUrl}/${hero.id}/avatar`,
            formData
          );
        }
        return of(hero);
      }),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  updatePartialHero(hero: Partial<HeroEditModel>): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.patch<Hero>(url, hero, this.httpOptions).pipe(
      catchError(this.handleError<any>('updatePartialHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: HeroEditModel, avatar?: File): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      mergeMap((hero) => {
        if (avatar) {
          const formData = new FormData();
          formData.append('avatar', avatar);
          return this.http.post<Hero>(
            `${this.heroesUrl}/${hero.id}/avatar`,
            formData
          );
        }

        return of(hero);
      }),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http
      .delete<Hero>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Hero>('deleteHero')));
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(catchError(this.handleError<Hero[]>('searchHeroes', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
