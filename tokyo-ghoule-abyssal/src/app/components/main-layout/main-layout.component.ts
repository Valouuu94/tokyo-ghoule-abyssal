import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ClipsPageComponent } from "../clips-page/clips-page.component";
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss',
    imports: [NavBarComponent, ClipsPageComponent, NgIf, FooterComponent , RouterOutlet, LoginComponent]
})
export class MainLayoutComponent {
    constructor(
        public router: Router,
    ){}

 navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
