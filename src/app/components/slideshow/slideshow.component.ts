import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/billboard-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() public inputMovies!: Movie[];
  public mySwiper!: Swiper;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper', {
      // Optional parameters
      loop: true
    });

  }

  onSlideNext(): void {
    this.mySwiper.slideNext();
  }
  
  onSlidePrevius(): void {
    this.mySwiper.slidePrev();
  }

}
