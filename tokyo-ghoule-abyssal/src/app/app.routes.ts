import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ClipsPageComponent } from './components/clips-page/clips-page.component';
import { ProfilsRpComponent } from './components/profils-rp/profils-rp.component';
import { AddClipPageComponent } from './components/add-clip-page/add-clip-page.component';
import { CreateProfilsRpComponent } from './components/create-profils-rp/create-profils-rp.component';
import { AuthCallbackComponent } from './components/callback/callback.component';
import {LorePageComponent} from './components/lore-page/lore-page.component';
import { FactionComponent } from './components/faction/faction.component';
import { FamilyClanComponent } from './components/family-clan/family-clan.component';
import { ReglementComponent } from './components/reglement/reglement.component';
import { GuideComponent } from './components/guide/guide.component';
import { LoreComponent } from './components/lore/lore.component';
export const routes: Routes = [
  { path: 'admin', component: AdminComponent },
    { path: 'clips', component: ClipsPageComponent },
    { path: 'clips/add-clip', component: AddClipPageComponent },
    { path: 'profils-rp', component: ProfilsRpComponent},
    { path: 'profils-rp/create', component: CreateProfilsRpComponent},
    { path: 'auth/callback', component: AuthCallbackComponent },
    { path: 'lore-and-guide', component: LorePageComponent},
    { path: 'lore', component: LoreComponent },
    { path: 'faction', component: FactionComponent },
    { path: 'family-clan', component: FamilyClanComponent },
    { path: 'reglement', component: ReglementComponent },
    { path: 'guide', component: GuideComponent },

];
