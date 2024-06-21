import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './components/admin/admin.component';
import { Firestore, collection } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent, HeaderComponent, AdminComponent, AngularFireModule, FirestoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'tokyo-ghoule-abyssal';

}
