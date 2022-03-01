import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillboardResponse } from '../interfaces/billboard-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovieBillboard(): Observable<BillboardResponse> {
    return this.http.get<BillboardResponse>('https://api.themoviedb.org/3/movie/now_playing?api_key=c5c83b38e3b198321bd80286054c9868&language=en-US&page=1')
  }
}
