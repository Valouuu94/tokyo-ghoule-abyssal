import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Clip } from '../../models/clip.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clips-page',
  standalone: true,
  imports: [
    NavBarComponent, 
    NgFor, 
    NgIf, 
    CommonModule, 
    InputSwitchModule, 
    FormsModule, 
    DialogModule, 
    ButtonModule, 
    RouterModule
  ],
  templateUrl: './clips-page.component.html',
  styleUrl: './clips-page.component.scss'
})

export class ClipsPageComponent implements OnInit {
  clips$: Observable<Clip[]>;
  clips: Clip[] = [];
  currentClipIndex: number = 0;
  shuffledIndices: number[] = [];
  isAllClips: boolean = false;
  addClipVisible: boolean = false;

  constructor(private firestore: Firestore) {
    const clipsCollection = collection(this.firestore, 'clips');
    this.clips$ = collectionData(clipsCollection).pipe(
      map(data => data as Clip[])
    );
  }

  ngOnInit(): void {
    this.clips$.subscribe(data => {
      this.clips = data;
      if (this.clips.length > 0) {
        this.shuffleIndices();
        this.currentClipIndex = this.shuffledIndices[0];
      }
    });
  }

  showDialog() {
    this.addClipVisible = true;
}

  shuffleIndices(): void {
    this.shuffledIndices = Array.from(Array(this.clips.length).keys());
    for (let i = this.shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledIndices[i], this.shuffledIndices[j]] = [this.shuffledIndices[j], this.shuffledIndices[i]];
    }
  }

  showPreviousClip(): void {
    const currentPos = this.shuffledIndices.indexOf(this.currentClipIndex);
    if (currentPos > 0) {
      this.currentClipIndex = this.shuffledIndices[currentPos - 1];
    }
  }

  showNextClip(): void {
    const currentPos = this.shuffledIndices.indexOf(this.currentClipIndex);
    if (currentPos < this.shuffledIndices.length - 1) {
      this.currentClipIndex = this.shuffledIndices[currentPos + 1];
    } else {
      this.shuffleIndices();
      this.currentClipIndex = this.shuffledIndices[0];
    }
  }

  get currentClip(): Clip | undefined {
    return this.clips[this.currentClipIndex];
  }
}