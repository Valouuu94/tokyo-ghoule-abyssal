import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-add-clip-page',
  standalone: true,
  imports: [InputTextModule, FormsModule],
  templateUrl: './add-clip-page.component.html',
  styleUrl: './add-clip-page.component.scss'
})
export class AddClipPageComponent {
  value: string | undefined;
}
