import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { API_KEY, API_END_POINT } from '../constants';
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private httpOptions: any;
  public requestToken: string;
  public tokenExpiry: string;
  public sessionId: string;

  constructor(private http$: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  // This method is used to call the API to generate the request token
  public generateRequestToken() {
    const response$ = this.http$.get(`${API_END_POINT}authentication/token/new?api_key=${API_KEY}`)
      .pipe(map((response: any) => {
        return response;
      }));
    return response$;
  }

  // This method is used to call the API to generate session id
  public generateSessionId() {
    let reqBody = {
      request_token: this.requestToken
    }
    const response$ = this.http$.post(`${API_END_POINT}authentication/session/new?api_key=${API_KEY}`, reqBody)
      .pipe(map((response: any) => {
        return response;
      }), catchError(this.handleError<string>('stats')));
    return response$;
  }

  // This method is used to call the API to populate movie search list
  public getMovieList(searchText: string): Observable<any> {
    const response$ = this.http$.get(`${API_END_POINT}search/movie?api_key=${API_KEY}&query=${searchText}`)
      .pipe(map((response: any) => {
        return response;
      }));
    return response$;
  }

  // This method is used to call the API to get the selected movie details
  public getMovieDetails(movieId: any): Observable<any> {
    const response$ = this.http$.get(`${API_END_POINT}movie/${movieId}?api_key=${API_KEY}`)
      .pipe(map((response: any) => {
        return response;
      }));
    return response$;
  }

  // This method is used to call the API to rate the movie (using session id)
  public rateMovie(movieId: any, rating: any): Observable<any> {
    let reqBody = {
      value: rating
    }
    const response$ = this.http$.post(`${API_END_POINT}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${this.sessionId}`, reqBody)
      .pipe(map((response: any) => {
        return response;
      }));
    return response$;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
