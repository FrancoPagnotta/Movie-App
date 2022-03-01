import { Component } from '@angular/core';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movieApp';

  constructor(private moviesService: MoviesService) {
    this.moviesService.getMovieBillboard()
      .subscribe(resp => {
        console.log(resp)
      })
  }
}
