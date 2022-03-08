import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillboardResponse, Movie } from '../interfaces/billboard-response';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private url: string = 'https://api.themoviedb.org/3';
  private billboardPage: number = 1;
  public loading: boolean = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: 'c5c83b38e3b198321bd80286054c9868',
      language: 'en-US',
      page: this.billboardPage.toString()
    }
  }

  getMovieBillboard(): Observable<Movie[]> {
      this.loading = true;
  
      return this.http.get<BillboardResponse>(`${this.url}/movie/now_playing`,{
        params: this.params
      }).pipe(
        map((response: BillboardResponse) => {
          return response.results
        }),
        tap(() => {
          this.billboardPage += 1;
          this.loading = false;
        })
      )
  }
}
