import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/responses/api.response';
import { map } from 'rxjs/operators';
import { Role } from 'src/app/models/role';



@Injectable({
    providedIn: 'root'
})


export class RoleService {
    private rolesUrl = environment.apiBaseUrl + "/roles"

    constructor(private http: HttpClient) { };

    getRoles(): Observable<ApiResponse<Role[]>> {
        return this.http.get<ApiResponse<Role[]>>(this.rolesUrl);
    }
}