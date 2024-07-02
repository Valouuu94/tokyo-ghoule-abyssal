import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lore-page',
  standalone: true,
  imports: [],
  templateUrl: './lore-page.component.html',
  styleUrl: './lore-page.component.scss'
})
export class LorePageComponent {
    constructor(private router: Router) { }

    navigateTo(category: string): void {
        this.router.navigate([category]);
    }
}
