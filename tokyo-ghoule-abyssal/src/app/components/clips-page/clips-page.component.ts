import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgFor, NgIf } from '@angular/common';
import { ClipsService } from '../../services/clips.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-clips-page',
  standalone: true,
  imports: [NavBarComponent, NgFor, NgIf],
  templateUrl: './clips-page.component.html',
  styleUrl: './clips-page.component.scss'
})

export class ClipsPageComponent implements OnInit {
  mainClip: any = null;
  otherClips: any[] = [];

  constructor(private clipService: ClipsService, private db: Firestore) {}

  ngOnInit(): void {
    this.clipService.getData().subscribe(clips => {
      if(clips.length > 0) {
        this.mainClip = clips[0];
        this.otherClips = clips.slice(1);
      }
    });
  }

}
