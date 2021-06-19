import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogDataService } from '@mxh/web/features/blog/services';
// import { faCoffee, faHamburger } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pkl-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  // faCoffee = faCoffee;
  // faBurger = faHamburger
  constructor(private router: Router, private route: ActivatedRoute, private blogService:BlogDataService) {

   }
   
  ngOnInit(): void {

  }
  gotoCalcioIntegrato() {
    this.router.navigateByUrl('/blog', { relativeTo: this.route})
  }
}
