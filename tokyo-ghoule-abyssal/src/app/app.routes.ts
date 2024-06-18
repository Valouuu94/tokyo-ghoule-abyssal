import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ClipsPageComponent } from './components/clips-page/clips-page.component';
import { ProfilsRpComponent } from './components/profils-rp/profils-rp.component';

export const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'clips', component: ClipsPageComponent },
  { path: 'profils-rp', component: ProfilsRpComponent}

];
