import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfilsRp } from '../../models/profils-rp.model';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-create-profils-rp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-profils-rp.component.html',
  styleUrl: './create-profils-rp.component.scss'
})
export class CreateProfilsRpComponent {
    profilForm!: FormGroup;
    isGhoul: boolean = false;

    constructor(
    private fb: FormBuilder,
    private router: Router,
    private firestore: Firestore
    ) {}

    ngOnInit(): void {
        this.profilForm = this.fb.group({
        fullName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        description: [''],
        type: ['CCG', Validators.required],
        kagune: [''],
        typeKagune: [''],
        rank: ['']
        });
    }

    onSubmit(): void {
        if (this.profilForm.valid) {
            const formData = this.profilForm.value;

            // Ajout des données à la collection 'profils-rp'
            const profilsCollection = collection(this.firestore, 'profils-rp');
            const profil: ProfilsRp = {
                name: formData.fullName,
                datebirth: formData.dateOfBirth,
                description: formData.description,
                type: formData.type,
                kagune: formData.kagune,
                typeKagune: formData.typeKagune,
                rank: formData.rank,
                image: ''
            };
            // Ajout du profil à la collection
            addDoc(profilsCollection, profil);
        }
    }

    onTypeChange(event: Event): void {
    const selectedType = (event.target as HTMLSelectElement)?.value;
        this.isGhoul = selectedType === 'Ghoul';

        if (!this.isGhoul) {
            this.profilForm.get('Kagune')?.reset();
            this.profilForm.get('typeKagune')?.reset();
            this.profilForm.get('rank')?.reset();
        }
    }
}
