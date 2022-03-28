import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {

  movieId!: number
  subscription!: Subscription
  movie!: MovieResponse

  constructor(private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService) { }

  ngOnInit(): void {
   this.movieId = this.activatedRoute.snapshot.params.id;
   this.getDetails()
  }

  getDetails(): void {
    this.subscription = this.moviesService.getMovieDetails(this.movieId).subscribe(resp => {
      console.log(resp)
      this.movie = resp
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  

}
