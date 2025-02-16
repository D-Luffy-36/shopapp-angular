
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Injectable({
    providedIn: 'root'
})


export class CategoryService {
    private categoryUrl = environment.apiBaseUrl + "/categories";
    constructor(private http: HttpClient) { };

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoryUrl);
    }
}
