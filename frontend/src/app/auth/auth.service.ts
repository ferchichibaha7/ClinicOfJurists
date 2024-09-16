import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment'; // Base URL in env
import { AuthUtils } from './auth.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: boolean = false;
  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public userData$: Observable<any> = this.userDataSubject.asObservable();
  private baseUrl = environment.apiUrl; // Base URL from environment variable

  constructor(private http: HttpClient) {}

  // Register user
  register(userData: any) {
      return this.http.post(`${this.baseUrl}/auth/signup`, userData);
  }



  login(credentials: { email: string; password: string }): Observable<any>
  {
  // Throw error, if the user is already logged in
      if ( this._authenticated )
      {
          console.error('User is already logged in.');
      }

      return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      switchMap((response: any) => {
      if (response.token ) {
      // Store the access token in the local storage
      this.accessToken = response.token;
      // Set the authenticated flag to true
      this._authenticated = true;
        // Fetch user data here
        this.fetchUserData().subscribe(userData => {
          this.userDataSubject.next(userData.result);
        });
      }
      return of(response);
      })
      );
  }


  login_google(token:any): Observable<any>
  {
  // Throw error, if the user is already logged in
      if ( this._authenticated )
      {
          console.error('User is already logged in.');
      }
      const tosend = {token:token}
      return this.http.post(`${this.baseUrl}/auth/google`, tosend).pipe(
      switchMap((response: any) => {
      if (response.token ) {
      // Store the access token in the local storage
      this.accessToken = response.token;
      // Set the authenticated flag to true
      this._authenticated = true;
        // Fetch user data here
        this.fetchUserData().subscribe(userData => {
          this.userDataSubject.next(userData.result);
        });
      }
      return of(response);
      })
      );
  }



  fetchUserData(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    // Assuming you have an endpoint to fetch user data
    return this.http.get(`${this.baseUrl}/auth/current`, { headers });
  }

  getUserData(): Observable<any> {
    return this.userData$;
  }

  setUserData(userData: any): void {
    this.userDataSubject.next(userData);
  }

     /**
     * Check the authentication status
     */
     check(): Observable<boolean>
     {
         // Check if the user is logged in
         if ( this._authenticated )
         {
             return of(true);
         }

         // Check the access token availability
         if ( !this.accessToken )
         {
             return of(false);
         }

         // Check the access token expire date
         if ( AuthUtils.isTokenExpired(this.accessToken) )
         {
             return of(false);
         }

         // If the access token exists, and it didn't expire, sign in using it
              // If the access token exists and it didn't expire, sign in using it
         // return this.signInUsingToken();
         return of(true);
     }


     signOut(): Observable<any>
     {
         // Remove the access token from the local storage
         localStorage.removeItem('accessToken');
         // Set the authenticated flag to false
         this._authenticated = false;
         // Return the observable
         return of(true);
     }

   /**
     * Setter & getter for access token
     */
   set accessToken(token: string)
   {
       localStorage.setItem('accessToken', token);
   }

   get accessToken(): string
   {
       return localStorage.getItem('accessToken') ?? '';
   }
}
