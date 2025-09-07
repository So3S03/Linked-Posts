import { environment } from './../environment/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: WritableSignal<IUser | null> = signal(null);
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly baseUrl = environment.ApiBaseUrl;


  //signup endpoint
  signUp(userData: any): Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}users/signup`, userData);
  }

  //signin endpoint
  signIn(userData: any): Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}users/signin`, userData);
  }

  //change password endpoint
  changePassword(Data: any): Observable<any>
  {
    return this._HttpClient.patch(`${this.baseUrl}users/change-password`, Data);
  }

  //upload photo endpoint
  uploadProfilePhoto(Data: any): Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}users/upload-photo`, Data);
  }

  //get logged user info
  getLoggedUserData(): Observable<any>
  {
    return this._HttpClient.get(`${environment.ApiBaseUrl}users/profile-data`);
  }

  loadUserData(): void
  {
    this.getLoggedUserData().subscribe({
      next: res => {
        this.userData.set(res.user);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
