import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClipsService {
    constructor(private db: Firestore) { }

    getData(): Observable<any[]> {
        const clips = collection(this.db, 'clips');
        return collectionData(this.db, clips);
    }
}