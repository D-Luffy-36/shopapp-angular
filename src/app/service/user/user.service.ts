import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../../dtos/register.dto';
import { LoginDTO } from '../../dtos/login.dto';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { UpdateUserDTO } from 'src/app/dtos/user.update';
import { ListUserResponse } from 'src/app/responses/user/list.user.response';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly KEY: string = "user";
  private registerUrl = environment.apiBaseUrl + "/users/register";
  private loginUrl = environment.apiBaseUrl + "/users/login";
  private detailUrl = environment.apiBaseUrl + "/users/details";
  private updateUrl = environment.apiBaseUrl + "/users/update";

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

  update(updateUserDTO: UpdateUserDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });
    return this.http.post(this.updateUrl, updateUserDTO, { headers });
  }

  getUserDetail(userId?: number): Observable<any> {
    let params = new HttpParams();
    if (userId) {
      params = params.set('userId', userId.toString()); // Thêm userId vào query param
    }

    return this.http.get<any>(this.detailUrl, { params });
  }


  getListUsers(keyWord: string, page: number, limit: number): Observable<ListUserResponse> {
    const url = `${environment.apiBaseUrl}/users?keyWord=${keyWord}&page=${page}&limit=${limit}`;
    return this.http.get<ListUserResponse>(url);
  }

  softDeleteUser(userId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/users/update`;
    const body = { is_active: false }; // Cập nhật trạng thái is_active thành false
    return this.http.put(url, body); // Không cần headers vì Interceptor đã xử lý
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

  removeUserFromLocalStorge() {
    localStorage.removeItem(this.KEY);
  }

  updateUser(userId: number, updateData: UpdateUserDTO): Observable<any> {
    const url = `${environment.apiBaseUrl}/users/${userId}`;
    return this.http.put(url, updateData);
  }



}
