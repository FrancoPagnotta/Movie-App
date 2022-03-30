import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { MoviesService } from 'src/app/services/movies.service';
import { Thumbs } from 'swiper';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {

  movieId!: number
  subscription!: Subscription;
  movie!: MovieResponse
  cast: Cast[] = []

  constructor(private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
   this.movieId = this.activatedRoute.snapshot.params.id;

   this.subscription = combineLatest([
    this.moviesService.getMovieDetails(this.movieId),
    this.moviesService.getMovieCredits(this.movieId)
   ]).subscribe(([movie, cast]) => { 
       if (movie) {
           this.movie = movie;
           this.cast = cast!.filter(actor => actor.profile_path != null);
        } else {
            this.router.navigateByUrl("/");
        }
   })
  }
  
  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
