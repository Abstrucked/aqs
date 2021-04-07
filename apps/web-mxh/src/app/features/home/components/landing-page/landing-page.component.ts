import { Component, OnInit } from '@angular/core';
import { faCoffee, faHamburger } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pkl-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  faCoffee = faCoffee;
  faBurger = faHamburger
  constructor() {

   }

  ngOnInit(): void {
  }

}
