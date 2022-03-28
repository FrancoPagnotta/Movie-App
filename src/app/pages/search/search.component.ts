import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/billboard-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  foundMovies: Movie[] = []
  movieToSearch!: string

  constructor(private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService,
              private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(resp => {
      this.movieToSearch = resp.name
      this.moviesService.searchMovies(resp.name).subscribe(resp => this.foundMovies = resp)
    })
  }

  viewMovie(movieId: number): void {
    this.router.navigate(["movie", movieId]);
  }

}
