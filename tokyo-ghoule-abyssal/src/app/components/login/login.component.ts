// src/app/components/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DiscordIconComponent } from '../discord-icon/discord-icon.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, DiscordIconComponent],
  template: `
    <div>
      <div *ngIf="user; else notLoggedIn">
        <h2>Welcome, {{ user.username }}</h2>
        <img [src]="user.avatar ? 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.png' : 'default-avatar.png'" alt="User Avatar">
        <button
          class="discord-login"
          (click)="logout()"
        >
          <span class="text-sm">Se Déconnecter</span>
        </button>
      </div>
      <ng-template #notLoggedIn>
        <button
          class="discord-login"
          (click)="login()"
        >
          <app-discord-icon></app-discord-icon>
          <span class="text-sm">Se connecter avec Discord</span>
        </button>
      </ng-template>
    </div>
  `,
  styles: [`
    .discord-login {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background-color: #5865f2;
      color: white;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    .discord-login:hover {
      background-color: #5865f2cc;
      color: #fff8;
    }
    .text-sm {
      margin-left: 1rem;
    }
  `],
})
export class LoginComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
