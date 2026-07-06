export interface TodoItem {
  id: string;
  title: string;
  isCompleted: boolean;
  dueDate: string | null;
  createdAt: string;
}