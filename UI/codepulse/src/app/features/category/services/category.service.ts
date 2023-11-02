import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);

  constructor() { }

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories`, model);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories`);
  }

  getCategoryId(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`)
  }

  updateCategory(id: string, updatedCategory: UpdateCategoryRequest): Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}`, updatedCategory);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }

}
