import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ComponentRef} from '@angular/core';
import { TodoList } from './todo-list';
import { TodoItem } from '../../models/todo-item.model';

describe('TodoList', () => {
  let fixture: ComponentFixture<TodoList>;
  let component: TodoList;
  let componentRef: ComponentRef<TodoList>;

  const mockTodos: TodoItem[] = [
    { id: '1', title: 'Buy fruits', isCompleted: false, dueDate: null, createdAt: '2026-01-01' },
    { id: '2', title: 'Call dentist', isCompleted: true, dueDate: '2026-07-10', createdAt: '2026-01-02' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoList],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(TodoList);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should create', () => {
    componentRef.setInput('todos', []);
    expect(component).toBeTruthy();
  });

  it('should show empty message when no todos', async () => {
    componentRef.setInput('todos', []);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('No TODOs yet');
  });

  it('should display todo titles', async () => {
    componentRef.setInput('todos', mockTodos);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Buy fruits');
    expect(fixture.nativeElement.textContent).toContain('Call dentist');
  });

  it('should emit deleteTodo when delete button clicked', async () => {
    componentRef.setInput('todos', mockTodos);
    await fixture.whenStable();

    let emittedId = '';
    component.deleteTodo.subscribe((id: string) => emittedId = id);

    const deleteButton = fixture.nativeElement.querySelector('button[aria-label="Delete todo"]');
    deleteButton.click();

    expect(emittedId).toBe('1');
  });

  it('should emit updateCompleted when checkbox clicked', async () => {
    componentRef.setInput('todos', mockTodos);
    await fixture.whenStable();

    let emitted: any = null;
    component.updateCompleted.subscribe((value: any) => emitted = value);

    component.onUpdateCompleted(mockTodos[0]);

    expect(emitted).toEqual({ id: '1', isCompleted: true });
  });
});