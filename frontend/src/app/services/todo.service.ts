import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from '../models/todo-item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/api/todos`;

  getAll(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  add(title: string, dueDate: string | null): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, { title, dueDate });
  }

  updateCompleted(id: string, isCompleted: boolean): Observable<TodoItem> {
    return this.http.patch<TodoItem>(
      `${this.apiUrl}/${id}/completed`,
      { isCompleted }
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteAllCompleted(): Observable<{ deleted: number }> {
    return this.http.delete<{ deleted: number }>(`${this.apiUrl}/completed`);
  }
}