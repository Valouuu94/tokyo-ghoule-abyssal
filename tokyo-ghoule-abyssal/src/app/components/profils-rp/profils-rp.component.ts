import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { ProfilsRp } from '../../models/profils-rp.model';
import { Observable, map } from 'rxjs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-profils-rp',
  standalone: true,
  imports: [CheckboxModule, FormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profils-rp.component.html',
  styleUrl: './profils-rp.component.scss'
})
export class ProfilsRpComponent {
    showCCG: boolean = true;
    showGhoul: boolean = true;
    showHuman: boolean = true;
    profilsRp$: Observable<ProfilsRp[]>;
    profilRp: ProfilsRp[] = [];

    ccgProfiles: any[] = [];
    ghoulProfiles: any[] = [];
    humanProfiles: any[] = [];
   constructor(
    private firestore: Firestore,
    ) {
    const profilsCollection = collection(this.firestore, 'profils-rp');
    this.profilsRp$ = collectionData(profilsCollection).pipe(
      map((data:any) => data as ProfilsRp[] ));    
    }
    ngOnInit(): void {
        this.profilsRp$.subscribe(profiles => {
            const profileTypes = ['CCG', 'Ghoul', 'Human'];
            const profileMap: { [key: string]: any[] } = {
                'CCG': [],
                'Ghoul': [],
                'Human': []
            };
            profiles.forEach(profile => {
                if (profileTypes.includes(profile.type)) {
                    profileMap[profile.type].push(profile);
                }
            });

            this.ccgProfiles = profileMap['CCG'];
            this.ghoulProfiles = profileMap['Ghoul'];
            this.humanProfiles = profileMap['Human'];

            this.showCCG = this.ccgProfiles.length > 0;
            this.showGhoul = this.ghoulProfiles.length > 0;
            this.showHuman = this.humanProfiles.length > 0;
        });
    }
}
