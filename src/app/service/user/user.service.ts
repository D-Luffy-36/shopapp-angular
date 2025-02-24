import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../../dtos/register.dto';
import { LoginDTO } from '../../dtos/login.dto';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { UserResponse } from 'src/app/responses/user/user.response';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private registerUrl = environment.apiBaseUrl + "/users/register"
  private loginUrl = environment.apiBaseUrl + "/users/login"
  private detailUrl = environment.apiBaseUrl + "/users/details"

  private apiConfig = {
    headers: this.createHeaders(),
    'Accept-Language': 'vi'
  }

  constructor(private http: HttpClient, private tokenService: TokenService) { };

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json', });
  }

  register(registerData: RegisterDTO): Observable<any> {
    return this.http.post(this.registerUrl, registerData, this.apiConfig);
  }

  login(loginData: LoginDTO): Observable<any> {
    return this.http.post(this.loginUrl, loginData, this.apiConfig);
  }

  getUserDetail(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.detailUrl, {}, { headers });
  }

  saveUserResponseToLocalStorage(userResponse: UserResponse) {
    try {
      const userResponseJSON = JSON.stringify(userResponse);
      localStorage.setItem("user", userResponseJSON);
    }
    catch (error) {
      console.error("cant not save user into local storage")
    }
  }

  getUserFromLocalStorage(): UserResponse | null {
    try {
      const userResponseJSON: string | null = localStorage.getItem("user");
      if (userResponseJSON == null) {
        console.log("cant not get user")
        return null;
      }
      const userApiResponse: UserResponse = JSON.parse(userResponseJSON);
      return userApiResponse;
    } catch (error) {
      console.log("cant not get user")
      return null;
    }
  }



}
