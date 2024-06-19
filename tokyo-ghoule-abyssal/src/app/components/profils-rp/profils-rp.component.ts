import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profils-rp',
  standalone: true,
  imports: [CheckboxModule, FormsModule],
  templateUrl: './profils-rp.component.html',
  styleUrl: './profils-rp.component.scss'
})
export class ProfilsRpComponent {
    showCCG: boolean = false;
    showGhoul: boolean = false;
    showHuman: boolean = false;
}
