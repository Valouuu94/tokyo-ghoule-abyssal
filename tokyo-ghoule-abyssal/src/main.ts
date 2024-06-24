import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { OAuthModule, OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';

bootstrapApplication(AppComponent, appConfig).then(() =>{
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: OAuthStorage, useValue: sessionStorage },
    provideOAuthClient({
      resourceServer: {
        allowedUrls: ['https://discord.com/api'],
        sendAccessToken: true
      }
    })
  ]
}).catch(err => console.error(err));
