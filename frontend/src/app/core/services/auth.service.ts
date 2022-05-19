import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path = environment.baseURI + 'users';


  constructor(private http: HttpClient) {
  }

  login(data: any): Observable<any> {
    return this.http.post(this.path + '/login', data);
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  signUp(data: any): Observable<any> {
    return this.http.post(this.path, data);
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(this.path + '/forgot-password', data);
  }

  resetPassword(data: any, token: any ): Observable<any> {
    return this.http.post(this.path + '/reset-password', data, {headers: {'authorization': token}});
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(this.path + '/forgotPassword', data);
  }

  getUserDetails(): Observable<any> {
    return this.http.get(this.path + '/token');
  }

  getToken() {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }


}
