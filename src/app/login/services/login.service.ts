import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponseCredentials } from '../../core/models/ResponseCredentials';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  authenticate(username: string, password: string): Observable<ResponseCredentials> {
    this.authService.clearCredentials();
    return this.http.post<ResponseCredentials>(environment.sso + '/authenticate', { username: username, password: password });
  }

  putSSOCredentials(res: ResponseCredentials) {
    this.authService.putSSOCredentials(res);
  }

}

