import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({"projectId":"abyssal-tkg","appId":"1:591908580752:web:d095a7b93a1333cf211715","storageBucket":"abyssal-tkg.appspot.com","apiKey":"AIzaSyBzwtFQIqbGhu2ROVUDMlI1gbQkC2fE3bQ","authDomain":"abyssal-tkg.firebaseapp.com","messagingSenderId":"591908580752","measurementId":"G-L0BG9RDTW9"})), provideFirestore(() => getFirestore())]
};
