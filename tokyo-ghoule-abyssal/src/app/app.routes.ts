import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ClipsPageComponent } from './components/clips-page/clips-page.component';

export const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'clips', component: ClipsPageComponent }
];
