import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ILogin } from '../interfaces/login.interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userActive: User;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  get token(): string {
    return this.cookieService.get('token');
  }

  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  private saveToken(name: string, value: string) {
    this.cookieService.set(name, value);
  }

  login(data: ILogin): Observable<any> {
    const url = `${base_url}/auth/login`;
    return this.http.post(url, data).pipe(tap((resp: any) => {
      this.saveToken('token', resp.access_token);
    }));
  }

  validateToken(): Observable<boolean> {
    const url = `${base_url}/auth/renew`;
    console.log(this.headers);
    return this.http.get(url, this.headers).pipe(map((resp: any) => {
      const {
        city, country, cp, code, username, updatedAt, street, role, status, id_user,
        gender, date_birth, phone_number, last_name, email, createdAt, name, image
      } = resp.user as User;
      this.userActive = new User(
        city, country, cp, createdAt, date_birth, email, gender, last_name, name,
        phone_number, role, status, street, updatedAt, username, id_user, '', image, code
      );
      console.log(this.userActive);
      this.saveToken('token', resp.access_token);
      return true;
    }), catchError(err => of(false)));
  }


}
