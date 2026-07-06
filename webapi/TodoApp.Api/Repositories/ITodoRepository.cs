using TodoApp.Api.Models;

namespace TodoApp.Api.Repositories;

public interface ITodoRepository
{
    Task<IEnumerable<TodoItem>> GetAllAsync();
    Task<TodoItem?> GetByIdAsync(Guid id);
    Task<TodoItem> AddAsync(TodoItem item);
    Task<TodoItem?> UpdateAsync(TodoItem item);
    Task<bool> DeleteAsync(Guid id);
    Task<int> DeleteAllCompletedAsync();
}