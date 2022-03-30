import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  inputMovie: FormControl = new FormControl("");

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchMovie(): void {
    const textToSearch = this.inputMovie.value.trim()

    if (textToSearch.length === 0) {
      return 
    } else {
      this.router.navigateByUrl(`/search/${textToSearch}`);
      this.inputMovie.reset();
    }  
  }

}
