import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { TodoItem } from './models/todo-item.model';
import { TodoService } from './services/todo.service';
import { TodoList } from './components/todo-list/todo-list';
import { AddTodo } from './components/add-todo/add-todo';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [
    TodoList,
    AddTodo,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly todoService = inject(TodoService);
  private readonly snackBar = inject(MatSnackBar);

  todos = signal<TodoItem[]>([]);
  hasCompleted = computed(() => this.todos().some(t => t.isCompleted));

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getAll().subscribe({
      next: (todos) => this.todos.set(todos),
      error: () => this.showError('Failed to load TODOs')
    });
  }

  onTodoAdded(event: { title: string; dueDate: string | null }): void {
    this.todoService.add(event.title, event.dueDate).subscribe({
      next: () => this.loadTodos(),
      error: () => this.showError('Failed to add TODO')
    });
  }

  onTodoDeleted(id: string): void {
    this.todoService.delete(id).subscribe({
      next: () => this.loadTodos(),
      error: () => this.showError('Failed to delete TODO')
    });
  }

  onUpdateCompleted(event: { id: string; isCompleted: boolean }): void {
    this.todoService.updateCompleted(event.id, event.isCompleted).subscribe({
      next: () => this.loadTodos(),
      error: () => this.showError('Failed to update TODO')
    });
  }

  onDeleteAllCompleted(): void {
    this.todoService.deleteAllCompleted().subscribe({
      next: (result) => 
        {
          this.loadTodos();
          this.snackBar.open(`${result.deleted} TODO(s) deleted`, 'Close', { duration: 3000 });
        },
      error: () => this.showError('Failed to delete completed TODOs')
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}