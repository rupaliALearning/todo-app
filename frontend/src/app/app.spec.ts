import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TodoService } from './services/todo.service';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('App', () => {
  let todoService: Partial<TodoService>;
  beforeEach(async () => {
    todoService = {
      getAll: vi.fn().mockReturnValue(of([])),
      add: vi.fn(),
      delete: vi.fn(),
      updateCompleted: vi.fn(),
      deleteAllCompleted: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [        
        provideNativeDateAdapter(),
        { provide: TodoService, useValue: todoService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-title')?.textContent).toContain('TODO List');
  });

  it('should load todos on init', () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance.ngOnInit();
    expect(todoService.getAll).toHaveBeenCalled();
  });
});
