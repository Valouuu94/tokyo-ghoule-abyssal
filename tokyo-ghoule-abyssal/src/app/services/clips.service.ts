import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Clip } from '../models/clip.model';


@Injectable({
    providedIn: 'root'
})
export class ClipsService {
    private dbPath = '/clips';

    clipsRef: AngularFirestoreCollection<Clip>;

    constructor(private db: AngularFirestore) {
        this.clipsRef = db.collection(this.dbPath);
    }

    getAll(): AngularFirestoreCollection<Clip> {
        console.log('ClipsService.getAll()', this.clipsRef);
        return this.clipsRef;
    }
}