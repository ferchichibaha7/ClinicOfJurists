import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment'; // Base URL in env

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private baseUrl_category = `${environment.apiUrl}/category`; // Base URL for categories
  private baseUrl_subcategory =`${environment.apiUrl}/subcategory`; // Replace with your API URL
  constructor(private http: HttpClient) {}

  // Fetch the list of categories
  getCategories(): Observable<any[]> {
    const url = `${this.baseUrl_category}/list`;
    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching categories:', error);
        return throwError(() => new Error('Error fetching categories'));
      })
    );
  }

    // Fetch the list of subcategories by category ID
    getSubcategoriesByCategory(categoryId: number): Observable<any[]> {
      const url = `${this.baseUrl_subcategory}/category/${categoryId}`;
      return this.http.get<any[]>(url).pipe(
        catchError((error) => {
          console.error(`Error fetching subcategories for category ${categoryId}:`, error);
          return throwError(() => new Error(`Error fetching subcategories for category ${categoryId}`));
        })
      );
    }
}
