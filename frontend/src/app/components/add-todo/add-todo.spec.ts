import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AddTodo } from './add-todo';

describe('AddTodo', () => {
  let fixture: ComponentFixture<AddTodo>;
  let component: AddTodo;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodo],
      providers: [
        provideNativeDateAdapter()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when title is empty', async () => {
    component.onAdd();
    await fixture.whenStable();
    expect(component.errorMessage()).toBe('Description is required');
  });

  it('should emit todoAdded when valid title entered', () => {
    let emitted: any = null;
    component.todoAdded.subscribe((value: any) => emitted = value);

    component.title.set('Buy fruits');
    component.onAdd();

    expect(emitted.title).toBe('Buy fruits');
  });

  it('should clear title after successful add', () => {
    component.title.set('Buy fruits');
    component.onAdd();
    expect(component.title()).toBe('');
  });

  it('should show error when title exceeds 500 chars', () => {
    component.title.set('a'.repeat(501));
    component.onAdd();
    expect(component.errorMessage()).toBe('Description cannot exceed 500 characters');
  });

  it('should emit deleteAllCompleted when button clicked', () => {
    let emitted = false;
    component.deleteAllCompleted.subscribe(() => emitted = true);
    component.onDeleteAllCompleted();
    expect(emitted).toBe(true);
  });
});