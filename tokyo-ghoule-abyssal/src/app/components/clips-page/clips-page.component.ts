import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Clip } from '../../models/clip.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-clips-page',
  standalone: true,
  imports: [NavBarComponent, NgFor, NgIf, CommonModule],
  templateUrl: './clips-page.component.html',
  styleUrl: './clips-page.component.scss'
})

export class ClipsPageComponent {
  clips$: Observable<any[]>;

  constructor(firestore: Firestore) {
    const itemsCollection = collection(firestore, 'clips');
    this.clips$ = collectionData(itemsCollection).pipe(
      map(data => data as Clip[])
    );
  }
}