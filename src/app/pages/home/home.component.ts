import { Component, HostListener, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/billboard-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public moviesSlideShow: Movie[] = [];
  public movies: Movie[] = [];


  @HostListener('window: scroll', ['$event'])
  onScroll(): void {
    const position = (document.documentElement.scrollTop || document.body.scrollTop) + 1300 // Si existe la primera incializacion, va esa y si no existe va la segunda
    const maxWindowHeight = (document.documentElement.scrollHeight || document.body.scrollHeight)

    if (position > maxWindowHeight) {
      if (this.moviesService.loading) {
        return
      } else {
        this.moviesService.getMovieBillboard()
          .subscribe(resp => {
            this.movies = resp;
          })
      }
    }
  }

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMovieBillboard()
      .subscribe(resp => {
        this.moviesSlideShow = resp;
        this.movies = resp;
      });
  }

}
