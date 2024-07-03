import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TwitchClipService } from '../../services/parseTwitchClip.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-clip-page',
  standalone: true,
  imports: [InputTextModule, FormsModule, NgIf],
  templateUrl: './add-clip-page.component.html',
  styleUrl: './add-clip-page.component.scss'
})
export class AddClipPageComponent {
  clipUrl: string = "";
  clipTitle: string = "";
  errorMessage: string = "";
  successMessage: string = "";

  private db: Firestore = inject(Firestore);
  sanitizer: any;

  constructor(
    private twitchClipService: TwitchClipService,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  async addClip(): Promise<void> {
    this.errorMessage = "";
    this.successMessage = "";

    if (!this.isValidLink(this.clipUrl)) {
      this.errorMessage = 'Le lien est invalide, veuillez réessayer';
      return;
    }

    if (!this.isAllowedDomain(this.clipUrl)) {
      this.errorMessage = 'Le lien doit commencer par "https://clips.twitch.tv/" ou "https://www.twitch.tv/".';
      return;
    }

    if (this.containsMultipleLinks(this.clipUrl)) {
      this.errorMessage = "Vous ne pouvez ajouter qu'un seul lien à la fois";
      return;
    }

    const clipId = this.extractClipId(this.clipUrl);
   /*  if (clipId) {
      try {
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
            this.successMessage = 'Le clip a bien été ajouté !';
          } else {
            this.errorMessage = "Le titre du clip n'a pas été trouvé";
          }
        });
      } catch (error) {
        this.errorMessage = 'Erreur lors de la récupération des clips';
        console.error('Erreur lors de la récupération du titre du clip', error);
      }
    } else {
      this.errorMessage = "URL non valide, veuillez réessayer";
    } */
  }

  isValidLink(link: string): boolean {
    try {
      new URL(link);
      return true;
    } catch (_) {
      return false;
    }
  }

  isAllowedDomain(link: string): boolean {
    const allowedDomains = ['https://clips.twitch.tv/', 'https://www.twitch.tv/'];
    return allowedDomains.some(domain => link.startsWith(domain));
  }

  containsMultipleLinks(link: string): boolean {
    return link.split(' ').length > 1;
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