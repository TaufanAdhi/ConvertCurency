import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-convert',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router : Router){}

  toPageTable(){
    this.router.navigateByUrl(`convert/curencyTable`)
  }

  toPageConvert(){
    this.router.navigateByUrl(`convert/curencyConvert`)
  }

}
