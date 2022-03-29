import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {

  movieId!: number
  subscriptions: Subscription[] = []
  movie!: MovieResponse
  cast: Cast[] = []

  constructor(private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
   this.movieId = this.activatedRoute.snapshot.params.id;
   this.getDetails()
   this.getCredits()
  }

  getDetails(): void {
    this.subscriptions.push(
      this.moviesService.getMovieDetails(this.movieId).subscribe(resp => {
        if (resp) {
          this.movie = resp;
        } else {
          this.router.navigateByUrl("/");
        }
      })
    )
  }

  getCredits(): void {
    this.subscriptions.push(
      this.moviesService.getMovieCredits(this.movieId).subscribe(resp => {
        if (resp) {
          this.cast = resp.filter(actor => actor.profile_path != null)
        }
      })
    )
  }
  
  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
