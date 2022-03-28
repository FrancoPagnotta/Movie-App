import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {

  movieId!: number
  subscription!: Subscription

  constructor(private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService) { }

  ngOnInit(): void {
   this.movieId = this.activatedRoute.snapshot.params.id;
   this.getDetails()
  }

  getDetails(): void {
    this.subscription = this.moviesService.getMovieDetails(this.movieId).subscribe(resp => {
      console.log(resp)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  

}
