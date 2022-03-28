import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/billboard-response';
@Component({
  selector: 'app-movies-poster-grid',
  templateUrl: './movies-poster-grid.component.html',
  styleUrls: ['./movies-poster-grid.component.css']
})
export class MoviesPosterGridComponent implements OnInit {

  @Input() inputMovies: Movie[] = [];

  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }

  viewMovie(movieId: number): void {
    this.router.navigate(["movie", movieId]);
  }
}
