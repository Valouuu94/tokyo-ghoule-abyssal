import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TwitchClipService {
    //private clientId = environment.twitchClientId;
    //private oauthToken = environment.twitchOauthToken;
    private apiUrl = 'https://api.twitch.tv/helix/clips';

    constructor(private http: HttpClient) {}

  /*   getClipTitle(clipId: string): Observable<any> {
        const headers = new HttpHeaders({
            'Client-ID': this.clientId,
            'Authorization': `Bearer ${this.oauthToken}`
        });
    
        return this.http.get(`${this.apiUrl}?id=${clipId}`, { headers });
    } */
}