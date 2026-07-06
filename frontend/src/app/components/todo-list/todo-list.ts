import { Component, input, output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TodoItem } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-list',
  imports: [
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  todos = input.required<TodoItem[]>();
  deleteTodo = output<string>();
  updateCompleted = output<{ id: string; isCompleted: boolean }>();

  onDelete(id: string): void {
    this.deleteTodo.emit(id);
  }

  onUpdateCompleted(todo: TodoItem): void {
    this.updateCompleted.emit({
      id: todo.id,
      isCompleted: !todo.isCompleted
    });
  }

  formatDueDate(dueDate: string | null): string {
    if (!dueDate) return '';
    const [year, month, day] = dueDate.split('-');
    return `${day}/${month}/${year}`;
  }

  isOverdue(dueDate: string | null): boolean {
    if (!dueDate) return false;
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return dueDate < todayStr;
  }
}