import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfilsRp } from '../../models/profils-rp.model';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule  } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-profils-rp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AngularFireStorageModule],
  templateUrl: './create-profils-rp.component.html',
  styleUrl: './create-profils-rp.component.scss'
})
export class CreateProfilsRpComponent {
    profilForm!: FormGroup;
    isGhoul: boolean = false;
    selectedFile: File | null = null;

    constructor(
    private fb: FormBuilder,
    private router: Router,
    private firestore: Firestore,
    private storage: AngularFireStorage
    ) {}

    ngOnInit(): void {
        this.profilForm = this.fb.group({
        fullName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        description: [''],
        type: ['', Validators.required],
        kagune: [''],
        typeKagune: [''],
        rank: [''],
        caractere: [''],
        });
    }

    onSubmit(): void {
    if (this.profilForm.valid) {
      const formData = this.profilForm.value;
      const profilsCollection = collection(this.firestore, 'profils-rp');

      const profil: ProfilsRp = {
        name: formData.fullName,
        datebirth: formData.dateOfBirth,
        description: formData.description,
        type: formData.type,
        kagune: formData.kagune,
        typeKagune: formData.typeKagune,
        rank: formData.rank,
        image: '',
        caractere: formData.caractere,
      };

      if (this.selectedFile) {
        const filePath = `images/${this.selectedFile.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, this.selectedFile);

        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              profil.image = url;
              addDoc(profilsCollection, profil).then(() => {
                console.log('Document ajouté avec succès !', profil);
                this.profilForm.reset();
                this.profilForm.patchValue({ type: 'CCG' });
                this.selectedFile = null;
              })
            });
          })
        ).subscribe();
      } else {
        addDoc(profilsCollection, profil).then(() => {
          console.log('Document ajouté avec succès !', profil);

          this.profilForm.reset();
          this.profilForm.patchValue({ type: 'CCG' });
        }).catch((error) => {
          console.error('Erreur lors de l\'ajout du document : ', error);
        });
      }
    } else {
      console.error('Formulaire invalide. Veuillez vérifier les champs.');
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
    onFileSelected(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
        this.selectedFile = fileInput.files[0];
        }
    }
}
