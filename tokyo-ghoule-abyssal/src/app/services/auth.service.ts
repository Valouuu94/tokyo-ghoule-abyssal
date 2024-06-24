import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clientId = '1253741030440964117';
  private redirectUri = window.location.origin + '/auth/callback';
  private oauth2Url = 'https://discord.com/api/oauth2/authorize';
  private responseType = 'token';
  private scope = 'identify';
  private apiUrl = 'https://discord.com/api/users/@me';

  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromSession();
  }

  public login() {
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('redirect_uri', this.redirectUri)
      .set('response_type', this.responseType)
      .set('scope', this.scope);

    window.location.href = `${this.oauth2Url}?${params.toString()}`;
  }

  public handleAuthCallback() {
    const hash = window.location.hash.substr(1);
    const result: any = hash.split('&').reduce((res: any, item) => {
      const parts = item.split('=');
      res[parts[0]] = parts[1];
      return res;
    }, {});

    if (result.access_token) {
      sessionStorage.setItem('access_token', result.access_token);
      this.fetchUserInfo(result.access_token).subscribe(user => {
        this.userSubject.next(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/']);
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  private fetchUserInfo(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError<any>('fetchUserInfo', null))
    );
  }

  private loadUserFromSession() {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  public getUser(): any {
    return this.userSubject.value;
  }

  public logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  public get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('access_token');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
