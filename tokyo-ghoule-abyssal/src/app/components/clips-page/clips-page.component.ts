import { Component, Input, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Clip } from '../../models/clip.model';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { Firestore, collection, collectionData, doc, updateDoc, getDocs, getDoc, DocumentData } from '@angular/fire/firestore';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    RouterModule,
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
  liked: boolean = false;
  reported: boolean = false;
  @Input() clip!: Clip;

  constructor(private firestore: Firestore, private sanitizer: DomSanitizer) {
    const clipsCollection = collection(this.firestore, 'clips');
    this.clips$ = from(getDocs(clipsCollection)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }) as Clip)
      )
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

  getEmbedUrl(clipSlug: string): SafeResourceUrl {
    const url = `https://clips.twitch.tv/embed?clip=${clipSlug}&parent=localhost`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  async toggleLike() {
    const clip = this.currentClip;
    if (!clip) {
      console.error('No clip is currently loaded');
      return;
    }
    try {
      const clipDocRef = doc(this.firestore, 'clips', clip.id);
      const clipDoc = await getDoc(clipDocRef);

      if (clipDoc.exists()) {
        const clipData = clipDoc.data() as DocumentData;
        const currentLikes = clipData['likes'] || 0;
        this.liked = !this.liked;
        const newLikes = this.liked ? currentLikes + 1 : currentLikes - 1;

        await updateDoc(clipDocRef, { likes: newLikes });

        const clipIndex = this.clips.findIndex(c => c.id === clip.id);
        if (clipIndex !== -1) {
          this.clips[clipIndex].likes = newLikes;
        }

        console.log('Likes updated:', newLikes);
      } else {
        console.error('Clip not found');
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  }

  async toggleReport() {
    const clip = this.currentClip;
    if (!clip) {
      console.error('No clip is currently loaded');
      return;
    }
    try {
      const clipDocRef = doc(this.firestore, 'clips', clip.id);
      const clipDoc = await getDoc(clipDocRef);

      if (clipDoc.exists()) {
        const clipData = clipDoc.data() as DocumentData;
        const currentReports = clipData['report'] || 0;
        this.reported = !this.reported;
        const newReports = this.reported ? currentReports + 1 : currentReports - 1;

        await updateDoc(clipDocRef, { report: newReports });

        const clipIndex = this.clips.findIndex(c => c.id === clip.id);
        if (clipIndex !== -1) {
          this.clips[clipIndex].report = newReports;
        }

        console.log('Reports updated:', newReports);
      } else {
        console.error('Clip not found');
      }
    } catch (error) {
      console.error('Error updating reports :', error);
    }
  }
}