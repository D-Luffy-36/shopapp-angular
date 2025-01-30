import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../../dtos/register.dto';
import { LoginDTO } from '../../dtos/login.dto';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private registerUrl = environment.apiBaseUrl + "/users/register"
  private loginUrl = environment.apiBaseUrl + "/users/login"

  private apiConfig = {
    headers: this.createHeaders(),
    'Accept-Language': 'vi'
  }

  constructor(private http: HttpClient) { };

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json', });
  }

  register(registerData: RegisterDTO): Observable<any> {
    return this.http.post(this.registerUrl, registerData, this.apiConfig);
  }

  login(loginData: LoginDTO): Observable<any> {
    return this.http.post(this.loginUrl, loginData, this.apiConfig);
  }


}
