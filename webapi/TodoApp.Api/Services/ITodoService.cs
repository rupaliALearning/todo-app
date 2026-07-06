using TodoApp.Api.Models;
using TodoApp.Api.DTOs;

namespace TodoApp.Api.Services;

public interface ITodoService
{
    Task<IEnumerable<TodoItem>> GetAllAsync();
    Task<TodoItem> AddAsync(CreateTodoDto createDto);
    Task<TodoItem?> UpdateCompletedAsync(Guid id, UpdateCompletedDto dto);
    Task<bool> DeleteAsync(Guid id);
}