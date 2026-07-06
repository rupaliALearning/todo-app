import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-todo',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule
  ],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css'
})
export class AddTodo {
  hasCompleted = input<boolean>(false);
  todoAdded = output<{ title: string; dueDate: string | null }>();
  deleteAllCompleted = output();


  title = signal('');
  dueDate = signal<Date | null>(null);
  errorMessage = signal('');

  onAdd(): void {
    if (!this.title().trim()) {
      this.errorMessage.set('Title is required');
      return;
    }

    if (this.title().trim().length > 500) {
      this.errorMessage.set('Title cannot exceed 500 characters');
      return;
    }

    this.todoAdded.emit({
      title: this.title().trim(),
      dueDate: this.dueDate() ? `${this.dueDate()!.getFullYear()}-${String(this.dueDate()!.getMonth() + 1).padStart(2, '0')}-${String(this.dueDate()!.getDate()).padStart(2, '0')}`
       : null
    });

    this.title.set('');
    this.dueDate.set(null);
    this.errorMessage.set('');
  }

  onDeleteAllCompleted(): void {
    this.deleteAllCompleted.emit();
  }
}