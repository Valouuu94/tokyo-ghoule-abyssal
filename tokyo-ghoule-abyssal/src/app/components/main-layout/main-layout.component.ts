import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
