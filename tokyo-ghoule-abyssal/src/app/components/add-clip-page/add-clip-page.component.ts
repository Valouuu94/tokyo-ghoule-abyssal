import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TwitchClipService } from '../../services/parseTwitchClip.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-clip-page',
  standalone: true,
  imports: [InputTextModule, FormsModule],
  templateUrl: './add-clip-page.component.html',
  styleUrl: './add-clip-page.component.scss'
})
export class AddClipPageComponent {
  clipUrl: string = "";
  clipTitle: string = "";

  private db: Firestore = inject(Firestore);
  sanitizer: any;

  constructor(
    private twitchClipService: TwitchClipService,
  ) {}

  async addClip(): Promise<void> {
    const clipId = this.extractClipId(this.clipUrl);
    if (clipId) {
      this.twitchClipService.getClipTitle(clipId).subscribe(async response => {
        if (response.data && response.data.length > 0) {
          this.clipTitle = response.data[0].title;

          const clipsCollection = collection(this.db, 'clips');
          await addDoc(clipsCollection, {
            clipSlug: clipId,
            clipTitle: this.clipTitle,
            likes: 0,
            report: 0
          });
        }
      });
    } else {
      console.error('Invalid clip URL');
    }
  }

  extractClipId(url: string): string | null {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const dashIndex = lastPart.indexOf('-');
    if (dashIndex > 0) {
      return lastPart;
    }
    return null;
  }
}