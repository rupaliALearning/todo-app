import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TodoService } from './todo.service';
import { TodoItem } from '../models/todo-item.model';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:5084/api/todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        TodoService
      ]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll should call GET /api/todos', () => {
    service.getAll().subscribe();
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('add should call POST /api/todos', () => {
    service.add('Buy milk', null).subscribe();
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: 'Buy milk', dueDate: null });
    req.flush({});
  });

  it('delete should call DELETE /api/todos/{id}', () => {
    service.delete('123').subscribe();
    const req = httpMock.expectOne(`${apiUrl}/123`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('updateCompleted should call PATCH /api/todos/{id}/completed', () => {
    service.updateCompleted('123', true).subscribe();
    const req = httpMock.expectOne(`${apiUrl}/123/completed`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ isCompleted: true });
    req.flush({});
  });

  it('deleteAllCompleted should call DELETE /api/todos/completed', () => {
    service.deleteAllCompleted().subscribe();
    const req = httpMock.expectOne(`${apiUrl}/completed`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ deleted: 2 });
    });
});